package main

import (
	"fmt"

	maelstrom "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/cmwaters/maelstrom/server"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var balanceCmd = &cobra.Command{
	Use:   "balance address",
	Short: "Get balance of an address",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		config, err := server.LoadConfig("config.toml")
		if err != nil {
			return fmt.Errorf("could not load config: %v", err)
		}
		conn, err := grpc.Dial(config.GRPCServerAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
		if err != nil {
			return fmt.Errorf("did not connect: %v", err)
		}
		defer conn.Close()
		c := maelstrom.NewMaelstromClient(conn)

		r, err := c.Balance(cmd.Context(), &maelstrom.BalanceRequest{Address: args[0]})
		if err != nil {
			return fmt.Errorf("could not get balance: %v", err)
		}
		fmt.Printf("Balance: %d\n", r.MaelstromBalance)
		return nil
	},
}
