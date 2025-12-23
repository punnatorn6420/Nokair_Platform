package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"nokair-web-backend/internal/db"
	webhttp "nokair-web-backend/internal/http"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	ctx := context.Background()
	pool := db.NewPool(ctx)
	defer pool.Close()

	server := webhttp.NewServer(pool)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	log.Printf("Website Backend listening on :%s\n", port)
	if err := http.ListenAndServe(":"+port, server.Router); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
