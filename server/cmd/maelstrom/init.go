package main

import (
	"fmt"
	"os"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/cmwaters/maelstrom/server"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/spf13/cobra"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Initialize a test keychain and a default config",
	Long:  `This command will initialize a test keychain and a default config.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if _, err := os.Stat(configFileName); os.IsExist(err) {
			fmt.Println("existing maelstrom config found, ignoring...")
			return nil
		}

		config := server.DefaultConfig()
		if err := config.Save("config.toml"); err != nil {
			return err
		}

		if _, err := os.Stat(keyringDirName); os.IsNotExist(err) {
			cdc := encoding.MakeConfig(app.ModuleEncodingRegisters...).Codec
			kr, err := keyring.New(app.Name, keyring.BackendTest, keyringDirName, nil, cdc)
			if err != nil {
				return err
			}
			mnemonic, _ := cmd.Flags().GetString("mnemonic")
			record, err := kr.NewAccount(keyName, mnemonic, keyring.DefaultBIP39Passphrase, "", hd.Secp256k1)
			if err != nil {
				return err
			}
			addr, err := record.GetAddress()
			if err != nil {
				return err
			}
			fmt.Printf("created keyring with address: %s\n", addr)
			return nil
		} else {
			fmt.Println("existing keyring found, ignoring...")
		}
		return nil
	},
}

func init() {
	initCmd.Flags().String("mnemonic", "", "Specify a mnemonic to create the keys from")
}
