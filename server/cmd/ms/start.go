package main

import (
	"fmt"

	"github.com/cmwaters/maelstrom/server"
	"github.com/spf13/cobra"
)

var startCmd = &cobra.Command{
	Use:   "start",
	Short: "Starts the maelstrom server",
	RunE: func(cmd *cobra.Command, args []string) error {
		config, err := server.LoadConfig("config.toml")
		if err != nil {
			return fmt.Errorf("failed to load server configuration: %w", err)
		}

		server, err := config.NewServer(cmd.Context())
		if err != nil {
			return err
		}

		return server.Serve(cmd.Context())
	},
}
