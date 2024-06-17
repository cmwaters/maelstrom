// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.4.0
// - protoc             (unknown)
// source: maelstrom/v1/server.proto

package maelstrom

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.62.0 or later.
const _ = grpc.SupportPackageIsVersion8

const (
	Maelstrom_Info_FullMethodName              = "/maelstrom.v1.Maelstrom/Info"
	Maelstrom_Submit_FullMethodName            = "/maelstrom.v1.Maelstrom/Submit"
	Maelstrom_Status_FullMethodName            = "/maelstrom.v1.Maelstrom/Status"
	Maelstrom_Balance_FullMethodName           = "/maelstrom.v1.Maelstrom/Balance"
	Maelstrom_Cancel_FullMethodName            = "/maelstrom.v1.Maelstrom/Cancel"
	Maelstrom_Withdraw_FullMethodName          = "/maelstrom.v1.Maelstrom/Withdraw"
	Maelstrom_PendingWithdrawal_FullMethodName = "/maelstrom.v1.Maelstrom/PendingWithdrawal"
	Maelstrom_BroadcastTx_FullMethodName       = "/maelstrom.v1.Maelstrom/BroadcastTx"
	Maelstrom_AccountInfo_FullMethodName       = "/maelstrom.v1.Maelstrom/AccountInfo"
)

// MaelstromClient is the client API for Maelstrom service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type MaelstromClient interface {
	// Info
	Info(ctx context.Context, in *InfoRequest, opts ...grpc.CallOption) (*InfoResponse, error)
	// Submit
	Submit(ctx context.Context, in *SubmitRequest, opts ...grpc.CallOption) (*SubmitResponse, error)
	// Status
	Status(ctx context.Context, in *StatusRequest, opts ...grpc.CallOption) (*StatusResponse, error)
	// Balance
	Balance(ctx context.Context, in *BalanceRequest, opts ...grpc.CallOption) (*BalanceResponse, error)
	// Cancel
	Cancel(ctx context.Context, in *CancelRequest, opts ...grpc.CallOption) (*CancelResponse, error)
	// Withdraw
	Withdraw(ctx context.Context, in *WithdrawRequest, opts ...grpc.CallOption) (*WithdrawResponse, error)
	// Pending Withdrawal
	PendingWithdrawal(ctx context.Context, in *PendingWithdrawalRequest, opts ...grpc.CallOption) (*PendingWithdrawalResponse, error)
	// BroadcastTx mimics the gRPC endpoint for the Cosmos SDK's tx service. This allows easier compatibility
	// for clients. They can simply redirect their endpoint to the Maelstrom service and continue submitting
	// BlobTxs. Maelstrom will decode them, verify the signer and signature, extract the blobs and aggregate
	// them with others, eventually submitting them to the main chain
	BroadcastTx(ctx context.Context, in *BroadcastTxRequest, opts ...grpc.CallOption) (*BroadcastTxResponse, error)
	// AccountInfo returns the sequence and account number of the account on Celestia.
	// It does this by proxying the request to the underlying consensus node.
	AccountInfo(ctx context.Context, in *AccountInfoRequest, opts ...grpc.CallOption) (*AccountInfoResponse, error)
}

type maelstromClient struct {
	cc grpc.ClientConnInterface
}

func NewMaelstromClient(cc grpc.ClientConnInterface) MaelstromClient {
	return &maelstromClient{cc}
}

func (c *maelstromClient) Info(ctx context.Context, in *InfoRequest, opts ...grpc.CallOption) (*InfoResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(InfoResponse)
	err := c.cc.Invoke(ctx, Maelstrom_Info_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maelstromClient) Submit(ctx context.Context, in *SubmitRequest, opts ...grpc.CallOption) (*SubmitResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(SubmitResponse)
	err := c.cc.Invoke(ctx, Maelstrom_Submit_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maelstromClient) Status(ctx context.Context, in *StatusRequest, opts ...grpc.CallOption) (*StatusResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(StatusResponse)
	err := c.cc.Invoke(ctx, Maelstrom_Status_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maelstromClient) Balance(ctx context.Context, in *BalanceRequest, opts ...grpc.CallOption) (*BalanceResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(BalanceResponse)
	err := c.cc.Invoke(ctx, Maelstrom_Balance_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maelstromClient) Cancel(ctx context.Context, in *CancelRequest, opts ...grpc.CallOption) (*CancelResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(CancelResponse)
	err := c.cc.Invoke(ctx, Maelstrom_Cancel_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maelstromClient) Withdraw(ctx context.Context, in *WithdrawRequest, opts ...grpc.CallOption) (*WithdrawResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(WithdrawResponse)
	err := c.cc.Invoke(ctx, Maelstrom_Withdraw_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maelstromClient) PendingWithdrawal(ctx context.Context, in *PendingWithdrawalRequest, opts ...grpc.CallOption) (*PendingWithdrawalResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(PendingWithdrawalResponse)
	err := c.cc.Invoke(ctx, Maelstrom_PendingWithdrawal_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maelstromClient) BroadcastTx(ctx context.Context, in *BroadcastTxRequest, opts ...grpc.CallOption) (*BroadcastTxResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(BroadcastTxResponse)
	err := c.cc.Invoke(ctx, Maelstrom_BroadcastTx_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maelstromClient) AccountInfo(ctx context.Context, in *AccountInfoRequest, opts ...grpc.CallOption) (*AccountInfoResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(AccountInfoResponse)
	err := c.cc.Invoke(ctx, Maelstrom_AccountInfo_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MaelstromServer is the server API for Maelstrom service.
// All implementations must embed UnimplementedMaelstromServer
// for forward compatibility
type MaelstromServer interface {
	// Info
	Info(context.Context, *InfoRequest) (*InfoResponse, error)
	// Submit
	Submit(context.Context, *SubmitRequest) (*SubmitResponse, error)
	// Status
	Status(context.Context, *StatusRequest) (*StatusResponse, error)
	// Balance
	Balance(context.Context, *BalanceRequest) (*BalanceResponse, error)
	// Cancel
	Cancel(context.Context, *CancelRequest) (*CancelResponse, error)
	// Withdraw
	Withdraw(context.Context, *WithdrawRequest) (*WithdrawResponse, error)
	// Pending Withdrawal
	PendingWithdrawal(context.Context, *PendingWithdrawalRequest) (*PendingWithdrawalResponse, error)
	// BroadcastTx mimics the gRPC endpoint for the Cosmos SDK's tx service. This allows easier compatibility
	// for clients. They can simply redirect their endpoint to the Maelstrom service and continue submitting
	// BlobTxs. Maelstrom will decode them, verify the signer and signature, extract the blobs and aggregate
	// them with others, eventually submitting them to the main chain
	BroadcastTx(context.Context, *BroadcastTxRequest) (*BroadcastTxResponse, error)
	// AccountInfo returns the sequence and account number of the account on Celestia.
	// It does this by proxying the request to the underlying consensus node.
	AccountInfo(context.Context, *AccountInfoRequest) (*AccountInfoResponse, error)
	mustEmbedUnimplementedMaelstromServer()
}

// UnimplementedMaelstromServer must be embedded to have forward compatible implementations.
type UnimplementedMaelstromServer struct {
}

func (UnimplementedMaelstromServer) Info(context.Context, *InfoRequest) (*InfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Info not implemented")
}
func (UnimplementedMaelstromServer) Submit(context.Context, *SubmitRequest) (*SubmitResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Submit not implemented")
}
func (UnimplementedMaelstromServer) Status(context.Context, *StatusRequest) (*StatusResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Status not implemented")
}
func (UnimplementedMaelstromServer) Balance(context.Context, *BalanceRequest) (*BalanceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Balance not implemented")
}
func (UnimplementedMaelstromServer) Cancel(context.Context, *CancelRequest) (*CancelResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Cancel not implemented")
}
func (UnimplementedMaelstromServer) Withdraw(context.Context, *WithdrawRequest) (*WithdrawResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Withdraw not implemented")
}
func (UnimplementedMaelstromServer) PendingWithdrawal(context.Context, *PendingWithdrawalRequest) (*PendingWithdrawalResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PendingWithdrawal not implemented")
}
func (UnimplementedMaelstromServer) BroadcastTx(context.Context, *BroadcastTxRequest) (*BroadcastTxResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method BroadcastTx not implemented")
}
func (UnimplementedMaelstromServer) AccountInfo(context.Context, *AccountInfoRequest) (*AccountInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AccountInfo not implemented")
}
func (UnimplementedMaelstromServer) mustEmbedUnimplementedMaelstromServer() {}

// UnsafeMaelstromServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MaelstromServer will
// result in compilation errors.
type UnsafeMaelstromServer interface {
	mustEmbedUnimplementedMaelstromServer()
}

func RegisterMaelstromServer(s grpc.ServiceRegistrar, srv MaelstromServer) {
	s.RegisterService(&Maelstrom_ServiceDesc, srv)
}

func _Maelstrom_Info_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(InfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).Info(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_Info_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).Info(ctx, req.(*InfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Maelstrom_Submit_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SubmitRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).Submit(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_Submit_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).Submit(ctx, req.(*SubmitRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Maelstrom_Status_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(StatusRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).Status(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_Status_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).Status(ctx, req.(*StatusRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Maelstrom_Balance_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BalanceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).Balance(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_Balance_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).Balance(ctx, req.(*BalanceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Maelstrom_Cancel_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CancelRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).Cancel(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_Cancel_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).Cancel(ctx, req.(*CancelRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Maelstrom_Withdraw_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WithdrawRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).Withdraw(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_Withdraw_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).Withdraw(ctx, req.(*WithdrawRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Maelstrom_PendingWithdrawal_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PendingWithdrawalRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).PendingWithdrawal(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_PendingWithdrawal_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).PendingWithdrawal(ctx, req.(*PendingWithdrawalRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Maelstrom_BroadcastTx_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BroadcastTxRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).BroadcastTx(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_BroadcastTx_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).BroadcastTx(ctx, req.(*BroadcastTxRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Maelstrom_AccountInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AccountInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaelstromServer).AccountInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Maelstrom_AccountInfo_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaelstromServer).AccountInfo(ctx, req.(*AccountInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Maelstrom_ServiceDesc is the grpc.ServiceDesc for Maelstrom service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Maelstrom_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "maelstrom.v1.Maelstrom",
	HandlerType: (*MaelstromServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Info",
			Handler:    _Maelstrom_Info_Handler,
		},
		{
			MethodName: "Submit",
			Handler:    _Maelstrom_Submit_Handler,
		},
		{
			MethodName: "Status",
			Handler:    _Maelstrom_Status_Handler,
		},
		{
			MethodName: "Balance",
			Handler:    _Maelstrom_Balance_Handler,
		},
		{
			MethodName: "Cancel",
			Handler:    _Maelstrom_Cancel_Handler,
		},
		{
			MethodName: "Withdraw",
			Handler:    _Maelstrom_Withdraw_Handler,
		},
		{
			MethodName: "PendingWithdrawal",
			Handler:    _Maelstrom_PendingWithdrawal_Handler,
		},
		{
			MethodName: "BroadcastTx",
			Handler:    _Maelstrom_BroadcastTx_Handler,
		},
		{
			MethodName: "AccountInfo",
			Handler:    _Maelstrom_AccountInfo_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "maelstrom/v1/server.proto",
}
