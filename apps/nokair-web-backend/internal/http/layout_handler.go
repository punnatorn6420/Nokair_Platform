package http

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (s *Server) handleGetSiteLayout(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	slug := chi.URLParam(r, "slug")
	if slug == "" {
		http.Error(w, "missing slug", http.StatusBadRequest)
		return
	}

	var rawJSON []byte

	err := s.db.QueryRow(ctx,
		`SELECT data FROM cms_site_layouts WHERE site_slug = $1`,
		slug,
	).Scan(&rawJSON)
	if err != nil {
		http.Error(w, "site layout not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(rawJSON)
}
