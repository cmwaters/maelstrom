package server

import (
	"bytes"
	"context"
	"errors"
	"fmt"

	"github.com/celestiaorg/celestia-app/pkg/appconsts"
	blob "github.com/celestiaorg/celestia-app/x/blob/types"
	"github.com/cmwaters/maelstrom/account"
	maelstrom "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	tmtypes "github.com/tendermint/tendermint/proto/tendermint/types"
	"github.com/tendermint/tendermint/types"
)

var _ maelstrom.CosmosServer = (*Server)(nil)

// BroadcastTx broadcast transaction.
func (s *Server) BroadcastTx(ctx context.Context, req *maelstrom.BroadcastTxRequest) (*maelstrom.BroadcastTxResponse, error) {
	if !s.isConnected.Load() {
		return nil, ErrServerNotReady
	}

	blobTx, isBlobTx := types.UnmarshalBlobTx(req.TxBytes)
	if !isBlobTx {
		return nil, errors.New("must be a blob tx")
	}

	rawTx, err := cdc.TxConfig.TxDecoder()(blobTx.Tx)
	if err != nil {
		return nil, fmt.Errorf("decoding tx: %w", err)
	}

	tx, ok := rawTx.(authsigning.Tx)
	if !ok {
		return nil, errors.New("must be an auth tx")
	}

	pfb, err := getPFB(tx)
	if err != nil {
		return nil, err
	}

	acc, err := s.getAccount(ctx, pfb.Signer)
	if err != nil {
		return nil, fmt.Errorf("getting account: %w", err)
	}

	if err := s.validatePFBSignature(tx, acc); err != nil {
		return nil, err
	}

	if err := blob.ValidateBlobs(blobTx.Blobs...); err != nil {
		return nil, fmt.Errorf("invalid blobs: %w", err)
	}

	namespace, ok := isSingleNamespace(blobTx.Blobs)
	if !ok {
		return nil, errors.New("multiple blobs must belong to the same namespace")
	}

	// ensure that the transaction pays at least the minimum fee
	gas := EstimateMinGas(getBlobSizes(blobTx.Blobs))
	fee := tx.GetFee().AmountOf(appconsts.BondDenom).Uint64()
	requiredPrice := uint64(float64(gas) * s.feeMonitor.GasPrice())
	if fee < requiredPrice {
		return nil, fmt.Errorf("minimum fee of %dutia required for this transaction", requiredPrice)
	}

	id, err := s.pool.Add(pfb.Signer, namespace, getBlobs(blobTx.Blobs), fee, gas, &maelstrom.Options{}, account.UpdateBalanceFn(pfb.Signer, fee, false))
	if err != nil {
		return nil, fmt.Errorf("adding to pool: %w", err)
	}

	return &maelstrom.BroadcastTxResponse{
		Id: uint64(id),
	}, nil
}

func getPFB(tx authsigning.Tx) (*blob.MsgPayForBlobs, error) {
	msgs := tx.GetMsgs()
	if len(msgs) != 1 {
		return nil, errors.New("must have exactly one message")
	}

	msg := msgs[0]
	pfb, ok := msg.(*blob.MsgPayForBlobs)
	if !ok {
		return nil, errors.New("must be a pay for blobs message")
	}
	return pfb, nil
}

func (s *Server) validatePFBSignature(tx authsigning.Tx, acc *account.Account) error {
	sigs, err := tx.GetSignaturesV2()
	if err != nil {
		return fmt.Errorf("unable to get signature: %w", err)
	}
	if len(sigs) != 1 {
		return errors.New("only a single signature is supported")
	}
	sig := sigs[0]

	signerData := authsigning.SignerData{
		Address:       tx.GetSigners()[0].String(),
		ChainID:       s.signer.ChainID(),
		AccountNumber: acc.AccountNumber,
		Sequence:      sig.Sequence,
		PubKey:        acc.PubKey,
	}
	err = authsigning.VerifySignature(acc.PubKey, signerData, sig.Data, cdc.TxConfig.SignModeHandler(), tx)
	if err != nil {
		return fmt.Errorf("invalid signature: %w", err)
	}
	return nil
}

func isSingleNamespace(blobs []*tmtypes.Blob) ([]byte, bool) {
	var namespace []byte
	for _, b := range blobs {
		if namespace == nil {
			namespace = b.NamespaceId
		}
		if !bytes.Equal(namespace, b.NamespaceId) {
			return nil, false
		}
	}
	return namespace, true
}

func getBlobSizes(blobs []*tmtypes.Blob) []uint32 {
	sizes := make([]uint32, len(blobs))
	for i, b := range blobs {
		sizes[i] = uint32(len(b.Data))
	}
	return sizes
}

func getBlobs(blobs []*tmtypes.Blob) [][]byte {
	output := make([][]byte, len(blobs))
	for idx, blob := range blobs {
		output[idx] = blob.Data
	}
	return output
}
