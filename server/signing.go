package server

import (
	"bytes"
	"crypto/sha256"
	"encoding/binary"
)

func SubmitRequestSignOverData(namespace []byte, blobs [][]byte) []byte {
	buf := bytes.NewBuffer(namespace)
	hash := sha256.New()
	for _, b := range blobs {
		hash.Write(b)
	}
	_, _ = buf.Write(hash.Sum(nil))
	return buf.Bytes()
}

func CancelRequestSignOverData(signer string, txID uint64) []byte {
	buf := bytes.NewBufferString(signer)
	_, _ = buf.Write(binary.BigEndian.AppendUint64(nil, txID))
	return buf.Bytes()
}

func WithdrawRequestSignOverData(signer string, balance, amount, timestamp uint64) []byte {
	buf := bytes.NewBufferString(signer)
	_, _ = buf.Write(binary.BigEndian.AppendUint64(nil, balance))
	_, _ = buf.Write(binary.BigEndian.AppendUint64(nil, amount))
	_, _ = buf.Write(binary.BigEndian.AppendUint64(nil, timestamp))
	return buf.Bytes()
}
