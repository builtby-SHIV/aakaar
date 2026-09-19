package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"github.com/redis/go-redis/v9"
	"github.com/joho/godotenv"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	_ = godotenv.Load()

	ctx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer stop()

	const (
		GroupName = "video-processors"
		StreamKey = "videos"
	)
	
	//creating redis client
	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		log.Fatal("REDIS_URL environment variable is not set")
	}
	opts, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatal("Unable to parse redis URl:", err)
	}
	rdb := redis.NewClient(opts)
	defer rdb.Close()

	//creating consumer group
	_, err = rdb.XGroupCreate(ctx, StreamKey, GroupName, "0").Result()

	if err != nil {
		log.Fatal("Unable to create consumer group:", err)
	}

	//creating pgsql client
	pool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
    if err != nil {
		log.Fatal("Unable to create connection pool:", err)
    }
    defer pool.Close()
	
	log.Println("video worker started")

	<-ctx.Done()

	log.Println("video worker shutting down")
}