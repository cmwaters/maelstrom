package client

import (
	"os"

	"github.com/BurntSushi/toml"
)

type Config struct {
	GRPCServerAddress string `toml:"grpc_server_address"`
}

func DefaultConfig() *Config {
	return &Config{
		GRPCServerAddress: "localhost:8080",
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
