package main

import (
	"fmt"

	"github.com/cmwaters/maelstrom/server"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"

	maelstrom "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
)

var infoCmd = &cobra.Command{
	Use:   "info",
	Short: "Get server info",
	RunE: func(cmd *cobra.Command, args []string) error {
		config, err := server.LoadConfig("config.toml")
		if err != nil {
			return fmt.Errorf("could not load config: %v", err)
		}
		conn, err := grpc.Dial(config.GRPCServerAddress, grpc.WithInsecure())
		if err != nil {
			return fmt.Errorf("did not connect: %v", err)
		}
		defer conn.Close()
		c := maelstrom.NewBlobClient(conn)

		r, err := c.Info(cmd.Context(), &maelstrom.InfoRequest{})
		if err != nil {
			return fmt.Errorf("could not get info: %v", err)
		}
		fmt.Printf("Address: %s\nHeight: %d\n", r.Address, r.Height)
		return nil
	},
}
