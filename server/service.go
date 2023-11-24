package server

import (
	"context"
	"errors"
	"fmt"
	"net"
	"time"

	"github.com/celestiaorg/celestia-app/pkg/user"
	"github.com/cmwaters/maelstrom/account"
	"github.com/cmwaters/maelstrom/node"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
	"github.com/cmwaters/maelstrom/tx"
	"github.com/dgraph-io/badger"
	"github.com/rs/zerolog"

	"github.com/tendermint/tendermint/rpc/client/http"
	"google.golang.org/grpc"
)

var _ maelstrom.BlobServer = (*Server)(nil)

func New(log zerolog.Logger, config *Config, pool *tx.Pool, store *account.Store, signer *user.Signer) *Server {
	return &Server{
		log:    log,
		config: config,
		pool:   pool,
		store:  store,
		signer: signer,
	}
}

type Server struct {
	log    zerolog.Logger
	config *Config
	pool   *tx.Pool
	store  *account.Store
	signer *user.Signer
	maelstrom.UnimplementedBlobServer
}

func (s *Server) Serve(ctx context.Context) error {
	client, err := http.New(s.config.CelestiaRPCAddress, "/websocket")
	if err != nil {
		return fmt.Errorf("failed to create client: %w", err)
	}
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	releaser := node.NewReleaser(client, 10*time.Second, s.broadcastTx)

	grpcServer := grpc.NewServer()
	maelstrom.RegisterBlobServer(grpcServer, s)
	listener, err := net.Listen("tcp", s.config.GRPCServerAddress)
	defer listener.Close()
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
		errCh <- node.Read(ctx, s.log, client, s.store)
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

func (s *Server) Info(ctx context.Context, req *maelstrom.InfoRequest) (*maelstrom.InfoResponse, error) {
	height, err := s.store.GetHeight()
	if err != nil {
		return nil, err
	}
	return &maelstrom.InfoResponse{
		Address: s.signer.Address().String(),
		Height:  uint64(height),
	}, nil
}

func (s *Server) Submit(ctx context.Context, req *maelstrom.SubmitRequest) (*maelstrom.SubmitResponse, error) {
	acc, err := s.store.GetAccount(req.Signer)
	if err != nil {
		return nil, err
	}
	msg := SubmitRequestSignOverData(req.Namespace, req.Blobs)
	if !acc.PubKey.VerifySignature(msg, req.Signature) {
		return nil, fmt.Errorf("invalid signature for signer %s", req.Signer)
	}

	if acc.Balance < req.Fee {
		return nil, fmt.Errorf("insufficient balance for signer %s, (have %d, require %d)", req.Signer, acc.Balance, req.Fee)
	}

	success, err := s.store.UpdateBalance(req.Signer, req.Fee, false)
	if err != nil {
		return nil, err
	}
	if !success {
		return nil, fmt.Errorf("%s has insufficient balance", req.Signer)
	}

	key, err := s.pool.Add(req.Signer, req.Namespace, req.Blobs, req.Fee, req.Options)
	if err != nil {
		return nil, err
	}

	return &maelstrom.SubmitResponse{Id: key}, nil
}

func (s *Server) Status(ctx context.Context, req *maelstrom.StatusRequest) (*maelstrom.StatusResponse, error) {
	t, err := s.pool.Get(req.Id)
	if t != nil {
		return &maelstrom.StatusResponse{
			Status:       maelstrom.StatusResponse_PENDING,
			InsertHeight: t.InsertHeight(),
			ExpiryHeight: t.InsertHeight() + t.TimeoutBlocks(),
		}, nil
	}
	if errors.Is(err, tx.ErrTxNotFound) {
		if s.pool.IsExpired(req.Id) {
			return &maelstrom.StatusResponse{
				Status: maelstrom.StatusResponse_EXPIRED,
			}, nil
		}
		t, err := s.pool.GetSuccessfulTx(req.Id)
		if errors.Is(err, badger.ErrKeyNotFound) {
			return &maelstrom.StatusResponse{
				Status:          maelstrom.StatusResponse_UNKNOWN,
				BlobCommitments: t.BlobCommitment,
				TxHash:          t.TxHash,
			}, nil
		}
	}
	return &maelstrom.StatusResponse{}, err
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
