package web

import (
	"context"
	"embed"
	"io/fs"
	"log"
	"net/http"
)

//go:embed static/*
var static embed.FS

func Run(ctx context.Context) error {
	fileSystem, err := fs.Sub(static, "static")
	if err != nil {
		return err
	}
	httpServer := &http.Server{
		Addr:    ":9001",
		Handler: http.FileServer(http.FS(fileSystem)),
	}

	go func() {
		<-ctx.Done()
		if err := httpServer.Shutdown(context.Background()); err != nil {
			log.Printf("Error shutting down the server: %v", err)
		}
	}()

	log.Printf("Server is starting on port %s", httpServer.Addr)
	if err := httpServer.ListenAndServe(); err != http.ErrServerClosed {
		return err
	}

	return nil
}
