import _m0 from "protobufjs/minimal";
import { Proof } from "../crypto/proof";
import { Consensus } from "../version/types";
import { ValidatorSet } from "./validator";
export declare const protobufPackage = "tendermint.types";
/** BlockIdFlag indicates which BlcokID the signature is for */
export declare enum BlockIDFlag {
    BLOCK_ID_FLAG_UNKNOWN = 0,
    BLOCK_ID_FLAG_ABSENT = 1,
    BLOCK_ID_FLAG_COMMIT = 2,
    BLOCK_ID_FLAG_NIL = 3,
    UNRECOGNIZED = -1
}
export declare function blockIDFlagFromJSON(object: any): BlockIDFlag;
export declare function blockIDFlagToJSON(object: BlockIDFlag): string;
/** SignedMsgType is a type of signed message in the consensus. */
export declare enum SignedMsgType {
    SIGNED_MSG_TYPE_UNKNOWN = 0,
    /** SIGNED_MSG_TYPE_PREVOTE - Votes */
    SIGNED_MSG_TYPE_PREVOTE = 1,
    SIGNED_MSG_TYPE_PRECOMMIT = 2,
    /** SIGNED_MSG_TYPE_PROPOSAL - Proposals */
    SIGNED_MSG_TYPE_PROPOSAL = 32,
    UNRECOGNIZED = -1
}
export declare function signedMsgTypeFromJSON(object: any): SignedMsgType;
export declare function signedMsgTypeToJSON(object: SignedMsgType): string;
/** PartsetHeader */
export interface PartSetHeader {
    total: number;
    hash: Uint8Array;
}
export interface Part {
    index: number;
    bytes: Uint8Array;
    proof: Proof | undefined;
}
/** BlockID */
export interface BlockID {
    hash: Uint8Array;
    partSetHeader: PartSetHeader | undefined;
}
/** Header defines the structure of a Tendermint block header. */
export interface Header {
    /** basic block info */
    version: Consensus | undefined;
    chainId: string;
    height: string;
    time: Date | undefined;
    /** prev block info */
    lastBlockId: BlockID | undefined;
    /** hashes of block data */
    lastCommitHash: Uint8Array;
    /** transactions */
    dataHash: Uint8Array;
    /** hashes from the app output from the prev block */
    validatorsHash: Uint8Array;
    /** validators for the next block */
    nextValidatorsHash: Uint8Array;
    /** consensus params for current block */
    consensusHash: Uint8Array;
    /** state after txs from the previous block */
    appHash: Uint8Array;
    /** root hash of all results from the txs from the previous block */
    lastResultsHash: Uint8Array;
    /** consensus info */
    evidenceHash: Uint8Array;
    /** original proposer of the block */
    proposerAddress: Uint8Array;
}
/** Data contains the set of transactions included in the block */
export interface Data {
    /**
     * Txs that will be applied by state @ block.Height+1.
     * NOTE: not all txs here are valid.  We're just agreeing on the order first.
     * This means that block.AppHash does not include these txs.
     */
    txs: Uint8Array[];
}
/**
 * Vote represents a prevote, precommit, or commit vote from validators for
 * consensus.
 */
export interface Vote {
    type: SignedMsgType;
    height: string;
    round: number;
    /** zero if vote is nil. */
    blockId: BlockID | undefined;
    timestamp: Date | undefined;
    validatorAddress: Uint8Array;
    validatorIndex: number;
    signature: Uint8Array;
}
/** Commit contains the evidence that a block was committed by a set of validators. */
export interface Commit {
    height: string;
    round: number;
    blockId: BlockID | undefined;
    signatures: CommitSig[];
}
/** CommitSig is a part of the Vote included in a Commit. */
export interface CommitSig {
    blockIdFlag: BlockIDFlag;
    validatorAddress: Uint8Array;
    timestamp: Date | undefined;
    signature: Uint8Array;
}
export interface Proposal {
    type: SignedMsgType;
    height: string;
    round: number;
    polRound: number;
    blockId: BlockID | undefined;
    timestamp: Date | undefined;
    signature: Uint8Array;
}
export interface SignedHeader {
    header: Header | undefined;
    commit: Commit | undefined;
}
export interface LightBlock {
    signedHeader: SignedHeader | undefined;
    validatorSet: ValidatorSet | undefined;
}
export interface BlockMeta {
    blockId: BlockID | undefined;
    blockSize: string;
    header: Header | undefined;
    numTxs: string;
}
/** TxProof represents a Merkle proof of the presence of a transaction in the Merkle tree. */
export interface TxProof {
    rootHash: Uint8Array;
    data: Uint8Array;
    proof: Proof | undefined;
}
export declare const PartSetHeader: {
    encode(message: PartSetHeader, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PartSetHeader;
    fromJSON(object: any): PartSetHeader;
    toJSON(message: PartSetHeader): unknown;
    create<I extends {
        total?: number | undefined;
        hash?: Uint8Array | undefined;
    } & {
        total?: number | undefined;
        hash?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof PartSetHeader>]: never; }>(base?: I): PartSetHeader;
    fromPartial<I_1 extends {
        total?: number | undefined;
        hash?: Uint8Array | undefined;
    } & {
        total?: number | undefined;
        hash?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof PartSetHeader>]: never; }>(object: I_1): PartSetHeader;
};
export declare const Part: {
    encode(message: Part, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Part;
    fromJSON(object: any): Part;
    toJSON(message: Part): unknown;
    create<I extends {
        index?: number | undefined;
        bytes?: Uint8Array | undefined;
        proof?: {
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        } | undefined;
    } & {
        index?: number | undefined;
        bytes?: Uint8Array | undefined;
        proof?: ({
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        } & {
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["proof"]["aunts"], keyof Uint8Array[]>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["proof"], keyof Proof>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Part>]: never; }>(base?: I): Part;
    fromPartial<I_1 extends {
        index?: number | undefined;
        bytes?: Uint8Array | undefined;
        proof?: {
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        } | undefined;
    } & {
        index?: number | undefined;
        bytes?: Uint8Array | undefined;
        proof?: ({
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        } & {
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: (Uint8Array[] & Uint8Array[] & { [K_3 in Exclude<keyof I_1["proof"]["aunts"], keyof Uint8Array[]>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["proof"], keyof Proof>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof Part>]: never; }>(object: I_1): Part;
};
export declare const BlockID: {
    encode(message: BlockID, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BlockID;
    fromJSON(object: any): BlockID;
    toJSON(message: BlockID): unknown;
    create<I extends {
        hash?: Uint8Array | undefined;
        partSetHeader?: {
            total?: number | undefined;
            hash?: Uint8Array | undefined;
        } | undefined;
    } & {
        hash?: Uint8Array | undefined;
        partSetHeader?: ({
            total?: number | undefined;
            hash?: Uint8Array | undefined;
        } & {
            total?: number | undefined;
            hash?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof BlockID>]: never; }>(base?: I): BlockID;
    fromPartial<I_1 extends {
        hash?: Uint8Array | undefined;
        partSetHeader?: {
            total?: number | undefined;
            hash?: Uint8Array | undefined;
        } | undefined;
    } & {
        hash?: Uint8Array | undefined;
        partSetHeader?: ({
            total?: number | undefined;
            hash?: Uint8Array | undefined;
        } & {
            total?: number | undefined;
            hash?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I_1["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof BlockID>]: never; }>(object: I_1): BlockID;
};
export declare const Header: {
    encode(message: Header, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Header;
    fromJSON(object: any): Header;
    toJSON(message: Header): unknown;
    create<I extends {
        version?: {
            block?: string | undefined;
            app?: string | undefined;
        } | undefined;
        chainId?: string | undefined;
        height?: string | undefined;
        time?: Date | undefined;
        lastBlockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        lastCommitHash?: Uint8Array | undefined;
        dataHash?: Uint8Array | undefined;
        validatorsHash?: Uint8Array | undefined;
        nextValidatorsHash?: Uint8Array | undefined;
        consensusHash?: Uint8Array | undefined;
        appHash?: Uint8Array | undefined;
        lastResultsHash?: Uint8Array | undefined;
        evidenceHash?: Uint8Array | undefined;
        proposerAddress?: Uint8Array | undefined;
    } & {
        version?: ({
            block?: string | undefined;
            app?: string | undefined;
        } & {
            block?: string | undefined;
            app?: string | undefined;
        } & { [K in Exclude<keyof I["version"], keyof Consensus>]: never; }) | undefined;
        chainId?: string | undefined;
        height?: string | undefined;
        time?: Date | undefined;
        lastBlockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K_1 in Exclude<keyof I["lastBlockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["lastBlockId"], keyof BlockID>]: never; }) | undefined;
        lastCommitHash?: Uint8Array | undefined;
        dataHash?: Uint8Array | undefined;
        validatorsHash?: Uint8Array | undefined;
        nextValidatorsHash?: Uint8Array | undefined;
        consensusHash?: Uint8Array | undefined;
        appHash?: Uint8Array | undefined;
        lastResultsHash?: Uint8Array | undefined;
        evidenceHash?: Uint8Array | undefined;
        proposerAddress?: Uint8Array | undefined;
    } & { [K_3 in Exclude<keyof I, keyof Header>]: never; }>(base?: I): Header;
    fromPartial<I_1 extends {
        version?: {
            block?: string | undefined;
            app?: string | undefined;
        } | undefined;
        chainId?: string | undefined;
        height?: string | undefined;
        time?: Date | undefined;
        lastBlockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        lastCommitHash?: Uint8Array | undefined;
        dataHash?: Uint8Array | undefined;
        validatorsHash?: Uint8Array | undefined;
        nextValidatorsHash?: Uint8Array | undefined;
        consensusHash?: Uint8Array | undefined;
        appHash?: Uint8Array | undefined;
        lastResultsHash?: Uint8Array | undefined;
        evidenceHash?: Uint8Array | undefined;
        proposerAddress?: Uint8Array | undefined;
    } & {
        version?: ({
            block?: string | undefined;
            app?: string | undefined;
        } & {
            block?: string | undefined;
            app?: string | undefined;
        } & { [K_4 in Exclude<keyof I_1["version"], keyof Consensus>]: never; }) | undefined;
        chainId?: string | undefined;
        height?: string | undefined;
        time?: Date | undefined;
        lastBlockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K_5 in Exclude<keyof I_1["lastBlockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I_1["lastBlockId"], keyof BlockID>]: never; }) | undefined;
        lastCommitHash?: Uint8Array | undefined;
        dataHash?: Uint8Array | undefined;
        validatorsHash?: Uint8Array | undefined;
        nextValidatorsHash?: Uint8Array | undefined;
        consensusHash?: Uint8Array | undefined;
        appHash?: Uint8Array | undefined;
        lastResultsHash?: Uint8Array | undefined;
        evidenceHash?: Uint8Array | undefined;
        proposerAddress?: Uint8Array | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof Header>]: never; }>(object: I_1): Header;
};
export declare const Data: {
    encode(message: Data, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Data;
    fromJSON(object: any): Data;
    toJSON(message: Data): unknown;
    create<I extends {
        txs?: Uint8Array[] | undefined;
    } & {
        txs?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["txs"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "txs">]: never; }>(base?: I): Data;
    fromPartial<I_1 extends {
        txs?: Uint8Array[] | undefined;
    } & {
        txs?: (Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I_1["txs"], keyof Uint8Array[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, "txs">]: never; }>(object: I_1): Data;
};
export declare const Vote: {
    encode(message: Vote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Vote;
    fromJSON(object: any): Vote;
    toJSON(message: Vote): unknown;
    create<I extends {
        type?: SignedMsgType | undefined;
        height?: string | undefined;
        round?: number | undefined;
        blockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        timestamp?: Date | undefined;
        validatorAddress?: Uint8Array | undefined;
        validatorIndex?: number | undefined;
        signature?: Uint8Array | undefined;
    } & {
        type?: SignedMsgType | undefined;
        height?: string | undefined;
        round?: number | undefined;
        blockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["blockId"], keyof BlockID>]: never; }) | undefined;
        timestamp?: Date | undefined;
        validatorAddress?: Uint8Array | undefined;
        validatorIndex?: number | undefined;
        signature?: Uint8Array | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Vote>]: never; }>(base?: I): Vote;
    fromPartial<I_1 extends {
        type?: SignedMsgType | undefined;
        height?: string | undefined;
        round?: number | undefined;
        blockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        timestamp?: Date | undefined;
        validatorAddress?: Uint8Array | undefined;
        validatorIndex?: number | undefined;
        signature?: Uint8Array | undefined;
    } & {
        type?: SignedMsgType | undefined;
        height?: string | undefined;
        round?: number | undefined;
        blockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K_3 in Exclude<keyof I_1["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["blockId"], keyof BlockID>]: never; }) | undefined;
        timestamp?: Date | undefined;
        validatorAddress?: Uint8Array | undefined;
        validatorIndex?: number | undefined;
        signature?: Uint8Array | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof Vote>]: never; }>(object: I_1): Vote;
};
export declare const Commit: {
    encode(message: Commit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Commit;
    fromJSON(object: any): Commit;
    toJSON(message: Commit): unknown;
    create<I extends {
        height?: string | undefined;
        round?: number | undefined;
        blockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        signatures?: {
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        height?: string | undefined;
        round?: number | undefined;
        blockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["blockId"], keyof BlockID>]: never; }) | undefined;
        signatures?: ({
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        }[] & ({
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        } & {
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I["signatures"][number], keyof CommitSig>]: never; })[] & { [K_3 in Exclude<keyof I["signatures"], keyof {
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof Commit>]: never; }>(base?: I): Commit;
    fromPartial<I_1 extends {
        height?: string | undefined;
        round?: number | undefined;
        blockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        signatures?: {
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        height?: string | undefined;
        round?: number | undefined;
        blockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K_5 in Exclude<keyof I_1["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I_1["blockId"], keyof BlockID>]: never; }) | undefined;
        signatures?: ({
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        }[] & ({
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        } & {
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        } & { [K_7 in Exclude<keyof I_1["signatures"][number], keyof CommitSig>]: never; })[] & { [K_8 in Exclude<keyof I_1["signatures"], keyof {
            blockIdFlag?: BlockIDFlag | undefined;
            validatorAddress?: Uint8Array | undefined;
            timestamp?: Date | undefined;
            signature?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof Commit>]: never; }>(object: I_1): Commit;
};
export declare const CommitSig: {
    encode(message: CommitSig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CommitSig;
    fromJSON(object: any): CommitSig;
    toJSON(message: CommitSig): unknown;
    create<I extends {
        blockIdFlag?: BlockIDFlag | undefined;
        validatorAddress?: Uint8Array | undefined;
        timestamp?: Date | undefined;
        signature?: Uint8Array | undefined;
    } & {
        blockIdFlag?: BlockIDFlag | undefined;
        validatorAddress?: Uint8Array | undefined;
        timestamp?: Date | undefined;
        signature?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof CommitSig>]: never; }>(base?: I): CommitSig;
    fromPartial<I_1 extends {
        blockIdFlag?: BlockIDFlag | undefined;
        validatorAddress?: Uint8Array | undefined;
        timestamp?: Date | undefined;
        signature?: Uint8Array | undefined;
    } & {
        blockIdFlag?: BlockIDFlag | undefined;
        validatorAddress?: Uint8Array | undefined;
        timestamp?: Date | undefined;
        signature?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof CommitSig>]: never; }>(object: I_1): CommitSig;
};
export declare const Proposal: {
    encode(message: Proposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Proposal;
    fromJSON(object: any): Proposal;
    toJSON(message: Proposal): unknown;
    create<I extends {
        type?: SignedMsgType | undefined;
        height?: string | undefined;
        round?: number | undefined;
        polRound?: number | undefined;
        blockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        timestamp?: Date | undefined;
        signature?: Uint8Array | undefined;
    } & {
        type?: SignedMsgType | undefined;
        height?: string | undefined;
        round?: number | undefined;
        polRound?: number | undefined;
        blockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["blockId"], keyof BlockID>]: never; }) | undefined;
        timestamp?: Date | undefined;
        signature?: Uint8Array | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Proposal>]: never; }>(base?: I): Proposal;
    fromPartial<I_1 extends {
        type?: SignedMsgType | undefined;
        height?: string | undefined;
        round?: number | undefined;
        polRound?: number | undefined;
        blockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        timestamp?: Date | undefined;
        signature?: Uint8Array | undefined;
    } & {
        type?: SignedMsgType | undefined;
        height?: string | undefined;
        round?: number | undefined;
        polRound?: number | undefined;
        blockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K_3 in Exclude<keyof I_1["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["blockId"], keyof BlockID>]: never; }) | undefined;
        timestamp?: Date | undefined;
        signature?: Uint8Array | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof Proposal>]: never; }>(object: I_1): Proposal;
};
export declare const SignedHeader: {
    encode(message: SignedHeader, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignedHeader;
    fromJSON(object: any): SignedHeader;
    toJSON(message: SignedHeader): unknown;
    create<I extends {
        header?: {
            version?: {
                block?: string | undefined;
                app?: string | undefined;
            } | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } | undefined;
        commit?: {
            height?: string | undefined;
            round?: number | undefined;
            blockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            signatures?: {
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        header?: ({
            version?: {
                block?: string | undefined;
                app?: string | undefined;
            } | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & {
            version?: ({
                block?: string | undefined;
                app?: string | undefined;
            } & {
                block?: string | undefined;
                app?: string | undefined;
            } & { [K in Exclude<keyof I["header"]["version"], keyof Consensus>]: never; }) | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: ({
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } & {
                hash?: Uint8Array | undefined;
                partSetHeader?: ({
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & { [K_1 in Exclude<keyof I["header"]["lastBlockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["header"]["lastBlockId"], keyof BlockID>]: never; }) | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & { [K_3 in Exclude<keyof I["header"], keyof Header>]: never; }) | undefined;
        commit?: ({
            height?: string | undefined;
            round?: number | undefined;
            blockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            signatures?: {
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            height?: string | undefined;
            round?: number | undefined;
            blockId?: ({
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } & {
                hash?: Uint8Array | undefined;
                partSetHeader?: ({
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & { [K_4 in Exclude<keyof I["commit"]["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
            } & { [K_5 in Exclude<keyof I["commit"]["blockId"], keyof BlockID>]: never; }) | undefined;
            signatures?: ({
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            }[] & ({
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            } & {
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            } & { [K_6 in Exclude<keyof I["commit"]["signatures"][number], keyof CommitSig>]: never; })[] & { [K_7 in Exclude<keyof I["commit"]["signatures"], keyof {
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["commit"], keyof Commit>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, keyof SignedHeader>]: never; }>(base?: I): SignedHeader;
    fromPartial<I_1 extends {
        header?: {
            version?: {
                block?: string | undefined;
                app?: string | undefined;
            } | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } | undefined;
        commit?: {
            height?: string | undefined;
            round?: number | undefined;
            blockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            signatures?: {
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        header?: ({
            version?: {
                block?: string | undefined;
                app?: string | undefined;
            } | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & {
            version?: ({
                block?: string | undefined;
                app?: string | undefined;
            } & {
                block?: string | undefined;
                app?: string | undefined;
            } & { [K_10 in Exclude<keyof I_1["header"]["version"], keyof Consensus>]: never; }) | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: ({
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } & {
                hash?: Uint8Array | undefined;
                partSetHeader?: ({
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & { [K_11 in Exclude<keyof I_1["header"]["lastBlockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
            } & { [K_12 in Exclude<keyof I_1["header"]["lastBlockId"], keyof BlockID>]: never; }) | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & { [K_13 in Exclude<keyof I_1["header"], keyof Header>]: never; }) | undefined;
        commit?: ({
            height?: string | undefined;
            round?: number | undefined;
            blockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            signatures?: {
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            height?: string | undefined;
            round?: number | undefined;
            blockId?: ({
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } & {
                hash?: Uint8Array | undefined;
                partSetHeader?: ({
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & { [K_14 in Exclude<keyof I_1["commit"]["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
            } & { [K_15 in Exclude<keyof I_1["commit"]["blockId"], keyof BlockID>]: never; }) | undefined;
            signatures?: ({
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            }[] & ({
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            } & {
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            } & { [K_16 in Exclude<keyof I_1["commit"]["signatures"][number], keyof CommitSig>]: never; })[] & { [K_17 in Exclude<keyof I_1["commit"]["signatures"], keyof {
                blockIdFlag?: BlockIDFlag | undefined;
                validatorAddress?: Uint8Array | undefined;
                timestamp?: Date | undefined;
                signature?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_18 in Exclude<keyof I_1["commit"], keyof Commit>]: never; }) | undefined;
    } & { [K_19 in Exclude<keyof I_1, keyof SignedHeader>]: never; }>(object: I_1): SignedHeader;
};
export declare const LightBlock: {
    encode(message: LightBlock, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LightBlock;
    fromJSON(object: any): LightBlock;
    toJSON(message: LightBlock): unknown;
    create<I extends {
        signedHeader?: {
            header?: {
                version?: {
                    block?: string | undefined;
                    app?: string | undefined;
                } | undefined;
                chainId?: string | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                lastBlockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } | undefined;
            commit?: {
                height?: string | undefined;
                round?: number | undefined;
                blockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                signatures?: {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
        } | undefined;
        validatorSet?: {
            validators?: {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            }[] | undefined;
            proposer?: {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } | undefined;
            totalVotingPower?: string | undefined;
        } | undefined;
    } & {
        signedHeader?: ({
            header?: {
                version?: {
                    block?: string | undefined;
                    app?: string | undefined;
                } | undefined;
                chainId?: string | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                lastBlockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } | undefined;
            commit?: {
                height?: string | undefined;
                round?: number | undefined;
                blockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                signatures?: {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            header?: ({
                version?: {
                    block?: string | undefined;
                    app?: string | undefined;
                } | undefined;
                chainId?: string | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                lastBlockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } & {
                version?: ({
                    block?: string | undefined;
                    app?: string | undefined;
                } & {
                    block?: string | undefined;
                    app?: string | undefined;
                } & { [K in Exclude<keyof I["signedHeader"]["header"]["version"], keyof Consensus>]: never; }) | undefined;
                chainId?: string | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                lastBlockId?: ({
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: ({
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } & {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } & { [K_1 in Exclude<keyof I["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
                } & { [K_2 in Exclude<keyof I["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; }) | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } & { [K_3 in Exclude<keyof I["signedHeader"]["header"], keyof Header>]: never; }) | undefined;
            commit?: ({
                height?: string | undefined;
                round?: number | undefined;
                blockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                signatures?: {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[] | undefined;
            } & {
                height?: string | undefined;
                round?: number | undefined;
                blockId?: ({
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: ({
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } & {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } & { [K_4 in Exclude<keyof I["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
                } & { [K_5 in Exclude<keyof I["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; }) | undefined;
                signatures?: ({
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[] & ({
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                } & {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                } & { [K_6 in Exclude<keyof I["signedHeader"]["commit"]["signatures"][number], keyof CommitSig>]: never; })[] & { [K_7 in Exclude<keyof I["signedHeader"]["commit"]["signatures"], keyof {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_8 in Exclude<keyof I["signedHeader"]["commit"], keyof Commit>]: never; }) | undefined;
        } & { [K_9 in Exclude<keyof I["signedHeader"], keyof SignedHeader>]: never; }) | undefined;
        validatorSet?: ({
            validators?: {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            }[] | undefined;
            proposer?: {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } | undefined;
            totalVotingPower?: string | undefined;
        } & {
            validators?: ({
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            }[] & ({
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } & {
                address?: Uint8Array | undefined;
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_10 in Exclude<keyof I["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; }) | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } & { [K_11 in Exclude<keyof I["validatorSet"]["validators"][number], keyof import("./validator").Validator>]: never; })[] & { [K_12 in Exclude<keyof I["validatorSet"]["validators"], keyof {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            }[]>]: never; }) | undefined;
            proposer?: ({
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } & {
                address?: Uint8Array | undefined;
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_13 in Exclude<keyof I["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; }) | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } & { [K_14 in Exclude<keyof I["validatorSet"]["proposer"], keyof import("./validator").Validator>]: never; }) | undefined;
            totalVotingPower?: string | undefined;
        } & { [K_15 in Exclude<keyof I["validatorSet"], keyof ValidatorSet>]: never; }) | undefined;
    } & { [K_16 in Exclude<keyof I, keyof LightBlock>]: never; }>(base?: I): LightBlock;
    fromPartial<I_1 extends {
        signedHeader?: {
            header?: {
                version?: {
                    block?: string | undefined;
                    app?: string | undefined;
                } | undefined;
                chainId?: string | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                lastBlockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } | undefined;
            commit?: {
                height?: string | undefined;
                round?: number | undefined;
                blockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                signatures?: {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
        } | undefined;
        validatorSet?: {
            validators?: {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            }[] | undefined;
            proposer?: {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } | undefined;
            totalVotingPower?: string | undefined;
        } | undefined;
    } & {
        signedHeader?: ({
            header?: {
                version?: {
                    block?: string | undefined;
                    app?: string | undefined;
                } | undefined;
                chainId?: string | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                lastBlockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } | undefined;
            commit?: {
                height?: string | undefined;
                round?: number | undefined;
                blockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                signatures?: {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            header?: ({
                version?: {
                    block?: string | undefined;
                    app?: string | undefined;
                } | undefined;
                chainId?: string | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                lastBlockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } & {
                version?: ({
                    block?: string | undefined;
                    app?: string | undefined;
                } & {
                    block?: string | undefined;
                    app?: string | undefined;
                } & { [K_17 in Exclude<keyof I_1["signedHeader"]["header"]["version"], keyof Consensus>]: never; }) | undefined;
                chainId?: string | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                lastBlockId?: ({
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: ({
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } & {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } & { [K_18 in Exclude<keyof I_1["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
                } & { [K_19 in Exclude<keyof I_1["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; }) | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } & { [K_20 in Exclude<keyof I_1["signedHeader"]["header"], keyof Header>]: never; }) | undefined;
            commit?: ({
                height?: string | undefined;
                round?: number | undefined;
                blockId?: {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                signatures?: {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[] | undefined;
            } & {
                height?: string | undefined;
                round?: number | undefined;
                blockId?: ({
                    hash?: Uint8Array | undefined;
                    partSetHeader?: {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } | undefined;
                } & {
                    hash?: Uint8Array | undefined;
                    partSetHeader?: ({
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } & {
                        total?: number | undefined;
                        hash?: Uint8Array | undefined;
                    } & { [K_21 in Exclude<keyof I_1["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
                } & { [K_22 in Exclude<keyof I_1["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; }) | undefined;
                signatures?: ({
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[] & ({
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                } & {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                } & { [K_23 in Exclude<keyof I_1["signedHeader"]["commit"]["signatures"][number], keyof CommitSig>]: never; })[] & { [K_24 in Exclude<keyof I_1["signedHeader"]["commit"]["signatures"], keyof {
                    blockIdFlag?: BlockIDFlag | undefined;
                    validatorAddress?: Uint8Array | undefined;
                    timestamp?: Date | undefined;
                    signature?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_25 in Exclude<keyof I_1["signedHeader"]["commit"], keyof Commit>]: never; }) | undefined;
        } & { [K_26 in Exclude<keyof I_1["signedHeader"], keyof SignedHeader>]: never; }) | undefined;
        validatorSet?: ({
            validators?: {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            }[] | undefined;
            proposer?: {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } | undefined;
            totalVotingPower?: string | undefined;
        } & {
            validators?: ({
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            }[] & ({
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } & {
                address?: Uint8Array | undefined;
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_27 in Exclude<keyof I_1["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; }) | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } & { [K_28 in Exclude<keyof I_1["validatorSet"]["validators"][number], keyof import("./validator").Validator>]: never; })[] & { [K_29 in Exclude<keyof I_1["validatorSet"]["validators"], keyof {
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            }[]>]: never; }) | undefined;
            proposer?: ({
                address?: Uint8Array | undefined;
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } & {
                address?: Uint8Array | undefined;
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_30 in Exclude<keyof I_1["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>]: never; }) | undefined;
                votingPower?: string | undefined;
                proposerPriority?: string | undefined;
            } & { [K_31 in Exclude<keyof I_1["validatorSet"]["proposer"], keyof import("./validator").Validator>]: never; }) | undefined;
            totalVotingPower?: string | undefined;
        } & { [K_32 in Exclude<keyof I_1["validatorSet"], keyof ValidatorSet>]: never; }) | undefined;
    } & { [K_33 in Exclude<keyof I_1, keyof LightBlock>]: never; }>(object: I_1): LightBlock;
};
export declare const BlockMeta: {
    encode(message: BlockMeta, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BlockMeta;
    fromJSON(object: any): BlockMeta;
    toJSON(message: BlockMeta): unknown;
    create<I extends {
        blockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        blockSize?: string | undefined;
        header?: {
            version?: {
                block?: string | undefined;
                app?: string | undefined;
            } | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } | undefined;
        numTxs?: string | undefined;
    } & {
        blockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["blockId"], keyof BlockID>]: never; }) | undefined;
        blockSize?: string | undefined;
        header?: ({
            version?: {
                block?: string | undefined;
                app?: string | undefined;
            } | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & {
            version?: ({
                block?: string | undefined;
                app?: string | undefined;
            } & {
                block?: string | undefined;
                app?: string | undefined;
            } & { [K_2 in Exclude<keyof I["header"]["version"], keyof Consensus>]: never; }) | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: ({
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } & {
                hash?: Uint8Array | undefined;
                partSetHeader?: ({
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & { [K_3 in Exclude<keyof I["header"]["lastBlockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["header"]["lastBlockId"], keyof BlockID>]: never; }) | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & { [K_5 in Exclude<keyof I["header"], keyof Header>]: never; }) | undefined;
        numTxs?: string | undefined;
    } & { [K_6 in Exclude<keyof I, keyof BlockMeta>]: never; }>(base?: I): BlockMeta;
    fromPartial<I_1 extends {
        blockId?: {
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } | undefined;
        blockSize?: string | undefined;
        header?: {
            version?: {
                block?: string | undefined;
                app?: string | undefined;
            } | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } | undefined;
        numTxs?: string | undefined;
    } & {
        blockId?: ({
            hash?: Uint8Array | undefined;
            partSetHeader?: {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        } & {
            hash?: Uint8Array | undefined;
            partSetHeader?: ({
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & {
                total?: number | undefined;
                hash?: Uint8Array | undefined;
            } & { [K_7 in Exclude<keyof I_1["blockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I_1["blockId"], keyof BlockID>]: never; }) | undefined;
        blockSize?: string | undefined;
        header?: ({
            version?: {
                block?: string | undefined;
                app?: string | undefined;
            } | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: {
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & {
            version?: ({
                block?: string | undefined;
                app?: string | undefined;
            } & {
                block?: string | undefined;
                app?: string | undefined;
            } & { [K_9 in Exclude<keyof I_1["header"]["version"], keyof Consensus>]: never; }) | undefined;
            chainId?: string | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            lastBlockId?: ({
                hash?: Uint8Array | undefined;
                partSetHeader?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } & {
                hash?: Uint8Array | undefined;
                partSetHeader?: ({
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } & { [K_10 in Exclude<keyof I_1["header"]["lastBlockId"]["partSetHeader"], keyof PartSetHeader>]: never; }) | undefined;
            } & { [K_11 in Exclude<keyof I_1["header"]["lastBlockId"], keyof BlockID>]: never; }) | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & { [K_12 in Exclude<keyof I_1["header"], keyof Header>]: never; }) | undefined;
        numTxs?: string | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof BlockMeta>]: never; }>(object: I_1): BlockMeta;
};
export declare const TxProof: {
    encode(message: TxProof, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxProof;
    fromJSON(object: any): TxProof;
    toJSON(message: TxProof): unknown;
    create<I extends {
        rootHash?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        proof?: {
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        } | undefined;
    } & {
        rootHash?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        proof?: ({
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        } & {
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: (Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["proof"]["aunts"], keyof Uint8Array[]>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["proof"], keyof Proof>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof TxProof>]: never; }>(base?: I): TxProof;
    fromPartial<I_1 extends {
        rootHash?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        proof?: {
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        } | undefined;
    } & {
        rootHash?: Uint8Array | undefined;
        data?: Uint8Array | undefined;
        proof?: ({
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        } & {
            total?: string | undefined;
            index?: string | undefined;
            leafHash?: Uint8Array | undefined;
            aunts?: (Uint8Array[] & Uint8Array[] & { [K_3 in Exclude<keyof I_1["proof"]["aunts"], keyof Uint8Array[]>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I_1["proof"], keyof Proof>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof TxProof>]: never; }>(object: I_1): TxProof;
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
