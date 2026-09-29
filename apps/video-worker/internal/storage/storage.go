package storage

import (
	"context"
	"fmt"
	"io"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/feature/s3/transfermanager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type Storage struct {
	client *s3.Client
	tm     *transfermanager.Client
	bucket string
}

func NewStorage(ctx context.Context, accessKey, secretKey, endpoint, bucket string) (*Storage, error) {
	cfg, err := config.LoadDefaultConfig(ctx,
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKey, secretKey, "")),
		config.WithRegion("auto"),
	)
	if err != nil {
		return nil, fmt.Errorf("unable to load S3 configuration: %w", err)
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		if endpoint != "" {
			o.BaseEndpoint = aws.String(endpoint)
		}
		o.UsePathStyle = true
	})

	tm := transfermanager.New(client, func(o *transfermanager.Options) {
		o.PartSizeBytes = 10 * 1024 * 1024 // 10MB parts for multipart upload
		o.Concurrency = 3
	})

	return &Storage{
		client: client,
		tm:     tm,
		bucket: bucket,
	}, nil
}

// ListChunks lists chunks under prefix.
// Since chunk indices are 8-digit zero-padded (e.g. 00000000.webm),
// R2's default lexicographical listing order is already chronologically sorted.
func (s *Storage) ListChunks(ctx context.Context, prefix string) ([]string, error) {
	var keys []string
	paginator := s3.NewListObjectsV2Paginator(s.client, &s3.ListObjectsV2Input{
		Bucket: aws.String(s.bucket),
		Prefix: aws.String(prefix),
	})

	for paginator.HasMorePages() {
		page, err := paginator.NextPage(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to list chunks from storage for prefix %s: %w", prefix, err)
		}
		for _, obj := range page.Contents {
			if obj.Key != nil && strings.HasSuffix(*obj.Key, ".webm") {
				keys = append(keys, *obj.Key)
			}
		}
	}
	return keys, nil
}

// StreamChunks streams objects one-by-one into w without loading them all into memory or disk.
func (s *Storage) StreamChunks(ctx context.Context, keys []string, w io.Writer) error {
	for _, key := range keys {
		resp, err := s.client.GetObject(ctx, &s3.GetObjectInput{
			Bucket: aws.String(s.bucket),
			Key:    aws.String(key),
		})
		if err != nil {
			return fmt.Errorf("failed to get chunk %s: %w", key, err)
		}

		_, copyErr := io.Copy(w, resp.Body)
		_ = resp.Body.Close()
		if copyErr != nil {
			return fmt.Errorf("failed to stream chunk %s to writer: %w", key, copyErr)
		}
	}
	return nil
}

// UploadMultipart performs a multipart upload of the video to R2 using transfermanager.
func (s *Storage) UploadMultipart(ctx context.Context, key string, body io.Reader, contentType string) error {
	_, err := s.tm.UploadObject(ctx, &transfermanager.UploadObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(key),
		Body:        body,
		ContentType: aws.String(contentType),
	})
	if err != nil {
		return fmt.Errorf("failed multipart upload to key %s: %w", key, err)
	}
	return nil
}
