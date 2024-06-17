package server

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"time"

	"github.com/celestiaorg/celestia-app/pkg/user"
	"github.com/cmwaters/maelstrom/account"
	"github.com/cmwaters/maelstrom/node"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	rpc "github.com/tendermint/tendermint/rpc/client/http"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/proto"
)

func (s *Server) Serve(ctx context.Context) error {
	client, err := rpc.New(s.config.CelestiaRPCAddress, "/websocket")
	if err != nil {
		return fmt.Errorf("failed to create rpc client: %w", err)
	}
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	nodeGRPC, err := grpc.Dial(s.config.CelestiaGRPCAddress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return err
	}

	s.conn = nodeGRPC
	s.accountRetriever = account.NewQuerier(nodeGRPC)
	s.feeMonitor, err = node.NewFeeMonitor(ctx, nodeGRPC)
	if err != nil {
		return err
	}
	s.signer, err = user.SetupSigner(ctx, s.keys, nodeGRPC, s.address, cdc)
	if err != nil {
		return fmt.Errorf("failed to setup signer: %w", err)
	}

	releaser := node.NewReleaser(client, s.config.TimeoutCommit-time.Second, s.broadcastTx)

	grpcServer := grpc.NewServer()
	maelstrom.RegisterMaelstromServer(grpcServer, s)
	grpcGatewayMux := runtime.NewServeMux(runtime.WithForwardResponseOption(func(ctx context.Context, w http.
		ResponseWriter, resp proto.Message) error {
		// Enable CORs. This allows browser clients to make requests to the maelstrom server
		enableCORS(w)
		return nil
	}))
	// we need to also handle OPTIONS HTTP requests as it's common for browsers to send them as preflight
	// messages prior to calling a POST request.
	grpcGatewayMux.Handle("OPTIONS", pattern_Maelstrom_BroadcastTx_0, func(w http.ResponseWriter, r *http.Request, _ map[string]string) {
		enableCORS(w)
		w.WriteHeader(http.StatusOK)
	})
	opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	if err := maelstrom.RegisterMaelstromHandlerFromEndpoint(ctx, grpcGatewayMux, s.config.GRPCServerAddress,
		opts); err != nil {
		return fmt.Errorf("error registering grpc endpoint: %w", err)
	}

	grpcGatewayServer := &http.Server{
		Addr:    s.config.GRPCGatewayAddress,
		Handler: grpcGatewayMux,
	}

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

	threads := 6
	errCh := make(chan error, threads)
	go func() {
		<-ctx.Done()
		grpcServer.GracefulStop()
		errCh <- grpcGatewayServer.Shutdown(context.Background())
	}()
	go func() {
		s.log.Info().Str("address", s.config.GRPCServerAddress).Msg("starting gRPC server")
		errCh <- grpcServer.Serve(listener)
		s.log.Info().Str("address", s.config.GRPCServerAddress).Msg("stopped gRPC server")
	}()
	go func() {
		errCh <- node.Read(ctx, s.log, client, s.store, s.pool)
		s.log.Info().Msg("stopped reader")
	}()
	go func() {
		s.log.Info().Msg("starting releaser")
		errCh <- releaser.Start(ctx)
		s.log.Info().Msg("stopped releaser")
	}()
	go func() {
		s.log.Info().Str("address", s.config.GRPCGatewayAddress).Msg("starting gRPC gateway server")
		errCh <- grpcGatewayServer.ListenAndServe()
		s.log.Info().Str("address", s.config.GRPCGatewayAddress).Msg("stopped gRPC gateway server")
	}()
	go func() {
		if err := s.waitUntilSynced(ctx, client); err != nil {
			errCh <- err
			return
		}
		s.isConnected.Store(true)
		s.log.Info().Msg("finished syncing to the head of the network")
		errCh <- nil
	}()

	var firstErr error
	for i := 0; i < threads; i++ {
		err := <-errCh
		fmt.Println("i", i, "err", err)
		if err != nil && firstErr == nil {
			firstErr = err
			cancel()
		} else if err != nil && !errors.Is(err, context.Canceled) {
			// the following errors have been non nil
			s.log.Error().Err(err).Msg("while shutting down")
		}
	}
	fmt.Println("returning first error", firstErr)
	return firstErr
}

func (s *Server) waitUntilSynced(ctx context.Context, client *rpc.HTTP) error {
	var (
		networkHeight int64
		storeHeight         = int64(s.store.GetHeight())
		ticker              = time.NewTicker(time.Second)
		tolerance     int64 = 5 // we consider synced as within 5 heights
		lastTimestamp       = time.Now()
	)
	for {
		if networkHeight == 0 || networkHeight-tolerance < storeHeight {
			status, err := client.Status(ctx)
			if err != nil {
				return err
			}
			networkHeight = status.SyncInfo.LatestBlockHeight
			if networkHeight-tolerance < storeHeight {
				// we are synced!
				return nil
			}
		}

		// periodically update the store height
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-ticker.C:
			newStoreHeight := int64(s.store.GetHeight())
			// check that we are still making progress
			if newStoreHeight == storeHeight {
				if time.Since(lastTimestamp) > 30*time.Second {
					return fmt.Errorf("store height did not increase in 30 seconds; stuck at height %d", storeHeight)
				}
				continue
			}
			// increase in height
			lastTimestamp = time.Now()
			storeHeight = newStoreHeight
		}
	}
}

func (s *Server) WaitUntilReady(ctx context.Context) error {
	if s.isConnected.Load() {
		return nil
	}
	ticker := time.NewTicker(100 * time.Millisecond)
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()

		case <-ticker.C:
			if s.isConnected.Load() {
				return nil
			}
		}
	}
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

var (
	pattern_Maelstrom_BroadcastTx_0 = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 2, 1, 2, 2, 2, 3}, []string{"cosmos", "tx", "v1beta1", "txs"}, ""))
)
