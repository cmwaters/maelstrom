package main

import (
	"fmt"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cmwaters/maelstrom/client/cmd/config"
)

var withdrawCmd = &cobra.Command{
	Use:   "withdraw amount",
	Short: "Command to withdraw funds",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
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
		fmt.Println("Withdrawing funds...")
		err = client.Withdraw(cmd.Context(), uint64(amount))
		if err != nil {
			return fmt.Errorf("Failed to deposit: %w", err)
		}
		fmt.Println("Withdrawal successful")
		return nil
	},
}
