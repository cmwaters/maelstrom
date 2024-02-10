import * as jspb from 'google-protobuf'



export class Account extends jspb.Message {
  getBalance(): number;
  setBalance(value: number): Account;

  getPubKey(): Uint8Array | string;
  getPubKey_asU8(): Uint8Array;
  getPubKey_asB64(): string;
  setPubKey(value: Uint8Array | string): Account;

  getPubKeyType(): Account.PubKeyType;
  setPubKeyType(value: Account.PubKeyType): Account;

  getAccountNumber(): number;
  setAccountNumber(value: number): Account;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Account.AsObject;
  static toObject(includeInstance: boolean, msg: Account): Account.AsObject;
  static serializeBinaryToWriter(message: Account, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Account;
  static deserializeBinaryFromReader(message: Account, reader: jspb.BinaryReader): Account;
}

export namespace Account {
  export type AsObject = {
    balance: number,
    pubKey: Uint8Array | string,
    pubKeyType: Account.PubKeyType,
    accountNumber: number,
  }

  export enum PubKeyType { 
    UNKNOWN = 0,
    SECP256R1 = 1,
    SECP256K1 = 2,
    ED25519 = 3,
  }
}

export class BlobMeta extends jspb.Message {
  getSigner(): string;
  setSigner(value: string): BlobMeta;

  getFee(): number;
  setFee(value: number): BlobMeta;

  getTxHash(): Uint8Array | string;
  getTxHash_asU8(): Uint8Array;
  getTxHash_asB64(): string;
  setTxHash(value: Uint8Array | string): BlobMeta;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlobMeta.AsObject;
  static toObject(includeInstance: boolean, msg: BlobMeta): BlobMeta.AsObject;
  static serializeBinaryToWriter(message: BlobMeta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlobMeta;
  static deserializeBinaryFromReader(message: BlobMeta, reader: jspb.BinaryReader): BlobMeta;
}

export namespace BlobMeta {
  export type AsObject = {
    signer: string,
    fee: number,
    txHash: Uint8Array | string,
  }
}

export class BlobTx extends jspb.Message {
  getTxIdsList(): Array<number>;
  setTxIdsList(value: Array<number>): BlobTx;
  clearTxIdsList(): BlobTx;
  addTxIds(value: number, index?: number): BlobTx;

  getTimeoutHeight(): number;
  setTimeoutHeight(value: number): BlobTx;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlobTx.AsObject;
  static toObject(includeInstance: boolean, msg: BlobTx): BlobTx.AsObject;
  static serializeBinaryToWriter(message: BlobTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlobTx;
  static deserializeBinaryFromReader(message: BlobTx, reader: jspb.BinaryReader): BlobTx;
}

export namespace BlobTx {
  export type AsObject = {
    txIdsList: Array<number>,
    timeoutHeight: number,
  }
}

export class WithdrawalTx extends jspb.Message {
  getWithdrawalsList(): Array<Withdrawal>;
  setWithdrawalsList(value: Array<Withdrawal>): WithdrawalTx;
  clearWithdrawalsList(): WithdrawalTx;
  addWithdrawals(value?: Withdrawal, index?: number): Withdrawal;

  getTimeoutHeight(): number;
  setTimeoutHeight(value: number): WithdrawalTx;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WithdrawalTx.AsObject;
  static toObject(includeInstance: boolean, msg: WithdrawalTx): WithdrawalTx.AsObject;
  static serializeBinaryToWriter(message: WithdrawalTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WithdrawalTx;
  static deserializeBinaryFromReader(message: WithdrawalTx, reader: jspb.BinaryReader): WithdrawalTx;
}

export namespace WithdrawalTx {
  export type AsObject = {
    withdrawalsList: Array<Withdrawal.AsObject>,
    timeoutHeight: number,
  }
}

export class Withdrawal extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): Withdrawal;

  getAmount(): number;
  setAmount(value: number): Withdrawal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Withdrawal.AsObject;
  static toObject(includeInstance: boolean, msg: Withdrawal): Withdrawal.AsObject;
  static serializeBinaryToWriter(message: Withdrawal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Withdrawal;
  static deserializeBinaryFromReader(message: Withdrawal, reader: jspb.BinaryReader): Withdrawal;
}

export namespace Withdrawal {
  export type AsObject = {
    address: string,
    amount: number,
  }
}

