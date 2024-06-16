package main

import (
	"fmt"
	"os"

	"github.com/cmwaters/maelstrom/server"
	"github.com/spf13/cobra"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Initialize a test keychain and a default config",
	Args:  cobra.MaximumNArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) == 1 {
			if _, err := os.Stat(args[0]); os.IsExist(err) {
				fmt.Println("existing directory found, ignoring...")
				return nil
			}
			if err := os.MkdirAll(args[0], 0o755); err != nil {
				return err
			}
			if err := os.Chdir(args[0]); err != nil {
				return err
			}
		}

		if _, err := os.Stat(server.ConfigFileName); os.IsExist(err) {
			fmt.Println("existing maelstrom config found, ignoring...")
			return nil
		}

		config := server.DefaultConfig()
		if err := config.Save("config.toml"); err != nil {
			return fmt.Errorf("saving config: %w", err)
		}

		if _, err := os.Stat(config.KeyringDir()); os.IsExist(err) {
			fmt.Println("existing keyring found, ignoring...")
			return nil
		}

		mnemonic, _ := cmd.Flags().GetString("mnemonic")
		if mnemonic == "" {
			addr, mnemonic, err := config.GenerateKey()
			if err != nil {
				return err
			}
			fmt.Printf("created new keyring with account %s and with mnemonic: \n%s\n", addr, mnemonic)
		} else {
			addr, err := config.ImportKey(mnemonic)
			if err != nil {
				return err
			}
			fmt.Printf("created new keyring with account %s\n", addr)
		}
		return nil
	},
}

func init() {
	initCmd.Flags().String("mnemonic", "", "Specify a mnemonic to create the keys from")
}
