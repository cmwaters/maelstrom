package config

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/BurntSushi/toml"
	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/celestiaorg/celestia-app/pkg/user"
	client "github.com/cmwaters/maelstrom/client/go"
	"github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	"github.com/cmwaters/maelstrom/server"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Config struct {
	MaelstromServerAddress string `toml:"maelstrom_server_address"`
	CelestiaGRPCAddress    string `toml:"celestia_grpc_address"`
	KeyringDir             string `toml:"keyring_dir"`
	KeyName                string `toml:"key_name"`
}

func (cfg *Config) NewClient() (*client.Client, error) {
	cdc := encoding.MakeConfig(app.ModuleEncodingRegisters...)
	keys, err := keyring.New(cfg.KeyName, keyring.BackendTest, cfg.KeyringDir, nil, cdc.Codec)
	if err != nil {
		return nil, fmt.Errorf("failed to create new keyring: %w", err)
	}
	record, err := keys.Key(cfg.KeyName)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve key: %w", err)
	}
	address, err := record.GetAddress()
	if err != nil {
		return nil, fmt.Errorf("failed to get address from key record: %w", err)
	}
	conn, err := grpc.Dial(cfg.CelestiaGRPCAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, fmt.Errorf("failed to dial Celestia GRPC address: %w", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	signer, err := user.SetupSigner(ctx, keys, conn, address, cdc)
	if err != nil {
		return nil, fmt.Errorf("failed to setup signer: %w", err)
	}
	maelstromConn, err := grpc.Dial(cfg.MaelstromServerAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, fmt.Errorf("failed to dial Maelstrom server address: %w", err)
	}
	return client.New(keys, signer, maelstrom.NewMaelstromClient(maelstromConn))
}

func (cfg *Config) Address() (sdk.AccAddress, error) {
	cdc := encoding.MakeConfig(app.ModuleEncodingRegisters...)
	kr, err := keyring.New(cfg.KeyName, keyring.BackendTest, cfg.KeyringDir, nil, cdc.Codec)
	if err != nil {
		return nil, fmt.Errorf("failed to create new keyring: %w", err)
	}
	record, err := kr.Key(cfg.KeyName)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve key: %w", err)
	}
	address, err := record.GetAddress()
	if err != nil {
		return nil, fmt.Errorf("failed to get address from key record: %w", err)
	}
	return address, nil
}

func Default() *Config {
	serverCfg := server.DefaultConfig()
	return &Config{
		MaelstromServerAddress: serverCfg.GRPCServerAddress,
		CelestiaGRPCAddress:    serverCfg.CelestiaGRPCAddress,
		KeyringDir:             server.KeyringDirName,
		KeyName:                server.DefaultKeyName,
	}
}

func Load(file string) (*Config, error) {
	c := Default()
	_, err := toml.DecodeFile(file, c)
	return c, err
}

func (c *Config) Save(file string) error {
	f, err := os.Create(file)
	if err != nil {
		return err
	}
	defer f.Close()

	encoder := toml.NewEncoder(f)
	err = encoder.Encode(c)
	return err
}
