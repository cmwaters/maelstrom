package server

import (
	"os"

	"github.com/BurntSushi/toml"
)

type Config struct {
	GRPCServerAddress   string `toml:"grpc_server_address"`
	CelestiaRPCAddress  string `toml:"celestia_rpc_address"`
	CelestiaGRPCAddress string `toml:"celestia_grpc_address"`
}

func DefaultConfig() *Config {
	return &Config{
		GRPCServerAddress:   "0.0.0.0:8080",
		CelestiaRPCAddress:  "127.0.0.1:26657",
		CelestiaGRPCAddress: "localhost:9090",
	}
}

func LoadConfig(file string) (*Config, error) {
	c := DefaultConfig()
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
