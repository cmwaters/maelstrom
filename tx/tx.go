package tx

import (
	"bytes"
	"crypto/sha256"
	"encoding/binary"

	wire "github.com/cmwaters/maelstrom/proto/gen/maelstrom/v1"
)

type ID uint64

func (id ID) Bytes() []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(id))
	return b
}

func ToIDs(ids []uint64) []ID {
	ids2 := make([]ID, len(ids))
	for i, id := range ids {
		ids2[i] = ID(id)
	}
	return ids2
}

type Tx struct {
	id               ID
	hash             []byte
	signer           string
	namespace        []byte
	blobs            [][]byte
	fee              uint64
	estimatedGas     uint64
	insertHeight     Height
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

func (tx *Tx) ID() ID {
	return tx.id
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

func (tx *Tx) EstimatedGas() uint64 {
	return tx.estimatedGas
}

func (tx *Tx) InsertHeight() Height {
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

func (tx *Tx) ToPendingTx() *wire.Tx {
	return NewPendingTx(tx.signer, tx.fee)
}

//nolint:unused
func (tx *Tx) priority() float64 {
	return float64(tx.fee) / float64(tx.estimatedGas)
}

func NewPendingTx(signer string, fee uint64) *wire.Tx {
	return &wire.Tx{
		Signer: signer,
		Fee:    fee,
	}
}

func GetIDs(txs []*Tx) []ID {
	ids := make([]ID, len(txs))
	for i, tx := range txs {
		ids[i] = tx.id
	}
	return ids
}
