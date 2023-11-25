package main

import (
	"fmt"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cmwaters/maelstrom/client/cmd/config"
)

var depositCmd = &cobra.Command{
	Use:   "deposit amount",
	Short: "Command to deposit funds",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Depositing funds...")
		cfg, err := config.Load(configFileName)
		if err != nil {
			return fmt.Errorf("Failed to load config: %w", err)
		}
		client, err := cfg.NewClient()
		if err != nil {
			return fmt.Errorf("Failed to create Go client: %w", err)
		}
		amount, err := strconv.ParseInt(args[0], 10, 64)
		if err != nil {
			return fmt.Errorf("Failed to parse amount: %w", err)
		}
		err = client.Deposit(cmd.Context(), uint64(amount))
		if err != nil {
			return fmt.Errorf("Failed to deposit: %w", err)
		}
		fmt.Println("Deposit successful")
		return nil
	},
}
