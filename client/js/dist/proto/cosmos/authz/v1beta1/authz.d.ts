import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export declare const protobufPackage = "cosmos.authz.v1beta1";
/**
 * GenericAuthorization gives the grantee unrestricted permissions to execute
 * the provided method on behalf of the granter's account.
 */
export interface GenericAuthorization {
    /** Msg, identified by it's type URL, to grant unrestricted permissions to execute */
    msg: string;
}
/**
 * Grant gives permissions to execute
 * the provide method with expiration time.
 */
export interface Grant {
    authorization: Any | undefined;
    expiration: Date | undefined;
}
export declare const GenericAuthorization: {
    encode(message: GenericAuthorization, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenericAuthorization;
    fromJSON(object: any): GenericAuthorization;
    toJSON(message: GenericAuthorization): unknown;
    create<I extends {
        msg?: string | undefined;
    } & {
        msg?: string | undefined;
    } & { [K in Exclude<keyof I, "msg">]: never; }>(base?: I): GenericAuthorization;
    fromPartial<I_1 extends {
        msg?: string | undefined;
    } & {
        msg?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "msg">]: never; }>(object: I_1): GenericAuthorization;
};
export declare const Grant: {
    encode(message: Grant, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Grant;
    fromJSON(object: any): Grant;
    toJSON(message: Grant): unknown;
    create<I extends {
        authorization?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        expiration?: Date | undefined;
    } & {
        authorization?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["authorization"], keyof Any>]: never; }) | undefined;
        expiration?: Date | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Grant>]: never; }>(base?: I): Grant;
    fromPartial<I_1 extends {
        authorization?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        expiration?: Date | undefined;
    } & {
        authorization?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I_1["authorization"], keyof Any>]: never; }) | undefined;
        expiration?: Date | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof Grant>]: never; }>(object: I_1): Grant;
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
