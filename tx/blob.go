package tx

import (
	"bytes"
	"crypto/sha256"
	"encoding/binary"

	wire "github.com/cmwaters/maelstrom/proto/gen/go/maelstrom/v1"
)

type BlobID uint64

func (id BlobID) Bytes() []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(id))
	return b
}

func ToBlobIDs(ids []uint64) []BlobID {
	ids2 := make([]BlobID, len(ids))
	for i, id := range ids {
		ids2[i] = BlobID(id)
	}
	return ids2
}

func ToUint64s(ids []BlobID) []uint64 {
	ids2 := make([]uint64, len(ids))
	for i, id := range ids {
		ids2[i] = uint64(id)
	}
	return ids2
}

type Blob struct {
	id               BlobID
	hash             []byte
	signer           string
	namespace        []byte
	blobs            [][]byte
	fee              uint64
	estimatedGas     uint64
	insertHeight     uint64
	timeoutBlocks    uint64
	compact          bool
	namespaceVersion uint32
	shareVersion     uint32
}

// Hash is the sha256 of the signer, namespace, blobs and fee
// It is used to represent uniqueness of a transaction
func (b *Blob) Hash() []byte {
	if b.hash != nil {
		return b.hash
	}
	buf := bytes.NewBuffer(nil)
	buf.WriteString(b.signer)
	buf.Write(b.namespace)
	for _, b := range b.blobs {
		buf.Write(b)
	}
	bz := buf.Bytes()
	binary.BigEndian.PutUint64(bz, b.fee)
	hash := sha256.Sum256(bz)
	b.hash = hash[:]
	return b.hash
}

func (b *Blob) ID() BlobID {
	return b.id
}

func (b *Blob) Signer() string {
	return b.signer
}

func (b *Blob) Namespace() []byte {
	return b.namespace
}

func (b *Blob) Blobs() [][]byte {
	return b.blobs
}

func (b *Blob) Fee() uint64 {
	return b.fee
}

func (b *Blob) EstimatedGas() uint64 {
	return b.estimatedGas
}

func (b *Blob) InsertHeight() uint64 {
	return b.insertHeight
}

func (b *Blob) TimeoutBlocks() uint64 {
	return b.timeoutBlocks
}

func (b *Blob) ExpiryHeight() uint64 {
	return b.insertHeight + b.timeoutBlocks
}

func (b *Blob) Compact() bool {
	return b.compact
}

func (b *Blob) NamespaceVersion() uint32 {
	return b.namespaceVersion
}

func (b *Blob) ShareVersion() uint32 {
	return b.shareVersion
}

func (b *Blob) BlobMeta() *wire.BlobMeta {
	return NewBlobMeta(b.signer, b.fee)
}

//nolint:unused
func (b *Blob) priority() float64 {
	return float64(b.fee) / float64(b.estimatedGas)
}

func NewBlobMeta(signer string, fee uint64) *wire.BlobMeta {
	return &wire.BlobMeta{
		Signer: signer,
		Fee:    fee,
	}
}

func GetBlobIDs(blobs []*Blob) []BlobID {
	ids := make([]BlobID, len(blobs))
	for i, b := range blobs {
		ids[i] = b.id
	}
	return ids
}
