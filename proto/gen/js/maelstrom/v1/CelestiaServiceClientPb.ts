/**
 * @fileoverview gRPC-Web generated client stub for maelstrom.v1
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v0.0.0
// source: maelstrom/v1/celestia.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as maelstrom_v1_celestia_pb from '../../maelstrom/v1/celestia_pb'; // proto import: "maelstrom/v1/celestia.proto"


export class CelestiaClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorBroadcastTx = new grpcWeb.MethodDescriptor(
    '/maelstrom.v1.Celestia/BroadcastTx',
    grpcWeb.MethodType.UNARY,
    maelstrom_v1_celestia_pb.BroadcastTxRequest,
    maelstrom_v1_celestia_pb.BroadcastTxResponse,
    (request: maelstrom_v1_celestia_pb.BroadcastTxRequest) => {
      return request.serializeBinary();
    },
    maelstrom_v1_celestia_pb.BroadcastTxResponse.deserializeBinary
  );

  broadcastTx(
    request: maelstrom_v1_celestia_pb.BroadcastTxRequest,
    metadata?: grpcWeb.Metadata | null): Promise<maelstrom_v1_celestia_pb.BroadcastTxResponse>;

  broadcastTx(
    request: maelstrom_v1_celestia_pb.BroadcastTxRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: maelstrom_v1_celestia_pb.BroadcastTxResponse) => void): grpcWeb.ClientReadableStream<maelstrom_v1_celestia_pb.BroadcastTxResponse>;

  broadcastTx(
    request: maelstrom_v1_celestia_pb.BroadcastTxRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: maelstrom_v1_celestia_pb.BroadcastTxResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/maelstrom.v1.Celestia/BroadcastTx',
        request,
        metadata || {},
        this.methodDescriptorBroadcastTx,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/maelstrom.v1.Celestia/BroadcastTx',
    request,
    metadata || {},
    this.methodDescriptorBroadcastTx);
  }

}

