import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export declare const protobufPackage = "cosmos.auth.v1beta1";
/**
 * BaseAccount defines a base account type. It contains all the necessary fields
 * for basic account functionality. Any custom account type should extend this
 * type for additional functionality (e.g. vesting).
 */
export interface BaseAccount {
    address: string;
    pubKey: Any | undefined;
    accountNumber: string;
    sequence: string;
}
/** ModuleAccount defines an account for modules that holds coins on a pool. */
export interface ModuleAccount {
    baseAccount: BaseAccount | undefined;
    name: string;
    permissions: string[];
}
/** Params defines the parameters for the auth module. */
export interface Params {
    maxMemoCharacters: string;
    txSigLimit: string;
    txSizeCostPerByte: string;
    sigVerifyCostEd25519: string;
    sigVerifyCostSecp256k1: string;
}
export declare const BaseAccount: {
    encode(message: BaseAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BaseAccount;
    fromJSON(object: any): BaseAccount;
    toJSON(message: BaseAccount): unknown;
    create<I extends {
        address?: string | undefined;
        pubKey?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        accountNumber?: string | undefined;
        sequence?: string | undefined;
    } & {
        address?: string | undefined;
        pubKey?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["pubKey"], keyof Any>]: never; }) | undefined;
        accountNumber?: string | undefined;
        sequence?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof BaseAccount>]: never; }>(base?: I): BaseAccount;
    fromPartial<I_1 extends {
        address?: string | undefined;
        pubKey?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        accountNumber?: string | undefined;
        sequence?: string | undefined;
    } & {
        address?: string | undefined;
        pubKey?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I_1["pubKey"], keyof Any>]: never; }) | undefined;
        accountNumber?: string | undefined;
        sequence?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof BaseAccount>]: never; }>(object: I_1): BaseAccount;
};
export declare const ModuleAccount: {
    encode(message: ModuleAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModuleAccount;
    fromJSON(object: any): ModuleAccount;
    toJSON(message: ModuleAccount): unknown;
    create<I extends {
        baseAccount?: {
            address?: string | undefined;
            pubKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            accountNumber?: string | undefined;
            sequence?: string | undefined;
        } | undefined;
        name?: string | undefined;
        permissions?: string[] | undefined;
    } & {
        baseAccount?: ({
            address?: string | undefined;
            pubKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            accountNumber?: string | undefined;
            sequence?: string | undefined;
        } & {
            address?: string | undefined;
            pubKey?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["baseAccount"]["pubKey"], keyof Any>]: never; }) | undefined;
            accountNumber?: string | undefined;
            sequence?: string | undefined;
        } & { [K_1 in Exclude<keyof I["baseAccount"], keyof BaseAccount>]: never; }) | undefined;
        name?: string | undefined;
        permissions?: (string[] & string[] & { [K_2 in Exclude<keyof I["permissions"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof ModuleAccount>]: never; }>(base?: I): ModuleAccount;
    fromPartial<I_1 extends {
        baseAccount?: {
            address?: string | undefined;
            pubKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            accountNumber?: string | undefined;
            sequence?: string | undefined;
        } | undefined;
        name?: string | undefined;
        permissions?: string[] | undefined;
    } & {
        baseAccount?: ({
            address?: string | undefined;
            pubKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            accountNumber?: string | undefined;
            sequence?: string | undefined;
        } & {
            address?: string | undefined;
            pubKey?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I_1["baseAccount"]["pubKey"], keyof Any>]: never; }) | undefined;
            accountNumber?: string | undefined;
            sequence?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["baseAccount"], keyof BaseAccount>]: never; }) | undefined;
        name?: string | undefined;
        permissions?: (string[] & string[] & { [K_6 in Exclude<keyof I_1["permissions"], keyof string[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof ModuleAccount>]: never; }>(object: I_1): ModuleAccount;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        maxMemoCharacters?: string | undefined;
        txSigLimit?: string | undefined;
        txSizeCostPerByte?: string | undefined;
        sigVerifyCostEd25519?: string | undefined;
        sigVerifyCostSecp256k1?: string | undefined;
    } & {
        maxMemoCharacters?: string | undefined;
        txSigLimit?: string | undefined;
        txSizeCostPerByte?: string | undefined;
        sigVerifyCostEd25519?: string | undefined;
        sigVerifyCostSecp256k1?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        maxMemoCharacters?: string | undefined;
        txSigLimit?: string | undefined;
        txSizeCostPerByte?: string | undefined;
        sigVerifyCostEd25519?: string | undefined;
        sigVerifyCostSecp256k1?: string | undefined;
    } & {
        maxMemoCharacters?: string | undefined;
        txSigLimit?: string | undefined;
        txSizeCostPerByte?: string | undefined;
        sigVerifyCostEd25519?: string | undefined;
        sigVerifyCostSecp256k1?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Params>]: never; }>(object: I_1): Params;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
