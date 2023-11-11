// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        (unknown)
// source: maelstrom/v1/wire.proto

package maelstrom

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Account struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Balance uint64 `protobuf:"varint,1,opt,name=balance,proto3" json:"balance,omitempty"`
	PubKey  []byte `protobuf:"bytes,2,opt,name=pub_key,json=pubKey,proto3" json:"pub_key,omitempty"`
}

func (x *Account) Reset() {
	*x = Account{}
	if protoimpl.UnsafeEnabled {
		mi := &file_maelstrom_v1_wire_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Account) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Account) ProtoMessage() {}

func (x *Account) ProtoReflect() protoreflect.Message {
	mi := &file_maelstrom_v1_wire_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Account.ProtoReflect.Descriptor instead.
func (*Account) Descriptor() ([]byte, []int) {
	return file_maelstrom_v1_wire_proto_rawDescGZIP(), []int{0}
}

func (x *Account) GetBalance() uint64 {
	if x != nil {
		return x.Balance
	}
	return 0
}

func (x *Account) GetPubKey() []byte {
	if x != nil {
		return x.PubKey
	}
	return nil
}

type PendingTx struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Signer string `protobuf:"bytes,1,opt,name=signer,proto3" json:"signer,omitempty"`
	Fee    uint64 `protobuf:"varint,2,opt,name=fee,proto3" json:"fee,omitempty"`
}

func (x *PendingTx) Reset() {
	*x = PendingTx{}
	if protoimpl.UnsafeEnabled {
		mi := &file_maelstrom_v1_wire_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PendingTx) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PendingTx) ProtoMessage() {}

func (x *PendingTx) ProtoReflect() protoreflect.Message {
	mi := &file_maelstrom_v1_wire_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PendingTx.ProtoReflect.Descriptor instead.
func (*PendingTx) Descriptor() ([]byte, []int) {
	return file_maelstrom_v1_wire_proto_rawDescGZIP(), []int{1}
}

func (x *PendingTx) GetSigner() string {
	if x != nil {
		return x.Signer
	}
	return ""
}

func (x *PendingTx) GetFee() uint64 {
	if x != nil {
		return x.Fee
	}
	return 0
}

type SuccessfulTx struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	TxHash         []byte `protobuf:"bytes,1,opt,name=tx_hash,json=txHash,proto3" json:"tx_hash,omitempty"`
	BlobCommitment []byte `protobuf:"bytes,2,opt,name=blob_commitment,json=blobCommitment,proto3" json:"blob_commitment,omitempty"`
}

func (x *SuccessfulTx) Reset() {
	*x = SuccessfulTx{}
	if protoimpl.UnsafeEnabled {
		mi := &file_maelstrom_v1_wire_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SuccessfulTx) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SuccessfulTx) ProtoMessage() {}

func (x *SuccessfulTx) ProtoReflect() protoreflect.Message {
	mi := &file_maelstrom_v1_wire_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SuccessfulTx.ProtoReflect.Descriptor instead.
func (*SuccessfulTx) Descriptor() ([]byte, []int) {
	return file_maelstrom_v1_wire_proto_rawDescGZIP(), []int{2}
}

func (x *SuccessfulTx) GetTxHash() []byte {
	if x != nil {
		return x.TxHash
	}
	return nil
}

func (x *SuccessfulTx) GetBlobCommitment() []byte {
	if x != nil {
		return x.BlobCommitment
	}
	return nil
}

var File_maelstrom_v1_wire_proto protoreflect.FileDescriptor

var file_maelstrom_v1_wire_proto_rawDesc = []byte{
	0x0a, 0x17, 0x6d, 0x61, 0x65, 0x6c, 0x73, 0x74, 0x72, 0x6f, 0x6d, 0x2f, 0x76, 0x31, 0x2f, 0x77,
	0x69, 0x72, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0c, 0x6d, 0x61, 0x65, 0x6c, 0x73,
	0x74, 0x72, 0x6f, 0x6d, 0x2e, 0x76, 0x31, 0x22, 0x3c, 0x0a, 0x07, 0x41, 0x63, 0x63, 0x6f, 0x75,
	0x6e, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x62, 0x61, 0x6c, 0x61, 0x6e, 0x63, 0x65, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x04, 0x52, 0x07, 0x62, 0x61, 0x6c, 0x61, 0x6e, 0x63, 0x65, 0x12, 0x17, 0x0a, 0x07,
	0x70, 0x75, 0x62, 0x5f, 0x6b, 0x65, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x06, 0x70,
	0x75, 0x62, 0x4b, 0x65, 0x79, 0x22, 0x35, 0x0a, 0x09, 0x50, 0x65, 0x6e, 0x64, 0x69, 0x6e, 0x67,
	0x54, 0x78, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x69, 0x67, 0x6e, 0x65, 0x72, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x06, 0x73, 0x69, 0x67, 0x6e, 0x65, 0x72, 0x12, 0x10, 0x0a, 0x03, 0x66, 0x65,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x04, 0x52, 0x03, 0x66, 0x65, 0x65, 0x22, 0x50, 0x0a, 0x0c,
	0x53, 0x75, 0x63, 0x63, 0x65, 0x73, 0x73, 0x66, 0x75, 0x6c, 0x54, 0x78, 0x12, 0x17, 0x0a, 0x07,
	0x74, 0x78, 0x5f, 0x68, 0x61, 0x73, 0x68, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x06, 0x74,
	0x78, 0x48, 0x61, 0x73, 0x68, 0x12, 0x27, 0x0a, 0x0f, 0x62, 0x6c, 0x6f, 0x62, 0x5f, 0x63, 0x6f,
	0x6d, 0x6d, 0x69, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x0e,
	0x62, 0x6c, 0x6f, 0x62, 0x43, 0x6f, 0x6d, 0x6d, 0x69, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x42, 0x1f,
	0x5a, 0x1d, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x63, 0x6d, 0x77,
	0x61, 0x74, 0x65, 0x72, 0x73, 0x2f, 0x6d, 0x61, 0x65, 0x6c, 0x73, 0x74, 0x72, 0x6f, 0x6d, 0x62,
	0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_maelstrom_v1_wire_proto_rawDescOnce sync.Once
	file_maelstrom_v1_wire_proto_rawDescData = file_maelstrom_v1_wire_proto_rawDesc
)

func file_maelstrom_v1_wire_proto_rawDescGZIP() []byte {
	file_maelstrom_v1_wire_proto_rawDescOnce.Do(func() {
		file_maelstrom_v1_wire_proto_rawDescData = protoimpl.X.CompressGZIP(file_maelstrom_v1_wire_proto_rawDescData)
	})
	return file_maelstrom_v1_wire_proto_rawDescData
}

var file_maelstrom_v1_wire_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_maelstrom_v1_wire_proto_goTypes = []interface{}{
	(*Account)(nil),      // 0: maelstrom.v1.Account
	(*PendingTx)(nil),    // 1: maelstrom.v1.PendingTx
	(*SuccessfulTx)(nil), // 2: maelstrom.v1.SuccessfulTx
}
var file_maelstrom_v1_wire_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_maelstrom_v1_wire_proto_init() }
func file_maelstrom_v1_wire_proto_init() {
	if File_maelstrom_v1_wire_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_maelstrom_v1_wire_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Account); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_maelstrom_v1_wire_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PendingTx); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_maelstrom_v1_wire_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SuccessfulTx); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_maelstrom_v1_wire_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_maelstrom_v1_wire_proto_goTypes,
		DependencyIndexes: file_maelstrom_v1_wire_proto_depIdxs,
		MessageInfos:      file_maelstrom_v1_wire_proto_msgTypes,
	}.Build()
	File_maelstrom_v1_wire_proto = out.File
	file_maelstrom_v1_wire_proto_rawDesc = nil
	file_maelstrom_v1_wire_proto_goTypes = nil
	file_maelstrom_v1_wire_proto_depIdxs = nil
}
