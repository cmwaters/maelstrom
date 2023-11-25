package main

import (
	"fmt"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/cmwaters/maelstrom/client/cmd/config"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/spf13/cobra"
)

var addressCmd = &cobra.Command{
	Use:   "address",
	Short: "Get the address of the client",
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg, err := config.Load(configFileName)
		if err != nil {
			return fmt.Errorf("failed to get config: %w", err)
		}
		cdc := encoding.MakeConfig(app.ModuleEncodingRegisters...)
		keys, err := keyring.New(cfg.KeyName, keyring.BackendTest, cfg.KeyringDir, nil, cdc.Codec)
		if err != nil {
			return fmt.Errorf("failed to create new keyring: %w", err)
		}
		record, err := keys.Key(cfg.KeyName)
		if err != nil {
			return fmt.Errorf("failed to retrieve key: %w", err)
		}
		address, err := record.GetAddress()
		if err != nil {
			return fmt.Errorf("failed to get address from key record: %w", err)
		}

		fmt.Println(address.String())
		return nil
	},
}
