package main

import (
	"fmt"

	"github.com/cmwaters/maelstrom/client/cmd/config"
	"github.com/spf13/cobra"
)

var submitCmd = &cobra.Command{
	Use:   "submit namespace blob",
	Short: "Submit bytes to a namespace",
	Args:  cobra.ExactArgs(2),
	RunE: func(cmd *cobra.Command, args []string) error {
		namespace := []byte(args[0])
		bytes := []byte(args[1])

		cfg, err := config.Load(configFileName)
		if err != nil {
			return fmt.Errorf("failed to get config: %w", err)
		}

		client, err := cfg.NewClient()
		if err != nil {
			return fmt.Errorf("failed to create client: %w", err)
		}

		txKey, err := client.Submit(cmd.Context(), namespace, [][]byte{bytes}, 1000)
		if err != nil {
			return fmt.Errorf("failed to submit bytes: %w", err)
		}
		fmt.Println("Submitted blob to namespace")

		txHash, err := client.Confirm(cmd.Context(), txKey)
		if err != nil {
			return fmt.Errorf("failed to confirm transaction: %w", err)
		}

		fmt.Printf("Blob committed (tx hash %X)\n", txHash)
		return nil
	},
}
