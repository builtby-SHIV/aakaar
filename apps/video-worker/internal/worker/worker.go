package worker

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"sync"

	"github.com/builtby-SHIV/aakaar/apps/video-worker/internal/postgres"
	redisinternal "github.com/builtby-SHIV/aakaar/apps/video-worker/internal/redis"
	"github.com/builtby-SHIV/aakaar/apps/video-worker/internal/storage"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	goredis "github.com/redis/go-redis/v9"
)

type Worker struct {
	rdb       *goredis.Client
	pool      *pgxpool.Pool
	store     *storage.Storage
	streamKey string
	groupName string
}

func NewWorker(
	rdb *goredis.Client,
	pool *pgxpool.Pool,
	store *storage.Storage,
	streamKey, groupName string,
) *Worker {
	return &Worker{
		rdb:       rdb,
		pool:      pool,
		store:     store,
		streamKey: streamKey,
		groupName: groupName,
	}
}

func (w *Worker) Start(ctx context.Context, job <-chan redisinternal.ChanData, wg *sync.WaitGroup) {
	defer wg.Done()

	for j := range job {
		shouldAck, err := w.processVideoJob(ctx, j.Msg)
		if err != nil {
			log.Printf("Job processing error for message %s: %v", j.Msg.ID, err)
		}

		if shouldAck {
			ackErr := w.rdb.XAck(ctx, w.streamKey, w.groupName, j.Msg.ID).Err()
			if ackErr != nil {
				log.Printf("Failed to ACK message %s: %v", j.Msg.ID, ackErr)
			} else {
				log.Printf("Successfully ACKed message %s", j.Msg.ID)
			}
		}
	}
}

func (w *Worker) processVideoJob(ctx context.Context, msg goredis.XMessage) (shouldAck bool, err error) {
	cleanValues := make(map[string]string)
	for k, v := range msg.Values {
		cleanKey := strings.TrimSpace(k)
		switch val := v.(type) {
		case string:
			cleanValues[cleanKey] = strings.TrimSpace(val)
		case []byte:
			cleanValues[cleanKey] = strings.TrimSpace(string(val))
		default:
			cleanValues[cleanKey] = strings.TrimSpace(fmt.Sprintf("%v", val))
		}
	}

	videoIdStr := cleanValues["videoId"]
	projectIdStr := cleanValues["projectId"]
	userId := cleanValues["userId"]

	if videoIdStr == "" || projectIdStr == "" || userId == "" {
		log.Printf("Message %s missing required fields (videoId=%q, projectId=%q, userId=%q); leaving stream object",
			msg.ID, videoIdStr, projectIdStr, userId)
		return false, nil
	}

	videoId, err := strconv.Atoi(videoIdStr)
	if err != nil {
		log.Printf("Invalid videoId %q in message %s: %v; leaving stream object", videoIdStr, msg.ID, err)
		return false, nil
	}

	projectId, err := strconv.Atoi(projectIdStr)
	if err != nil {
		log.Printf("Invalid projectId %q in message %s: %v; leaving stream object", projectIdStr, msg.ID, err)
		return false, nil
	}

	status, expectedChunks, err := postgres.GetVideoStatusAndChunks(ctx, w.pool, videoId, projectId, userId)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			log.Printf("Video %d (projectId=%d, userId=%s) not found in DB; leaving stream object", videoId, projectId, userId)
			return false, nil
		}
		return false, fmt.Errorf("failed to query video %d from DB: %w", videoId, err)
	}

	if status != "pending_stitch" {
		log.Printf("Video %d status is %q (expected 'pending_stitch'); leaving stream object", videoId, status)
		return false, nil
	}

	chunksPrefix := fmt.Sprintf("users/%s/projects/%d/videos/%d/chunks/", userId, projectId, videoId)
	chunkKeys, err := w.store.ListChunks(ctx, chunksPrefix)
	if err != nil {
		return false, err
	}

	totalChunks := len(chunkKeys)

	if totalChunks != expectedChunks || expectedChunks == 0 {
		log.Printf("Video %d expected %d chunks but found %d in R2; leaving stream object",
			videoId, expectedChunks, totalChunks)
		return false, nil
	}

	_ = postgres.UpdateVideoStatus(ctx, w.pool, videoId, "stitching")

	// 5. Create temporary file for stitched video output
	tempFile, err := os.CreateTemp("", fmt.Sprintf("stitched-%d-*.webm", videoId))
	if err != nil {
		_ = postgres.UpdateVideoStatus(ctx, w.pool, videoId, "incomplete")
		return false, fmt.Errorf("failed to create temporary file for video %d: %w", videoId, err)
	}
	tempFilePath := tempFile.Name()
	_ = tempFile.Close()
	defer os.Remove(tempFilePath)

	// 6. Stream chunks into ffmpeg via pipe without loading all chunks at once
	pipeReader, pipeWriter := io.Pipe()

	cmd := exec.CommandContext(ctx, "ffmpeg", "-y", "-i", "pipe:0", "-c", "copy", tempFilePath)
	cmd.Stdin = pipeReader
	var stderrBuf bytes.Buffer
	cmd.Stderr = &stderrBuf

	if err := cmd.Start(); err != nil {
		_ = pipeReader.Close()
		_ = pipeWriter.Close()
		_ = postgres.UpdateVideoStatus(ctx, w.pool, videoId, "incomplete")
		return false, fmt.Errorf("failed to start ffmpeg for video %d: %w", videoId, err)
	}

	streamErrChan := make(chan error, 1)
	go func() {
		defer pipeWriter.Close()
		if streamErr := w.store.StreamChunks(ctx, chunkKeys, pipeWriter); streamErr != nil {
			_ = pipeWriter.CloseWithError(streamErr)
			streamErrChan <- streamErr
			return
		}
		streamErrChan <- nil
	}()

	streamErr := <-streamErrChan
	ffmpegErr := cmd.Wait()

	if streamErr != nil {
		_ = postgres.UpdateVideoStatus(ctx, w.pool, videoId, "incomplete")
		return false, fmt.Errorf("error streaming chunks to ffmpeg for video %d: %w", videoId, streamErr)
	}

	if ffmpegErr != nil {
		_ = postgres.UpdateVideoStatus(ctx, w.pool, videoId, "incomplete")
		return false, fmt.Errorf("ffmpeg stitching failed for video %d: %w, stderr: %s", videoId, ffmpegErr, stderrBuf.String())
	}

	log.Printf("FFmpeg stitching completed for video %d at %s", videoId, tempFilePath)

	finalKey := fmt.Sprintf("users/%s/projects/%d/videos/%d", userId, projectId, videoId)

	finalFile, err := os.Open(tempFilePath)
	if err != nil {
		_ = postgres.UpdateVideoStatus(ctx, w.pool, videoId, "incomplete")
		return false, fmt.Errorf("failed to open stitched file %s: %w", tempFilePath, err)
	}
	defer finalFile.Close()

	if uploadErr := w.store.UploadMultipart(ctx, finalKey, finalFile, "video/webm"); uploadErr != nil {
		_ = postgres.UpdateVideoStatus(ctx, w.pool, videoId, "incomplete")
		return false, fmt.Errorf("multipart upload to R2 failed for key %s: %w", finalKey, uploadErr)
	}

	log.Printf("Successfully uploaded final video %d to R2 at %s", videoId, finalKey)

	_ = postgres.UpdateVideoStatus(ctx, w.pool, videoId, "done")

	return true, nil
}
