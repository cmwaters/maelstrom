package main

import (
	"fmt"
	"os"

	"github.com/cmwaters/maelstrom/account"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/cmwaters/maelstrom/server"
	"github.com/dgraph-io/badger"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var infoCmd = &cobra.Command{
	Use:   "info",
	Short: "Get server info",
	RunE: func(cmd *cobra.Command, args []string) error {
		config, err := server.LoadConfig("config.toml")
		if err != nil {
			return fmt.Errorf("could not load config: %v", err)
		}
		conn, err := grpc.Dial(config.GRPCServerAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
		if err != nil {
			// if the server is not running, access the db directly
			if _, err := os.Stat(server.StoreName); os.IsNotExist(err) {
				return fmt.Errorf("account store not found, please run `maelstrom init`")
			}
			db, err := badger.Open(badger.DefaultOptions(server.StoreName))
			if err != nil {
				return err
			}

			record, err := config.GetRecord()
			if err != nil {
				return err
			}

			pk, err := record.GetPubKey()
			if err != nil {
				return err
			}

			store, err := account.NewStore(db, pk, config.StartHeight)
			if err != nil {
				return err
			}

			height := store.GetHeight()
			fmt.Printf("Address: %s\nHeight: %d\n", sdk.AccAddress(pk.Address()).String(), height)
			return nil
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
