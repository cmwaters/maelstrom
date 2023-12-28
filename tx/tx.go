package tx

import (
	"crypto/sha256"
	"fmt"
)

// ID is the sha256 hash of the raw tx that is submitted
// and committed in a block. In the case of a blob tx, the
// pfb tx is used
type TxID string

func GetTxID(tx []byte) TxID {
	return TxID(Hash(tx))
}

func Hash(b []byte) []byte {
	hash := sha256.Sum256(b)
	return hash[:]
}

func (id TxID) Bytes() []byte {
	return []byte(id)
}

func (id TxID) HEX() string {
	return fmt.Sprintf("%X", id)
}
