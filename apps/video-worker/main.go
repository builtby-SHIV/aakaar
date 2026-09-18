package main

import (
	"fmt"
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"github.com/redis/go-redis/v9"
	"github.com/joho/godotenv"
	"github.com/jackc/pgx/v5"
)

func main() {
	_ = godotenv.Load()

	ctx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer stop()

	log.Println("video worker started")

	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		log.Fatal("REDIS_URL environment variable is not set")
	}

	opts, err := redis.ParseURL(redisURL)

	if err != nil {
		panic(err)
	}

	rdb := redis.NewClient(opts)

	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	<-ctx.Done()

	log.Println("video worker shutting down")
}