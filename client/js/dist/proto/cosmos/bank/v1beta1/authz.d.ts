import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.bank.v1beta1";
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 */
export interface SendAuthorization {
    spendLimit: Coin[];
}
export declare const SendAuthorization: {
    encode(message: SendAuthorization, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SendAuthorization;
    fromJSON(object: any): SendAuthorization;
    toJSON(message: SendAuthorization): unknown;
    create<I extends {
        spendLimit?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        spendLimit?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K in Exclude<keyof I["spendLimit"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["spendLimit"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "spendLimit">]: never; }>(base?: I): SendAuthorization;
    fromPartial<I_1 extends {
        spendLimit?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        spendLimit?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["spendLimit"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["spendLimit"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "spendLimit">]: never; }>(object: I_1): SendAuthorization;
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
