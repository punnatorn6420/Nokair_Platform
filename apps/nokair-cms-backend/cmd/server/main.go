package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"nokair-cms-backend/internal/db"
	cmshttp "nokair-cms-backend/internal/http"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	ctx := context.Background()
	pool := db.NewPool(ctx)
	defer pool.Close()

	server := cmshttp.NewServer(pool)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("CMS Backend listening on :%s\n", port)
	if err := http.ListenAndServe(":"+port, server.Router); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
