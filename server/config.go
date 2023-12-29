package server

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/BurntSushi/toml"
	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/celestiaorg/celestia-app/pkg/appconsts"
	"github.com/celestiaorg/celestia-app/pkg/user"
	"github.com/cmwaters/maelstrom/account"
	"github.com/cmwaters/maelstrom/node"
	"github.com/cmwaters/maelstrom/tx"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/dgraph-io/badger"
	"github.com/rs/zerolog"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const (
	ConfigFileName = "config.toml"
	KeyringDirName = "keys"
	DefaultKeyName = StoreName
	StoreName      = "maelstrom"
)

var (
	cdc = encoding.MakeConfig(app.ModuleEncodingRegisters...)
)

type Config struct {
	dir                 string
	GRPCServerAddress   string `toml:"grpc_server_address"`
	CelestiaRPCAddress  string `toml:"celestia_rpc_address"`
	CelestiaGRPCAddress string `toml:"celestia_grpc_address"`
	keyring             keyring.Keyring
	KeyringName         string        `toml:"keyring_name"`
	TimeoutCommit       time.Duration `toml:"timeout_commit"`
}

func DefaultConfig() *Config {
	return &Config{
		GRPCServerAddress:   "0.0.0.0:8080",
		CelestiaRPCAddress:  "http://127.0.0.1:26657",
		CelestiaGRPCAddress: "localhost:9090",
		KeyringName:         DefaultKeyName,
		TimeoutCommit:       appconsts.TimeoutCommit,
	}
}

func LoadConfig(path string) (*Config, error) {
	c := DefaultConfig()
	_, err := toml.DecodeFile(path, c)
	c.dir = filepath.Dir(path)
	return c, err
}

func (c *Config) Save(path string) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()

	encoder := toml.NewEncoder(f)
	err = encoder.Encode(c)
	return err
}

func (cfg *Config) HomeDir() string {
	return cfg.dir
}

func (cfg *Config) StoreDir() string {
	return filepath.Join(cfg.dir, StoreName)
}

func (cfg *Config) KeyringDir() string {
	return filepath.Join(cfg.dir, KeyringDirName)
}

func (cfg *Config) WithDir(dir string) *Config {
	cfg.dir = dir
	return cfg
}

func (cfg *Config) WithKeyring(kr keyring.Keyring) *Config {
	cfg.keyring = kr
	return cfg
}

func (cfg *Config) NewServer(ctx context.Context) (*Server, error) {
	kr, err := cfg.Keyring()
	if err != nil {
		return nil, err
	}

	record, err := kr.Key(cfg.KeyringName)
	if err != nil {
		return nil, err
	}

	address, err := record.GetAddress()
	if err != nil {
		return nil, err
	}

	grpcConn, err := grpc.Dial(cfg.CelestiaGRPCAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, err
	}

	signer, err := user.SetupSigner(ctx, kr, grpcConn, address, cdc)
	if err != nil {
		return nil, fmt.Errorf("failed to setup signer: %w", err)
	}

	logger := zerolog.New(os.Stdout).With().Timestamp().Logger()

	opts := badger.DefaultOptions(cfg.StoreDir())
	opts.Logger = nil // Suppress the logs from badger
	db, err := badger.Open(opts)
	if err != nil {
		return nil, err
	}

	accountStore, err := account.NewStore(db, signer.PubKey())
	if err != nil {
		return nil, err
	}

	txPool, err := tx.NewPool(db, accountStore.GetHeight())
	if err != nil {
		return nil, err
	}

	accountRetriever := account.NewQuerier(grpcConn)
	feeMonitor, err := node.NewFeeMonitor(ctx, grpcConn)
	if err != nil {
		return nil, err
	}

	return New(logger, cfg, txPool, accountStore, signer, accountRetriever, feeMonitor), nil
}

func (cfg *Config) ImportKey(mnemonic string) (sdk.AccAddress, error) {
	kr, err := cfg.Keyring()
	if err != nil {
		return nil, err
	}
	path := hd.CreateHDPath(sdk.CoinType, 0, 0).String()
	record, err := kr.NewAccount(cfg.KeyringName, mnemonic, keyring.DefaultBIP39Passphrase, path, hd.Secp256k1)
	if err != nil {
		return nil, err
	}
	return record.GetAddress()
}

func (cfg *Config) GenerateKey() (sdk.AccAddress, string, error) {
	kr, err := cfg.Keyring()
	if err != nil {
		return nil, "", err
	}
	path := hd.CreateHDPath(sdk.CoinType, 0, 0).String()
	record, mnemonic, err := kr.NewMnemonic(cfg.KeyringName, keyring.English, keyring.DefaultBIP39Passphrase, path, hd.Secp256k1)
	if err != nil {
		return nil, "", err
	}
	addr, err := record.GetAddress()
	if err != nil {
		return nil, "", err
	}
	return addr, mnemonic, nil
}

func (cfg *Config) Keyring() (keyring.Keyring, error) {
	if cfg.keyring != nil {
		return cfg.keyring, nil
	}

	fmt.Println(cfg.KeyringDir())
	kr, err := keyring.New(app.Name, keyring.BackendTest, cfg.KeyringDir(), nil, cdc.Codec)
	if err != nil {
		return nil, err
	}
	cfg.keyring = kr
	return kr, nil
}
