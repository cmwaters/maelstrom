package server

import (
	"context"
	"errors"
	"fmt"
	"net"
	"time"

	"github.com/celestiaorg/celestia-app/pkg/appconsts"
	"github.com/celestiaorg/celestia-app/pkg/namespace"
	"github.com/celestiaorg/celestia-app/pkg/user"
	blobtypes "github.com/celestiaorg/celestia-app/x/blob/types"
	"github.com/cmwaters/maelstrom/account"
	"github.com/cmwaters/maelstrom/node"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/cmwaters/maelstrom/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	auth "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/rs/zerolog"

	"github.com/tendermint/tendermint/rpc/client/http"
	"google.golang.org/grpc"
)

var _ maelstrom.BlobServer = (*Server)(nil)

func New(
	log zerolog.Logger,
	config *Config,
	pool *tx.Pool,
	store *account.Store,
	signer *user.Signer,
	accountRetriever *account.Querier,
	feeMonitor *node.FeeMonitor,
) *Server {
	return &Server{
		log:              log,
		config:           config,
		pool:             pool,
		store:            store,
		signer:           signer,
		accountRetriever: accountRetriever,
		feeMonitor:       feeMonitor,
	}
}

type Server struct {
	log              zerolog.Logger
	config           *Config
	pool             *tx.Pool
	store            *account.Store
	signer           *user.Signer
	accountRetriever *account.Querier
	feeMonitor       *node.FeeMonitor
	maelstrom.UnimplementedBlobServer
}

func (s *Server) Serve(ctx context.Context) error {
	client, err := http.New(s.config.CelestiaRPCAddress, "/websocket")
	if err != nil {
		return fmt.Errorf("failed to create client: %w", err)
	}
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	releaser := node.NewReleaser(client, s.config.TimeoutCommit-time.Second, s.broadcastTx)

	grpcServer := grpc.NewServer()
	maelstrom.RegisterBlobServer(grpcServer, s)
	listener, err := net.Listen("tcp", s.config.GRPCServerAddress)
	defer func() {
		err := listener.Close()
		if err != nil {
			s.log.Error().Err(err).Msg("failed to close listener")
		}
	}()
	if err != nil {
		return fmt.Errorf("failed to setup listener: %w", err)
	}

	threads := 3
	errCh := make(chan error, threads)

	go func() {
		<-ctx.Done()
		grpcServer.GracefulStop()
	}()
	go func() {
		s.log.Info().Str("address", s.config.GRPCServerAddress).Msg("starting gRPC server")
		errCh <- grpcServer.Serve(listener)
	}()
	go func() {
		errCh <- node.Read(ctx, s.log, client, s.store, s.pool)
	}()
	go func() {
		s.log.Info().Msg("starting releaser")
		errCh <- releaser.Start(ctx)
	}()

	var firstErr error
	for i := 0; i < threads; i++ {
		err := <-errCh
		if err != nil && firstErr == nil {
			firstErr = err
			cancel()
		} else if !errors.Is(err, context.Canceled) {
			s.log.Error().Err(err).Msg("shutting down")
		}
	}
	return firstErr
}

func (s *Server) Wait() {
	initialHeight := s.store.GetHeight()
	ticker := time.NewTicker(100 * time.Millisecond)
	for {
		select {
		case <-ticker.C:
			newHeight := s.store.GetHeight()
			if newHeight > initialHeight {
				return
			}
		}
	}
}

func (s *Server) Info(ctx context.Context, req *maelstrom.InfoRequest) (*maelstrom.InfoResponse, error) {
	return &maelstrom.InfoResponse{
		Address: s.signer.Address().String(),
		Height:  s.store.GetHeight(),
	}, nil
}

func (s *Server) Submit(ctx context.Context, req *maelstrom.SubmitRequest) (*maelstrom.SubmitResponse, error) {
	if err := validateSubmitRequest(req); err != nil {
		return nil, err
	}

	acc, err := s.store.GetAccount(req.Signer)
	if err != nil {
		return nil, err
	}

	// ensure that the transaction pays at least the minimum fee
	gas := EstimateMinGas(req.Blobs)
	requiredPrice := uint64(float64(gas) * s.feeMonitor.GasPrice())
	if req.Fee < requiredPrice {
		return nil, fmt.Errorf("minimum fee of %dutia required for this transaction", requiredPrice)
	}

	// If the public key is not present, we need to retrieve it from the chain
	// and update the account store.
	if acc.PubKey == nil {
		pk, err := s.accountRetriever.GetPubKey(ctx, req.Signer)
		if err != nil {
			return nil, fmt.Errorf("failed to get pubkey for signer %s: %w", req.Signer, err)
		}
		acc.PubKey = pk
		if err := s.store.SetAccount(req.Signer, acc); err != nil {
			return nil, fmt.Errorf("failed to set account for signer %s: %w", req.Signer, err)
		}
	}
	msg := SubmitRequestSignOverData(req.Namespace, req.Blobs)
	if !acc.PubKey.VerifySignature(msg, req.Signature) {
		return nil, fmt.Errorf("invalid signature for signer %s", req.Signer)
	}

	if acc.Balance < req.Fee {
		return nil, fmt.Errorf("insufficient balance for signer %s, (have %d, require %d)", req.Signer, acc.Balance, req.Fee)
	}

	key, err := s.pool.Add(req.Signer, req.Namespace[1:], req.Blobs, req.Fee, gas, req.Options, account.UpdateBalanceFn(req.Signer, req.Fee, false))
	if err != nil {
		return nil, err
	}

	return &maelstrom.SubmitResponse{Id: uint64(key)}, nil
}

func (s *Server) Status(ctx context.Context, req *maelstrom.StatusRequest) (*maelstrom.StatusResponse, error) {
	status := s.pool.Status(tx.ID(req.Id))
	return status, nil
}

func (s *Server) Balance(ctx context.Context, req *maelstrom.BalanceRequest) (*maelstrom.BalanceResponse, error) {
	acc, err := s.store.GetAccount(req.Address)
	if err != nil {
		return nil, err
	}
	return &maelstrom.BalanceResponse{
		Balance: acc.Balance,
	}, nil
}

func (s *Server) Deposit(ctx context.Context, req *maelstrom.DepositRequest) (*maelstrom.DepositResponse, error) {
	// TODO: Implement
	return &maelstrom.DepositResponse{}, nil
}

func (s *Server) Withdraw(ctx context.Context, req *maelstrom.WithdrawRequest) (*maelstrom.WithdrawResponse, error) {
	// TODO: Implement
	return &maelstrom.WithdrawResponse{}, nil
}

func (s *Server) WithdrawAll(ctx context.Context, req *maelstrom.WithdrawAllRequest) (*maelstrom.WithdrawAllResponse, error) {
	// TODO: Implement
	return &maelstrom.WithdrawAllResponse{}, nil
}

func totalBlobSize(blobs [][]byte) []uint32 {
	size := make([]uint32, len(blobs))
	for i, b := range blobs {
		size[i] = uint32(len(b))
	}
	return size
}

func EstimateMinGas(blobs [][]byte) uint64 {
	gas := blobtypes.GasToConsume(totalBlobSize(blobs), appconsts.DefaultGasPerBlobByte)
	gas += blobtypes.BytesPerBlobInfo * auth.DefaultTxSizeCostPerByte * uint64(len(blobs))
	return gas
}

func validateSubmitRequest(req *maelstrom.SubmitRequest) error {
	// check that the namespace is valid
	_, err := namespace.From(req.Namespace)
	if err != nil {
		return fmt.Errorf("invalid namespace: %w", err)
	}

	if len(req.Blobs) == 0 {
		return errors.New("no blobs provided")
	}

	if len(req.Signature) == 0 {
		return errors.New("no signature provided")
	}

	for idx, blob := range req.Blobs {
		if len(blob) == 0 {
			return fmt.Errorf("blob %d contains no data", idx)
		}
	}

	_, err = sdk.AccAddressFromBech32(req.Signer)
	return err
}
