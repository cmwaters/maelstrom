import _m0 from "protobufjs/minimal";
import { PublicKey } from "../crypto/keys";
import { ProofOps } from "../crypto/proof";
import { EvidenceParams, ValidatorParams, VersionParams } from "../types/params";
import { Header } from "../types/types";
export declare const protobufPackage = "tendermint.abci";
export declare enum CheckTxType {
    NEW = 0,
    RECHECK = 1,
    UNRECOGNIZED = -1
}
export declare function checkTxTypeFromJSON(object: any): CheckTxType;
export declare function checkTxTypeToJSON(object: CheckTxType): string;
export declare enum EvidenceType {
    UNKNOWN = 0,
    DUPLICATE_VOTE = 1,
    LIGHT_CLIENT_ATTACK = 2,
    UNRECOGNIZED = -1
}
export declare function evidenceTypeFromJSON(object: any): EvidenceType;
export declare function evidenceTypeToJSON(object: EvidenceType): string;
export interface Request {
    echo?: RequestEcho | undefined;
    flush?: RequestFlush | undefined;
    info?: RequestInfo | undefined;
    setOption?: RequestSetOption | undefined;
    initChain?: RequestInitChain | undefined;
    query?: RequestQuery | undefined;
    beginBlock?: RequestBeginBlock | undefined;
    checkTx?: RequestCheckTx | undefined;
    deliverTx?: RequestDeliverTx | undefined;
    endBlock?: RequestEndBlock | undefined;
    commit?: RequestCommit | undefined;
    listSnapshots?: RequestListSnapshots | undefined;
    offerSnapshot?: RequestOfferSnapshot | undefined;
    loadSnapshotChunk?: RequestLoadSnapshotChunk | undefined;
    applySnapshotChunk?: RequestApplySnapshotChunk | undefined;
}
export interface RequestEcho {
    message: string;
}
export interface RequestFlush {
}
export interface RequestInfo {
    version: string;
    blockVersion: string;
    p2pVersion: string;
}
/** nondeterministic */
export interface RequestSetOption {
    key: string;
    value: string;
}
export interface RequestInitChain {
    time: Date | undefined;
    chainId: string;
    consensusParams: ConsensusParams | undefined;
    validators: ValidatorUpdate[];
    appStateBytes: Uint8Array;
    initialHeight: string;
}
export interface RequestQuery {
    data: Uint8Array;
    path: string;
    height: string;
    prove: boolean;
}
export interface RequestBeginBlock {
    hash: Uint8Array;
    header: Header | undefined;
    lastCommitInfo: LastCommitInfo | undefined;
    byzantineValidators: Evidence[];
}
export interface RequestCheckTx {
    tx: Uint8Array;
    type: CheckTxType;
}
export interface RequestDeliverTx {
    tx: Uint8Array;
}
export interface RequestEndBlock {
    height: string;
}
export interface RequestCommit {
}
/** lists available snapshots */
export interface RequestListSnapshots {
}
/** offers a snapshot to the application */
export interface RequestOfferSnapshot {
    /** snapshot offered by peers */
    snapshot: Snapshot | undefined;
    /** light client-verified app hash for snapshot height */
    appHash: Uint8Array;
}
/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunk {
    height: string;
    format: number;
    chunk: number;
}
/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunk {
    index: number;
    chunk: Uint8Array;
    sender: string;
}
export interface Response {
    exception?: ResponseException | undefined;
    echo?: ResponseEcho | undefined;
    flush?: ResponseFlush | undefined;
    info?: ResponseInfo | undefined;
    setOption?: ResponseSetOption | undefined;
    initChain?: ResponseInitChain | undefined;
    query?: ResponseQuery | undefined;
    beginBlock?: ResponseBeginBlock | undefined;
    checkTx?: ResponseCheckTx | undefined;
    deliverTx?: ResponseDeliverTx | undefined;
    endBlock?: ResponseEndBlock | undefined;
    commit?: ResponseCommit | undefined;
    listSnapshots?: ResponseListSnapshots | undefined;
    offerSnapshot?: ResponseOfferSnapshot | undefined;
    loadSnapshotChunk?: ResponseLoadSnapshotChunk | undefined;
    applySnapshotChunk?: ResponseApplySnapshotChunk | undefined;
}
/** nondeterministic */
export interface ResponseException {
    error: string;
}
export interface ResponseEcho {
    message: string;
}
export interface ResponseFlush {
}
export interface ResponseInfo {
    data: string;
    version: string;
    appVersion: string;
    lastBlockHeight: string;
    lastBlockAppHash: Uint8Array;
}
/** nondeterministic */
export interface ResponseSetOption {
    code: number;
    /** bytes data = 2; */
    log: string;
    info: string;
}
export interface ResponseInitChain {
    consensusParams: ConsensusParams | undefined;
    validators: ValidatorUpdate[];
    appHash: Uint8Array;
}
export interface ResponseQuery {
    code: number;
    /** bytes data = 2; // use "value" instead. */
    log: string;
    /** nondeterministic */
    info: string;
    index: string;
    key: Uint8Array;
    value: Uint8Array;
    proofOps: ProofOps | undefined;
    height: string;
    codespace: string;
}
export interface ResponseBeginBlock {
    events: Event[];
}
export interface ResponseCheckTx {
    code: number;
    data: Uint8Array;
    /** nondeterministic */
    log: string;
    /** nondeterministic */
    info: string;
    gasWanted: string;
    gasUsed: string;
    events: Event[];
    codespace: string;
}
export interface ResponseDeliverTx {
    code: number;
    data: Uint8Array;
    /** nondeterministic */
    log: string;
    /** nondeterministic */
    info: string;
    gasWanted: string;
    gasUsed: string;
    events: Event[];
    codespace: string;
}
export interface ResponseEndBlock {
    validatorUpdates: ValidatorUpdate[];
    consensusParamUpdates: ConsensusParams | undefined;
    events: Event[];
}
export interface ResponseCommit {
    /** reserve 1 */
    data: Uint8Array;
    retainHeight: string;
}
export interface ResponseListSnapshots {
    snapshots: Snapshot[];
}
export interface ResponseOfferSnapshot {
    result: ResponseOfferSnapshot_Result;
}
export declare enum ResponseOfferSnapshot_Result {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    UNKNOWN = 0,
    /** ACCEPT - Snapshot accepted, apply chunks */
    ACCEPT = 1,
    /** ABORT - Abort all snapshot restoration */
    ABORT = 2,
    /** REJECT - Reject this specific snapshot, try others */
    REJECT = 3,
    /** REJECT_FORMAT - Reject all snapshots of this format, try others */
    REJECT_FORMAT = 4,
    /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
    REJECT_SENDER = 5,
    UNRECOGNIZED = -1
}
export declare function responseOfferSnapshot_ResultFromJSON(object: any): ResponseOfferSnapshot_Result;
export declare function responseOfferSnapshot_ResultToJSON(object: ResponseOfferSnapshot_Result): string;
export interface ResponseLoadSnapshotChunk {
    chunk: Uint8Array;
}
export interface ResponseApplySnapshotChunk {
    result: ResponseApplySnapshotChunk_Result;
    /** Chunks to refetch and reapply */
    refetchChunks: number[];
    /** Chunk senders to reject and ban */
    rejectSenders: string[];
}
export declare enum ResponseApplySnapshotChunk_Result {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    UNKNOWN = 0,
    /** ACCEPT - Chunk successfully accepted */
    ACCEPT = 1,
    /** ABORT - Abort all snapshot restoration */
    ABORT = 2,
    /** RETRY - Retry chunk (combine with refetch and reject) */
    RETRY = 3,
    /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
    RETRY_SNAPSHOT = 4,
    /** REJECT_SNAPSHOT - Reject this snapshot, try others */
    REJECT_SNAPSHOT = 5,
    UNRECOGNIZED = -1
}
export declare function responseApplySnapshotChunk_ResultFromJSON(object: any): ResponseApplySnapshotChunk_Result;
export declare function responseApplySnapshotChunk_ResultToJSON(object: ResponseApplySnapshotChunk_Result): string;
/**
 * ConsensusParams contains all consensus-relevant parameters
 * that can be adjusted by the abci app
 */
export interface ConsensusParams {
    block: BlockParams | undefined;
    evidence: EvidenceParams | undefined;
    validator: ValidatorParams | undefined;
    version: VersionParams | undefined;
}
/** BlockParams contains limits on the block size. */
export interface BlockParams {
    /** Note: must be greater than 0 */
    maxBytes: string;
    /** Note: must be greater or equal to -1 */
    maxGas: string;
}
export interface LastCommitInfo {
    round: number;
    votes: VoteInfo[];
}
/**
 * Event allows application developers to attach additional information to
 * ResponseBeginBlock, ResponseEndBlock, ResponseCheckTx and ResponseDeliverTx.
 * Later, transactions may be queried using these events.
 */
export interface Event {
    type: string;
    attributes: EventAttribute[];
}
/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttribute {
    key: Uint8Array;
    value: Uint8Array;
    /** nondeterministic */
    index: boolean;
}
/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResult {
    height: string;
    index: number;
    tx: Uint8Array;
    result: ResponseDeliverTx | undefined;
}
/** Validator */
export interface Validator {
    /** The first 20 bytes of SHA256(public key) */
    address: Uint8Array;
    /** PubKey pub_key = 2 [(gogoproto.nullable)=false]; */
    power: string;
}
/** ValidatorUpdate */
export interface ValidatorUpdate {
    pubKey: PublicKey | undefined;
    power: string;
}
/** VoteInfo */
export interface VoteInfo {
    validator: Validator | undefined;
    signedLastBlock: boolean;
}
export interface Evidence {
    type: EvidenceType;
    /** The offending validator */
    validator: Validator | undefined;
    /** The height when the offense occurred */
    height: string;
    /** The corresponding time where the offense occurred */
    time: Date | undefined;
    /**
     * Total voting power of the validator set in case the ABCI application does
     * not store historical validators.
     * https://github.com/tendermint/tendermint/issues/4581
     */
    totalVotingPower: string;
}
export interface Snapshot {
    /** The height at which the snapshot was taken */
    height: string;
    /** The application-specific snapshot format */
    format: number;
    /** Number of chunks in the snapshot */
    chunks: number;
    /** Arbitrary snapshot hash, equal only if identical */
    hash: Uint8Array;
    /** Arbitrary application metadata */
    metadata: Uint8Array;
}
export declare const Request: {
    encode(message: Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Request;
    fromJSON(object: any): Request;
    toJSON(message: Request): unknown;
    create<I extends {
        echo?: {
            message?: string | undefined;
        } | undefined;
        flush?: {} | undefined;
        info?: {
            version?: string | undefined;
            blockVersion?: string | undefined;
            p2pVersion?: string | undefined;
        } | undefined;
        setOption?: {
            key?: string | undefined;
            value?: string | undefined;
        } | undefined;
        initChain?: {
            time?: Date | undefined;
            chainId?: string | undefined;
            consensusParams?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            appStateBytes?: Uint8Array | undefined;
            initialHeight?: string | undefined;
        } | undefined;
        query?: {
            data?: Uint8Array | undefined;
            path?: string | undefined;
            height?: string | undefined;
            prove?: boolean | undefined;
        } | undefined;
        beginBlock?: {
            hash?: Uint8Array | undefined;
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
            lastCommitInfo?: {
                round?: number | undefined;
                votes?: {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            byzantineValidators?: {
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            }[] | undefined;
        } | undefined;
        checkTx?: {
            tx?: Uint8Array | undefined;
            type?: CheckTxType | undefined;
        } | undefined;
        deliverTx?: {
            tx?: Uint8Array | undefined;
        } | undefined;
        endBlock?: {
            height?: string | undefined;
        } | undefined;
        commit?: {} | undefined;
        listSnapshots?: {} | undefined;
        offerSnapshot?: {
            snapshot?: {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } | undefined;
            appHash?: Uint8Array | undefined;
        } | undefined;
        loadSnapshotChunk?: {
            height?: string | undefined;
            format?: number | undefined;
            chunk?: number | undefined;
        } | undefined;
        applySnapshotChunk?: {
            index?: number | undefined;
            chunk?: Uint8Array | undefined;
            sender?: string | undefined;
        } | undefined;
    } & {
        echo?: ({
            message?: string | undefined;
        } & {
            message?: string | undefined;
        } & { [K in Exclude<keyof I["echo"], "message">]: never; }) | undefined;
        flush?: ({} & {} & { [K_1 in Exclude<keyof I["flush"], never>]: never; }) | undefined;
        info?: ({
            version?: string | undefined;
            blockVersion?: string | undefined;
            p2pVersion?: string | undefined;
        } & {
            version?: string | undefined;
            blockVersion?: string | undefined;
            p2pVersion?: string | undefined;
        } & { [K_2 in Exclude<keyof I["info"], keyof RequestInfo>]: never; }) | undefined;
        setOption?: ({
            key?: string | undefined;
            value?: string | undefined;
        } & {
            key?: string | undefined;
            value?: string | undefined;
        } & { [K_3 in Exclude<keyof I["setOption"], keyof RequestSetOption>]: never; }) | undefined;
        initChain?: ({
            time?: Date | undefined;
            chainId?: string | undefined;
            consensusParams?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            appStateBytes?: Uint8Array | undefined;
            initialHeight?: string | undefined;
        } & {
            time?: Date | undefined;
            chainId?: string | undefined;
            consensusParams?: ({
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } & {
                block?: ({
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & { [K_4 in Exclude<keyof I["initChain"]["consensusParams"]["block"], keyof BlockParams>]: never; }) | undefined;
                evidence?: ({
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } & {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: ({
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["initChain"]["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                    maxBytes?: string | undefined;
                } & { [K_6 in Exclude<keyof I["initChain"]["consensusParams"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
                validator?: ({
                    pubKeyTypes?: string[] | undefined;
                } & {
                    pubKeyTypes?: (string[] & string[] & { [K_7 in Exclude<keyof I["initChain"]["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
                } & { [K_8 in Exclude<keyof I["initChain"]["consensusParams"]["validator"], "pubKeyTypes">]: never; }) | undefined;
                version?: ({
                    appVersion?: string | undefined;
                } & {
                    appVersion?: string | undefined;
                } & { [K_9 in Exclude<keyof I["initChain"]["consensusParams"]["version"], "appVersion">]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I["initChain"]["consensusParams"], keyof ConsensusParams>]: never; }) | undefined;
            validators?: ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            } & {
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_11 in Exclude<keyof I["initChain"]["validators"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
                power?: string | undefined;
            } & { [K_12 in Exclude<keyof I["initChain"]["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_13 in Exclude<keyof I["initChain"]["validators"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[]>]: never; }) | undefined;
            appStateBytes?: Uint8Array | undefined;
            initialHeight?: string | undefined;
        } & { [K_14 in Exclude<keyof I["initChain"], keyof RequestInitChain>]: never; }) | undefined;
        query?: ({
            data?: Uint8Array | undefined;
            path?: string | undefined;
            height?: string | undefined;
            prove?: boolean | undefined;
        } & {
            data?: Uint8Array | undefined;
            path?: string | undefined;
            height?: string | undefined;
            prove?: boolean | undefined;
        } & { [K_15 in Exclude<keyof I["query"], keyof RequestQuery>]: never; }) | undefined;
        beginBlock?: ({
            hash?: Uint8Array | undefined;
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
            lastCommitInfo?: {
                round?: number | undefined;
                votes?: {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            byzantineValidators?: {
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            }[] | undefined;
        } & {
            hash?: Uint8Array | undefined;
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
                } & { [K_16 in Exclude<keyof I["beginBlock"]["header"]["version"], keyof import("../version/types").Consensus>]: never; }) | undefined;
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
                    } & { [K_17 in Exclude<keyof I["beginBlock"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../types/types").PartSetHeader>]: never; }) | undefined;
                } & { [K_18 in Exclude<keyof I["beginBlock"]["header"]["lastBlockId"], keyof import("../types/types").BlockID>]: never; }) | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } & { [K_19 in Exclude<keyof I["beginBlock"]["header"], keyof Header>]: never; }) | undefined;
            lastCommitInfo?: ({
                round?: number | undefined;
                votes?: {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[] | undefined;
            } & {
                round?: number | undefined;
                votes?: ({
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[] & ({
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                } & {
                    validator?: ({
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } & {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } & { [K_20 in Exclude<keyof I["beginBlock"]["lastCommitInfo"]["votes"][number]["validator"], keyof Validator>]: never; }) | undefined;
                    signedLastBlock?: boolean | undefined;
                } & { [K_21 in Exclude<keyof I["beginBlock"]["lastCommitInfo"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_22 in Exclude<keyof I["beginBlock"]["lastCommitInfo"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_23 in Exclude<keyof I["beginBlock"]["lastCommitInfo"], keyof LastCommitInfo>]: never; }) | undefined;
            byzantineValidators?: ({
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            }[] & ({
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            } & {
                type?: EvidenceType | undefined;
                validator?: ({
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } & {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } & { [K_24 in Exclude<keyof I["beginBlock"]["byzantineValidators"][number]["validator"], keyof Validator>]: never; }) | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            } & { [K_25 in Exclude<keyof I["beginBlock"]["byzantineValidators"][number], keyof Evidence>]: never; })[] & { [K_26 in Exclude<keyof I["beginBlock"]["byzantineValidators"], keyof {
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_27 in Exclude<keyof I["beginBlock"], keyof RequestBeginBlock>]: never; }) | undefined;
        checkTx?: ({
            tx?: Uint8Array | undefined;
            type?: CheckTxType | undefined;
        } & {
            tx?: Uint8Array | undefined;
            type?: CheckTxType | undefined;
        } & { [K_28 in Exclude<keyof I["checkTx"], keyof RequestCheckTx>]: never; }) | undefined;
        deliverTx?: ({
            tx?: Uint8Array | undefined;
        } & {
            tx?: Uint8Array | undefined;
        } & { [K_29 in Exclude<keyof I["deliverTx"], "tx">]: never; }) | undefined;
        endBlock?: ({
            height?: string | undefined;
        } & {
            height?: string | undefined;
        } & { [K_30 in Exclude<keyof I["endBlock"], "height">]: never; }) | undefined;
        commit?: ({} & {} & { [K_31 in Exclude<keyof I["commit"], never>]: never; }) | undefined;
        listSnapshots?: ({} & {} & { [K_32 in Exclude<keyof I["listSnapshots"], never>]: never; }) | undefined;
        offerSnapshot?: ({
            snapshot?: {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } | undefined;
            appHash?: Uint8Array | undefined;
        } & {
            snapshot?: ({
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } & {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } & { [K_33 in Exclude<keyof I["offerSnapshot"]["snapshot"], keyof Snapshot>]: never; }) | undefined;
            appHash?: Uint8Array | undefined;
        } & { [K_34 in Exclude<keyof I["offerSnapshot"], keyof RequestOfferSnapshot>]: never; }) | undefined;
        loadSnapshotChunk?: ({
            height?: string | undefined;
            format?: number | undefined;
            chunk?: number | undefined;
        } & {
            height?: string | undefined;
            format?: number | undefined;
            chunk?: number | undefined;
        } & { [K_35 in Exclude<keyof I["loadSnapshotChunk"], keyof RequestLoadSnapshotChunk>]: never; }) | undefined;
        applySnapshotChunk?: ({
            index?: number | undefined;
            chunk?: Uint8Array | undefined;
            sender?: string | undefined;
        } & {
            index?: number | undefined;
            chunk?: Uint8Array | undefined;
            sender?: string | undefined;
        } & { [K_36 in Exclude<keyof I["applySnapshotChunk"], keyof RequestApplySnapshotChunk>]: never; }) | undefined;
    } & { [K_37 in Exclude<keyof I, keyof Request>]: never; }>(base?: I): Request;
    fromPartial<I_1 extends {
        echo?: {
            message?: string | undefined;
        } | undefined;
        flush?: {} | undefined;
        info?: {
            version?: string | undefined;
            blockVersion?: string | undefined;
            p2pVersion?: string | undefined;
        } | undefined;
        setOption?: {
            key?: string | undefined;
            value?: string | undefined;
        } | undefined;
        initChain?: {
            time?: Date | undefined;
            chainId?: string | undefined;
            consensusParams?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            appStateBytes?: Uint8Array | undefined;
            initialHeight?: string | undefined;
        } | undefined;
        query?: {
            data?: Uint8Array | undefined;
            path?: string | undefined;
            height?: string | undefined;
            prove?: boolean | undefined;
        } | undefined;
        beginBlock?: {
            hash?: Uint8Array | undefined;
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
            lastCommitInfo?: {
                round?: number | undefined;
                votes?: {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            byzantineValidators?: {
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            }[] | undefined;
        } | undefined;
        checkTx?: {
            tx?: Uint8Array | undefined;
            type?: CheckTxType | undefined;
        } | undefined;
        deliverTx?: {
            tx?: Uint8Array | undefined;
        } | undefined;
        endBlock?: {
            height?: string | undefined;
        } | undefined;
        commit?: {} | undefined;
        listSnapshots?: {} | undefined;
        offerSnapshot?: {
            snapshot?: {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } | undefined;
            appHash?: Uint8Array | undefined;
        } | undefined;
        loadSnapshotChunk?: {
            height?: string | undefined;
            format?: number | undefined;
            chunk?: number | undefined;
        } | undefined;
        applySnapshotChunk?: {
            index?: number | undefined;
            chunk?: Uint8Array | undefined;
            sender?: string | undefined;
        } | undefined;
    } & {
        echo?: ({
            message?: string | undefined;
        } & {
            message?: string | undefined;
        } & { [K_38 in Exclude<keyof I_1["echo"], "message">]: never; }) | undefined;
        flush?: ({} & {} & { [K_39 in Exclude<keyof I_1["flush"], never>]: never; }) | undefined;
        info?: ({
            version?: string | undefined;
            blockVersion?: string | undefined;
            p2pVersion?: string | undefined;
        } & {
            version?: string | undefined;
            blockVersion?: string | undefined;
            p2pVersion?: string | undefined;
        } & { [K_40 in Exclude<keyof I_1["info"], keyof RequestInfo>]: never; }) | undefined;
        setOption?: ({
            key?: string | undefined;
            value?: string | undefined;
        } & {
            key?: string | undefined;
            value?: string | undefined;
        } & { [K_41 in Exclude<keyof I_1["setOption"], keyof RequestSetOption>]: never; }) | undefined;
        initChain?: ({
            time?: Date | undefined;
            chainId?: string | undefined;
            consensusParams?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            appStateBytes?: Uint8Array | undefined;
            initialHeight?: string | undefined;
        } & {
            time?: Date | undefined;
            chainId?: string | undefined;
            consensusParams?: ({
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } & {
                block?: ({
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & { [K_42 in Exclude<keyof I_1["initChain"]["consensusParams"]["block"], keyof BlockParams>]: never; }) | undefined;
                evidence?: ({
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } & {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: ({
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & { [K_43 in Exclude<keyof I_1["initChain"]["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                    maxBytes?: string | undefined;
                } & { [K_44 in Exclude<keyof I_1["initChain"]["consensusParams"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
                validator?: ({
                    pubKeyTypes?: string[] | undefined;
                } & {
                    pubKeyTypes?: (string[] & string[] & { [K_45 in Exclude<keyof I_1["initChain"]["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
                } & { [K_46 in Exclude<keyof I_1["initChain"]["consensusParams"]["validator"], "pubKeyTypes">]: never; }) | undefined;
                version?: ({
                    appVersion?: string | undefined;
                } & {
                    appVersion?: string | undefined;
                } & { [K_47 in Exclude<keyof I_1["initChain"]["consensusParams"]["version"], "appVersion">]: never; }) | undefined;
            } & { [K_48 in Exclude<keyof I_1["initChain"]["consensusParams"], keyof ConsensusParams>]: never; }) | undefined;
            validators?: ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            } & {
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_49 in Exclude<keyof I_1["initChain"]["validators"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
                power?: string | undefined;
            } & { [K_50 in Exclude<keyof I_1["initChain"]["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_51 in Exclude<keyof I_1["initChain"]["validators"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[]>]: never; }) | undefined;
            appStateBytes?: Uint8Array | undefined;
            initialHeight?: string | undefined;
        } & { [K_52 in Exclude<keyof I_1["initChain"], keyof RequestInitChain>]: never; }) | undefined;
        query?: ({
            data?: Uint8Array | undefined;
            path?: string | undefined;
            height?: string | undefined;
            prove?: boolean | undefined;
        } & {
            data?: Uint8Array | undefined;
            path?: string | undefined;
            height?: string | undefined;
            prove?: boolean | undefined;
        } & { [K_53 in Exclude<keyof I_1["query"], keyof RequestQuery>]: never; }) | undefined;
        beginBlock?: ({
            hash?: Uint8Array | undefined;
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
            lastCommitInfo?: {
                round?: number | undefined;
                votes?: {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            byzantineValidators?: {
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            }[] | undefined;
        } & {
            hash?: Uint8Array | undefined;
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
                } & { [K_54 in Exclude<keyof I_1["beginBlock"]["header"]["version"], keyof import("../version/types").Consensus>]: never; }) | undefined;
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
                    } & { [K_55 in Exclude<keyof I_1["beginBlock"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../types/types").PartSetHeader>]: never; }) | undefined;
                } & { [K_56 in Exclude<keyof I_1["beginBlock"]["header"]["lastBlockId"], keyof import("../types/types").BlockID>]: never; }) | undefined;
                lastCommitHash?: Uint8Array | undefined;
                dataHash?: Uint8Array | undefined;
                validatorsHash?: Uint8Array | undefined;
                nextValidatorsHash?: Uint8Array | undefined;
                consensusHash?: Uint8Array | undefined;
                appHash?: Uint8Array | undefined;
                lastResultsHash?: Uint8Array | undefined;
                evidenceHash?: Uint8Array | undefined;
                proposerAddress?: Uint8Array | undefined;
            } & { [K_57 in Exclude<keyof I_1["beginBlock"]["header"], keyof Header>]: never; }) | undefined;
            lastCommitInfo?: ({
                round?: number | undefined;
                votes?: {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[] | undefined;
            } & {
                round?: number | undefined;
                votes?: ({
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[] & ({
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                } & {
                    validator?: ({
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } & {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } & { [K_58 in Exclude<keyof I_1["beginBlock"]["lastCommitInfo"]["votes"][number]["validator"], keyof Validator>]: never; }) | undefined;
                    signedLastBlock?: boolean | undefined;
                } & { [K_59 in Exclude<keyof I_1["beginBlock"]["lastCommitInfo"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_60 in Exclude<keyof I_1["beginBlock"]["lastCommitInfo"]["votes"], keyof {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: string | undefined;
                    } | undefined;
                    signedLastBlock?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_61 in Exclude<keyof I_1["beginBlock"]["lastCommitInfo"], keyof LastCommitInfo>]: never; }) | undefined;
            byzantineValidators?: ({
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            }[] & ({
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            } & {
                type?: EvidenceType | undefined;
                validator?: ({
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } & {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } & { [K_62 in Exclude<keyof I_1["beginBlock"]["byzantineValidators"][number]["validator"], keyof Validator>]: never; }) | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            } & { [K_63 in Exclude<keyof I_1["beginBlock"]["byzantineValidators"][number], keyof Evidence>]: never; })[] & { [K_64 in Exclude<keyof I_1["beginBlock"]["byzantineValidators"], keyof {
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                height?: string | undefined;
                time?: Date | undefined;
                totalVotingPower?: string | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_65 in Exclude<keyof I_1["beginBlock"], keyof RequestBeginBlock>]: never; }) | undefined;
        checkTx?: ({
            tx?: Uint8Array | undefined;
            type?: CheckTxType | undefined;
        } & {
            tx?: Uint8Array | undefined;
            type?: CheckTxType | undefined;
        } & { [K_66 in Exclude<keyof I_1["checkTx"], keyof RequestCheckTx>]: never; }) | undefined;
        deliverTx?: ({
            tx?: Uint8Array | undefined;
        } & {
            tx?: Uint8Array | undefined;
        } & { [K_67 in Exclude<keyof I_1["deliverTx"], "tx">]: never; }) | undefined;
        endBlock?: ({
            height?: string | undefined;
        } & {
            height?: string | undefined;
        } & { [K_68 in Exclude<keyof I_1["endBlock"], "height">]: never; }) | undefined;
        commit?: ({} & {} & { [K_69 in Exclude<keyof I_1["commit"], never>]: never; }) | undefined;
        listSnapshots?: ({} & {} & { [K_70 in Exclude<keyof I_1["listSnapshots"], never>]: never; }) | undefined;
        offerSnapshot?: ({
            snapshot?: {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } | undefined;
            appHash?: Uint8Array | undefined;
        } & {
            snapshot?: ({
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } & {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } & { [K_71 in Exclude<keyof I_1["offerSnapshot"]["snapshot"], keyof Snapshot>]: never; }) | undefined;
            appHash?: Uint8Array | undefined;
        } & { [K_72 in Exclude<keyof I_1["offerSnapshot"], keyof RequestOfferSnapshot>]: never; }) | undefined;
        loadSnapshotChunk?: ({
            height?: string | undefined;
            format?: number | undefined;
            chunk?: number | undefined;
        } & {
            height?: string | undefined;
            format?: number | undefined;
            chunk?: number | undefined;
        } & { [K_73 in Exclude<keyof I_1["loadSnapshotChunk"], keyof RequestLoadSnapshotChunk>]: never; }) | undefined;
        applySnapshotChunk?: ({
            index?: number | undefined;
            chunk?: Uint8Array | undefined;
            sender?: string | undefined;
        } & {
            index?: number | undefined;
            chunk?: Uint8Array | undefined;
            sender?: string | undefined;
        } & { [K_74 in Exclude<keyof I_1["applySnapshotChunk"], keyof RequestApplySnapshotChunk>]: never; }) | undefined;
    } & { [K_75 in Exclude<keyof I_1, keyof Request>]: never; }>(object: I_1): Request;
};
export declare const RequestEcho: {
    encode(message: RequestEcho, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestEcho;
    fromJSON(object: any): RequestEcho;
    toJSON(message: RequestEcho): unknown;
    create<I extends {
        message?: string | undefined;
    } & {
        message?: string | undefined;
    } & { [K in Exclude<keyof I, "message">]: never; }>(base?: I): RequestEcho;
    fromPartial<I_1 extends {
        message?: string | undefined;
    } & {
        message?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "message">]: never; }>(object: I_1): RequestEcho;
};
export declare const RequestFlush: {
    encode(_: RequestFlush, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestFlush;
    fromJSON(_: any): RequestFlush;
    toJSON(_: RequestFlush): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): RequestFlush;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): RequestFlush;
};
export declare const RequestInfo: {
    encode(message: RequestInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestInfo;
    fromJSON(object: any): RequestInfo;
    toJSON(message: RequestInfo): unknown;
    create<I extends {
        version?: string | undefined;
        blockVersion?: string | undefined;
        p2pVersion?: string | undefined;
    } & {
        version?: string | undefined;
        blockVersion?: string | undefined;
        p2pVersion?: string | undefined;
    } & { [K in Exclude<keyof I, keyof RequestInfo>]: never; }>(base?: I): RequestInfo;
    fromPartial<I_1 extends {
        version?: string | undefined;
        blockVersion?: string | undefined;
        p2pVersion?: string | undefined;
    } & {
        version?: string | undefined;
        blockVersion?: string | undefined;
        p2pVersion?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestInfo>]: never; }>(object: I_1): RequestInfo;
};
export declare const RequestSetOption: {
    encode(message: RequestSetOption, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestSetOption;
    fromJSON(object: any): RequestSetOption;
    toJSON(message: RequestSetOption): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof RequestSetOption>]: never; }>(base?: I): RequestSetOption;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestSetOption>]: never; }>(object: I_1): RequestSetOption;
};
export declare const RequestInitChain: {
    encode(message: RequestInitChain, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestInitChain;
    fromJSON(object: any): RequestInitChain;
    toJSON(message: RequestInitChain): unknown;
    create<I extends {
        time?: Date | undefined;
        chainId?: string | undefined;
        consensusParams?: {
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } | undefined;
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] | undefined;
        appStateBytes?: Uint8Array | undefined;
        initialHeight?: string | undefined;
    } & {
        time?: Date | undefined;
        chainId?: string | undefined;
        consensusParams?: ({
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } & {
            block?: ({
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & { [K in Exclude<keyof I["consensusParams"]["block"], keyof BlockParams>]: never; }) | undefined;
            evidence?: ({
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } & {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: ({
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & { [K_1 in Exclude<keyof I["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                maxBytes?: string | undefined;
            } & { [K_2 in Exclude<keyof I["consensusParams"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
            validator?: ({
                pubKeyTypes?: string[] | undefined;
            } & {
                pubKeyTypes?: (string[] & string[] & { [K_3 in Exclude<keyof I["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["consensusParams"]["validator"], "pubKeyTypes">]: never; }) | undefined;
            version?: ({
                appVersion?: string | undefined;
            } & {
                appVersion?: string | undefined;
            } & { [K_5 in Exclude<keyof I["consensusParams"]["version"], "appVersion">]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["consensusParams"], keyof ConsensusParams>]: never; }) | undefined;
        validators?: ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        } & {
            pubKey?: ({
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & { [K_7 in Exclude<keyof I["validators"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
            power?: string | undefined;
        } & { [K_8 in Exclude<keyof I["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_9 in Exclude<keyof I["validators"], keyof {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[]>]: never; }) | undefined;
        appStateBytes?: Uint8Array | undefined;
        initialHeight?: string | undefined;
    } & { [K_10 in Exclude<keyof I, keyof RequestInitChain>]: never; }>(base?: I): RequestInitChain;
    fromPartial<I_1 extends {
        time?: Date | undefined;
        chainId?: string | undefined;
        consensusParams?: {
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } | undefined;
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] | undefined;
        appStateBytes?: Uint8Array | undefined;
        initialHeight?: string | undefined;
    } & {
        time?: Date | undefined;
        chainId?: string | undefined;
        consensusParams?: ({
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } & {
            block?: ({
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & { [K_11 in Exclude<keyof I_1["consensusParams"]["block"], keyof BlockParams>]: never; }) | undefined;
            evidence?: ({
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } & {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: ({
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & { [K_12 in Exclude<keyof I_1["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                maxBytes?: string | undefined;
            } & { [K_13 in Exclude<keyof I_1["consensusParams"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
            validator?: ({
                pubKeyTypes?: string[] | undefined;
            } & {
                pubKeyTypes?: (string[] & string[] & { [K_14 in Exclude<keyof I_1["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
            } & { [K_15 in Exclude<keyof I_1["consensusParams"]["validator"], "pubKeyTypes">]: never; }) | undefined;
            version?: ({
                appVersion?: string | undefined;
            } & {
                appVersion?: string | undefined;
            } & { [K_16 in Exclude<keyof I_1["consensusParams"]["version"], "appVersion">]: never; }) | undefined;
        } & { [K_17 in Exclude<keyof I_1["consensusParams"], keyof ConsensusParams>]: never; }) | undefined;
        validators?: ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        } & {
            pubKey?: ({
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & { [K_18 in Exclude<keyof I_1["validators"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
            power?: string | undefined;
        } & { [K_19 in Exclude<keyof I_1["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_20 in Exclude<keyof I_1["validators"], keyof {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[]>]: never; }) | undefined;
        appStateBytes?: Uint8Array | undefined;
        initialHeight?: string | undefined;
    } & { [K_21 in Exclude<keyof I_1, keyof RequestInitChain>]: never; }>(object: I_1): RequestInitChain;
};
export declare const RequestQuery: {
    encode(message: RequestQuery, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestQuery;
    fromJSON(object: any): RequestQuery;
    toJSON(message: RequestQuery): unknown;
    create<I extends {
        data?: Uint8Array | undefined;
        path?: string | undefined;
        height?: string | undefined;
        prove?: boolean | undefined;
    } & {
        data?: Uint8Array | undefined;
        path?: string | undefined;
        height?: string | undefined;
        prove?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof RequestQuery>]: never; }>(base?: I): RequestQuery;
    fromPartial<I_1 extends {
        data?: Uint8Array | undefined;
        path?: string | undefined;
        height?: string | undefined;
        prove?: boolean | undefined;
    } & {
        data?: Uint8Array | undefined;
        path?: string | undefined;
        height?: string | undefined;
        prove?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestQuery>]: never; }>(object: I_1): RequestQuery;
};
export declare const RequestBeginBlock: {
    encode(message: RequestBeginBlock, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestBeginBlock;
    fromJSON(object: any): RequestBeginBlock;
    toJSON(message: RequestBeginBlock): unknown;
    create<I extends {
        hash?: Uint8Array | undefined;
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
        lastCommitInfo?: {
            round?: number | undefined;
            votes?: {
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        byzantineValidators?: {
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        }[] | undefined;
    } & {
        hash?: Uint8Array | undefined;
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
            } & { [K in Exclude<keyof I["header"]["version"], keyof import("../version/types").Consensus>]: never; }) | undefined;
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
                } & { [K_1 in Exclude<keyof I["header"]["lastBlockId"]["partSetHeader"], keyof import("../types/types").PartSetHeader>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["header"]["lastBlockId"], keyof import("../types/types").BlockID>]: never; }) | undefined;
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
        lastCommitInfo?: ({
            round?: number | undefined;
            votes?: {
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            }[] | undefined;
        } & {
            round?: number | undefined;
            votes?: ({
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            }[] & ({
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            } & {
                validator?: ({
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } & {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } & { [K_4 in Exclude<keyof I["lastCommitInfo"]["votes"][number]["validator"], keyof Validator>]: never; }) | undefined;
                signedLastBlock?: boolean | undefined;
            } & { [K_5 in Exclude<keyof I["lastCommitInfo"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_6 in Exclude<keyof I["lastCommitInfo"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I["lastCommitInfo"], keyof LastCommitInfo>]: never; }) | undefined;
        byzantineValidators?: ({
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        }[] & ({
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        } & {
            type?: EvidenceType | undefined;
            validator?: ({
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } & {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } & { [K_8 in Exclude<keyof I["byzantineValidators"][number]["validator"], keyof Validator>]: never; }) | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        } & { [K_9 in Exclude<keyof I["byzantineValidators"][number], keyof Evidence>]: never; })[] & { [K_10 in Exclude<keyof I["byzantineValidators"], keyof {
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I, keyof RequestBeginBlock>]: never; }>(base?: I): RequestBeginBlock;
    fromPartial<I_1 extends {
        hash?: Uint8Array | undefined;
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
        lastCommitInfo?: {
            round?: number | undefined;
            votes?: {
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        byzantineValidators?: {
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        }[] | undefined;
    } & {
        hash?: Uint8Array | undefined;
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
            } & { [K_12 in Exclude<keyof I_1["header"]["version"], keyof import("../version/types").Consensus>]: never; }) | undefined;
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
                } & { [K_13 in Exclude<keyof I_1["header"]["lastBlockId"]["partSetHeader"], keyof import("../types/types").PartSetHeader>]: never; }) | undefined;
            } & { [K_14 in Exclude<keyof I_1["header"]["lastBlockId"], keyof import("../types/types").BlockID>]: never; }) | undefined;
            lastCommitHash?: Uint8Array | undefined;
            dataHash?: Uint8Array | undefined;
            validatorsHash?: Uint8Array | undefined;
            nextValidatorsHash?: Uint8Array | undefined;
            consensusHash?: Uint8Array | undefined;
            appHash?: Uint8Array | undefined;
            lastResultsHash?: Uint8Array | undefined;
            evidenceHash?: Uint8Array | undefined;
            proposerAddress?: Uint8Array | undefined;
        } & { [K_15 in Exclude<keyof I_1["header"], keyof Header>]: never; }) | undefined;
        lastCommitInfo?: ({
            round?: number | undefined;
            votes?: {
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            }[] | undefined;
        } & {
            round?: number | undefined;
            votes?: ({
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            }[] & ({
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            } & {
                validator?: ({
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } & {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } & { [K_16 in Exclude<keyof I_1["lastCommitInfo"]["votes"][number]["validator"], keyof Validator>]: never; }) | undefined;
                signedLastBlock?: boolean | undefined;
            } & { [K_17 in Exclude<keyof I_1["lastCommitInfo"]["votes"][number], keyof VoteInfo>]: never; })[] & { [K_18 in Exclude<keyof I_1["lastCommitInfo"]["votes"], keyof {
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: string | undefined;
                } | undefined;
                signedLastBlock?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_19 in Exclude<keyof I_1["lastCommitInfo"], keyof LastCommitInfo>]: never; }) | undefined;
        byzantineValidators?: ({
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        }[] & ({
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        } & {
            type?: EvidenceType | undefined;
            validator?: ({
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } & {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } & { [K_20 in Exclude<keyof I_1["byzantineValidators"][number]["validator"], keyof Validator>]: never; }) | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        } & { [K_21 in Exclude<keyof I_1["byzantineValidators"][number], keyof Evidence>]: never; })[] & { [K_22 in Exclude<keyof I_1["byzantineValidators"], keyof {
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            height?: string | undefined;
            time?: Date | undefined;
            totalVotingPower?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_23 in Exclude<keyof I_1, keyof RequestBeginBlock>]: never; }>(object: I_1): RequestBeginBlock;
};
export declare const RequestCheckTx: {
    encode(message: RequestCheckTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestCheckTx;
    fromJSON(object: any): RequestCheckTx;
    toJSON(message: RequestCheckTx): unknown;
    create<I extends {
        tx?: Uint8Array | undefined;
        type?: CheckTxType | undefined;
    } & {
        tx?: Uint8Array | undefined;
        type?: CheckTxType | undefined;
    } & { [K in Exclude<keyof I, keyof RequestCheckTx>]: never; }>(base?: I): RequestCheckTx;
    fromPartial<I_1 extends {
        tx?: Uint8Array | undefined;
        type?: CheckTxType | undefined;
    } & {
        tx?: Uint8Array | undefined;
        type?: CheckTxType | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestCheckTx>]: never; }>(object: I_1): RequestCheckTx;
};
export declare const RequestDeliverTx: {
    encode(message: RequestDeliverTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestDeliverTx;
    fromJSON(object: any): RequestDeliverTx;
    toJSON(message: RequestDeliverTx): unknown;
    create<I extends {
        tx?: Uint8Array | undefined;
    } & {
        tx?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "tx">]: never; }>(base?: I): RequestDeliverTx;
    fromPartial<I_1 extends {
        tx?: Uint8Array | undefined;
    } & {
        tx?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, "tx">]: never; }>(object: I_1): RequestDeliverTx;
};
export declare const RequestEndBlock: {
    encode(message: RequestEndBlock, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestEndBlock;
    fromJSON(object: any): RequestEndBlock;
    toJSON(message: RequestEndBlock): unknown;
    create<I extends {
        height?: string | undefined;
    } & {
        height?: string | undefined;
    } & { [K in Exclude<keyof I, "height">]: never; }>(base?: I): RequestEndBlock;
    fromPartial<I_1 extends {
        height?: string | undefined;
    } & {
        height?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "height">]: never; }>(object: I_1): RequestEndBlock;
};
export declare const RequestCommit: {
    encode(_: RequestCommit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestCommit;
    fromJSON(_: any): RequestCommit;
    toJSON(_: RequestCommit): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): RequestCommit;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): RequestCommit;
};
export declare const RequestListSnapshots: {
    encode(_: RequestListSnapshots, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestListSnapshots;
    fromJSON(_: any): RequestListSnapshots;
    toJSON(_: RequestListSnapshots): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): RequestListSnapshots;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): RequestListSnapshots;
};
export declare const RequestOfferSnapshot: {
    encode(message: RequestOfferSnapshot, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestOfferSnapshot;
    fromJSON(object: any): RequestOfferSnapshot;
    toJSON(message: RequestOfferSnapshot): unknown;
    create<I extends {
        snapshot?: {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } | undefined;
        appHash?: Uint8Array | undefined;
    } & {
        snapshot?: ({
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } & {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["snapshot"], keyof Snapshot>]: never; }) | undefined;
        appHash?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I, keyof RequestOfferSnapshot>]: never; }>(base?: I): RequestOfferSnapshot;
    fromPartial<I_1 extends {
        snapshot?: {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } | undefined;
        appHash?: Uint8Array | undefined;
    } & {
        snapshot?: ({
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } & {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I_1["snapshot"], keyof Snapshot>]: never; }) | undefined;
        appHash?: Uint8Array | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof RequestOfferSnapshot>]: never; }>(object: I_1): RequestOfferSnapshot;
};
export declare const RequestLoadSnapshotChunk: {
    encode(message: RequestLoadSnapshotChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestLoadSnapshotChunk;
    fromJSON(object: any): RequestLoadSnapshotChunk;
    toJSON(message: RequestLoadSnapshotChunk): unknown;
    create<I extends {
        height?: string | undefined;
        format?: number | undefined;
        chunk?: number | undefined;
    } & {
        height?: string | undefined;
        format?: number | undefined;
        chunk?: number | undefined;
    } & { [K in Exclude<keyof I, keyof RequestLoadSnapshotChunk>]: never; }>(base?: I): RequestLoadSnapshotChunk;
    fromPartial<I_1 extends {
        height?: string | undefined;
        format?: number | undefined;
        chunk?: number | undefined;
    } & {
        height?: string | undefined;
        format?: number | undefined;
        chunk?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestLoadSnapshotChunk>]: never; }>(object: I_1): RequestLoadSnapshotChunk;
};
export declare const RequestApplySnapshotChunk: {
    encode(message: RequestApplySnapshotChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestApplySnapshotChunk;
    fromJSON(object: any): RequestApplySnapshotChunk;
    toJSON(message: RequestApplySnapshotChunk): unknown;
    create<I extends {
        index?: number | undefined;
        chunk?: Uint8Array | undefined;
        sender?: string | undefined;
    } & {
        index?: number | undefined;
        chunk?: Uint8Array | undefined;
        sender?: string | undefined;
    } & { [K in Exclude<keyof I, keyof RequestApplySnapshotChunk>]: never; }>(base?: I): RequestApplySnapshotChunk;
    fromPartial<I_1 extends {
        index?: number | undefined;
        chunk?: Uint8Array | undefined;
        sender?: string | undefined;
    } & {
        index?: number | undefined;
        chunk?: Uint8Array | undefined;
        sender?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RequestApplySnapshotChunk>]: never; }>(object: I_1): RequestApplySnapshotChunk;
};
export declare const Response: {
    encode(message: Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Response;
    fromJSON(object: any): Response;
    toJSON(message: Response): unknown;
    create<I extends {
        exception?: {
            error?: string | undefined;
        } | undefined;
        echo?: {
            message?: string | undefined;
        } | undefined;
        flush?: {} | undefined;
        info?: {
            data?: string | undefined;
            version?: string | undefined;
            appVersion?: string | undefined;
            lastBlockHeight?: string | undefined;
            lastBlockAppHash?: Uint8Array | undefined;
        } | undefined;
        setOption?: {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
        } | undefined;
        initChain?: {
            consensusParams?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            appHash?: Uint8Array | undefined;
        } | undefined;
        query?: {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
            index?: string | undefined;
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            proofOps?: {
                ops?: {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
            height?: string | undefined;
            codespace?: string | undefined;
        } | undefined;
        beginBlock?: {
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } | undefined;
        checkTx?: {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } | undefined;
        deliverTx?: {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } | undefined;
        endBlock?: {
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } | undefined;
        commit?: {
            data?: Uint8Array | undefined;
            retainHeight?: string | undefined;
        } | undefined;
        listSnapshots?: {
            snapshots?: {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
        offerSnapshot?: {
            result?: ResponseOfferSnapshot_Result | undefined;
        } | undefined;
        loadSnapshotChunk?: {
            chunk?: Uint8Array | undefined;
        } | undefined;
        applySnapshotChunk?: {
            result?: ResponseApplySnapshotChunk_Result | undefined;
            refetchChunks?: number[] | undefined;
            rejectSenders?: string[] | undefined;
        } | undefined;
    } & {
        exception?: ({
            error?: string | undefined;
        } & {
            error?: string | undefined;
        } & { [K in Exclude<keyof I["exception"], "error">]: never; }) | undefined;
        echo?: ({
            message?: string | undefined;
        } & {
            message?: string | undefined;
        } & { [K_1 in Exclude<keyof I["echo"], "message">]: never; }) | undefined;
        flush?: ({} & {} & { [K_2 in Exclude<keyof I["flush"], never>]: never; }) | undefined;
        info?: ({
            data?: string | undefined;
            version?: string | undefined;
            appVersion?: string | undefined;
            lastBlockHeight?: string | undefined;
            lastBlockAppHash?: Uint8Array | undefined;
        } & {
            data?: string | undefined;
            version?: string | undefined;
            appVersion?: string | undefined;
            lastBlockHeight?: string | undefined;
            lastBlockAppHash?: Uint8Array | undefined;
        } & { [K_3 in Exclude<keyof I["info"], keyof ResponseInfo>]: never; }) | undefined;
        setOption?: ({
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
        } & {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
        } & { [K_4 in Exclude<keyof I["setOption"], keyof ResponseSetOption>]: never; }) | undefined;
        initChain?: ({
            consensusParams?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            appHash?: Uint8Array | undefined;
        } & {
            consensusParams?: ({
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } & {
                block?: ({
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & { [K_5 in Exclude<keyof I["initChain"]["consensusParams"]["block"], keyof BlockParams>]: never; }) | undefined;
                evidence?: ({
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } & {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: ({
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & { [K_6 in Exclude<keyof I["initChain"]["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                    maxBytes?: string | undefined;
                } & { [K_7 in Exclude<keyof I["initChain"]["consensusParams"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
                validator?: ({
                    pubKeyTypes?: string[] | undefined;
                } & {
                    pubKeyTypes?: (string[] & string[] & { [K_8 in Exclude<keyof I["initChain"]["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["initChain"]["consensusParams"]["validator"], "pubKeyTypes">]: never; }) | undefined;
                version?: ({
                    appVersion?: string | undefined;
                } & {
                    appVersion?: string | undefined;
                } & { [K_10 in Exclude<keyof I["initChain"]["consensusParams"]["version"], "appVersion">]: never; }) | undefined;
            } & { [K_11 in Exclude<keyof I["initChain"]["consensusParams"], keyof ConsensusParams>]: never; }) | undefined;
            validators?: ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            } & {
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_12 in Exclude<keyof I["initChain"]["validators"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
                power?: string | undefined;
            } & { [K_13 in Exclude<keyof I["initChain"]["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_14 in Exclude<keyof I["initChain"]["validators"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[]>]: never; }) | undefined;
            appHash?: Uint8Array | undefined;
        } & { [K_15 in Exclude<keyof I["initChain"], keyof ResponseInitChain>]: never; }) | undefined;
        query?: ({
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
            index?: string | undefined;
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            proofOps?: {
                ops?: {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
            height?: string | undefined;
            codespace?: string | undefined;
        } & {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
            index?: string | undefined;
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            proofOps?: ({
                ops?: {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] | undefined;
            } & {
                ops?: ({
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] & ({
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                } & {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                } & { [K_16 in Exclude<keyof I["query"]["proofOps"]["ops"][number], keyof import("../crypto/proof").ProofOp>]: never; })[] & { [K_17 in Exclude<keyof I["query"]["proofOps"]["ops"], keyof {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_18 in Exclude<keyof I["query"]["proofOps"], "ops">]: never; }) | undefined;
            height?: string | undefined;
            codespace?: string | undefined;
        } & { [K_19 in Exclude<keyof I["query"], keyof ResponseQuery>]: never; }) | undefined;
        beginBlock?: ({
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_20 in Exclude<keyof I["beginBlock"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_21 in Exclude<keyof I["beginBlock"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_22 in Exclude<keyof I["beginBlock"]["events"][number], keyof Event>]: never; })[] & { [K_23 in Exclude<keyof I["beginBlock"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_24 in Exclude<keyof I["beginBlock"], "events">]: never; }) | undefined;
        checkTx?: ({
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } & {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_25 in Exclude<keyof I["checkTx"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_26 in Exclude<keyof I["checkTx"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_27 in Exclude<keyof I["checkTx"]["events"][number], keyof Event>]: never; })[] & { [K_28 in Exclude<keyof I["checkTx"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            codespace?: string | undefined;
        } & { [K_29 in Exclude<keyof I["checkTx"], keyof ResponseCheckTx>]: never; }) | undefined;
        deliverTx?: ({
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } & {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_30 in Exclude<keyof I["deliverTx"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_31 in Exclude<keyof I["deliverTx"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_32 in Exclude<keyof I["deliverTx"]["events"][number], keyof Event>]: never; })[] & { [K_33 in Exclude<keyof I["deliverTx"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            codespace?: string | undefined;
        } & { [K_34 in Exclude<keyof I["deliverTx"], keyof ResponseDeliverTx>]: never; }) | undefined;
        endBlock?: ({
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            validatorUpdates?: ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            } & {
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_35 in Exclude<keyof I["endBlock"]["validatorUpdates"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
                power?: string | undefined;
            } & { [K_36 in Exclude<keyof I["endBlock"]["validatorUpdates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_37 in Exclude<keyof I["endBlock"]["validatorUpdates"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[]>]: never; }) | undefined;
            consensusParamUpdates?: ({
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } & {
                block?: ({
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & { [K_38 in Exclude<keyof I["endBlock"]["consensusParamUpdates"]["block"], keyof BlockParams>]: never; }) | undefined;
                evidence?: ({
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } & {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: ({
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & { [K_39 in Exclude<keyof I["endBlock"]["consensusParamUpdates"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                    maxBytes?: string | undefined;
                } & { [K_40 in Exclude<keyof I["endBlock"]["consensusParamUpdates"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
                validator?: ({
                    pubKeyTypes?: string[] | undefined;
                } & {
                    pubKeyTypes?: (string[] & string[] & { [K_41 in Exclude<keyof I["endBlock"]["consensusParamUpdates"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
                } & { [K_42 in Exclude<keyof I["endBlock"]["consensusParamUpdates"]["validator"], "pubKeyTypes">]: never; }) | undefined;
                version?: ({
                    appVersion?: string | undefined;
                } & {
                    appVersion?: string | undefined;
                } & { [K_43 in Exclude<keyof I["endBlock"]["consensusParamUpdates"]["version"], "appVersion">]: never; }) | undefined;
            } & { [K_44 in Exclude<keyof I["endBlock"]["consensusParamUpdates"], keyof ConsensusParams>]: never; }) | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_45 in Exclude<keyof I["endBlock"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_46 in Exclude<keyof I["endBlock"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_47 in Exclude<keyof I["endBlock"]["events"][number], keyof Event>]: never; })[] & { [K_48 in Exclude<keyof I["endBlock"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_49 in Exclude<keyof I["endBlock"], keyof ResponseEndBlock>]: never; }) | undefined;
        commit?: ({
            data?: Uint8Array | undefined;
            retainHeight?: string | undefined;
        } & {
            data?: Uint8Array | undefined;
            retainHeight?: string | undefined;
        } & { [K_50 in Exclude<keyof I["commit"], keyof ResponseCommit>]: never; }) | undefined;
        listSnapshots?: ({
            snapshots?: {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            snapshots?: ({
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[] & ({
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } & {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } & { [K_51 in Exclude<keyof I["listSnapshots"]["snapshots"][number], keyof Snapshot>]: never; })[] & { [K_52 in Exclude<keyof I["listSnapshots"]["snapshots"], keyof {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_53 in Exclude<keyof I["listSnapshots"], "snapshots">]: never; }) | undefined;
        offerSnapshot?: ({
            result?: ResponseOfferSnapshot_Result | undefined;
        } & {
            result?: ResponseOfferSnapshot_Result | undefined;
        } & { [K_54 in Exclude<keyof I["offerSnapshot"], "result">]: never; }) | undefined;
        loadSnapshotChunk?: ({
            chunk?: Uint8Array | undefined;
        } & {
            chunk?: Uint8Array | undefined;
        } & { [K_55 in Exclude<keyof I["loadSnapshotChunk"], "chunk">]: never; }) | undefined;
        applySnapshotChunk?: ({
            result?: ResponseApplySnapshotChunk_Result | undefined;
            refetchChunks?: number[] | undefined;
            rejectSenders?: string[] | undefined;
        } & {
            result?: ResponseApplySnapshotChunk_Result | undefined;
            refetchChunks?: (number[] & number[] & { [K_56 in Exclude<keyof I["applySnapshotChunk"]["refetchChunks"], keyof number[]>]: never; }) | undefined;
            rejectSenders?: (string[] & string[] & { [K_57 in Exclude<keyof I["applySnapshotChunk"]["rejectSenders"], keyof string[]>]: never; }) | undefined;
        } & { [K_58 in Exclude<keyof I["applySnapshotChunk"], keyof ResponseApplySnapshotChunk>]: never; }) | undefined;
    } & { [K_59 in Exclude<keyof I, keyof Response>]: never; }>(base?: I): Response;
    fromPartial<I_1 extends {
        exception?: {
            error?: string | undefined;
        } | undefined;
        echo?: {
            message?: string | undefined;
        } | undefined;
        flush?: {} | undefined;
        info?: {
            data?: string | undefined;
            version?: string | undefined;
            appVersion?: string | undefined;
            lastBlockHeight?: string | undefined;
            lastBlockAppHash?: Uint8Array | undefined;
        } | undefined;
        setOption?: {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
        } | undefined;
        initChain?: {
            consensusParams?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            appHash?: Uint8Array | undefined;
        } | undefined;
        query?: {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
            index?: string | undefined;
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            proofOps?: {
                ops?: {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
            height?: string | undefined;
            codespace?: string | undefined;
        } | undefined;
        beginBlock?: {
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } | undefined;
        checkTx?: {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } | undefined;
        deliverTx?: {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } | undefined;
        endBlock?: {
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } | undefined;
        commit?: {
            data?: Uint8Array | undefined;
            retainHeight?: string | undefined;
        } | undefined;
        listSnapshots?: {
            snapshots?: {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
        offerSnapshot?: {
            result?: ResponseOfferSnapshot_Result | undefined;
        } | undefined;
        loadSnapshotChunk?: {
            chunk?: Uint8Array | undefined;
        } | undefined;
        applySnapshotChunk?: {
            result?: ResponseApplySnapshotChunk_Result | undefined;
            refetchChunks?: number[] | undefined;
            rejectSenders?: string[] | undefined;
        } | undefined;
    } & {
        exception?: ({
            error?: string | undefined;
        } & {
            error?: string | undefined;
        } & { [K_60 in Exclude<keyof I_1["exception"], "error">]: never; }) | undefined;
        echo?: ({
            message?: string | undefined;
        } & {
            message?: string | undefined;
        } & { [K_61 in Exclude<keyof I_1["echo"], "message">]: never; }) | undefined;
        flush?: ({} & {} & { [K_62 in Exclude<keyof I_1["flush"], never>]: never; }) | undefined;
        info?: ({
            data?: string | undefined;
            version?: string | undefined;
            appVersion?: string | undefined;
            lastBlockHeight?: string | undefined;
            lastBlockAppHash?: Uint8Array | undefined;
        } & {
            data?: string | undefined;
            version?: string | undefined;
            appVersion?: string | undefined;
            lastBlockHeight?: string | undefined;
            lastBlockAppHash?: Uint8Array | undefined;
        } & { [K_63 in Exclude<keyof I_1["info"], keyof ResponseInfo>]: never; }) | undefined;
        setOption?: ({
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
        } & {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
        } & { [K_64 in Exclude<keyof I_1["setOption"], keyof ResponseSetOption>]: never; }) | undefined;
        initChain?: ({
            consensusParams?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            appHash?: Uint8Array | undefined;
        } & {
            consensusParams?: ({
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } & {
                block?: ({
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & { [K_65 in Exclude<keyof I_1["initChain"]["consensusParams"]["block"], keyof BlockParams>]: never; }) | undefined;
                evidence?: ({
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } & {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: ({
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & { [K_66 in Exclude<keyof I_1["initChain"]["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                    maxBytes?: string | undefined;
                } & { [K_67 in Exclude<keyof I_1["initChain"]["consensusParams"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
                validator?: ({
                    pubKeyTypes?: string[] | undefined;
                } & {
                    pubKeyTypes?: (string[] & string[] & { [K_68 in Exclude<keyof I_1["initChain"]["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
                } & { [K_69 in Exclude<keyof I_1["initChain"]["consensusParams"]["validator"], "pubKeyTypes">]: never; }) | undefined;
                version?: ({
                    appVersion?: string | undefined;
                } & {
                    appVersion?: string | undefined;
                } & { [K_70 in Exclude<keyof I_1["initChain"]["consensusParams"]["version"], "appVersion">]: never; }) | undefined;
            } & { [K_71 in Exclude<keyof I_1["initChain"]["consensusParams"], keyof ConsensusParams>]: never; }) | undefined;
            validators?: ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            } & {
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_72 in Exclude<keyof I_1["initChain"]["validators"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
                power?: string | undefined;
            } & { [K_73 in Exclude<keyof I_1["initChain"]["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_74 in Exclude<keyof I_1["initChain"]["validators"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[]>]: never; }) | undefined;
            appHash?: Uint8Array | undefined;
        } & { [K_75 in Exclude<keyof I_1["initChain"], keyof ResponseInitChain>]: never; }) | undefined;
        query?: ({
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
            index?: string | undefined;
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            proofOps?: {
                ops?: {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
            height?: string | undefined;
            codespace?: string | undefined;
        } & {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
            index?: string | undefined;
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            proofOps?: ({
                ops?: {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] | undefined;
            } & {
                ops?: ({
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] & ({
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                } & {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                } & { [K_76 in Exclude<keyof I_1["query"]["proofOps"]["ops"][number], keyof import("../crypto/proof").ProofOp>]: never; })[] & { [K_77 in Exclude<keyof I_1["query"]["proofOps"]["ops"], keyof {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_78 in Exclude<keyof I_1["query"]["proofOps"], "ops">]: never; }) | undefined;
            height?: string | undefined;
            codespace?: string | undefined;
        } & { [K_79 in Exclude<keyof I_1["query"], keyof ResponseQuery>]: never; }) | undefined;
        beginBlock?: ({
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_80 in Exclude<keyof I_1["beginBlock"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_81 in Exclude<keyof I_1["beginBlock"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_82 in Exclude<keyof I_1["beginBlock"]["events"][number], keyof Event>]: never; })[] & { [K_83 in Exclude<keyof I_1["beginBlock"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_84 in Exclude<keyof I_1["beginBlock"], "events">]: never; }) | undefined;
        checkTx?: ({
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } & {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_85 in Exclude<keyof I_1["checkTx"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_86 in Exclude<keyof I_1["checkTx"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_87 in Exclude<keyof I_1["checkTx"]["events"][number], keyof Event>]: never; })[] & { [K_88 in Exclude<keyof I_1["checkTx"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            codespace?: string | undefined;
        } & { [K_89 in Exclude<keyof I_1["checkTx"], keyof ResponseCheckTx>]: never; }) | undefined;
        deliverTx?: ({
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } & {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_90 in Exclude<keyof I_1["deliverTx"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_91 in Exclude<keyof I_1["deliverTx"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_92 in Exclude<keyof I_1["deliverTx"]["events"][number], keyof Event>]: never; })[] & { [K_93 in Exclude<keyof I_1["deliverTx"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            codespace?: string | undefined;
        } & { [K_94 in Exclude<keyof I_1["deliverTx"], keyof ResponseDeliverTx>]: never; }) | undefined;
        endBlock?: ({
            validatorUpdates?: {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] | undefined;
            consensusParamUpdates?: {
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            validatorUpdates?: ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[] & ({
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            } & {
                pubKey?: ({
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } & { [K_95 in Exclude<keyof I_1["endBlock"]["validatorUpdates"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
                power?: string | undefined;
            } & { [K_96 in Exclude<keyof I_1["endBlock"]["validatorUpdates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_97 in Exclude<keyof I_1["endBlock"]["validatorUpdates"], keyof {
                pubKey?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: string | undefined;
            }[]>]: never; }) | undefined;
            consensusParamUpdates?: ({
                block?: {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } | undefined;
                evidence?: {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } | undefined;
                validator?: {
                    pubKeyTypes?: string[] | undefined;
                } | undefined;
                version?: {
                    appVersion?: string | undefined;
                } | undefined;
            } & {
                block?: ({
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & {
                    maxBytes?: string | undefined;
                    maxGas?: string | undefined;
                } & { [K_98 in Exclude<keyof I_1["endBlock"]["consensusParamUpdates"]["block"], keyof BlockParams>]: never; }) | undefined;
                evidence?: ({
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    maxBytes?: string | undefined;
                } & {
                    maxAgeNumBlocks?: string | undefined;
                    maxAgeDuration?: ({
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & {
                        seconds?: string | undefined;
                        nanos?: number | undefined;
                    } & { [K_99 in Exclude<keyof I_1["endBlock"]["consensusParamUpdates"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                    maxBytes?: string | undefined;
                } & { [K_100 in Exclude<keyof I_1["endBlock"]["consensusParamUpdates"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
                validator?: ({
                    pubKeyTypes?: string[] | undefined;
                } & {
                    pubKeyTypes?: (string[] & string[] & { [K_101 in Exclude<keyof I_1["endBlock"]["consensusParamUpdates"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
                } & { [K_102 in Exclude<keyof I_1["endBlock"]["consensusParamUpdates"]["validator"], "pubKeyTypes">]: never; }) | undefined;
                version?: ({
                    appVersion?: string | undefined;
                } & {
                    appVersion?: string | undefined;
                } & { [K_103 in Exclude<keyof I_1["endBlock"]["consensusParamUpdates"]["version"], "appVersion">]: never; }) | undefined;
            } & { [K_104 in Exclude<keyof I_1["endBlock"]["consensusParamUpdates"], keyof ConsensusParams>]: never; }) | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_105 in Exclude<keyof I_1["endBlock"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_106 in Exclude<keyof I_1["endBlock"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_107 in Exclude<keyof I_1["endBlock"]["events"][number], keyof Event>]: never; })[] & { [K_108 in Exclude<keyof I_1["endBlock"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_109 in Exclude<keyof I_1["endBlock"], keyof ResponseEndBlock>]: never; }) | undefined;
        commit?: ({
            data?: Uint8Array | undefined;
            retainHeight?: string | undefined;
        } & {
            data?: Uint8Array | undefined;
            retainHeight?: string | undefined;
        } & { [K_110 in Exclude<keyof I_1["commit"], keyof ResponseCommit>]: never; }) | undefined;
        listSnapshots?: ({
            snapshots?: {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            snapshots?: ({
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[] & ({
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } & {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } & { [K_111 in Exclude<keyof I_1["listSnapshots"]["snapshots"][number], keyof Snapshot>]: never; })[] & { [K_112 in Exclude<keyof I_1["listSnapshots"]["snapshots"], keyof {
                height?: string | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_113 in Exclude<keyof I_1["listSnapshots"], "snapshots">]: never; }) | undefined;
        offerSnapshot?: ({
            result?: ResponseOfferSnapshot_Result | undefined;
        } & {
            result?: ResponseOfferSnapshot_Result | undefined;
        } & { [K_114 in Exclude<keyof I_1["offerSnapshot"], "result">]: never; }) | undefined;
        loadSnapshotChunk?: ({
            chunk?: Uint8Array | undefined;
        } & {
            chunk?: Uint8Array | undefined;
        } & { [K_115 in Exclude<keyof I_1["loadSnapshotChunk"], "chunk">]: never; }) | undefined;
        applySnapshotChunk?: ({
            result?: ResponseApplySnapshotChunk_Result | undefined;
            refetchChunks?: number[] | undefined;
            rejectSenders?: string[] | undefined;
        } & {
            result?: ResponseApplySnapshotChunk_Result | undefined;
            refetchChunks?: (number[] & number[] & { [K_116 in Exclude<keyof I_1["applySnapshotChunk"]["refetchChunks"], keyof number[]>]: never; }) | undefined;
            rejectSenders?: (string[] & string[] & { [K_117 in Exclude<keyof I_1["applySnapshotChunk"]["rejectSenders"], keyof string[]>]: never; }) | undefined;
        } & { [K_118 in Exclude<keyof I_1["applySnapshotChunk"], keyof ResponseApplySnapshotChunk>]: never; }) | undefined;
    } & { [K_119 in Exclude<keyof I_1, keyof Response>]: never; }>(object: I_1): Response;
};
export declare const ResponseException: {
    encode(message: ResponseException, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseException;
    fromJSON(object: any): ResponseException;
    toJSON(message: ResponseException): unknown;
    create<I extends {
        error?: string | undefined;
    } & {
        error?: string | undefined;
    } & { [K in Exclude<keyof I, "error">]: never; }>(base?: I): ResponseException;
    fromPartial<I_1 extends {
        error?: string | undefined;
    } & {
        error?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "error">]: never; }>(object: I_1): ResponseException;
};
export declare const ResponseEcho: {
    encode(message: ResponseEcho, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEcho;
    fromJSON(object: any): ResponseEcho;
    toJSON(message: ResponseEcho): unknown;
    create<I extends {
        message?: string | undefined;
    } & {
        message?: string | undefined;
    } & { [K in Exclude<keyof I, "message">]: never; }>(base?: I): ResponseEcho;
    fromPartial<I_1 extends {
        message?: string | undefined;
    } & {
        message?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "message">]: never; }>(object: I_1): ResponseEcho;
};
export declare const ResponseFlush: {
    encode(_: ResponseFlush, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFlush;
    fromJSON(_: any): ResponseFlush;
    toJSON(_: ResponseFlush): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): ResponseFlush;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): ResponseFlush;
};
export declare const ResponseInfo: {
    encode(message: ResponseInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInfo;
    fromJSON(object: any): ResponseInfo;
    toJSON(message: ResponseInfo): unknown;
    create<I extends {
        data?: string | undefined;
        version?: string | undefined;
        appVersion?: string | undefined;
        lastBlockHeight?: string | undefined;
        lastBlockAppHash?: Uint8Array | undefined;
    } & {
        data?: string | undefined;
        version?: string | undefined;
        appVersion?: string | undefined;
        lastBlockHeight?: string | undefined;
        lastBlockAppHash?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof ResponseInfo>]: never; }>(base?: I): ResponseInfo;
    fromPartial<I_1 extends {
        data?: string | undefined;
        version?: string | undefined;
        appVersion?: string | undefined;
        lastBlockHeight?: string | undefined;
        lastBlockAppHash?: Uint8Array | undefined;
    } & {
        data?: string | undefined;
        version?: string | undefined;
        appVersion?: string | undefined;
        lastBlockHeight?: string | undefined;
        lastBlockAppHash?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ResponseInfo>]: never; }>(object: I_1): ResponseInfo;
};
export declare const ResponseSetOption: {
    encode(message: ResponseSetOption, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseSetOption;
    fromJSON(object: any): ResponseSetOption;
    toJSON(message: ResponseSetOption): unknown;
    create<I extends {
        code?: number | undefined;
        log?: string | undefined;
        info?: string | undefined;
    } & {
        code?: number | undefined;
        log?: string | undefined;
        info?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ResponseSetOption>]: never; }>(base?: I): ResponseSetOption;
    fromPartial<I_1 extends {
        code?: number | undefined;
        log?: string | undefined;
        info?: string | undefined;
    } & {
        code?: number | undefined;
        log?: string | undefined;
        info?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ResponseSetOption>]: never; }>(object: I_1): ResponseSetOption;
};
export declare const ResponseInitChain: {
    encode(message: ResponseInitChain, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInitChain;
    fromJSON(object: any): ResponseInitChain;
    toJSON(message: ResponseInitChain): unknown;
    create<I extends {
        consensusParams?: {
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } | undefined;
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] | undefined;
        appHash?: Uint8Array | undefined;
    } & {
        consensusParams?: ({
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } & {
            block?: ({
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & { [K in Exclude<keyof I["consensusParams"]["block"], keyof BlockParams>]: never; }) | undefined;
            evidence?: ({
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } & {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: ({
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & { [K_1 in Exclude<keyof I["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                maxBytes?: string | undefined;
            } & { [K_2 in Exclude<keyof I["consensusParams"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
            validator?: ({
                pubKeyTypes?: string[] | undefined;
            } & {
                pubKeyTypes?: (string[] & string[] & { [K_3 in Exclude<keyof I["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["consensusParams"]["validator"], "pubKeyTypes">]: never; }) | undefined;
            version?: ({
                appVersion?: string | undefined;
            } & {
                appVersion?: string | undefined;
            } & { [K_5 in Exclude<keyof I["consensusParams"]["version"], "appVersion">]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["consensusParams"], keyof ConsensusParams>]: never; }) | undefined;
        validators?: ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        } & {
            pubKey?: ({
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & { [K_7 in Exclude<keyof I["validators"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
            power?: string | undefined;
        } & { [K_8 in Exclude<keyof I["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_9 in Exclude<keyof I["validators"], keyof {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[]>]: never; }) | undefined;
        appHash?: Uint8Array | undefined;
    } & { [K_10 in Exclude<keyof I, keyof ResponseInitChain>]: never; }>(base?: I): ResponseInitChain;
    fromPartial<I_1 extends {
        consensusParams?: {
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } | undefined;
        validators?: {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] | undefined;
        appHash?: Uint8Array | undefined;
    } & {
        consensusParams?: ({
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } & {
            block?: ({
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & { [K_11 in Exclude<keyof I_1["consensusParams"]["block"], keyof BlockParams>]: never; }) | undefined;
            evidence?: ({
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } & {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: ({
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & { [K_12 in Exclude<keyof I_1["consensusParams"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                maxBytes?: string | undefined;
            } & { [K_13 in Exclude<keyof I_1["consensusParams"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
            validator?: ({
                pubKeyTypes?: string[] | undefined;
            } & {
                pubKeyTypes?: (string[] & string[] & { [K_14 in Exclude<keyof I_1["consensusParams"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
            } & { [K_15 in Exclude<keyof I_1["consensusParams"]["validator"], "pubKeyTypes">]: never; }) | undefined;
            version?: ({
                appVersion?: string | undefined;
            } & {
                appVersion?: string | undefined;
            } & { [K_16 in Exclude<keyof I_1["consensusParams"]["version"], "appVersion">]: never; }) | undefined;
        } & { [K_17 in Exclude<keyof I_1["consensusParams"], keyof ConsensusParams>]: never; }) | undefined;
        validators?: ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        } & {
            pubKey?: ({
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & { [K_18 in Exclude<keyof I_1["validators"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
            power?: string | undefined;
        } & { [K_19 in Exclude<keyof I_1["validators"][number], keyof ValidatorUpdate>]: never; })[] & { [K_20 in Exclude<keyof I_1["validators"], keyof {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[]>]: never; }) | undefined;
        appHash?: Uint8Array | undefined;
    } & { [K_21 in Exclude<keyof I_1, keyof ResponseInitChain>]: never; }>(object: I_1): ResponseInitChain;
};
export declare const ResponseQuery: {
    encode(message: ResponseQuery, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseQuery;
    fromJSON(object: any): ResponseQuery;
    toJSON(message: ResponseQuery): unknown;
    create<I extends {
        code?: number | undefined;
        log?: string | undefined;
        info?: string | undefined;
        index?: string | undefined;
        key?: Uint8Array | undefined;
        value?: Uint8Array | undefined;
        proofOps?: {
            ops?: {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
        height?: string | undefined;
        codespace?: string | undefined;
    } & {
        code?: number | undefined;
        log?: string | undefined;
        info?: string | undefined;
        index?: string | undefined;
        key?: Uint8Array | undefined;
        value?: Uint8Array | undefined;
        proofOps?: ({
            ops?: {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            ops?: ({
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[] & ({
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            } & {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["proofOps"]["ops"][number], keyof import("../crypto/proof").ProofOp>]: never; })[] & { [K_1 in Exclude<keyof I["proofOps"]["ops"], keyof {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["proofOps"], "ops">]: never; }) | undefined;
        height?: string | undefined;
        codespace?: string | undefined;
    } & { [K_3 in Exclude<keyof I, keyof ResponseQuery>]: never; }>(base?: I): ResponseQuery;
    fromPartial<I_1 extends {
        code?: number | undefined;
        log?: string | undefined;
        info?: string | undefined;
        index?: string | undefined;
        key?: Uint8Array | undefined;
        value?: Uint8Array | undefined;
        proofOps?: {
            ops?: {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
        height?: string | undefined;
        codespace?: string | undefined;
    } & {
        code?: number | undefined;
        log?: string | undefined;
        info?: string | undefined;
        index?: string | undefined;
        key?: Uint8Array | undefined;
        value?: Uint8Array | undefined;
        proofOps?: ({
            ops?: {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            ops?: ({
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[] & ({
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            } & {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            } & { [K_4 in Exclude<keyof I_1["proofOps"]["ops"][number], keyof import("../crypto/proof").ProofOp>]: never; })[] & { [K_5 in Exclude<keyof I_1["proofOps"]["ops"], keyof {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I_1["proofOps"], "ops">]: never; }) | undefined;
        height?: string | undefined;
        codespace?: string | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof ResponseQuery>]: never; }>(object: I_1): ResponseQuery;
};
export declare const ResponseBeginBlock: {
    encode(message: ResponseBeginBlock, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseBeginBlock;
    fromJSON(object: any): ResponseBeginBlock;
    toJSON(message: ResponseBeginBlock): unknown;
    create<I extends {
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & { [K in Exclude<keyof I["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["events"], keyof {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "events">]: never; }>(base?: I): ResponseBeginBlock;
    fromPartial<I_1 extends {
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & { [K_5 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_6 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_8 in Exclude<keyof I_1["events"], keyof {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, "events">]: never; }>(object: I_1): ResponseBeginBlock;
};
export declare const ResponseCheckTx: {
    encode(message: ResponseCheckTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCheckTx;
    fromJSON(object: any): ResponseCheckTx;
    toJSON(message: ResponseCheckTx): unknown;
    create<I extends {
        code?: number | undefined;
        data?: Uint8Array | undefined;
        log?: string | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
        codespace?: string | undefined;
    } & {
        code?: number | undefined;
        data?: Uint8Array | undefined;
        log?: string | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & { [K in Exclude<keyof I["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["events"], keyof {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        codespace?: string | undefined;
    } & { [K_4 in Exclude<keyof I, keyof ResponseCheckTx>]: never; }>(base?: I): ResponseCheckTx;
    fromPartial<I_1 extends {
        code?: number | undefined;
        data?: Uint8Array | undefined;
        log?: string | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
        codespace?: string | undefined;
    } & {
        code?: number | undefined;
        data?: Uint8Array | undefined;
        log?: string | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & { [K_5 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_6 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_8 in Exclude<keyof I_1["events"], keyof {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        codespace?: string | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof ResponseCheckTx>]: never; }>(object: I_1): ResponseCheckTx;
};
export declare const ResponseDeliverTx: {
    encode(message: ResponseDeliverTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseDeliverTx;
    fromJSON(object: any): ResponseDeliverTx;
    toJSON(message: ResponseDeliverTx): unknown;
    create<I extends {
        code?: number | undefined;
        data?: Uint8Array | undefined;
        log?: string | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
        codespace?: string | undefined;
    } & {
        code?: number | undefined;
        data?: Uint8Array | undefined;
        log?: string | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & { [K in Exclude<keyof I["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["events"], keyof {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        codespace?: string | undefined;
    } & { [K_4 in Exclude<keyof I, keyof ResponseDeliverTx>]: never; }>(base?: I): ResponseDeliverTx;
    fromPartial<I_1 extends {
        code?: number | undefined;
        data?: Uint8Array | undefined;
        log?: string | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
        codespace?: string | undefined;
    } & {
        code?: number | undefined;
        data?: Uint8Array | undefined;
        log?: string | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & { [K_5 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_6 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_8 in Exclude<keyof I_1["events"], keyof {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        codespace?: string | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof ResponseDeliverTx>]: never; }>(object: I_1): ResponseDeliverTx;
};
export declare const ResponseEndBlock: {
    encode(message: ResponseEndBlock, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEndBlock;
    fromJSON(object: any): ResponseEndBlock;
    toJSON(message: ResponseEndBlock): unknown;
    create<I extends {
        validatorUpdates?: {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] | undefined;
        consensusParamUpdates?: {
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } | undefined;
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        validatorUpdates?: ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        } & {
            pubKey?: ({
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & { [K in Exclude<keyof I["validatorUpdates"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
            power?: string | undefined;
        } & { [K_1 in Exclude<keyof I["validatorUpdates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_2 in Exclude<keyof I["validatorUpdates"], keyof {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[]>]: never; }) | undefined;
        consensusParamUpdates?: ({
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } & {
            block?: ({
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & { [K_3 in Exclude<keyof I["consensusParamUpdates"]["block"], keyof BlockParams>]: never; }) | undefined;
            evidence?: ({
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } & {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: ({
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & { [K_4 in Exclude<keyof I["consensusParamUpdates"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                maxBytes?: string | undefined;
            } & { [K_5 in Exclude<keyof I["consensusParamUpdates"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
            validator?: ({
                pubKeyTypes?: string[] | undefined;
            } & {
                pubKeyTypes?: (string[] & string[] & { [K_6 in Exclude<keyof I["consensusParamUpdates"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I["consensusParamUpdates"]["validator"], "pubKeyTypes">]: never; }) | undefined;
            version?: ({
                appVersion?: string | undefined;
            } & {
                appVersion?: string | undefined;
            } & { [K_8 in Exclude<keyof I["consensusParamUpdates"]["version"], "appVersion">]: never; }) | undefined;
        } & { [K_9 in Exclude<keyof I["consensusParamUpdates"], keyof ConsensusParams>]: never; }) | undefined;
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & { [K_10 in Exclude<keyof I["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_11 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_12 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_13 in Exclude<keyof I["events"], keyof {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_14 in Exclude<keyof I, keyof ResponseEndBlock>]: never; }>(base?: I): ResponseEndBlock;
    fromPartial<I_1 extends {
        validatorUpdates?: {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] | undefined;
        consensusParamUpdates?: {
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } | undefined;
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        validatorUpdates?: ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        } & {
            pubKey?: ({
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } & { [K_15 in Exclude<keyof I_1["validatorUpdates"][number]["pubKey"], keyof PublicKey>]: never; }) | undefined;
            power?: string | undefined;
        } & { [K_16 in Exclude<keyof I_1["validatorUpdates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_17 in Exclude<keyof I_1["validatorUpdates"], keyof {
            pubKey?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: string | undefined;
        }[]>]: never; }) | undefined;
        consensusParamUpdates?: ({
            block?: {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } | undefined;
            evidence?: {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } | undefined;
            validator?: {
                pubKeyTypes?: string[] | undefined;
            } | undefined;
            version?: {
                appVersion?: string | undefined;
            } | undefined;
        } & {
            block?: ({
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & {
                maxBytes?: string | undefined;
                maxGas?: string | undefined;
            } & { [K_18 in Exclude<keyof I_1["consensusParamUpdates"]["block"], keyof BlockParams>]: never; }) | undefined;
            evidence?: ({
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } | undefined;
                maxBytes?: string | undefined;
            } & {
                maxAgeNumBlocks?: string | undefined;
                maxAgeDuration?: ({
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & {
                    seconds?: string | undefined;
                    nanos?: number | undefined;
                } & { [K_19 in Exclude<keyof I_1["consensusParamUpdates"]["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
                maxBytes?: string | undefined;
            } & { [K_20 in Exclude<keyof I_1["consensusParamUpdates"]["evidence"], keyof EvidenceParams>]: never; }) | undefined;
            validator?: ({
                pubKeyTypes?: string[] | undefined;
            } & {
                pubKeyTypes?: (string[] & string[] & { [K_21 in Exclude<keyof I_1["consensusParamUpdates"]["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
            } & { [K_22 in Exclude<keyof I_1["consensusParamUpdates"]["validator"], "pubKeyTypes">]: never; }) | undefined;
            version?: ({
                appVersion?: string | undefined;
            } & {
                appVersion?: string | undefined;
            } & { [K_23 in Exclude<keyof I_1["consensusParamUpdates"]["version"], "appVersion">]: never; }) | undefined;
        } & { [K_24 in Exclude<keyof I_1["consensusParamUpdates"], keyof ConsensusParams>]: never; }) | undefined;
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & { [K_25 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_26 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_27 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_28 in Exclude<keyof I_1["events"], keyof {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_29 in Exclude<keyof I_1, keyof ResponseEndBlock>]: never; }>(object: I_1): ResponseEndBlock;
};
export declare const ResponseCommit: {
    encode(message: ResponseCommit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCommit;
    fromJSON(object: any): ResponseCommit;
    toJSON(message: ResponseCommit): unknown;
    create<I extends {
        data?: Uint8Array | undefined;
        retainHeight?: string | undefined;
    } & {
        data?: Uint8Array | undefined;
        retainHeight?: string | undefined;
    } & { [K in Exclude<keyof I, keyof ResponseCommit>]: never; }>(base?: I): ResponseCommit;
    fromPartial<I_1 extends {
        data?: Uint8Array | undefined;
        retainHeight?: string | undefined;
    } & {
        data?: Uint8Array | undefined;
        retainHeight?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ResponseCommit>]: never; }>(object: I_1): ResponseCommit;
};
export declare const ResponseListSnapshots: {
    encode(message: ResponseListSnapshots, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseListSnapshots;
    fromJSON(object: any): ResponseListSnapshots;
    toJSON(message: ResponseListSnapshots): unknown;
    create<I extends {
        snapshots?: {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        snapshots?: ({
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        }[] & ({
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } & {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["snapshots"][number], keyof Snapshot>]: never; })[] & { [K_1 in Exclude<keyof I["snapshots"], keyof {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "snapshots">]: never; }>(base?: I): ResponseListSnapshots;
    fromPartial<I_1 extends {
        snapshots?: {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        snapshots?: ({
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        }[] & ({
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } & {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        } & { [K_3 in Exclude<keyof I_1["snapshots"][number], keyof Snapshot>]: never; })[] & { [K_4 in Exclude<keyof I_1["snapshots"], keyof {
            height?: string | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "snapshots">]: never; }>(object: I_1): ResponseListSnapshots;
};
export declare const ResponseOfferSnapshot: {
    encode(message: ResponseOfferSnapshot, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseOfferSnapshot;
    fromJSON(object: any): ResponseOfferSnapshot;
    toJSON(message: ResponseOfferSnapshot): unknown;
    create<I extends {
        result?: ResponseOfferSnapshot_Result | undefined;
    } & {
        result?: ResponseOfferSnapshot_Result | undefined;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): ResponseOfferSnapshot;
    fromPartial<I_1 extends {
        result?: ResponseOfferSnapshot_Result | undefined;
    } & {
        result?: ResponseOfferSnapshot_Result | undefined;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): ResponseOfferSnapshot;
};
export declare const ResponseLoadSnapshotChunk: {
    encode(message: ResponseLoadSnapshotChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseLoadSnapshotChunk;
    fromJSON(object: any): ResponseLoadSnapshotChunk;
    toJSON(message: ResponseLoadSnapshotChunk): unknown;
    create<I extends {
        chunk?: Uint8Array | undefined;
    } & {
        chunk?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, "chunk">]: never; }>(base?: I): ResponseLoadSnapshotChunk;
    fromPartial<I_1 extends {
        chunk?: Uint8Array | undefined;
    } & {
        chunk?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, "chunk">]: never; }>(object: I_1): ResponseLoadSnapshotChunk;
};
export declare const ResponseApplySnapshotChunk: {
    encode(message: ResponseApplySnapshotChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ResponseApplySnapshotChunk;
    fromJSON(object: any): ResponseApplySnapshotChunk;
    toJSON(message: ResponseApplySnapshotChunk): unknown;
    create<I extends {
        result?: ResponseApplySnapshotChunk_Result | undefined;
        refetchChunks?: number[] | undefined;
        rejectSenders?: string[] | undefined;
    } & {
        result?: ResponseApplySnapshotChunk_Result | undefined;
        refetchChunks?: (number[] & number[] & { [K in Exclude<keyof I["refetchChunks"], keyof number[]>]: never; }) | undefined;
        rejectSenders?: (string[] & string[] & { [K_1 in Exclude<keyof I["rejectSenders"], keyof string[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ResponseApplySnapshotChunk>]: never; }>(base?: I): ResponseApplySnapshotChunk;
    fromPartial<I_1 extends {
        result?: ResponseApplySnapshotChunk_Result | undefined;
        refetchChunks?: number[] | undefined;
        rejectSenders?: string[] | undefined;
    } & {
        result?: ResponseApplySnapshotChunk_Result | undefined;
        refetchChunks?: (number[] & number[] & { [K_3 in Exclude<keyof I_1["refetchChunks"], keyof number[]>]: never; }) | undefined;
        rejectSenders?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["rejectSenders"], keyof string[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof ResponseApplySnapshotChunk>]: never; }>(object: I_1): ResponseApplySnapshotChunk;
};
export declare const ConsensusParams: {
    encode(message: ConsensusParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusParams;
    fromJSON(object: any): ConsensusParams;
    toJSON(message: ConsensusParams): unknown;
    create<I extends {
        block?: {
            maxBytes?: string | undefined;
            maxGas?: string | undefined;
        } | undefined;
        evidence?: {
            maxAgeNumBlocks?: string | undefined;
            maxAgeDuration?: {
                seconds?: string | undefined;
                nanos?: number | undefined;
            } | undefined;
            maxBytes?: string | undefined;
        } | undefined;
        validator?: {
            pubKeyTypes?: string[] | undefined;
        } | undefined;
        version?: {
            appVersion?: string | undefined;
        } | undefined;
    } & {
        block?: ({
            maxBytes?: string | undefined;
            maxGas?: string | undefined;
        } & {
            maxBytes?: string | undefined;
            maxGas?: string | undefined;
        } & { [K in Exclude<keyof I["block"], keyof BlockParams>]: never; }) | undefined;
        evidence?: ({
            maxAgeNumBlocks?: string | undefined;
            maxAgeDuration?: {
                seconds?: string | undefined;
                nanos?: number | undefined;
            } | undefined;
            maxBytes?: string | undefined;
        } & {
            maxAgeNumBlocks?: string | undefined;
            maxAgeDuration?: ({
                seconds?: string | undefined;
                nanos?: number | undefined;
            } & {
                seconds?: string | undefined;
                nanos?: number | undefined;
            } & { [K_1 in Exclude<keyof I["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
            maxBytes?: string | undefined;
        } & { [K_2 in Exclude<keyof I["evidence"], keyof EvidenceParams>]: never; }) | undefined;
        validator?: ({
            pubKeyTypes?: string[] | undefined;
        } & {
            pubKeyTypes?: (string[] & string[] & { [K_3 in Exclude<keyof I["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["validator"], "pubKeyTypes">]: never; }) | undefined;
        version?: ({
            appVersion?: string | undefined;
        } & {
            appVersion?: string | undefined;
        } & { [K_5 in Exclude<keyof I["version"], "appVersion">]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof ConsensusParams>]: never; }>(base?: I): ConsensusParams;
    fromPartial<I_1 extends {
        block?: {
            maxBytes?: string | undefined;
            maxGas?: string | undefined;
        } | undefined;
        evidence?: {
            maxAgeNumBlocks?: string | undefined;
            maxAgeDuration?: {
                seconds?: string | undefined;
                nanos?: number | undefined;
            } | undefined;
            maxBytes?: string | undefined;
        } | undefined;
        validator?: {
            pubKeyTypes?: string[] | undefined;
        } | undefined;
        version?: {
            appVersion?: string | undefined;
        } | undefined;
    } & {
        block?: ({
            maxBytes?: string | undefined;
            maxGas?: string | undefined;
        } & {
            maxBytes?: string | undefined;
            maxGas?: string | undefined;
        } & { [K_7 in Exclude<keyof I_1["block"], keyof BlockParams>]: never; }) | undefined;
        evidence?: ({
            maxAgeNumBlocks?: string | undefined;
            maxAgeDuration?: {
                seconds?: string | undefined;
                nanos?: number | undefined;
            } | undefined;
            maxBytes?: string | undefined;
        } & {
            maxAgeNumBlocks?: string | undefined;
            maxAgeDuration?: ({
                seconds?: string | undefined;
                nanos?: number | undefined;
            } & {
                seconds?: string | undefined;
                nanos?: number | undefined;
            } & { [K_8 in Exclude<keyof I_1["evidence"]["maxAgeDuration"], keyof import("../../google/protobuf/duration").Duration>]: never; }) | undefined;
            maxBytes?: string | undefined;
        } & { [K_9 in Exclude<keyof I_1["evidence"], keyof EvidenceParams>]: never; }) | undefined;
        validator?: ({
            pubKeyTypes?: string[] | undefined;
        } & {
            pubKeyTypes?: (string[] & string[] & { [K_10 in Exclude<keyof I_1["validator"]["pubKeyTypes"], keyof string[]>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I_1["validator"], "pubKeyTypes">]: never; }) | undefined;
        version?: ({
            appVersion?: string | undefined;
        } & {
            appVersion?: string | undefined;
        } & { [K_12 in Exclude<keyof I_1["version"], "appVersion">]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof ConsensusParams>]: never; }>(object: I_1): ConsensusParams;
};
export declare const BlockParams: {
    encode(message: BlockParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BlockParams;
    fromJSON(object: any): BlockParams;
    toJSON(message: BlockParams): unknown;
    create<I extends {
        maxBytes?: string | undefined;
        maxGas?: string | undefined;
    } & {
        maxBytes?: string | undefined;
        maxGas?: string | undefined;
    } & { [K in Exclude<keyof I, keyof BlockParams>]: never; }>(base?: I): BlockParams;
    fromPartial<I_1 extends {
        maxBytes?: string | undefined;
        maxGas?: string | undefined;
    } & {
        maxBytes?: string | undefined;
        maxGas?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof BlockParams>]: never; }>(object: I_1): BlockParams;
};
export declare const LastCommitInfo: {
    encode(message: LastCommitInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LastCommitInfo;
    fromJSON(object: any): LastCommitInfo;
    toJSON(message: LastCommitInfo): unknown;
    create<I extends {
        round?: number | undefined;
        votes?: {
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            signedLastBlock?: boolean | undefined;
        }[] | undefined;
    } & {
        round?: number | undefined;
        votes?: ({
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            signedLastBlock?: boolean | undefined;
        }[] & ({
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            signedLastBlock?: boolean | undefined;
        } & {
            validator?: ({
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } & {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } & { [K in Exclude<keyof I["votes"][number]["validator"], keyof Validator>]: never; }) | undefined;
            signedLastBlock?: boolean | undefined;
        } & { [K_1 in Exclude<keyof I["votes"][number], keyof VoteInfo>]: never; })[] & { [K_2 in Exclude<keyof I["votes"], keyof {
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            signedLastBlock?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof LastCommitInfo>]: never; }>(base?: I): LastCommitInfo;
    fromPartial<I_1 extends {
        round?: number | undefined;
        votes?: {
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            signedLastBlock?: boolean | undefined;
        }[] | undefined;
    } & {
        round?: number | undefined;
        votes?: ({
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            signedLastBlock?: boolean | undefined;
        }[] & ({
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            signedLastBlock?: boolean | undefined;
        } & {
            validator?: ({
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } & {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } & { [K_4 in Exclude<keyof I_1["votes"][number]["validator"], keyof Validator>]: never; }) | undefined;
            signedLastBlock?: boolean | undefined;
        } & { [K_5 in Exclude<keyof I_1["votes"][number], keyof VoteInfo>]: never; })[] & { [K_6 in Exclude<keyof I_1["votes"], keyof {
            validator?: {
                address?: Uint8Array | undefined;
                power?: string | undefined;
            } | undefined;
            signedLastBlock?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof LastCommitInfo>]: never; }>(object: I_1): LastCommitInfo;
};
export declare const Event: {
    encode(message: Event, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Event;
    fromJSON(object: any): Event;
    toJSON(message: Event): unknown;
    create<I extends {
        type?: string | undefined;
        attributes?: {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        }[] | undefined;
    } & {
        type?: string | undefined;
        attributes?: ({
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        }[] & ({
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        } & {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        } & { [K in Exclude<keyof I["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["attributes"], keyof {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Event>]: never; }>(base?: I): Event;
    fromPartial<I_1 extends {
        type?: string | undefined;
        attributes?: {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        }[] | undefined;
    } & {
        type?: string | undefined;
        attributes?: ({
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        }[] & ({
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        } & {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I_1["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_4 in Exclude<keyof I_1["attributes"], keyof {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof Event>]: never; }>(object: I_1): Event;
};
export declare const EventAttribute: {
    encode(message: EventAttribute, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventAttribute;
    fromJSON(object: any): EventAttribute;
    toJSON(message: EventAttribute): unknown;
    create<I extends {
        key?: Uint8Array | undefined;
        value?: Uint8Array | undefined;
        index?: boolean | undefined;
    } & {
        key?: Uint8Array | undefined;
        value?: Uint8Array | undefined;
        index?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof EventAttribute>]: never; }>(base?: I): EventAttribute;
    fromPartial<I_1 extends {
        key?: Uint8Array | undefined;
        value?: Uint8Array | undefined;
        index?: boolean | undefined;
    } & {
        key?: Uint8Array | undefined;
        value?: Uint8Array | undefined;
        index?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof EventAttribute>]: never; }>(object: I_1): EventAttribute;
};
export declare const TxResult: {
    encode(message: TxResult, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxResult;
    fromJSON(object: any): TxResult;
    toJSON(message: TxResult): unknown;
    create<I extends {
        height?: string | undefined;
        index?: number | undefined;
        tx?: Uint8Array | undefined;
        result?: {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } | undefined;
    } & {
        height?: string | undefined;
        index?: number | undefined;
        tx?: Uint8Array | undefined;
        result?: ({
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } & {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K in Exclude<keyof I["result"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["result"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["result"]["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["result"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            codespace?: string | undefined;
        } & { [K_4 in Exclude<keyof I["result"], keyof ResponseDeliverTx>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof TxResult>]: never; }>(base?: I): TxResult;
    fromPartial<I_1 extends {
        height?: string | undefined;
        index?: number | undefined;
        tx?: Uint8Array | undefined;
        result?: {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } | undefined;
    } & {
        height?: string | undefined;
        index?: number | undefined;
        tx?: Uint8Array | undefined;
        result?: ({
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        } & {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & { [K_6 in Exclude<keyof I_1["result"]["events"][number]["attributes"][number], keyof EventAttribute>]: never; })[] & { [K_7 in Exclude<keyof I_1["result"]["events"][number]["attributes"], keyof {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_8 in Exclude<keyof I_1["result"]["events"][number], keyof Event>]: never; })[] & { [K_9 in Exclude<keyof I_1["result"]["events"], keyof {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            codespace?: string | undefined;
        } & { [K_10 in Exclude<keyof I_1["result"], keyof ResponseDeliverTx>]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I_1, keyof TxResult>]: never; }>(object: I_1): TxResult;
};
export declare const Validator: {
    encode(message: Validator, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Validator;
    fromJSON(object: any): Validator;
    toJSON(message: Validator): unknown;
    create<I extends {
        address?: Uint8Array | undefined;
        power?: string | undefined;
    } & {
        address?: Uint8Array | undefined;
        power?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Validator>]: never; }>(base?: I): Validator;
    fromPartial<I_1 extends {
        address?: Uint8Array | undefined;
        power?: string | undefined;
    } & {
        address?: Uint8Array | undefined;
        power?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Validator>]: never; }>(object: I_1): Validator;
};
export declare const ValidatorUpdate: {
    encode(message: ValidatorUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorUpdate;
    fromJSON(object: any): ValidatorUpdate;
    toJSON(message: ValidatorUpdate): unknown;
    create<I extends {
        pubKey?: {
            ed25519?: Uint8Array | undefined;
            secp256k1?: Uint8Array | undefined;
        } | undefined;
        power?: string | undefined;
    } & {
        pubKey?: ({
            ed25519?: Uint8Array | undefined;
            secp256k1?: Uint8Array | undefined;
        } & {
            ed25519?: Uint8Array | undefined;
            secp256k1?: Uint8Array | undefined;
        } & { [K in Exclude<keyof I["pubKey"], keyof PublicKey>]: never; }) | undefined;
        power?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ValidatorUpdate>]: never; }>(base?: I): ValidatorUpdate;
    fromPartial<I_1 extends {
        pubKey?: {
            ed25519?: Uint8Array | undefined;
            secp256k1?: Uint8Array | undefined;
        } | undefined;
        power?: string | undefined;
    } & {
        pubKey?: ({
            ed25519?: Uint8Array | undefined;
            secp256k1?: Uint8Array | undefined;
        } & {
            ed25519?: Uint8Array | undefined;
            secp256k1?: Uint8Array | undefined;
        } & { [K_2 in Exclude<keyof I_1["pubKey"], keyof PublicKey>]: never; }) | undefined;
        power?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof ValidatorUpdate>]: never; }>(object: I_1): ValidatorUpdate;
};
export declare const VoteInfo: {
    encode(message: VoteInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): VoteInfo;
    fromJSON(object: any): VoteInfo;
    toJSON(message: VoteInfo): unknown;
    create<I extends {
        validator?: {
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } | undefined;
        signedLastBlock?: boolean | undefined;
    } & {
        validator?: ({
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } & {
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } & { [K in Exclude<keyof I["validator"], keyof Validator>]: never; }) | undefined;
        signedLastBlock?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I, keyof VoteInfo>]: never; }>(base?: I): VoteInfo;
    fromPartial<I_1 extends {
        validator?: {
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } | undefined;
        signedLastBlock?: boolean | undefined;
    } & {
        validator?: ({
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } & {
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["validator"], keyof Validator>]: never; }) | undefined;
        signedLastBlock?: boolean | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof VoteInfo>]: never; }>(object: I_1): VoteInfo;
};
export declare const Evidence: {
    encode(message: Evidence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Evidence;
    fromJSON(object: any): Evidence;
    toJSON(message: Evidence): unknown;
    create<I extends {
        type?: EvidenceType | undefined;
        validator?: {
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } | undefined;
        height?: string | undefined;
        time?: Date | undefined;
        totalVotingPower?: string | undefined;
    } & {
        type?: EvidenceType | undefined;
        validator?: ({
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } & {
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } & { [K in Exclude<keyof I["validator"], keyof Validator>]: never; }) | undefined;
        height?: string | undefined;
        time?: Date | undefined;
        totalVotingPower?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Evidence>]: never; }>(base?: I): Evidence;
    fromPartial<I_1 extends {
        type?: EvidenceType | undefined;
        validator?: {
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } | undefined;
        height?: string | undefined;
        time?: Date | undefined;
        totalVotingPower?: string | undefined;
    } & {
        type?: EvidenceType | undefined;
        validator?: ({
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } & {
            address?: Uint8Array | undefined;
            power?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["validator"], keyof Validator>]: never; }) | undefined;
        height?: string | undefined;
        time?: Date | undefined;
        totalVotingPower?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof Evidence>]: never; }>(object: I_1): Evidence;
};
export declare const Snapshot: {
    encode(message: Snapshot, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot;
    fromJSON(object: any): Snapshot;
    toJSON(message: Snapshot): unknown;
    create<I extends {
        height?: string | undefined;
        format?: number | undefined;
        chunks?: number | undefined;
        hash?: Uint8Array | undefined;
        metadata?: Uint8Array | undefined;
    } & {
        height?: string | undefined;
        format?: number | undefined;
        chunks?: number | undefined;
        hash?: Uint8Array | undefined;
        metadata?: Uint8Array | undefined;
    } & { [K in Exclude<keyof I, keyof Snapshot>]: never; }>(base?: I): Snapshot;
    fromPartial<I_1 extends {
        height?: string | undefined;
        format?: number | undefined;
        chunks?: number | undefined;
        hash?: Uint8Array | undefined;
        metadata?: Uint8Array | undefined;
    } & {
        height?: string | undefined;
        format?: number | undefined;
        chunks?: number | undefined;
        hash?: Uint8Array | undefined;
        metadata?: Uint8Array | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Snapshot>]: never; }>(object: I_1): Snapshot;
};
export interface ABCIApplication {
    Echo(request: RequestEcho): Promise<ResponseEcho>;
    Flush(request: RequestFlush): Promise<ResponseFlush>;
    Info(request: RequestInfo): Promise<ResponseInfo>;
    SetOption(request: RequestSetOption): Promise<ResponseSetOption>;
    DeliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx>;
    CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
    Query(request: RequestQuery): Promise<ResponseQuery>;
    Commit(request: RequestCommit): Promise<ResponseCommit>;
    InitChain(request: RequestInitChain): Promise<ResponseInitChain>;
    BeginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock>;
    EndBlock(request: RequestEndBlock): Promise<ResponseEndBlock>;
    ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots>;
    OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
    LoadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk>;
    ApplySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk>;
}
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
