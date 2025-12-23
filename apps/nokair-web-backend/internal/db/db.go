package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPool(ctx context.Context) *pgxpool.Pool {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is not set")
	}

	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		log.Fatalf("failed to create pgx pool: %v", err)
	}

	if err := pool.Ping(ctx); err != nil {
		log.Fatalf("failed to ping postgres: %v", err)
	}

	log.Println("web-backend connected to postgres")
	return pool
}
