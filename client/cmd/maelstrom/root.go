package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

const (
	configFileName = "config.toml"
	keyringDirName = "keys"
	keyName        = "maelstrom"
)

func main() {
	cmd := &cobra.Command{
		Use:   "maelstrom",
		Short: "maelstrom client cli for submitting blobs",
	}

	cmd.AddCommand(
		initCmd,
		balanceCmd,
		submitCmd,
		depositCmd,
		addressCmd,
	)

	if err := cmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
