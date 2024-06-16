import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../google/api/annotations_pb'; // proto import: "google/api/annotations.proto"
import * as cosmos_base_abci_v1beta1_abci_pb from '../../cosmos/base/abci/v1beta1/abci_pb'; // proto import: "cosmos/base/abci/v1beta1/abci.proto"


export class InfoRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InfoRequest): InfoRequest.AsObject;
  static serializeBinaryToWriter(message: InfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InfoRequest;
  static deserializeBinaryFromReader(message: InfoRequest, reader: jspb.BinaryReader): InfoRequest;
}

export namespace InfoRequest {
  export type AsObject = {
  }
}

export class InfoResponse extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): InfoResponse;

  getHeight(): number;
  setHeight(value: number): InfoResponse;

  getChainId(): string;
  setChainId(value: string): InfoResponse;

  getMinGasPrice(): number;
  setMinGasPrice(value: number): InfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InfoResponse): InfoResponse.AsObject;
  static serializeBinaryToWriter(message: InfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InfoResponse;
  static deserializeBinaryFromReader(message: InfoResponse, reader: jspb.BinaryReader): InfoResponse;
}

export namespace InfoResponse {
  export type AsObject = {
    address: string,
    height: number,
    chainId: string,
    minGasPrice: number,
  }
}

export class SubmitRequest extends jspb.Message {
  getSigner(): string;
  setSigner(value: string): SubmitRequest;

  getNamespace(): Uint8Array | string;
  getNamespace_asU8(): Uint8Array;
  getNamespace_asB64(): string;
  setNamespace(value: Uint8Array | string): SubmitRequest;

  getBlobsList(): Array<Uint8Array | string>;
  setBlobsList(value: Array<Uint8Array | string>): SubmitRequest;
  clearBlobsList(): SubmitRequest;
  addBlobs(value: Uint8Array | string, index?: number): SubmitRequest;

  getFee(): number;
  setFee(value: number): SubmitRequest;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): SubmitRequest;

  getOptions(): Options | undefined;
  setOptions(value?: Options): SubmitRequest;
  hasOptions(): boolean;
  clearOptions(): SubmitRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmitRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubmitRequest): SubmitRequest.AsObject;
  static serializeBinaryToWriter(message: SubmitRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmitRequest;
  static deserializeBinaryFromReader(message: SubmitRequest, reader: jspb.BinaryReader): SubmitRequest;
}

export namespace SubmitRequest {
  export type AsObject = {
    signer: string,
    namespace: Uint8Array | string,
    blobsList: Array<Uint8Array | string>,
    fee: number,
    signature: Uint8Array | string,
    options?: Options.AsObject,
  }
}

export class Options extends jspb.Message {
  getTimeoutBlocks(): number;
  setTimeoutBlocks(value: number): Options;

  getCompact(): boolean;
  setCompact(value: boolean): Options;

  getNamespaceVersion(): number;
  setNamespaceVersion(value: number): Options;

  getShareVersion(): number;
  setShareVersion(value: number): Options;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Options.AsObject;
  static toObject(includeInstance: boolean, msg: Options): Options.AsObject;
  static serializeBinaryToWriter(message: Options, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Options;
  static deserializeBinaryFromReader(message: Options, reader: jspb.BinaryReader): Options;
}

export namespace Options {
  export type AsObject = {
    timeoutBlocks: number,
    compact: boolean,
    namespaceVersion: number,
    shareVersion: number,
  }
}

export class SubmitResponse extends jspb.Message {
  getId(): number;
  setId(value: number): SubmitResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmitResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubmitResponse): SubmitResponse.AsObject;
  static serializeBinaryToWriter(message: SubmitResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmitResponse;
  static deserializeBinaryFromReader(message: SubmitResponse, reader: jspb.BinaryReader): SubmitResponse;
}

export namespace SubmitResponse {
  export type AsObject = {
    id: number,
  }
}

export class StatusRequest extends jspb.Message {
  getId(): number;
  setId(value: number): StatusRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StatusRequest): StatusRequest.AsObject;
  static serializeBinaryToWriter(message: StatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusRequest;
  static deserializeBinaryFromReader(message: StatusRequest, reader: jspb.BinaryReader): StatusRequest;
}

export namespace StatusRequest {
  export type AsObject = {
    id: number,
  }
}

export class StatusResponse extends jspb.Message {
  getStatus(): StatusResponse.Status;
  setStatus(value: StatusResponse.Status): StatusResponse;

  getInsertHeight(): number;
  setInsertHeight(value: number): StatusResponse;

  getExpiryHeight(): number;
  setExpiryHeight(value: number): StatusResponse;

  getTxHash(): Uint8Array | string;
  getTxHash_asU8(): Uint8Array;
  getTxHash_asB64(): string;
  setTxHash(value: Uint8Array | string): StatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StatusResponse): StatusResponse.AsObject;
  static serializeBinaryToWriter(message: StatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusResponse;
  static deserializeBinaryFromReader(message: StatusResponse, reader: jspb.BinaryReader): StatusResponse;
}

export namespace StatusResponse {
  export type AsObject = {
    status: StatusResponse.Status,
    insertHeight: number,
    expiryHeight: number,
    txHash: Uint8Array | string,
  }

  export enum Status { 
    UNKNOWN = 0,
    PENDING = 1,
    BROADCASTING = 2,
    COMMITTED = 3,
    EXPIRED = 4,
  }
}

export class BalanceRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): BalanceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceRequest): BalanceRequest.AsObject;
  static serializeBinaryToWriter(message: BalanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceRequest;
  static deserializeBinaryFromReader(message: BalanceRequest, reader: jspb.BinaryReader): BalanceRequest;
}

export namespace BalanceRequest {
  export type AsObject = {
    address: string,
  }
}

export class BalanceResponse extends jspb.Message {
  getMaelstromBalance(): number;
  setMaelstromBalance(value: number): BalanceResponse;

  getCelestiaBalance(): number;
  setCelestiaBalance(value: number): BalanceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceResponse): BalanceResponse.AsObject;
  static serializeBinaryToWriter(message: BalanceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceResponse;
  static deserializeBinaryFromReader(message: BalanceResponse, reader: jspb.BinaryReader): BalanceResponse;
}

export namespace BalanceResponse {
  export type AsObject = {
    maelstromBalance: number,
    celestiaBalance: number,
  }
}

export class CancelRequest extends jspb.Message {
  getId(): number;
  setId(value: number): CancelRequest;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): CancelRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CancelRequest): CancelRequest.AsObject;
  static serializeBinaryToWriter(message: CancelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelRequest;
  static deserializeBinaryFromReader(message: CancelRequest, reader: jspb.BinaryReader): CancelRequest;
}

export namespace CancelRequest {
  export type AsObject = {
    id: number,
    signature: Uint8Array | string,
  }
}

export class CancelResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CancelResponse): CancelResponse.AsObject;
  static serializeBinaryToWriter(message: CancelResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelResponse;
  static deserializeBinaryFromReader(message: CancelResponse, reader: jspb.BinaryReader): CancelResponse;
}

export namespace CancelResponse {
  export type AsObject = {
  }
}

export class WithdrawRequest extends jspb.Message {
  getSigner(): string;
  setSigner(value: string): WithdrawRequest;

  getBalance(): number;
  setBalance(value: number): WithdrawRequest;

  getAmount(): number;
  setAmount(value: number): WithdrawRequest;

  getTimestamp(): number;
  setTimestamp(value: number): WithdrawRequest;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): WithdrawRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WithdrawRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WithdrawRequest): WithdrawRequest.AsObject;
  static serializeBinaryToWriter(message: WithdrawRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WithdrawRequest;
  static deserializeBinaryFromReader(message: WithdrawRequest, reader: jspb.BinaryReader): WithdrawRequest;
}

export namespace WithdrawRequest {
  export type AsObject = {
    signer: string,
    balance: number,
    amount: number,
    timestamp: number,
    signature: Uint8Array | string,
  }
}

export class WithdrawResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WithdrawResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WithdrawResponse): WithdrawResponse.AsObject;
  static serializeBinaryToWriter(message: WithdrawResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WithdrawResponse;
  static deserializeBinaryFromReader(message: WithdrawResponse, reader: jspb.BinaryReader): WithdrawResponse;
}

export namespace WithdrawResponse {
  export type AsObject = {
  }
}

export class PendingWithdrawalRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): PendingWithdrawalRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PendingWithdrawalRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PendingWithdrawalRequest): PendingWithdrawalRequest.AsObject;
  static serializeBinaryToWriter(message: PendingWithdrawalRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PendingWithdrawalRequest;
  static deserializeBinaryFromReader(message: PendingWithdrawalRequest, reader: jspb.BinaryReader): PendingWithdrawalRequest;
}

export namespace PendingWithdrawalRequest {
  export type AsObject = {
    address: string,
  }
}

export class PendingWithdrawalResponse extends jspb.Message {
  getAmount(): number;
  setAmount(value: number): PendingWithdrawalResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PendingWithdrawalResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PendingWithdrawalResponse): PendingWithdrawalResponse.AsObject;
  static serializeBinaryToWriter(message: PendingWithdrawalResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PendingWithdrawalResponse;
  static deserializeBinaryFromReader(message: PendingWithdrawalResponse, reader: jspb.BinaryReader): PendingWithdrawalResponse;
}

export namespace PendingWithdrawalResponse {
  export type AsObject = {
    amount: number,
  }
}

export class BroadcastTxRequest extends jspb.Message {
  getTxBytes(): Uint8Array | string;
  getTxBytes_asU8(): Uint8Array;
  getTxBytes_asB64(): string;
  setTxBytes(value: Uint8Array | string): BroadcastTxRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BroadcastTxRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BroadcastTxRequest): BroadcastTxRequest.AsObject;
  static serializeBinaryToWriter(message: BroadcastTxRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BroadcastTxRequest;
  static deserializeBinaryFromReader(message: BroadcastTxRequest, reader: jspb.BinaryReader): BroadcastTxRequest;
}

export namespace BroadcastTxRequest {
  export type AsObject = {
    txBytes: Uint8Array | string,
  }
}

export class BroadcastTxResponse extends jspb.Message {
  getTxResponse(): cosmos_base_abci_v1beta1_abci_pb.TxResponse | undefined;
  setTxResponse(value?: cosmos_base_abci_v1beta1_abci_pb.TxResponse): BroadcastTxResponse;
  hasTxResponse(): boolean;
  clearTxResponse(): BroadcastTxResponse;

  getId(): number;
  setId(value: number): BroadcastTxResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BroadcastTxResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BroadcastTxResponse): BroadcastTxResponse.AsObject;
  static serializeBinaryToWriter(message: BroadcastTxResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BroadcastTxResponse;
  static deserializeBinaryFromReader(message: BroadcastTxResponse, reader: jspb.BinaryReader): BroadcastTxResponse;
}

export namespace BroadcastTxResponse {
  export type AsObject = {
    txResponse?: cosmos_base_abci_v1beta1_abci_pb.TxResponse.AsObject,
    id: number,
  }
}

