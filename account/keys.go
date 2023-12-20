package account

const (
	// account keys
	heightPrefix   = byte(0x00)
	accountPrefix  = byte(0x01)
	selfAccountKey = byte(0x02)
)

func HeightKey() []byte {
	return []byte{heightPrefix}
}

func AccountKey(address string) []byte {
	return append([]byte{accountPrefix}, []byte(address)...)
}

func MyAccountKey() []byte {
	return []byte{selfAccountKey}
}
