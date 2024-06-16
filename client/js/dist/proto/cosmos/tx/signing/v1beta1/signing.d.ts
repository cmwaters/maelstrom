import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { CompactBitArray } from "../../../crypto/multisig/v1beta1/multisig";
export declare const protobufPackage = "cosmos.tx.signing.v1beta1";
/** SignMode represents a signing mode with its own security guarantees. */
export declare enum SignMode {
    /**
     * SIGN_MODE_UNSPECIFIED - SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
     * rejected
     */
    SIGN_MODE_UNSPECIFIED = 0,
    /**
     * SIGN_MODE_DIRECT - SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
     * verified with raw bytes from Tx
     */
    SIGN_MODE_DIRECT = 1,
    /**
     * SIGN_MODE_TEXTUAL - SIGN_MODE_TEXTUAL is a future signing mode that will verify some
     * human-readable textual representation on top of the binary representation
     * from SIGN_MODE_DIRECT
     */
    SIGN_MODE_TEXTUAL = 2,
    /**
     * SIGN_MODE_LEGACY_AMINO_JSON - SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
     * Amino JSON and will be removed in the future
     */
    SIGN_MODE_LEGACY_AMINO_JSON = 127,
    UNRECOGNIZED = -1
}
export declare function signModeFromJSON(object: any): SignMode;
export declare function signModeToJSON(object: SignMode): string;
/** SignatureDescriptors wraps multiple SignatureDescriptor's. */
export interface SignatureDescriptors {
    /** signatures are the signature descriptors */
    signatures: SignatureDescriptor[];
}
/**
 * SignatureDescriptor is a convenience type which represents the full data for
 * a signature including the public key of the signer, signing modes and the
 * signature itself. It is primarily used for coordinating signatures between
 * clients.
 */
export interface SignatureDescriptor {
    /** public_key is the public key of the signer */
    publicKey: Any | undefined;
    data: SignatureDescriptor_Data | undefined;
    /**
     * sequence is the sequence of the account, which describes the
     * number of committed transactions signed by a given address. It is used to prevent
     * replay attacks.
     */
    sequence: string;
}
/** Data represents signature data */
export interface SignatureDescriptor_Data {
    /** single represents a single signer */
    single?: SignatureDescriptor_Data_Single | undefined;
    /** multi represents a multisig signer */
    multi?: SignatureDescriptor_Data_Multi | undefined;
}
/** Single is the signature data for a single signer */
export interface SignatureDescriptor_Data_Single {
    /** mode is the signing mode of the single signer */
    mode: SignMode;
    /** signature is the raw signature bytes */
    signature: Uint8Array;
}
/** Multi is the signature data for a multisig public key */
export interface SignatureDescriptor_Data_Multi {
    /** bitarray specifies which keys within the multisig are signing */
    bitarray: CompactBitArray | undefined;
    /** signatures is the signatures of the multi-signature */
    signatures: SignatureDescriptor_Data[];
}
export declare const SignatureDescriptors: {
    encode(message: SignatureDescriptors, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptors;
    fromJSON(object: any): SignatureDescriptors;
    toJSON(message: SignatureDescriptors): unknown;
    create<I extends {
        signatures?: {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            data?: {
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] | undefined;
    } & {
        signatures?: ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            data?: {
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] & ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            data?: {
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        } & {
            publicKey?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["signatures"][number]["publicKey"], keyof Any>]: never; }) | undefined;
            data?: ({
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } & {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } & { [K_1 in Exclude<keyof I["signatures"][number]["data"]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & { [K_2 in Exclude<keyof I["signatures"][number]["data"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                    signatures?: (any[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            signatures?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } & {
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } & { [K_3 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            signatures?: any[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & { [K_4 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                            signatures?: (any[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    signatures?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } & { [K_5 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    signatures?: any[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & { [K_6 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                    signatures?: (any[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            signatures?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } & { [K_7 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            signatures?: any[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & { [K_8 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                            signatures?: (any[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                    signature?: Uint8Array | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    signatures?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                    signature?: Uint8Array | undefined;
                                                } & any & { [K_9 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    signatures?: any[] | undefined;
                                                } & any & { [K_10 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                            } & { [K_11 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_12 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                        } & { [K_13 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                    } & { [K_14 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_15 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                } & { [K_16 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                            } & { [K_17 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_18 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                        } & { [K_19 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                    } & { [K_20 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_21 in Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                } & { [K_22 in Exclude<keyof I["signatures"][number]["data"]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
            } & { [K_23 in Exclude<keyof I["signatures"][number]["data"], keyof SignatureDescriptor_Data>]: never; }) | undefined;
            sequence?: string | undefined;
        } & { [K_24 in Exclude<keyof I["signatures"][number], keyof SignatureDescriptor>]: never; })[] & { [K_25 in Exclude<keyof I["signatures"], keyof {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            data?: {
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_26 in Exclude<keyof I, "signatures">]: never; }>(base?: I): SignatureDescriptors;
    fromPartial<I_1 extends {
        signatures?: {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            data?: {
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] | undefined;
    } & {
        signatures?: ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            data?: {
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] & ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            data?: {
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        } & {
            publicKey?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K_27 in Exclude<keyof I_1["signatures"][number]["publicKey"], keyof Any>]: never; }) | undefined;
            data?: ({
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } & {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } & { [K_28 in Exclude<keyof I_1["signatures"][number]["data"]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & { [K_29 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                    signatures?: (any[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            signatures?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } & {
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } & { [K_30 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            signatures?: any[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & { [K_31 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                            signatures?: (any[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    signatures?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } & { [K_32 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    signatures?: any[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & { [K_33 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                    signatures?: (any[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            signatures?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } & { [K_34 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            signatures?: any[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & { [K_35 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                            signatures?: (any[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                    signature?: Uint8Array | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    signatures?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                    signature?: Uint8Array | undefined;
                                                } & any & { [K_36 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    signatures?: any[] | undefined;
                                                } & any & { [K_37 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                            } & { [K_38 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_39 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                        } & { [K_40 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                    } & { [K_41 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_42 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                } & { [K_43 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                            } & { [K_44 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_45 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                        } & { [K_46 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                    } & { [K_47 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_48 in Exclude<keyof I_1["signatures"][number]["data"]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                } & { [K_49 in Exclude<keyof I_1["signatures"][number]["data"]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
            } & { [K_50 in Exclude<keyof I_1["signatures"][number]["data"], keyof SignatureDescriptor_Data>]: never; }) | undefined;
            sequence?: string | undefined;
        } & { [K_51 in Exclude<keyof I_1["signatures"][number], keyof SignatureDescriptor>]: never; })[] & { [K_52 in Exclude<keyof I_1["signatures"], keyof {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            data?: {
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_53 in Exclude<keyof I_1, "signatures">]: never; }>(object: I_1): SignatureDescriptors;
};
export declare const SignatureDescriptor: {
    encode(message: SignatureDescriptor, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor;
    fromJSON(object: any): SignatureDescriptor;
    toJSON(message: SignatureDescriptor): unknown;
    create<I extends {
        publicKey?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        data?: {
            single?: {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } | undefined;
        } | undefined;
        sequence?: string | undefined;
    } & {
        publicKey?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["publicKey"], keyof Any>]: never; }) | undefined;
        data?: ({
            single?: {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } & {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["data"]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & { [K_2 in Exclude<keyof I["data"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                signatures?: (any[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        signatures?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } & {
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } & { [K_3 in Exclude<keyof I["data"]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        signatures?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_4 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        signatures?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                signatures?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } & {
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } & { [K_5 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                signatures?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_6 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                signatures?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        signatures?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } & { [K_7 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        signatures?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_8 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        signatures?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                signatures?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } & { [K_9 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                signatures?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_10 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                signatures?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                        signature?: Uint8Array | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        signatures?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_11 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_12 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_13 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                        } & { [K_14 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_15 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_16 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                } & { [K_17 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_18 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                            } & { [K_19 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                        } & { [K_20 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_21 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                    } & { [K_22 in Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                } & { [K_23 in Exclude<keyof I["data"]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_24 in Exclude<keyof I["data"]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
            } & { [K_25 in Exclude<keyof I["data"]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
        } & { [K_26 in Exclude<keyof I["data"], keyof SignatureDescriptor_Data>]: never; }) | undefined;
        sequence?: string | undefined;
    } & { [K_27 in Exclude<keyof I, keyof SignatureDescriptor>]: never; }>(base?: I): SignatureDescriptor;
    fromPartial<I_1 extends {
        publicKey?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        data?: {
            single?: {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } | undefined;
        } | undefined;
        sequence?: string | undefined;
    } & {
        publicKey?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K_28 in Exclude<keyof I_1["publicKey"], keyof Any>]: never; }) | undefined;
        data?: ({
            single?: {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } & {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } & { [K_29 in Exclude<keyof I_1["data"]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & { [K_30 in Exclude<keyof I_1["data"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                signatures?: (any[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        signatures?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } & {
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } & { [K_31 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        signatures?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_32 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        signatures?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                signatures?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } & {
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } & { [K_33 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                signatures?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_34 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                signatures?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        signatures?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } & { [K_35 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        signatures?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_36 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        signatures?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                signatures?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } & { [K_37 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                signatures?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_38 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                signatures?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                        signature?: Uint8Array | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        signatures?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_39 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_40 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_41 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                        } & { [K_42 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_43 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_44 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                } & { [K_45 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_46 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                            } & { [K_47 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                        } & { [K_48 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_49 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                    } & { [K_50 in Exclude<keyof I_1["data"]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                } & { [K_51 in Exclude<keyof I_1["data"]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_52 in Exclude<keyof I_1["data"]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
            } & { [K_53 in Exclude<keyof I_1["data"]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
        } & { [K_54 in Exclude<keyof I_1["data"], keyof SignatureDescriptor_Data>]: never; }) | undefined;
        sequence?: string | undefined;
    } & { [K_55 in Exclude<keyof I_1, keyof SignatureDescriptor>]: never; }>(object: I_1): SignatureDescriptor;
};
export declare const SignatureDescriptor_Data: {
    encode(message: SignatureDescriptor_Data, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data;
    fromJSON(object: any): SignatureDescriptor_Data;
    toJSON(message: SignatureDescriptor_Data): unknown;
    create<I extends {
        single?: {
            mode?: SignMode | undefined;
            signature?: Uint8Array | undefined;
        } | undefined;
        multi?: {
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            signatures?: any[] | undefined;
        } | undefined;
    } & {
        single?: ({
            mode?: SignMode | undefined;
            signature?: Uint8Array | undefined;
        } & {
            mode?: SignMode | undefined;
            signature?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
        multi?: ({
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            signatures?: any[] | undefined;
        } & {
            bitarray?: ({
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
            signatures?: (any[] & ({
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } & {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } & { [K_2 in Exclude<keyof I["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & { [K_3 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                    signatures?: (any[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            signatures?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } & {
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } & { [K_4 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            signatures?: any[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & { [K_5 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                            signatures?: (any[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    signatures?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } & { [K_6 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    signatures?: any[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & { [K_7 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                    signatures?: (any[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            signatures?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } & { [K_8 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            signatures?: any[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & { [K_9 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                            signatures?: (any[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                    signature?: Uint8Array | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    signatures?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                    signature?: Uint8Array | undefined;
                                                } & any & { [K_10 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    signatures?: any[] | undefined;
                                                } & any & { [K_11 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                            } & { [K_12 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_13 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                        } & { [K_14 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                    } & { [K_15 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_16 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                } & { [K_17 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                            } & { [K_18 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_19 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                        } & { [K_20 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                    } & { [K_21 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_22 in Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                } & { [K_23 in Exclude<keyof I["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
            } & { [K_24 in Exclude<keyof I["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_25 in Exclude<keyof I["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
        } & { [K_26 in Exclude<keyof I["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
    } & { [K_27 in Exclude<keyof I, keyof SignatureDescriptor_Data>]: never; }>(base?: I): SignatureDescriptor_Data;
    fromPartial<I_1 extends {
        single?: {
            mode?: SignMode | undefined;
            signature?: Uint8Array | undefined;
        } | undefined;
        multi?: {
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            signatures?: any[] | undefined;
        } | undefined;
    } & {
        single?: ({
            mode?: SignMode | undefined;
            signature?: Uint8Array | undefined;
        } & {
            mode?: SignMode | undefined;
            signature?: Uint8Array | undefined;
        } & { [K_28 in Exclude<keyof I_1["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
        multi?: ({
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            signatures?: any[] | undefined;
        } & {
            bitarray?: ({
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & { [K_29 in Exclude<keyof I_1["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
            signatures?: (any[] & ({
                single?: {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } & {
                    mode?: SignMode | undefined;
                    signature?: Uint8Array | undefined;
                } & { [K_30 in Exclude<keyof I_1["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    signatures?: any[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & { [K_31 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                    signatures?: (any[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            signatures?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } & {
                            mode?: SignMode | undefined;
                            signature?: Uint8Array | undefined;
                        } & { [K_32 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            signatures?: any[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & { [K_33 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                            signatures?: (any[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    signatures?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                    signature?: Uint8Array | undefined;
                                } & { [K_34 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    signatures?: any[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & { [K_35 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                    signatures?: (any[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            signatures?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                            signature?: Uint8Array | undefined;
                                        } & { [K_36 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            signatures?: any[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & { [K_37 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                            signatures?: (any[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                    signature?: Uint8Array | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    signatures?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                    signature?: Uint8Array | undefined;
                                                } & any & { [K_38 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    signatures?: any[] | undefined;
                                                } & any & { [K_39 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                            } & { [K_40 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_41 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                        } & { [K_42 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                    } & { [K_43 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_44 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                } & { [K_45 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                            } & { [K_46 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_47 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                        } & { [K_48 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                    } & { [K_49 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_50 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                } & { [K_51 in Exclude<keyof I_1["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
            } & { [K_52 in Exclude<keyof I_1["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_53 in Exclude<keyof I_1["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
        } & { [K_54 in Exclude<keyof I_1["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
    } & { [K_55 in Exclude<keyof I_1, keyof SignatureDescriptor_Data>]: never; }>(object: I_1): SignatureDescriptor_Data;
};
export declare const SignatureDescriptor_Data_Single: {
    encode(message: SignatureDescriptor_Data_Single, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data_Single;
    fromJSON(object: any): SignatureDescriptor_Data_Single;
    toJSON(message: SignatureDescriptor_Data_Single): unknown;
    create<I extends {
        mode?: SignMode | undefined;
        signature?: Uint8Array | undefined;
    } & {
        mode?: SignMode | undefined;
        signature?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof SignatureDescriptor_Data_Single>]: never; }>(base?: I): SignatureDescriptor_Data_Single;
    fromPartial<I_1 extends {
        mode?: SignMode | undefined;
        signature?: Uint8Array | undefined;
    } & {
        mode?: SignMode | undefined;
        signature?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SignatureDescriptor_Data_Single>]: never; }>(object: I_1): SignatureDescriptor_Data_Single;
};
export declare const SignatureDescriptor_Data_Multi: {
    encode(message: SignatureDescriptor_Data_Multi, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data_Multi;
    fromJSON(object: any): SignatureDescriptor_Data_Multi;
    toJSON(message: SignatureDescriptor_Data_Multi): unknown;
    create<I extends {
        bitarray?: {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } | undefined;
        signatures?: any[] | undefined;
    } & {
        bitarray?: ({
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
        signatures?: (any[] & ({
            single?: {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } & {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & { [K_2 in Exclude<keyof I["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                signatures?: (any[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        signatures?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } & {
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } & { [K_3 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        signatures?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_4 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        signatures?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                signatures?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } & {
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } & { [K_5 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                signatures?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_6 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                signatures?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        signatures?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } & { [K_7 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        signatures?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_8 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        signatures?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                signatures?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } & { [K_9 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                signatures?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_10 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                signatures?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                        signature?: Uint8Array | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        signatures?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_11 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_12 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_13 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                        } & { [K_14 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_15 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_16 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                } & { [K_17 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_18 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                            } & { [K_19 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                        } & { [K_20 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_21 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                    } & { [K_22 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                } & { [K_23 in Exclude<keyof I["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_24 in Exclude<keyof I["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
            } & { [K_25 in Exclude<keyof I["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
        } & { [K_26 in Exclude<keyof I["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_27 in Exclude<keyof I["signatures"], keyof any[]>]: never; }) | undefined;
    } & { [K_28 in Exclude<keyof I, keyof SignatureDescriptor_Data_Multi>]: never; }>(base?: I): SignatureDescriptor_Data_Multi;
    fromPartial<I_1 extends {
        bitarray?: {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } | undefined;
        signatures?: any[] | undefined;
    } & {
        bitarray?: ({
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & { [K_29 in Exclude<keyof I_1["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
        signatures?: (any[] & ({
            single?: {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } & {
                mode?: SignMode | undefined;
                signature?: Uint8Array | undefined;
            } & { [K_30 in Exclude<keyof I_1["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                signatures?: any[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & { [K_31 in Exclude<keyof I_1["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                signatures?: (any[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        signatures?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } & {
                        mode?: SignMode | undefined;
                        signature?: Uint8Array | undefined;
                    } & { [K_32 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        signatures?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_33 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        signatures?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                signatures?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } & {
                                mode?: SignMode | undefined;
                                signature?: Uint8Array | undefined;
                            } & { [K_34 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                signatures?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_35 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                signatures?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        signatures?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                        signature?: Uint8Array | undefined;
                                    } & { [K_36 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        signatures?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_37 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        signatures?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                signatures?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                                signature?: Uint8Array | undefined;
                                            } & { [K_38 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                signatures?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_39 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                signatures?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                        signature?: Uint8Array | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        signatures?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_40 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_41 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_42 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                        } & { [K_43 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_44 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_45 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                                } & { [K_46 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_47 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                            } & { [K_48 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                        } & { [K_49 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_50 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
                    } & { [K_51 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
                } & { [K_52 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_53 in Exclude<keyof I_1["signatures"][number]["multi"]["signatures"], keyof any[]>]: never; }) | undefined;
            } & { [K_54 in Exclude<keyof I_1["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>]: never; }) | undefined;
        } & { [K_55 in Exclude<keyof I_1["signatures"][number], keyof SignatureDescriptor_Data>]: never; })[] & { [K_56 in Exclude<keyof I_1["signatures"], keyof any[]>]: never; }) | undefined;
    } & { [K_57 in Exclude<keyof I_1, keyof SignatureDescriptor_Data_Multi>]: never; }>(object: I_1): SignatureDescriptor_Data_Multi;
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
