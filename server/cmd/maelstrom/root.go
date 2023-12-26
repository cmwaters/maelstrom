package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func main() {
	cmd := &cobra.Command{
		Use:   "maelstrom",
		Short: "CLI for managing the maelstrom server",
	}

	cmd.AddCommand(
		initCmd,
		startCmd,
		infoCmd,
		balanceCmd,
	)

	if err := cmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
