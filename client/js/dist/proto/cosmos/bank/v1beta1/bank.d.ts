import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.bank.v1beta1";
/** Params defines the parameters for the bank module. */
export interface Params {
    sendEnabled: SendEnabled[];
    defaultSendEnabled: boolean;
}
/**
 * SendEnabled maps coin denom to a send_enabled status (whether a denom is
 * sendable).
 */
export interface SendEnabled {
    denom: string;
    enabled: boolean;
}
/** Input models transaction input. */
export interface Input {
    address: string;
    coins: Coin[];
}
/** Output models transaction outputs. */
export interface Output {
    address: string;
    coins: Coin[];
}
/**
 * Supply represents a struct that passively keeps track of the total supply
 * amounts in the network.
 * This message is deprecated now that supply is indexed by denom.
 *
 * @deprecated
 */
export interface Supply {
    total: Coin[];
}
/**
 * DenomUnit represents a struct that describes a given
 * denomination unit of the basic token.
 */
export interface DenomUnit {
    /** denom represents the string name of the given denom unit (e.g uatom). */
    denom: string;
    /**
     * exponent represents power of 10 exponent that one must
     * raise the base_denom to in order to equal the given DenomUnit's denom
     * 1 denom = 1^exponent base_denom
     * (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with
     * exponent = 6, thus: 1 atom = 10^6 uatom).
     */
    exponent: number;
    /** aliases is a list of string aliases for the given denom */
    aliases: string[];
}
/**
 * Metadata represents a struct that describes
 * a basic token.
 */
export interface Metadata {
    description: string;
    /** denom_units represents the list of DenomUnit's for a given coin */
    denomUnits: DenomUnit[];
    /** base represents the base denom (should be the DenomUnit with exponent = 0). */
    base: string;
    /**
     * display indicates the suggested denom that should be
     * displayed in clients.
     */
    display: string;
    /** name defines the name of the token (eg: Cosmos Atom) */
    name: string;
    /**
     * symbol is the token symbol usually shown on exchanges (eg: ATOM). This can
     * be the same as the display.
     */
    symbol: string;
}
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        sendEnabled?: {
            denom?: string | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        defaultSendEnabled?: boolean | undefined;
    } & {
        sendEnabled?: ({
            denom?: string | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            denom?: string | undefined;
            enabled?: boolean | undefined;
        } & {
            denom?: string | undefined;
            enabled?: boolean | undefined;
        } & { [K in Exclude<keyof I["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_1 in Exclude<keyof I["sendEnabled"], keyof {
            denom?: string | undefined;
            enabled?: boolean | undefined;
        }[]>]: never; }) | undefined;
        defaultSendEnabled?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        sendEnabled?: {
            denom?: string | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        defaultSendEnabled?: boolean | undefined;
    } & {
        sendEnabled?: ({
            denom?: string | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            denom?: string | undefined;
            enabled?: boolean | undefined;
        } & {
            denom?: string | undefined;
            enabled?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_4 in Exclude<keyof I_1["sendEnabled"], keyof {
            denom?: string | undefined;
            enabled?: boolean | undefined;
        }[]>]: never; }) | undefined;
        defaultSendEnabled?: boolean | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof Params>]: never; }>(object: I_1): Params;
};
export declare const SendEnabled: {
    encode(message: SendEnabled, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SendEnabled;
    fromJSON(object: any): SendEnabled;
    toJSON(message: SendEnabled): unknown;
    create<I extends {
        denom?: string | undefined;
        enabled?: boolean | undefined;
    } & {
        denom?: string | undefined;
        enabled?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof SendEnabled>]: never; }>(base?: I): SendEnabled;
    fromPartial<I_1 extends {
        denom?: string | undefined;
        enabled?: boolean | undefined;
    } & {
        denom?: string | undefined;
        enabled?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SendEnabled>]: never; }>(object: I_1): SendEnabled;
};
export declare const Input: {
    encode(message: Input, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Input;
    fromJSON(object: any): Input;
    toJSON(message: Input): unknown;
    create<I extends {
        address?: string | undefined;
        coins?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        address?: string | undefined;
        coins?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K in Exclude<keyof I["coins"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["coins"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Input>]: never; }>(base?: I): Input;
    fromPartial<I_1 extends {
        address?: string | undefined;
        coins?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        address?: string | undefined;
        coins?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["coins"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["coins"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof Input>]: never; }>(object: I_1): Input;
};
export declare const Output: {
    encode(message: Output, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Output;
    fromJSON(object: any): Output;
    toJSON(message: Output): unknown;
    create<I extends {
        address?: string | undefined;
        coins?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        address?: string | undefined;
        coins?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K in Exclude<keyof I["coins"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["coins"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Output>]: never; }>(base?: I): Output;
    fromPartial<I_1 extends {
        address?: string | undefined;
        coins?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        address?: string | undefined;
        coins?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["coins"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["coins"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof Output>]: never; }>(object: I_1): Output;
};
export declare const Supply: {
    encode(message: Supply, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Supply;
    fromJSON(object: any): Supply;
    toJSON(message: Supply): unknown;
    create<I extends {
        total?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        total?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K in Exclude<keyof I["total"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["total"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "total">]: never; }>(base?: I): Supply;
    fromPartial<I_1 extends {
        total?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        total?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["total"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["total"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "total">]: never; }>(object: I_1): Supply;
};
export declare const DenomUnit: {
    encode(message: DenomUnit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DenomUnit;
    fromJSON(object: any): DenomUnit;
    toJSON(message: DenomUnit): unknown;
    create<I extends {
        denom?: string | undefined;
        exponent?: number | undefined;
        aliases?: string[] | undefined;
    } & {
        denom?: string | undefined;
        exponent?: number | undefined;
        aliases?: (string[] & string[] & { [K in Exclude<keyof I["aliases"], keyof string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof DenomUnit>]: never; }>(base?: I): DenomUnit;
    fromPartial<I_1 extends {
        denom?: string | undefined;
        exponent?: number | undefined;
        aliases?: string[] | undefined;
    } & {
        denom?: string | undefined;
        exponent?: number | undefined;
        aliases?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["aliases"], keyof string[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof DenomUnit>]: never; }>(object: I_1): DenomUnit;
};
export declare const Metadata: {
    encode(message: Metadata, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Metadata;
    fromJSON(object: any): Metadata;
    toJSON(message: Metadata): unknown;
    create<I extends {
        description?: string | undefined;
        denomUnits?: {
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        }[] | undefined;
        base?: string | undefined;
        display?: string | undefined;
        name?: string | undefined;
        symbol?: string | undefined;
    } & {
        description?: string | undefined;
        denomUnits?: ({
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        }[] & ({
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        } & {
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: (string[] & string[] & { [K in Exclude<keyof I["denomUnits"][number]["aliases"], keyof string[]>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["denomUnits"][number], keyof DenomUnit>]: never; })[] & { [K_2 in Exclude<keyof I["denomUnits"], keyof {
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        }[]>]: never; }) | undefined;
        base?: string | undefined;
        display?: string | undefined;
        name?: string | undefined;
        symbol?: string | undefined;
    } & { [K_3 in Exclude<keyof I, keyof Metadata>]: never; }>(base?: I): Metadata;
    fromPartial<I_1 extends {
        description?: string | undefined;
        denomUnits?: {
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        }[] | undefined;
        base?: string | undefined;
        display?: string | undefined;
        name?: string | undefined;
        symbol?: string | undefined;
    } & {
        description?: string | undefined;
        denomUnits?: ({
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        }[] & ({
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        } & {
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["denomUnits"][number]["aliases"], keyof string[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I_1["denomUnits"][number], keyof DenomUnit>]: never; })[] & { [K_6 in Exclude<keyof I_1["denomUnits"], keyof {
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        }[]>]: never; }) | undefined;
        base?: string | undefined;
        display?: string | undefined;
        name?: string | undefined;
        symbol?: string | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof Metadata>]: never; }>(object: I_1): Metadata;
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
