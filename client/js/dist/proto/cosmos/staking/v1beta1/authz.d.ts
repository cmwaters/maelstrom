import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.staking.v1beta1";
/** AuthorizationType defines the type of staking module authorization type */
export declare enum AuthorizationType {
    /** AUTHORIZATION_TYPE_UNSPECIFIED - AUTHORIZATION_TYPE_UNSPECIFIED specifies an unknown authorization type */
    AUTHORIZATION_TYPE_UNSPECIFIED = 0,
    /** AUTHORIZATION_TYPE_DELEGATE - AUTHORIZATION_TYPE_DELEGATE defines an authorization type for Msg/Delegate */
    AUTHORIZATION_TYPE_DELEGATE = 1,
    /** AUTHORIZATION_TYPE_UNDELEGATE - AUTHORIZATION_TYPE_UNDELEGATE defines an authorization type for Msg/Undelegate */
    AUTHORIZATION_TYPE_UNDELEGATE = 2,
    /** AUTHORIZATION_TYPE_REDELEGATE - AUTHORIZATION_TYPE_REDELEGATE defines an authorization type for Msg/BeginRedelegate */
    AUTHORIZATION_TYPE_REDELEGATE = 3,
    UNRECOGNIZED = -1
}
export declare function authorizationTypeFromJSON(object: any): AuthorizationType;
export declare function authorizationTypeToJSON(object: AuthorizationType): string;
/** StakeAuthorization defines authorization for delegate/undelegate/redelegate. */
export interface StakeAuthorization {
    /**
     * max_tokens specifies the maximum amount of tokens can be delegate to a validator. If it is
     * empty, there is no spend limit and any amount of coins can be delegated.
     */
    maxTokens: Coin | undefined;
    /**
     * allow_list specifies list of validator addresses to whom grantee can delegate tokens on behalf of granter's
     * account.
     */
    allowList?: StakeAuthorization_Validators | undefined;
    /** deny_list specifies list of validator addresses to whom grantee can not delegate tokens. */
    denyList?: StakeAuthorization_Validators | undefined;
    /** authorization_type defines one of AuthorizationType. */
    authorizationType: AuthorizationType;
}
/** Validators defines list of validator addresses. */
export interface StakeAuthorization_Validators {
    address: string[];
}
export declare const StakeAuthorization: {
    encode(message: StakeAuthorization, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StakeAuthorization;
    fromJSON(object: any): StakeAuthorization;
    toJSON(message: StakeAuthorization): unknown;
    create<I extends {
        maxTokens?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
        allowList?: {
            address?: string[] | undefined;
        } | undefined;
        denyList?: {
            address?: string[] | undefined;
        } | undefined;
        authorizationType?: AuthorizationType | undefined;
    } & {
        maxTokens?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K in Exclude<keyof I["maxTokens"], keyof Coin>]: never; }) | undefined;
        allowList?: ({
            address?: string[] | undefined;
        } & {
            address?: (string[] & string[] & { [K_1 in Exclude<keyof I["allowList"]["address"], keyof string[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["allowList"], "address">]: never; }) | undefined;
        denyList?: ({
            address?: string[] | undefined;
        } & {
            address?: (string[] & string[] & { [K_3 in Exclude<keyof I["denyList"]["address"], keyof string[]>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["denyList"], "address">]: never; }) | undefined;
        authorizationType?: AuthorizationType | undefined;
    } & { [K_5 in Exclude<keyof I, keyof StakeAuthorization>]: never; }>(base?: I): StakeAuthorization;
    fromPartial<I_1 extends {
        maxTokens?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
        allowList?: {
            address?: string[] | undefined;
        } | undefined;
        denyList?: {
            address?: string[] | undefined;
        } | undefined;
        authorizationType?: AuthorizationType | undefined;
    } & {
        maxTokens?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["maxTokens"], keyof Coin>]: never; }) | undefined;
        allowList?: ({
            address?: string[] | undefined;
        } & {
            address?: (string[] & string[] & { [K_7 in Exclude<keyof I_1["allowList"]["address"], keyof string[]>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I_1["allowList"], "address">]: never; }) | undefined;
        denyList?: ({
            address?: string[] | undefined;
        } & {
            address?: (string[] & string[] & { [K_9 in Exclude<keyof I_1["denyList"]["address"], keyof string[]>]: never; }) | undefined;
        } & { [K_10 in Exclude<keyof I_1["denyList"], "address">]: never; }) | undefined;
        authorizationType?: AuthorizationType | undefined;
    } & { [K_11 in Exclude<keyof I_1, keyof StakeAuthorization>]: never; }>(object: I_1): StakeAuthorization;
};
export declare const StakeAuthorization_Validators: {
    encode(message: StakeAuthorization_Validators, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StakeAuthorization_Validators;
    fromJSON(object: any): StakeAuthorization_Validators;
    toJSON(message: StakeAuthorization_Validators): unknown;
    create<I extends {
        address?: string[] | undefined;
    } & {
        address?: (string[] & string[] & { [K in Exclude<keyof I["address"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "address">]: never; }>(base?: I): StakeAuthorization_Validators;
    fromPartial<I_1 extends {
        address?: string[] | undefined;
    } & {
        address?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["address"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): StakeAuthorization_Validators;
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
