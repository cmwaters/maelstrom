package main

import (
	"context"
	"log"
	"os"
	"os/signal"

	web "github.com/cmwaters/maelstrom/web/server"
)

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, os.Kill)
	defer cancel()

	if err := web.Run(ctx); err != nil {
		log.Fatal(err)
	}
}
