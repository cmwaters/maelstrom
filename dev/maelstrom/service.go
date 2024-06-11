package maelstrom

import (
	"context"
	"path/filepath"
	"time"

	"github.com/celestiaorg/celestia-app/app"
	"github.com/celestiaorg/celestia-app/app/encoding"
	"github.com/cmwaters/apollo"
	"github.com/cmwaters/apollo/genesis"
	"github.com/cmwaters/apollo/node/consensus"
	"github.com/cmwaters/maelstrom/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tendermint/tendermint/types"
)

var (
	_     apollo.Service = (*Service)(nil)
	codec                = encoding.MakeConfig(app.ModuleEncodingRegisters...).Codec
)

const (
	Name             = "maelstrom"
	GRPCServerLabel  = "maelstrom-grpc"
	GRPCGatewayLabel = "maelstrom-gateway"
)

// New starts a new maelstrom apollo service.
// NOTE: the TimeoutCommit in the config should match that of the consensus node
func New(cfg *server.Config) *Service {
	return &Service{
		config: cfg,
		errCh:  make(chan error),
		doneCh: make(chan struct{}),
	}
}

type Service struct {
	config *server.Config
	server *server.Server
	ctx    context.Context
	cancel context.CancelFunc
	errCh  chan error
	doneCh chan struct{}
}

func (s *Service) Name() string {
	return Name
}

func (s *Service) EndpointsNeeded() []string {
	return []string{consensus.RPCEndpointLabel, consensus.GRPCEndpointLabel}
}

func (s *Service) EndpointsProvided() []string {
	return []string{GRPCServerLabel, GRPCGatewayLabel}
}

func (s *Service) Setup(_ context.Context, dir string, pendingGenesis *types.GenesisDoc) (genesis.Modifier, error) {
	s.config = s.config.WithDir(dir)
	addr, _, err := s.config.GenerateKey()
	if err != nil {
		return nil, err
	}

	if err := s.config.Save(filepath.Join(dir, "config.toml")); err != nil {
		return nil, err
	}

	// fund the account with 1000 TIA
	return genesis.FundAccounts(codec, []sdk.AccAddress{addr}, sdk.NewCoin(app.BondDenom, sdk.NewInt(1_000_000_000))), nil
}

func (s *Service) Start(ctx context.Context, dir string, _ *types.GenesisDoc, inputs apollo.Endpoints) (apollo.Endpoints, error) {
	var err error
	s.config, err = server.LoadConfig(filepath.Join(dir, "config.toml"))
	if err != nil {
		return nil, err
	}

	s.config.CelestiaRPCAddress = inputs[consensus.RPCEndpointLabel]
	s.config.CelestiaGRPCAddress = inputs[consensus.GRPCEndpointLabel]

	s.server, err = s.config.NewServer(ctx)
	if err != nil {
		return nil, err
	}

	s.doneCh = make(chan struct{})
	s.ctx, s.cancel = context.WithCancel(context.Background())
	s.errCh = make(chan error, 1)
	go func() {
		defer close(s.doneCh)
		s.errCh <- s.server.Serve(s.ctx)
	}()

	// listen for the next five seconds for any errors
	select {
	case <-time.After(5 * time.Second):
	case err := <-s.errCh:
		if err != nil {
			s.cancel()
			return nil, err
		}
	}

	return map[string]string{
		GRPCServerLabel:  s.config.GRPCServerAddress,
		GRPCGatewayLabel: s.config.GRPCGatewayAddress,
	}, nil
}

func (s *Service) Stop(ctx context.Context) error {
	// drain the error channel if there is a pending error
	select {
	case err := <-s.errCh:
		return err
	default:
	}

	if s.cancel == nil {
		return nil
	}
	s.cancel()

	select {
	case <-s.doneCh:
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}
