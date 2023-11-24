package tx

import (
	"bytes"
	"crypto/sha256"
	"encoding/binary"

	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
)

type Tx struct {
	key              uint64
	hash             []byte
	signer           string
	namespace        []byte
	blobs            [][]byte
	fee              uint64
	insertHeight     uint64
	timeoutBlocks    uint64
	compact          bool
	namespaceVersion uint32
	shareVersion     uint32
}

// Hash is the sha256 of the signer, namespace, blobs and fee
// It is used to represent uniqueness of a transaction
func (tx *Tx) Hash() []byte {
	if tx.hash != nil {
		return tx.hash
	}
	buf := bytes.NewBuffer(nil)
	buf.WriteString(tx.signer)
	buf.Write(tx.namespace)
	for _, b := range tx.blobs {
		buf.Write(b)
	}
	bz := buf.Bytes()
	binary.BigEndian.PutUint64(bz, tx.fee)
	hash := sha256.Sum256(bz)
	tx.hash = hash[:]
	return tx.hash
}

func (tx *Tx) Key() uint64 {
	return tx.key
}

func (tx *Tx) Signer() string {
	return tx.signer
}

func (tx *Tx) Namespace() []byte {
	return tx.namespace
}

func (tx *Tx) Blobs() [][]byte {
	return tx.blobs
}

func (tx *Tx) Fee() uint64 {
	return tx.fee
}

func (tx *Tx) InsertHeight() uint64 {
	return tx.insertHeight
}

func (tx *Tx) TimeoutBlocks() uint64 {
	return tx.timeoutBlocks
}

func (tx *Tx) Compact() bool {
	return tx.compact
}

func (tx *Tx) NamespaceVersion() uint32 {
	return tx.namespaceVersion
}

func (tx *Tx) ShareVersion() uint32 {
	return tx.shareVersion
}

func (tx *Tx) ToPendingTx() *wire.PendingTx {
	return NewPendingTx(tx.signer, tx.fee)
}

func NewPendingTx(signer string, fee uint64) *wire.PendingTx {
	return &wire.PendingTx{
		Signer: signer,
		Fee:    fee,
	}
}

func NewSuccesfulTx(txHash, blobCommitment []byte) *wire.SuccessfulTx {
	return &wire.SuccessfulTx{
		TxHash:         txHash,
		BlobCommitment: blobCommitment,
	}
}
