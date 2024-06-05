package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"path/filepath"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/test/util/testnode"
	"github.com/cmwaters/apollo"
	"github.com/cmwaters/apollo/faucet"
	"github.com/cmwaters/apollo/genesis"
	"github.com/cmwaters/apollo/node/consensus"
	"github.com/cmwaters/maelstrom/dev/maelstrom"
	"github.com/cmwaters/maelstrom/server"
)

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, os.Kill)
	defer cancel()

	if err := Run(ctx); err != nil {
		log.Fatal(err)
	}
}

func Run(ctx context.Context) error {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return err
	}
	dir := filepath.Join(homeDir, ".maelstrom-dev")

	consensusCfg := testnode.DefaultConfig().
		WithTendermintConfig(app.DefaultConsensusConfig()).
		WithAppConfig(app.DefaultAppConfig())
	// maelstrom server requires abci responses
	consensusCfg.TmConfig.Storage.DiscardABCIResponses = false

	return apollo.Run(ctx, dir, genesis.NewDefaultGenesis(),
		consensus.New(consensusCfg),
		faucet.New(faucet.DefaultConfig()),
		maelstrom.New(server.DefaultConfig()),
	)
}
