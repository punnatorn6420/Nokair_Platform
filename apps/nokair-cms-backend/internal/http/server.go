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

	// middleware
	r.Use(cors)

	// admin endpoint สำหรับ CMS Admin Frontend ใช้
	r.Route("/admin", func(r chi.Router) {
		r.Get("/site/{slug}/layout", s.handleGetSiteLayout)
		r.Put("/site/{slug}/layout", s.handleUpsertSiteLayout)
	})
	return s
}
