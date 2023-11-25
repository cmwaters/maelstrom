package main

import (
	"fmt"
	"os"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/celestiaorg/celestia-app/pkg/user"
	"github.com/cmwaters/maelstrom/account"
	"github.com/cmwaters/maelstrom/server"
	"github.com/cmwaters/maelstrom/tx"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/rs/zerolog"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var startCmd = &cobra.Command{
	Use:   "start",
	Short: "Starts the maelstrom server",
	RunE: func(cmd *cobra.Command, args []string) error {
		config, err := server.LoadConfig("config.toml")
		if err != nil {
			return fmt.Errorf("failed to load server configuration: %w", err)
		}

		if _, err := os.Stat(keyringDirName); os.IsNotExist(err) {
			return fmt.Errorf("keyring not found, please run `maelstrom init`")
		}

		cdc := encoding.MakeConfig(app.ModuleEncodingRegisters...)
		kr, err := keyring.New(app.Name, keyring.BackendTest, keyringDirName, nil, cdc.Codec)
		if err != nil {
			return err
		}

		grpcConn, err := grpc.Dial(config.CelestiaGRPCAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
		if err != nil {
			return err
		}

		record, err := kr.Key(keyName)
		if err != nil {
			return err
		}

		address, err := record.GetAddress()
		if err != nil {
			return err
		}

		signer, err := user.SetupSigner(cmd.Context(), kr, grpcConn, address, cdc)
		if err != nil {
			return err
		}

		logger := zerolog.New(os.Stdout).With().Timestamp().Logger()

		accountStore, err := account.NewStore(accountStoreName, signer.PubKey())
		if err != nil {
			return err
		}
		latestStoreHeight, err := accountStore.GetHeight()
		if err != nil {
			return err
		}

		txPool, err := tx.NewPool(txStoreName, uint64(latestStoreHeight))
		if err != nil {
			return err
		}

		accountRetriever := account.NewQuerier(grpcConn)

		server := server.New(logger, config, txPool, accountStore, signer, accountRetriever)
		return server.Serve(cmd.Context())
	},
}
