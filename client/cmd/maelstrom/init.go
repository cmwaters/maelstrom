package main

import (
	"fmt"
	"os"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/cmwaters/maelstrom/client/cmd/config"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cobra"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Initialize a keychain and a default config",
	Long:  `This command will initialize a test keychain and a default config.`,
	Args:  cobra.MaximumNArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) == 1 {
			if _, err := os.Stat(args[0]); os.IsExist(err) {
				fmt.Println("existing directory found, ignoring...")
				return nil
			}
			os.MkdirAll(args[0], 0755)
			os.Chdir(args[0])
		}

		if _, err := os.Stat(configFileName); os.IsExist(err) {
			fmt.Println("existing maelstrom config found, ignoring...")
			return nil
		}

		cfg := config.Default()
		if err := cfg.Save("config.toml"); err != nil {
			return fmt.Errorf("saving config: %w", err)
		}

		if _, err := os.Stat(keyringDirName); os.IsNotExist(err) {
			path := hd.CreateHDPath(sdk.CoinType, 0, 0).String()
			cdc := encoding.MakeConfig(app.ModuleEncodingRegisters...).Codec
			kr, err := keyring.New(app.Name, keyring.BackendTest, keyringDirName, nil, cdc)
			if err != nil {
				return err
			}
			mnemonic, _ := cmd.Flags().GetString("mnemonic")
			var record *keyring.Record
			if mnemonic == "" {
				record, mnemonic, err = kr.NewMnemonic(keyName, keyring.English, keyring.DefaultBIP39Passphrase, path, hd.Secp256k1)
				fmt.Printf("created new account with mnemonic: %s\n", mnemonic)
			} else {
				record, err = kr.NewAccount(keyName, mnemonic, keyring.DefaultBIP39Passphrase, path, hd.Secp256k1)
			}
			if err != nil {
				return err
			}
			addr, err := record.GetAddress()
			if err != nil {
				return err
			}
			fmt.Printf("created keyring with address: %s\n", addr)
		} else {
			fmt.Println("existing keyring found, ignoring...")
		}
		return nil
	},
}

func init() {
	initCmd.Flags().String("mnemonic", "", "Specify a mnemonic to create the keys from")
}
