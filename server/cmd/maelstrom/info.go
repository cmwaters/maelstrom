package main

import (
	"fmt"
	"os"

	"github.com/cmwaters/maelstrom/account"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/cmwaters/maelstrom/server"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"

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
		conn, err := grpc.Dial(config.GRPCServerAddress, grpc.WithInsecure())
		if err != nil {
			// if the server is not running, access the db directly
			if _, err := os.Stat(accountStoreName); os.IsNotExist(err) {
				return fmt.Errorf("account store not found, please run `maelstrom init`")
			}
			store, err := account.NewStore(accountStoreName, nil)
			if err != nil {
				return err
			}
			pk, err := store.GetOwnerPubKey()
			if err != nil {
				return err
			}
			height, err := store.GetHeight()
			if err != nil {
				return err
			}
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
