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
)

func main() {
	_ = godotenv.Load() // loads .env into process environment_ = godotenv.Load() // loads .env into process environment

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

	// opts, err := redis.ParseURL(os.Getenv("REDIS_URL"))

	if err != nil {
		panic(err)
	}

	rdb := redis.NewClient(opts)
	err = rdb.Set(ctx, "foo", "bar", 0).Err()
	if err != nil {
		panic(err)
	}

	val, err := rdb.Get(ctx, "foo").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("foo", val) 

	<-ctx.Done()

	log.Println("video worker shutting down")
}