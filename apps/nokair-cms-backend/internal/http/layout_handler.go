package http

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

type layoutResponse map[string]any

// GET /admin/site/{slug}/layout
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

// PUT /admin/site/{slug}/layout
// body = JSON ทั้งก้อน (ต้องตรงกับ structure ที่ frontend ใช้)
func (s *Server) handleUpsertSiteLayout(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	slug := chi.URLParam(r, "slug")
	if slug == "" {
		http.Error(w, "missing slug", http.StatusBadRequest)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "failed to read body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// เช็คว่าเป็น JSON ที่ parse ได้จริง
	var tmp layoutResponse
	if err := json.Unmarshal(body, &tmp); err != nil {
		http.Error(w, "invalid JSON body", http.StatusBadRequest)
		return
	}

	// upsert
	_, err = s.db.Exec(ctx, `
		INSERT INTO cms_site_layouts (site_slug, data, created_at, updated_at)
		VALUES ($1, $2::jsonb, now(), now())
		ON CONFLICT (site_slug)
		DO UPDATE SET data = EXCLUDED.data, updated_at = $3
	`, slug, string(body), time.Now())
	if err != nil {
		http.Error(w, "failed to save layout", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
