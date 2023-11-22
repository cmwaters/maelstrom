package main
import (
	"fmt"
	"github.com/cmwaters/maelstrom/server"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
)

var balanceCmd = &cobra.Command{
	Use:   "balance",
	Short: "Get balance of an address",
	RunE: func(cmd *cobra.Command, args []string) error {
		config, err := server.LoadConfig("config.toml")
		if err != nil {
			return fmt.Errorf("could not load config: %v", err)
		}
		conn, err := grpc.Dial(config.GRPCServerAddress, grpc.WithInsecure())
		if err != nil {
			return fmt.Errorf("did not connect: %v", err)
		}
		defer conn.Close()
		c := maelstrom.NewBlobClient(conn)

		r, err := c.Balance(cmd.Context(), &maelstrom.BalanceRequest{Address: args[0]})
		if err != nil {
			return fmt.Errorf("could not get balance: %v", err)
		}
		fmt.Printf("Balance: %d\n", r.Balance)
		return nil
	},
}
