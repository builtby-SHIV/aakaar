package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"sync"
	"syscall"

	"github.com/builtby-SHIV/aakaar/apps/video-worker/internal/postgres"
	redisinternal "github.com/builtby-SHIV/aakaar/apps/video-worker/internal/redis"
	"github.com/builtby-SHIV/aakaar/apps/video-worker/internal/storage"
	"github.com/builtby-SHIV/aakaar/apps/video-worker/internal/worker"
	"github.com/joho/godotenv"
)

const (
	GroupName = "video-processors"
	StreamKey = "videos"
)

func main() {
	_ = godotenv.Load()

	ctx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer stop()

	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		log.Fatal("REDIS_URL environment variable is not set")
	}
	rdb, err := redisinternal.NewClient(redisURL)
	if err != nil {
		log.Fatalf("Redis initialization error: %v", err)
	}
	defer rdb.Close()

	if err := redisinternal.InitConsumerGroup(ctx, rdb, StreamKey, GroupName); err != nil {
		log.Fatalf("Consumer group initialization error: %v", err)
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}
	pool, err := postgres.NewPool(ctx, databaseURL)
	if err != nil {
		log.Fatalf("Database pool initialization error: %v", err)
	}
	defer pool.Close()

	accessKey := os.Getenv("ACCESS_KEY_ID")
	secretKey := os.Getenv("SECRET_ACCESS_KEY")
	endpoint := os.Getenv("S3_API")
	bucket := os.Getenv("S3_BUCKET")
	if bucket == "" {
		bucket = "aakaar"
	}

	if accessKey == "" || secretKey == "" {
		log.Fatal("ACCESS_KEY_ID or SECRET_ACCESS_KEY environment variable is not set")
	}

	store, err := storage.NewStorage(ctx, accessKey, secretKey, endpoint, bucket)
	if err != nil {
		log.Fatalf("Storage initialization error: %v", err)
	}

	log.Println("video worker started")

	job := make(chan redisinternal.ChanData)
	go redisinternal.StartConsumer(ctx, rdb, StreamKey, GroupName, "consumer1", job)

	w := worker.NewWorker(rdb, pool, store, StreamKey, GroupName)

	var wg sync.WaitGroup
	for i := 1; i <= 2; i++ {
		wg.Add(1)
		go w.Start(ctx, job, &wg)
	}

	<-ctx.Done()

	log.Println("video worker shutting down")
	wg.Wait()
	log.Println("video worker stopped successfully")
}