package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

const (
	GroupName = "video-processors"
	StreamKey = "videos"
)

type chanData struct {
	msg redis.XMessage
}

func main() {
	_ = godotenv.Load()

	ctx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer stop()
	
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

	if err != nil && !strings.Contains(err.Error(), "BUSYGROUP") {
		log.Fatal("Unable to create consumer group:", err)
	}

	//creating pgsql client
	pool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
    if err != nil {
		log.Fatal("Unable to create connection pool:", err)
    }
    defer pool.Close()
	
	log.Println("video worker started")

	job := make(chan chanData)
	go consumer(ctx, rdb, job)

	var wg sync.WaitGroup

	for i := 1; i <= 2; i++ {
		wg.Add(1)
		go worker(ctx, rdb, job, &wg)
	}

	<- ctx.Done()

	log.Println("video worker shutting down")

	wg.Wait()

	log.Println("waited for worker")
}

func consumer(ctx context.Context, rdb *redis.Client, job chan<- chanData) {
	defer close(job)
	for {
		streams, err := rdb.XReadGroup(ctx, &redis.XReadGroupArgs{
			Streams:  []string{StreamKey, ">"},
			Group:    GroupName,
			Consumer: "consumer1",
			Count:    5,
			Block:    2* time.Second,
		}).Result()

		if err != nil {
			if errors.Is(err, redis.Nil) {
				return
			}

			log.Printf("Unable to start consumer: %v", err)
			time.Sleep(2 * time.Minute)
			continue
		}

		if len(streams) == 0 {
			continue
		}

		for _, stream := range streams {
			for _, msg := range stream.Messages {
				select {
				case job <- chanData{ msg }:
				case <-ctx.Done():
					return
				}
			}
		}
	}
}

func worker(ctx context.Context, rdb *redis.Client, job <-chan chanData, wg *sync.WaitGroup) {
	defer wg.Done()
	cleanValues := make(map[string]interface{})
	for j := range job {
		for k, v := range j.msg.Values {
			cleanKey := strings.TrimSpace(k)
			cleanValues[cleanKey] = v
    }

		raw, _ := cleanValues["videoId"]

		switch v := raw.(type) {
		case string:
			fmt.Println("videoId:", v)
		case []byte:
			fmt.Println("videoId:", string(v))
		case int64:
			fmt.Println("videoId:", v)
		default:
			fmt.Printf("unexpected type for videoId: %T -> %#v\n", raw, raw)
		}

		// Simulate work
		time.Sleep(5 * time.Second)

		// Acknowledge processing completion so Redis removes it from Pending Entries List (PEL)
		err := rdb.XAck(ctx, StreamKey, GroupName, j.msg.ID).Err()
		if err != nil {
			log.Printf(" Failed to ACK message %s: %v", j.msg.ID, err)
			return
		}

		fmt.Printf(" Successfully ACKed %s\n", j.msg.ID)
	}
}