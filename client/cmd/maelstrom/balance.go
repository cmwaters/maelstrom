package main

import (
	"fmt"

	"github.com/cmwaters/maelstrom/client/cmd/config"
	"github.com/spf13/cobra"
)

var balanceCmd = &cobra.Command{
	Use:   "balance",
	Short: "Get the balance of a given address",
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg, err := config.Load(configFileName)
		if err != nil {
			return fmt.Errorf("failed to get config: %w", err)
		}

		client, err := cfg.NewClient()
		if err != nil {
			return fmt.Errorf("failed to create client: %w", err)
		}

		balance, err := client.Balance(cmd.Context())
		if err != nil {
			return fmt.Errorf("failed to get balance: %w", err)
		}

		fmt.Printf("Balance: %d\n", balance)
		return nil
	},
}
