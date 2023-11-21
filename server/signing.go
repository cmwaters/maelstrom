package server

import (
	"bytes"
	"crypto/sha256"
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
