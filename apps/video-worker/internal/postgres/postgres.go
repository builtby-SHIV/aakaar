package postgres

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

const getVideoQuery = `
	SELECT v.status, COALESCE(v.expected_chunks, 0)
	FROM videos v
	JOIN projects p ON v.project_id = p.id
	LEFT JOIN project_participants pp ON pp.project_id = p.id
	WHERE v.id = $1 
	  AND v.project_id = $2 
	  AND (p.user_id = $3 OR pp.user_id = $3)
	LIMIT 1;
`

func NewPool(ctx context.Context, databaseURL string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		return nil, fmt.Errorf("unable to create pgxpool: %w", err)
	}
	return pool, nil
}

func GetVideoStatusAndChunks(ctx context.Context, pool *pgxpool.Pool, videoId, projectId int, userId string) (string, int, error) {
	var status string
	var expectedChunks int

	err := pool.QueryRow(ctx, getVideoQuery, videoId, projectId, userId).Scan(&status, &expectedChunks)
	if err != nil {
		return "", 0, err
	}
	return status, expectedChunks, nil
}

func UpdateVideoStatus(ctx context.Context, pool *pgxpool.Pool, videoId int, status string) error {
	_, err := pool.Exec(ctx, "UPDATE videos SET status = $1 WHERE id = $2", status, videoId)
	return err
}
