import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../base/v1beta1/coin";
import { CompactBitArray } from "../../crypto/multisig/v1beta1/multisig";
import { SignMode } from "../signing/v1beta1/signing";
export declare const protobufPackage = "cosmos.tx.v1beta1";
/** Tx is the standard type used for broadcasting transactions. */
export interface Tx {
    /** body is the processable content of the transaction */
    body: TxBody | undefined;
    /**
     * auth_info is the authorization related content of the transaction,
     * specifically signers, signer modes and fee
     */
    authInfo: AuthInfo | undefined;
    /**
     * signatures is a list of signatures that matches the length and order of
     * AuthInfo's signer_infos to allow connecting signature meta information like
     * public key and signing mode by position.
     */
    signatures: Uint8Array[];
}
/**
 * TxRaw is a variant of Tx that pins the signer's exact binary representation
 * of body and auth_info. This is used for signing, broadcasting and
 * verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 * the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 * as the transaction ID.
 */
export interface TxRaw {
    /**
     * body_bytes is a protobuf serialization of a TxBody that matches the
     * representation in SignDoc.
     */
    bodyBytes: Uint8Array;
    /**
     * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
     * representation in SignDoc.
     */
    authInfoBytes: Uint8Array;
    /**
     * signatures is a list of signatures that matches the length and order of
     * AuthInfo's signer_infos to allow connecting signature meta information like
     * public key and signing mode by position.
     */
    signatures: Uint8Array[];
}
/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDoc {
    /**
     * body_bytes is protobuf serialization of a TxBody that matches the
     * representation in TxRaw.
     */
    bodyBytes: Uint8Array;
    /**
     * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
     * representation in TxRaw.
     */
    authInfoBytes: Uint8Array;
    /**
     * chain_id is the unique identifier of the chain this transaction targets.
     * It prevents signed transactions from being used on another chain by an
     * attacker
     */
    chainId: string;
    /** account_number is the account number of the account in state */
    accountNumber: string;
}
/** TxBody is the body of a transaction that all signers sign over. */
export interface TxBody {
    /**
     * messages is a list of messages to be executed. The required signers of
     * those messages define the number and order of elements in AuthInfo's
     * signer_infos and Tx's signatures. Each required signer address is added to
     * the list only the first time it occurs.
     * By convention, the first required signer (usually from the first message)
     * is referred to as the primary signer and pays the fee for the whole
     * transaction.
     */
    messages: Any[];
    /**
     * memo is any arbitrary note/comment to be added to the transaction.
     * WARNING: in clients, any publicly exposed text should not be called memo,
     * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
     */
    memo: string;
    /**
     * timeout is the block height after which this transaction will not
     * be processed by the chain
     */
    timeoutHeight: string;
    /**
     * extension_options are arbitrary options that can be added by chains
     * when the default options are not sufficient. If any of these are present
     * and can't be handled, the transaction will be rejected
     */
    extensionOptions: Any[];
    /**
     * extension_options are arbitrary options that can be added by chains
     * when the default options are not sufficient. If any of these are present
     * and can't be handled, they will be ignored
     */
    nonCriticalExtensionOptions: Any[];
}
/**
 * AuthInfo describes the fee and signer modes that are used to sign a
 * transaction.
 */
export interface AuthInfo {
    /**
     * signer_infos defines the signing modes for the required signers. The number
     * and order of elements must match the required signers from TxBody's
     * messages. The first element is the primary signer and the one which pays
     * the fee.
     */
    signerInfos: SignerInfo[];
    /**
     * Fee is the fee and gas limit for the transaction. The first signer is the
     * primary signer and the one which pays the fee. The fee can be calculated
     * based on the cost of evaluating the body and doing signature verification
     * of the signers. This can be estimated via simulation.
     */
    fee: Fee | undefined;
}
/**
 * SignerInfo describes the public key and signing mode of a single top-level
 * signer.
 */
export interface SignerInfo {
    /**
     * public_key is the public key of the signer. It is optional for accounts
     * that already exist in state. If unset, the verifier can use the required \
     * signer address for this position and lookup the public key.
     */
    publicKey: Any | undefined;
    /**
     * mode_info describes the signing mode of the signer and is a nested
     * structure to support nested multisig pubkey's
     */
    modeInfo: ModeInfo | undefined;
    /**
     * sequence is the sequence of the account, which describes the
     * number of committed transactions signed by a given address. It is used to
     * prevent replay attacks.
     */
    sequence: string;
}
/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface ModeInfo {
    /** single represents a single signer */
    single?: ModeInfo_Single | undefined;
    /** multi represents a nested multisig signer */
    multi?: ModeInfo_Multi | undefined;
}
/**
 * Single is the mode info for a single signer. It is structured as a message
 * to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 * future
 */
export interface ModeInfo_Single {
    /** mode is the signing mode of the single signer */
    mode: SignMode;
}
/** Multi is the mode info for a multisig public key */
export interface ModeInfo_Multi {
    /** bitarray specifies which keys within the multisig are signing */
    bitarray: CompactBitArray | undefined;
    /**
     * mode_infos is the corresponding modes of the signers of the multisig
     * which could include nested multisig public keys
     */
    modeInfos: ModeInfo[];
}
/**
 * Fee includes the amount of coins paid in fees and the maximum
 * gas to be used by the transaction. The ratio yields an effective "gasprice",
 * which must be above some miminum to be accepted into the mempool.
 */
export interface Fee {
    /** amount is the amount of coins to be paid as a fee */
    amount: Coin[];
    /**
     * gas_limit is the maximum gas that can be used in transaction processing
     * before an out of gas error occurs
     */
    gasLimit: string;
    /**
     * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
     * the payer must be a tx signer (and thus have signed this field in AuthInfo).
     * setting this field does *not* change the ordering of required signers for the transaction.
     */
    payer: string;
    /**
     * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
     * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
     * not support fee grants, this will fail
     */
    granter: string;
}
export declare const Tx: {
    encode(message: Tx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Tx;
    fromJSON(object: any): Tx;
    toJSON(message: Tx): unknown;
    create<I extends {
        body?: {
            messages?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            nonCriticalExtensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
        authInfo?: {
            signerInfos?: {
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] | undefined;
            fee?: {
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } | undefined;
        } | undefined;
        signatures?: Uint8Array[] | undefined;
    } & {
        body?: ({
            messages?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            nonCriticalExtensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            messages?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["body"]["messages"][number], keyof Any>]: never; })[] & { [K_1 in Exclude<keyof I["body"]["messages"], keyof {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K_2 in Exclude<keyof I["body"]["extensionOptions"][number], keyof Any>]: never; })[] & { [K_3 in Exclude<keyof I["body"]["extensionOptions"], keyof {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
            nonCriticalExtensionOptions?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I["body"]["nonCriticalExtensionOptions"][number], keyof Any>]: never; })[] & { [K_5 in Exclude<keyof I["body"]["nonCriticalExtensionOptions"], keyof {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["body"], keyof TxBody>]: never; }) | undefined;
        authInfo?: ({
            signerInfos?: {
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] | undefined;
            fee?: {
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } | undefined;
        } & {
            signerInfos?: ({
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] & ({
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
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
                } & { [K_7 in Exclude<keyof I["authInfo"]["signerInfos"][number]["publicKey"], keyof Any>]: never; }) | undefined;
                modeInfo?: ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & { [K_8 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_9 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        modeInfos?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & { [K_10 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_11 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                modeInfos?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & { [K_12 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_13 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        modeInfos?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & { [K_14 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_15 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                modeInfos?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_16 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_17 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_18 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                        } & { [K_19 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_20 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_21 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                } & { [K_22 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_23 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                            } & { [K_24 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                        } & { [K_25 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_26 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                    } & { [K_27 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                } & { [K_28 in Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"], keyof ModeInfo>]: never; }) | undefined;
                sequence?: string | undefined;
            } & { [K_29 in Exclude<keyof I["authInfo"]["signerInfos"][number], keyof SignerInfo>]: never; })[] & { [K_30 in Exclude<keyof I["authInfo"]["signerInfos"], keyof {
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[]>]: never; }) | undefined;
            fee?: ({
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } & {
                amount?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] & ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & { [K_31 in Exclude<keyof I["authInfo"]["fee"]["amount"][number], keyof Coin>]: never; })[] & { [K_32 in Exclude<keyof I["authInfo"]["fee"]["amount"], keyof {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[]>]: never; }) | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } & { [K_33 in Exclude<keyof I["authInfo"]["fee"], keyof Fee>]: never; }) | undefined;
        } & { [K_34 in Exclude<keyof I["authInfo"], keyof AuthInfo>]: never; }) | undefined;
        signatures?: (Uint8Array[] & Uint8Array[] & { [K_35 in Exclude<keyof I["signatures"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_36 in Exclude<keyof I, keyof Tx>]: never; }>(base?: I): Tx;
    fromPartial<I_1 extends {
        body?: {
            messages?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            nonCriticalExtensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
        authInfo?: {
            signerInfos?: {
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] | undefined;
            fee?: {
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } | undefined;
        } | undefined;
        signatures?: Uint8Array[] | undefined;
    } & {
        body?: ({
            messages?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            nonCriticalExtensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            messages?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K_37 in Exclude<keyof I_1["body"]["messages"][number], keyof Any>]: never; })[] & { [K_38 in Exclude<keyof I_1["body"]["messages"], keyof {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K_39 in Exclude<keyof I_1["body"]["extensionOptions"][number], keyof Any>]: never; })[] & { [K_40 in Exclude<keyof I_1["body"]["extensionOptions"], keyof {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
            nonCriticalExtensionOptions?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & { [K_41 in Exclude<keyof I_1["body"]["nonCriticalExtensionOptions"][number], keyof Any>]: never; })[] & { [K_42 in Exclude<keyof I_1["body"]["nonCriticalExtensionOptions"], keyof {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_43 in Exclude<keyof I_1["body"], keyof TxBody>]: never; }) | undefined;
        authInfo?: ({
            signerInfos?: {
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] | undefined;
            fee?: {
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } | undefined;
        } & {
            signerInfos?: ({
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] & ({
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
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
                } & { [K_44 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["publicKey"], keyof Any>]: never; }) | undefined;
                modeInfo?: ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & { [K_45 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_46 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        modeInfos?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & { [K_47 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_48 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                modeInfos?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & { [K_49 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_50 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        modeInfos?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & { [K_51 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_52 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                modeInfos?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_53 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_54 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_55 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                        } & { [K_56 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_57 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_58 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                } & { [K_59 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_60 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                            } & { [K_61 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                        } & { [K_62 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_63 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                    } & { [K_64 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                } & { [K_65 in Exclude<keyof I_1["authInfo"]["signerInfos"][number]["modeInfo"], keyof ModeInfo>]: never; }) | undefined;
                sequence?: string | undefined;
            } & { [K_66 in Exclude<keyof I_1["authInfo"]["signerInfos"][number], keyof SignerInfo>]: never; })[] & { [K_67 in Exclude<keyof I_1["authInfo"]["signerInfos"], keyof {
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[]>]: never; }) | undefined;
            fee?: ({
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } & {
                amount?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] & ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & { [K_68 in Exclude<keyof I_1["authInfo"]["fee"]["amount"][number], keyof Coin>]: never; })[] & { [K_69 in Exclude<keyof I_1["authInfo"]["fee"]["amount"], keyof {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[]>]: never; }) | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } & { [K_70 in Exclude<keyof I_1["authInfo"]["fee"], keyof Fee>]: never; }) | undefined;
        } & { [K_71 in Exclude<keyof I_1["authInfo"], keyof AuthInfo>]: never; }) | undefined;
        signatures?: (Uint8Array[] & Uint8Array[] & { [K_72 in Exclude<keyof I_1["signatures"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_73 in Exclude<keyof I_1, keyof Tx>]: never; }>(object: I_1): Tx;
};
export declare const TxRaw: {
    encode(message: TxRaw, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxRaw;
    fromJSON(object: any): TxRaw;
    toJSON(message: TxRaw): unknown;
    create<I extends {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        signatures?: Uint8Array[] | undefined;
    } & {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        signatures?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["signatures"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof TxRaw>]: never; }>(base?: I): TxRaw;
    fromPartial<I_1 extends {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        signatures?: Uint8Array[] | undefined;
    } & {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        signatures?: (Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I_1["signatures"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof TxRaw>]: never; }>(object: I_1): TxRaw;
};
export declare const SignDoc: {
    encode(message: SignDoc, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignDoc;
    fromJSON(object: any): SignDoc;
    toJSON(message: SignDoc): unknown;
    create<I extends {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        chainId?: string | undefined;
        accountNumber?: string | undefined;
    } & {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        chainId?: string | undefined;
        accountNumber?: string | undefined;
    } & { [K in Exclude<keyof I, keyof SignDoc>]: never; }>(base?: I): SignDoc;
    fromPartial<I_1 extends {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        chainId?: string | undefined;
        accountNumber?: string | undefined;
    } & {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        chainId?: string | undefined;
        accountNumber?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SignDoc>]: never; }>(object: I_1): SignDoc;
};
export declare const TxBody: {
    encode(message: TxBody, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxBody;
    fromJSON(object: any): TxBody;
    toJSON(message: TxBody): unknown;
    create<I extends {
        messages?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
        memo?: string | undefined;
        timeoutHeight?: string | undefined;
        extensionOptions?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
        nonCriticalExtensionOptions?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        messages?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["messages"][number], keyof Any>]: never; })[] & { [K_1 in Exclude<keyof I["messages"], keyof {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
        memo?: string | undefined;
        timeoutHeight?: string | undefined;
        extensionOptions?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["extensionOptions"][number], keyof Any>]: never; })[] & { [K_3 in Exclude<keyof I["extensionOptions"], keyof {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
        nonCriticalExtensionOptions?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K_4 in Exclude<keyof I["nonCriticalExtensionOptions"][number], keyof Any>]: never; })[] & { [K_5 in Exclude<keyof I["nonCriticalExtensionOptions"], keyof {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof TxBody>]: never; }>(base?: I): TxBody;
    fromPartial<I_1 extends {
        messages?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
        memo?: string | undefined;
        timeoutHeight?: string | undefined;
        extensionOptions?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
        nonCriticalExtensionOptions?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        messages?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K_7 in Exclude<keyof I_1["messages"][number], keyof Any>]: never; })[] & { [K_8 in Exclude<keyof I_1["messages"], keyof {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
        memo?: string | undefined;
        timeoutHeight?: string | undefined;
        extensionOptions?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K_9 in Exclude<keyof I_1["extensionOptions"][number], keyof Any>]: never; })[] & { [K_10 in Exclude<keyof I_1["extensionOptions"], keyof {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
        nonCriticalExtensionOptions?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & { [K_11 in Exclude<keyof I_1["nonCriticalExtensionOptions"][number], keyof Any>]: never; })[] & { [K_12 in Exclude<keyof I_1["nonCriticalExtensionOptions"], keyof {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof TxBody>]: never; }>(object: I_1): TxBody;
};
export declare const AuthInfo: {
    encode(message: AuthInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthInfo;
    fromJSON(object: any): AuthInfo;
    toJSON(message: AuthInfo): unknown;
    create<I extends {
        signerInfos?: {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] | undefined;
        fee?: {
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } | undefined;
    } & {
        signerInfos?: ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] & ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
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
            } & { [K in Exclude<keyof I["signerInfos"][number]["publicKey"], keyof Any>]: never; }) | undefined;
            modeInfo?: ({
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                } & {
                    mode?: SignMode | undefined;
                } & { [K_1 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; }) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & { [K_2 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                    modeInfos?: (any[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                        } & {
                            mode?: SignMode | undefined;
                        } & { [K_3 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & { [K_4 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                            modeInfos?: (any[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                } & { [K_5 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & { [K_6 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                    modeInfos?: (any[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                        } & { [K_7 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & { [K_8 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                            modeInfos?: (any[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                } & any & { [K_9 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } & any & { [K_10 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                            } & { [K_11 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_12 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                        } & { [K_13 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                    } & { [K_14 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_15 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                } & { [K_16 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                            } & { [K_17 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_18 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                        } & { [K_19 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                    } & { [K_20 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_21 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                } & { [K_22 in Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
            } & { [K_23 in Exclude<keyof I["signerInfos"][number]["modeInfo"], keyof ModeInfo>]: never; }) | undefined;
            sequence?: string | undefined;
        } & { [K_24 in Exclude<keyof I["signerInfos"][number], keyof SignerInfo>]: never; })[] & { [K_25 in Exclude<keyof I["signerInfos"], keyof {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[]>]: never; }) | undefined;
        fee?: ({
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } & {
            amount?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            }[] & ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_26 in Exclude<keyof I["fee"]["amount"][number], keyof Coin>]: never; })[] & { [K_27 in Exclude<keyof I["fee"]["amount"], keyof {
                denom?: string | undefined;
                amount?: string | undefined;
            }[]>]: never; }) | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } & { [K_28 in Exclude<keyof I["fee"], keyof Fee>]: never; }) | undefined;
    } & { [K_29 in Exclude<keyof I, keyof AuthInfo>]: never; }>(base?: I): AuthInfo;
    fromPartial<I_1 extends {
        signerInfos?: {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] | undefined;
        fee?: {
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } | undefined;
    } & {
        signerInfos?: ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] & ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
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
            } & { [K_30 in Exclude<keyof I_1["signerInfos"][number]["publicKey"], keyof Any>]: never; }) | undefined;
            modeInfo?: ({
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                } & {
                    mode?: SignMode | undefined;
                } & { [K_31 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; }) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & { [K_32 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                    modeInfos?: (any[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                        } & {
                            mode?: SignMode | undefined;
                        } & { [K_33 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & { [K_34 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                            modeInfos?: (any[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                } & { [K_35 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & { [K_36 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                    modeInfos?: (any[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                        } & { [K_37 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & { [K_38 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                            modeInfos?: (any[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                } & any & { [K_39 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } & any & { [K_40 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                            } & { [K_41 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_42 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                        } & { [K_43 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                    } & { [K_44 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_45 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                } & { [K_46 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                            } & { [K_47 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_48 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                        } & { [K_49 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                    } & { [K_50 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_51 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                } & { [K_52 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
            } & { [K_53 in Exclude<keyof I_1["signerInfos"][number]["modeInfo"], keyof ModeInfo>]: never; }) | undefined;
            sequence?: string | undefined;
        } & { [K_54 in Exclude<keyof I_1["signerInfos"][number], keyof SignerInfo>]: never; })[] & { [K_55 in Exclude<keyof I_1["signerInfos"], keyof {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[]>]: never; }) | undefined;
        fee?: ({
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } & {
            amount?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            }[] & ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & { [K_56 in Exclude<keyof I_1["fee"]["amount"][number], keyof Coin>]: never; })[] & { [K_57 in Exclude<keyof I_1["fee"]["amount"], keyof {
                denom?: string | undefined;
                amount?: string | undefined;
            }[]>]: never; }) | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } & { [K_58 in Exclude<keyof I_1["fee"], keyof Fee>]: never; }) | undefined;
    } & { [K_59 in Exclude<keyof I_1, keyof AuthInfo>]: never; }>(object: I_1): AuthInfo;
};
export declare const SignerInfo: {
    encode(message: SignerInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignerInfo;
    fromJSON(object: any): SignerInfo;
    toJSON(message: SignerInfo): unknown;
    create<I extends {
        publicKey?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        modeInfo?: {
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
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
        modeInfo?: ({
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
            } & {
                mode?: SignMode | undefined;
            } & { [K_1 in Exclude<keyof I["modeInfo"]["single"], "mode">]: never; }) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & { [K_2 in Exclude<keyof I["modeInfo"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                modeInfos?: (any[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & { [K_3 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_4 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        modeInfos?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & { [K_5 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_6 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                modeInfos?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & { [K_7 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_8 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        modeInfos?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & { [K_9 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_10 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                modeInfos?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_11 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_12 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_13 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                        } & { [K_14 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_15 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_16 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                } & { [K_17 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_18 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                            } & { [K_19 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                        } & { [K_20 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_21 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                    } & { [K_22 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                } & { [K_23 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_24 in Exclude<keyof I["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
            } & { [K_25 in Exclude<keyof I["modeInfo"]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
        } & { [K_26 in Exclude<keyof I["modeInfo"], keyof ModeInfo>]: never; }) | undefined;
        sequence?: string | undefined;
    } & { [K_27 in Exclude<keyof I, keyof SignerInfo>]: never; }>(base?: I): SignerInfo;
    fromPartial<I_1 extends {
        publicKey?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        modeInfo?: {
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
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
        modeInfo?: ({
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
            } & {
                mode?: SignMode | undefined;
            } & { [K_29 in Exclude<keyof I_1["modeInfo"]["single"], "mode">]: never; }) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & { [K_30 in Exclude<keyof I_1["modeInfo"]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                modeInfos?: (any[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & { [K_31 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_32 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        modeInfos?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & { [K_33 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_34 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                modeInfos?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & { [K_35 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_36 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        modeInfos?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & { [K_37 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_38 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                modeInfos?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_39 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_40 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_41 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                        } & { [K_42 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_43 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_44 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                } & { [K_45 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_46 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                            } & { [K_47 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                        } & { [K_48 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_49 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                    } & { [K_50 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                } & { [K_51 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_52 in Exclude<keyof I_1["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
            } & { [K_53 in Exclude<keyof I_1["modeInfo"]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
        } & { [K_54 in Exclude<keyof I_1["modeInfo"], keyof ModeInfo>]: never; }) | undefined;
        sequence?: string | undefined;
    } & { [K_55 in Exclude<keyof I_1, keyof SignerInfo>]: never; }>(object: I_1): SignerInfo;
};
export declare const ModeInfo: {
    encode(message: ModeInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo;
    fromJSON(object: any): ModeInfo;
    toJSON(message: ModeInfo): unknown;
    create<I extends {
        single?: {
            mode?: SignMode | undefined;
        } | undefined;
        multi?: {
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            modeInfos?: any[] | undefined;
        } | undefined;
    } & {
        single?: ({
            mode?: SignMode | undefined;
        } & {
            mode?: SignMode | undefined;
        } & { [K in Exclude<keyof I["single"], "mode">]: never; }) | undefined;
        multi?: ({
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            modeInfos?: any[] | undefined;
        } & {
            bitarray?: ({
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
            modeInfos?: (any[] & ({
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                } & {
                    mode?: SignMode | undefined;
                } & { [K_2 in Exclude<keyof I["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & { [K_3 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                    modeInfos?: (any[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                        } & {
                            mode?: SignMode | undefined;
                        } & { [K_4 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & { [K_5 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                            modeInfos?: (any[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                } & { [K_6 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & { [K_7 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                    modeInfos?: (any[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                        } & { [K_8 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & { [K_9 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                            modeInfos?: (any[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                } & any & { [K_10 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } & any & { [K_11 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                            } & { [K_12 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_13 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                        } & { [K_14 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                    } & { [K_15 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_16 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                } & { [K_17 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                            } & { [K_18 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_19 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                        } & { [K_20 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                    } & { [K_21 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_22 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                } & { [K_23 in Exclude<keyof I["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
            } & { [K_24 in Exclude<keyof I["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_25 in Exclude<keyof I["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
        } & { [K_26 in Exclude<keyof I["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
    } & { [K_27 in Exclude<keyof I, keyof ModeInfo>]: never; }>(base?: I): ModeInfo;
    fromPartial<I_1 extends {
        single?: {
            mode?: SignMode | undefined;
        } | undefined;
        multi?: {
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            modeInfos?: any[] | undefined;
        } | undefined;
    } & {
        single?: ({
            mode?: SignMode | undefined;
        } & {
            mode?: SignMode | undefined;
        } & { [K_28 in Exclude<keyof I_1["single"], "mode">]: never; }) | undefined;
        multi?: ({
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            modeInfos?: any[] | undefined;
        } & {
            bitarray?: ({
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & { [K_29 in Exclude<keyof I_1["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
            modeInfos?: (any[] & ({
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                } & {
                    mode?: SignMode | undefined;
                } & { [K_30 in Exclude<keyof I_1["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & { [K_31 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                    modeInfos?: (any[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                        } & {
                            mode?: SignMode | undefined;
                        } & { [K_32 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & { [K_33 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                            modeInfos?: (any[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                } & { [K_34 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & { [K_35 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                    modeInfos?: (any[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                        } & { [K_36 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & { [K_37 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                            modeInfos?: (any[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                } & any & { [K_38 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } & any & { [K_39 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                            } & { [K_40 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_41 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                        } & { [K_42 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                    } & { [K_43 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_44 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                } & { [K_45 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                            } & { [K_46 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_47 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                        } & { [K_48 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                    } & { [K_49 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_50 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                } & { [K_51 in Exclude<keyof I_1["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
            } & { [K_52 in Exclude<keyof I_1["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_53 in Exclude<keyof I_1["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
        } & { [K_54 in Exclude<keyof I_1["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
    } & { [K_55 in Exclude<keyof I_1, keyof ModeInfo>]: never; }>(object: I_1): ModeInfo;
};
export declare const ModeInfo_Single: {
    encode(message: ModeInfo_Single, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo_Single;
    fromJSON(object: any): ModeInfo_Single;
    toJSON(message: ModeInfo_Single): unknown;
    create<I extends {
        mode?: SignMode | undefined;
    } & {
        mode?: SignMode | undefined;
    } & { [K in Exclude<keyof I, "mode">]: never; }>(base?: I): ModeInfo_Single;
    fromPartial<I_1 extends {
        mode?: SignMode | undefined;
    } & {
        mode?: SignMode | undefined;
    } & { [K_1 in Exclude<keyof I_1, "mode">]: never; }>(object: I_1): ModeInfo_Single;
};
export declare const ModeInfo_Multi: {
    encode(message: ModeInfo_Multi, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo_Multi;
    fromJSON(object: any): ModeInfo_Multi;
    toJSON(message: ModeInfo_Multi): unknown;
    create<I extends {
        bitarray?: {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } | undefined;
        modeInfos?: any[] | undefined;
    } & {
        bitarray?: ({
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
        modeInfos?: (any[] & ({
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
            } & {
                mode?: SignMode | undefined;
            } & { [K_1 in Exclude<keyof I["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & { [K_2 in Exclude<keyof I["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                modeInfos?: (any[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & { [K_3 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_4 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        modeInfos?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & { [K_5 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_6 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                modeInfos?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & { [K_7 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_8 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        modeInfos?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & { [K_9 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_10 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                modeInfos?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_11 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_12 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_13 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                        } & { [K_14 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_15 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_16 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                } & { [K_17 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_18 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                            } & { [K_19 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                        } & { [K_20 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_21 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                    } & { [K_22 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                } & { [K_23 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_24 in Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
            } & { [K_25 in Exclude<keyof I["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
        } & { [K_26 in Exclude<keyof I["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_27 in Exclude<keyof I["modeInfos"], keyof any[]>]: never; }) | undefined;
    } & { [K_28 in Exclude<keyof I, keyof ModeInfo_Multi>]: never; }>(base?: I): ModeInfo_Multi;
    fromPartial<I_1 extends {
        bitarray?: {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } | undefined;
        modeInfos?: any[] | undefined;
    } & {
        bitarray?: ({
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & { [K_29 in Exclude<keyof I_1["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
        modeInfos?: (any[] & ({
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
            } & {
                mode?: SignMode | undefined;
            } & { [K_30 in Exclude<keyof I_1["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & { [K_31 in Exclude<keyof I_1["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                modeInfos?: (any[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & { [K_32 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & { [K_33 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                        modeInfos?: (any[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & { [K_34 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & { [K_35 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                modeInfos?: (any[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & { [K_36 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & { [K_37 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                        modeInfos?: (any[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & { [K_38 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; }) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & { [K_39 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof CompactBitArray>]: never; }) | undefined;
                                                modeInfos?: (any[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & { [K_40 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_41 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                            } & { [K_42 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                        } & { [K_43 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_44 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                                    } & { [K_45 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                                } & { [K_46 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_47 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                            } & { [K_48 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                        } & { [K_49 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_50 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
                    } & { [K_51 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
                } & { [K_52 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_53 in Exclude<keyof I_1["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; }) | undefined;
            } & { [K_54 in Exclude<keyof I_1["modeInfos"][number]["multi"], keyof ModeInfo_Multi>]: never; }) | undefined;
        } & { [K_55 in Exclude<keyof I_1["modeInfos"][number], keyof ModeInfo>]: never; })[] & { [K_56 in Exclude<keyof I_1["modeInfos"], keyof any[]>]: never; }) | undefined;
    } & { [K_57 in Exclude<keyof I_1, keyof ModeInfo_Multi>]: never; }>(object: I_1): ModeInfo_Multi;
};
export declare const Fee: {
    encode(message: Fee, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Fee;
    fromJSON(object: any): Fee;
    toJSON(message: Fee): unknown;
    create<I extends {
        amount?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
        gasLimit?: string | undefined;
        payer?: string | undefined;
        granter?: string | undefined;
    } & {
        amount?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K in Exclude<keyof I["amount"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amount"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
        gasLimit?: string | undefined;
        payer?: string | undefined;
        granter?: string | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Fee>]: never; }>(base?: I): Fee;
    fromPartial<I_1 extends {
        amount?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
        gasLimit?: string | undefined;
        payer?: string | undefined;
        granter?: string | undefined;
    } & {
        amount?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["amount"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amount"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>]: never; }) | undefined;
        gasLimit?: string | undefined;
        payer?: string | undefined;
        granter?: string | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof Fee>]: never; }>(object: I_1): Fee;
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
