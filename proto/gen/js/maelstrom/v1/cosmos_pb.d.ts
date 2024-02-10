import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../google/api/annotations_pb'; // proto import: "google/api/annotations.proto"


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
    id: number,
  }
}

