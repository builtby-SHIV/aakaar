package redis

import (
	"context"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	goredis "github.com/redis/go-redis/v9"
)

type ChanData struct {
	Msg goredis.XMessage
}

func NewClient(redisURL string) (*goredis.Client, error) {
	opts, err := goredis.ParseURL(redisURL)
	if err != nil {
		return nil, fmt.Errorf("unable to parse redis URL: %w", err)
	}
	return goredis.NewClient(opts), nil
}

func InitConsumerGroup(ctx context.Context, rdb *goredis.Client, streamKey, groupName string) error {
	_, err := rdb.XGroupCreate(ctx, streamKey, groupName, "0").Result()
	if err != nil && !strings.Contains(err.Error(), "BUSYGROUP") {
		return fmt.Errorf("unable to create consumer group: %w", err)
	}
	return nil
}

func StartConsumer(
	ctx context.Context,
	rdb *goredis.Client,
	streamKey, groupName, consumerName string,
	job chan<- ChanData,
) {
	defer close(job)
	for {
		streams, err := rdb.XReadGroup(ctx, &goredis.XReadGroupArgs{
			Streams:  []string{streamKey, ">"},
			Group:    groupName,
			Consumer: consumerName,
			Count:    5,
			Block:    2 * time.Second,
		}).Result()

		if err != nil {
			if errors.Is(err, goredis.Nil) {
				return
			}

			log.Printf("Unable to read from stream: %v", err)
			time.Sleep(2 * time.Second)
			continue
		}

		if len(streams) == 0 {
			continue
		}

		for _, stream := range streams {
			for _, msg := range stream.Messages {
				select {
				case job <- ChanData{Msg: msg}:
				case <-ctx.Done():
					return
				}
			}
		}
	}
}
