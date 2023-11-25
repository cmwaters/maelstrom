package main

import (
	"fmt"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/cmwaters/maelstrom/client/cmd/config"
	bank "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var balanceCmd = &cobra.Command{
	Use:   "balance",
	Short: "Get the balance of a given address",
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg, err := config.Load(configFileName)
		if err != nil {
			return fmt.Errorf("failed to get config: %w", err)
		}

		onChain, err := cmd.Flags().GetBool("celestia")
		if err != nil {
			return fmt.Errorf("failed to get flag: %w", err)
		}

		if onChain {
			address, err := cfg.Address()
			if err != nil {
				return fmt.Errorf("failed to get address: %w", err)
			}
			conn, err := grpc.Dial(cfg.CelestiaGRPCAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
			if err != nil {
				return fmt.Errorf("failed to dial celestia grpc server: %w", err)
			}
			defer conn.Close()
			resp, err := bank.NewQueryClient(conn).Balance(cmd.Context(), &bank.QueryBalanceRequest{Address: address.String(), Denom: app.BondDenom})
			if err != nil {
				return fmt.Errorf("failed to query balance: %w", err)
			}

			fmt.Printf("Celestia balance: %d\n", resp.Balance.Amount.Int64())
			return nil
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

func init() {
	balanceCmd.Flags().Bool("celestia", false, "balance on Celestia chain")
}
