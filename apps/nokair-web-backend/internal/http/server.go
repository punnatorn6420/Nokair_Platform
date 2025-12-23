package http

import (
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Server struct {
	Router *chi.Mux
	db     *pgxpool.Pool
}

func NewServer(db *pgxpool.Pool) *Server {
	r := chi.NewRouter()

	s := &Server{
		Router: r,
		db:     db,
	}

	// public endpoint สำหรับ frontend ใช้
	// GET /site/nokair/layout
	r.Get("/site/{slug}/layout", s.handleGetSiteLayout)

	return s
}
