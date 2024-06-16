"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.LastCommitInfo = exports.BlockParams = exports.ConsensusParams = exports.ResponseApplySnapshotChunk = exports.ResponseLoadSnapshotChunk = exports.ResponseOfferSnapshot = exports.ResponseListSnapshots = exports.ResponseCommit = exports.ResponseEndBlock = exports.ResponseDeliverTx = exports.ResponseCheckTx = exports.ResponseBeginBlock = exports.ResponseQuery = exports.ResponseInitChain = exports.ResponseSetOption = exports.ResponseInfo = exports.ResponseFlush = exports.ResponseEcho = exports.ResponseException = exports.Response = exports.RequestApplySnapshotChunk = exports.RequestLoadSnapshotChunk = exports.RequestOfferSnapshot = exports.RequestListSnapshots = exports.RequestCommit = exports.RequestEndBlock = exports.RequestDeliverTx = exports.RequestCheckTx = exports.RequestBeginBlock = exports.RequestQuery = exports.RequestInitChain = exports.RequestSetOption = exports.RequestInfo = exports.RequestFlush = exports.RequestEcho = exports.Request = exports.responseApplySnapshotChunk_ResultToJSON = exports.responseApplySnapshotChunk_ResultFromJSON = exports.ResponseApplySnapshotChunk_Result = exports.responseOfferSnapshot_ResultToJSON = exports.responseOfferSnapshot_ResultFromJSON = exports.ResponseOfferSnapshot_Result = exports.evidenceTypeToJSON = exports.evidenceTypeFromJSON = exports.EvidenceType = exports.checkTxTypeToJSON = exports.checkTxTypeFromJSON = exports.CheckTxType = exports.protobufPackage = void 0;
exports.Snapshot = exports.Evidence = exports.VoteInfo = exports.ValidatorUpdate = exports.Validator = exports.TxResult = exports.EventAttribute = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const timestamp_1 = require("../../google/protobuf/timestamp");
const keys_1 = require("../crypto/keys");
const proof_1 = require("../crypto/proof");
const params_1 = require("../types/params");
const types_1 = require("../types/types");
exports.protobufPackage = "tendermint.abci";
var CheckTxType;
(function (CheckTxType) {
    CheckTxType[CheckTxType["NEW"] = 0] = "NEW";
    CheckTxType[CheckTxType["RECHECK"] = 1] = "RECHECK";
    CheckTxType[CheckTxType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(CheckTxType || (exports.CheckTxType = CheckTxType = {}));
function checkTxTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "NEW":
            return CheckTxType.NEW;
        case 1:
        case "RECHECK":
            return CheckTxType.RECHECK;
        case -1:
        case "UNRECOGNIZED":
        default:
            return CheckTxType.UNRECOGNIZED;
    }
}
exports.checkTxTypeFromJSON = checkTxTypeFromJSON;
function checkTxTypeToJSON(object) {
    switch (object) {
        case CheckTxType.NEW:
            return "NEW";
        case CheckTxType.RECHECK:
            return "RECHECK";
        case CheckTxType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.checkTxTypeToJSON = checkTxTypeToJSON;
var EvidenceType;
(function (EvidenceType) {
    EvidenceType[EvidenceType["UNKNOWN"] = 0] = "UNKNOWN";
    EvidenceType[EvidenceType["DUPLICATE_VOTE"] = 1] = "DUPLICATE_VOTE";
    EvidenceType[EvidenceType["LIGHT_CLIENT_ATTACK"] = 2] = "LIGHT_CLIENT_ATTACK";
    EvidenceType[EvidenceType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(EvidenceType || (exports.EvidenceType = EvidenceType = {}));
function evidenceTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return EvidenceType.UNKNOWN;
        case 1:
        case "DUPLICATE_VOTE":
            return EvidenceType.DUPLICATE_VOTE;
        case 2:
        case "LIGHT_CLIENT_ATTACK":
            return EvidenceType.LIGHT_CLIENT_ATTACK;
        case -1:
        case "UNRECOGNIZED":
        default:
            return EvidenceType.UNRECOGNIZED;
    }
}
exports.evidenceTypeFromJSON = evidenceTypeFromJSON;
function evidenceTypeToJSON(object) {
    switch (object) {
        case EvidenceType.UNKNOWN:
            return "UNKNOWN";
        case EvidenceType.DUPLICATE_VOTE:
            return "DUPLICATE_VOTE";
        case EvidenceType.LIGHT_CLIENT_ATTACK:
            return "LIGHT_CLIENT_ATTACK";
        case EvidenceType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.evidenceTypeToJSON = evidenceTypeToJSON;
var ResponseOfferSnapshot_Result;
(function (ResponseOfferSnapshot_Result) {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["UNKNOWN"] = 0] = "UNKNOWN";
    /** ACCEPT - Snapshot accepted, apply chunks */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["ACCEPT"] = 1] = "ACCEPT";
    /** ABORT - Abort all snapshot restoration */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["ABORT"] = 2] = "ABORT";
    /** REJECT - Reject this specific snapshot, try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT"] = 3] = "REJECT";
    /** REJECT_FORMAT - Reject all snapshots of this format, try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT_FORMAT"] = 4] = "REJECT_FORMAT";
    /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT_SENDER"] = 5] = "REJECT_SENDER";
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseOfferSnapshot_Result || (exports.ResponseOfferSnapshot_Result = ResponseOfferSnapshot_Result = {}));
function responseOfferSnapshot_ResultFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return ResponseOfferSnapshot_Result.UNKNOWN;
        case 1:
        case "ACCEPT":
            return ResponseOfferSnapshot_Result.ACCEPT;
        case 2:
        case "ABORT":
            return ResponseOfferSnapshot_Result.ABORT;
        case 3:
        case "REJECT":
            return ResponseOfferSnapshot_Result.REJECT;
        case 4:
        case "REJECT_FORMAT":
            return ResponseOfferSnapshot_Result.REJECT_FORMAT;
        case 5:
        case "REJECT_SENDER":
            return ResponseOfferSnapshot_Result.REJECT_SENDER;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseOfferSnapshot_Result.UNRECOGNIZED;
    }
}
exports.responseOfferSnapshot_ResultFromJSON = responseOfferSnapshot_ResultFromJSON;
function responseOfferSnapshot_ResultToJSON(object) {
    switch (object) {
        case ResponseOfferSnapshot_Result.UNKNOWN:
            return "UNKNOWN";
        case ResponseOfferSnapshot_Result.ACCEPT:
            return "ACCEPT";
        case ResponseOfferSnapshot_Result.ABORT:
            return "ABORT";
        case ResponseOfferSnapshot_Result.REJECT:
            return "REJECT";
        case ResponseOfferSnapshot_Result.REJECT_FORMAT:
            return "REJECT_FORMAT";
        case ResponseOfferSnapshot_Result.REJECT_SENDER:
            return "REJECT_SENDER";
        case ResponseOfferSnapshot_Result.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.responseOfferSnapshot_ResultToJSON = responseOfferSnapshot_ResultToJSON;
var ResponseApplySnapshotChunk_Result;
(function (ResponseApplySnapshotChunk_Result) {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["UNKNOWN"] = 0] = "UNKNOWN";
    /** ACCEPT - Chunk successfully accepted */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["ACCEPT"] = 1] = "ACCEPT";
    /** ABORT - Abort all snapshot restoration */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["ABORT"] = 2] = "ABORT";
    /** RETRY - Retry chunk (combine with refetch and reject) */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["RETRY"] = 3] = "RETRY";
    /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["RETRY_SNAPSHOT"] = 4] = "RETRY_SNAPSHOT";
    /** REJECT_SNAPSHOT - Reject this snapshot, try others */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["REJECT_SNAPSHOT"] = 5] = "REJECT_SNAPSHOT";
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseApplySnapshotChunk_Result || (exports.ResponseApplySnapshotChunk_Result = ResponseApplySnapshotChunk_Result = {}));
function responseApplySnapshotChunk_ResultFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return ResponseApplySnapshotChunk_Result.UNKNOWN;
        case 1:
        case "ACCEPT":
            return ResponseApplySnapshotChunk_Result.ACCEPT;
        case 2:
        case "ABORT":
            return ResponseApplySnapshotChunk_Result.ABORT;
        case 3:
        case "RETRY":
            return ResponseApplySnapshotChunk_Result.RETRY;
        case 4:
        case "RETRY_SNAPSHOT":
            return ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT;
        case 5:
        case "REJECT_SNAPSHOT":
            return ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseApplySnapshotChunk_Result.UNRECOGNIZED;
    }
}
exports.responseApplySnapshotChunk_ResultFromJSON = responseApplySnapshotChunk_ResultFromJSON;
function responseApplySnapshotChunk_ResultToJSON(object) {
    switch (object) {
        case ResponseApplySnapshotChunk_Result.UNKNOWN:
            return "UNKNOWN";
        case ResponseApplySnapshotChunk_Result.ACCEPT:
            return "ACCEPT";
        case ResponseApplySnapshotChunk_Result.ABORT:
            return "ABORT";
        case ResponseApplySnapshotChunk_Result.RETRY:
            return "RETRY";
        case ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT:
            return "RETRY_SNAPSHOT";
        case ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT:
            return "REJECT_SNAPSHOT";
        case ResponseApplySnapshotChunk_Result.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.responseApplySnapshotChunk_ResultToJSON = responseApplySnapshotChunk_ResultToJSON;
function createBaseRequest() {
    return {
        echo: undefined,
        flush: undefined,
        info: undefined,
        setOption: undefined,
        initChain: undefined,
        query: undefined,
        beginBlock: undefined,
        checkTx: undefined,
        deliverTx: undefined,
        endBlock: undefined,
        commit: undefined,
        listSnapshots: undefined,
        offerSnapshot: undefined,
        loadSnapshotChunk: undefined,
        applySnapshotChunk: undefined,
    };
}
exports.Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.echo !== undefined) {
            exports.RequestEcho.encode(message.echo, writer.uint32(10).fork()).ldelim();
        }
        if (message.flush !== undefined) {
            exports.RequestFlush.encode(message.flush, writer.uint32(18).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.RequestInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
        }
        if (message.setOption !== undefined) {
            exports.RequestSetOption.encode(message.setOption, writer.uint32(34).fork()).ldelim();
        }
        if (message.initChain !== undefined) {
            exports.RequestInitChain.encode(message.initChain, writer.uint32(42).fork()).ldelim();
        }
        if (message.query !== undefined) {
            exports.RequestQuery.encode(message.query, writer.uint32(50).fork()).ldelim();
        }
        if (message.beginBlock !== undefined) {
            exports.RequestBeginBlock.encode(message.beginBlock, writer.uint32(58).fork()).ldelim();
        }
        if (message.checkTx !== undefined) {
            exports.RequestCheckTx.encode(message.checkTx, writer.uint32(66).fork()).ldelim();
        }
        if (message.deliverTx !== undefined) {
            exports.RequestDeliverTx.encode(message.deliverTx, writer.uint32(74).fork()).ldelim();
        }
        if (message.endBlock !== undefined) {
            exports.RequestEndBlock.encode(message.endBlock, writer.uint32(82).fork()).ldelim();
        }
        if (message.commit !== undefined) {
            exports.RequestCommit.encode(message.commit, writer.uint32(90).fork()).ldelim();
        }
        if (message.listSnapshots !== undefined) {
            exports.RequestListSnapshots.encode(message.listSnapshots, writer.uint32(98).fork()).ldelim();
        }
        if (message.offerSnapshot !== undefined) {
            exports.RequestOfferSnapshot.encode(message.offerSnapshot, writer.uint32(106).fork()).ldelim();
        }
        if (message.loadSnapshotChunk !== undefined) {
            exports.RequestLoadSnapshotChunk.encode(message.loadSnapshotChunk, writer.uint32(114).fork()).ldelim();
        }
        if (message.applySnapshotChunk !== undefined) {
            exports.RequestApplySnapshotChunk.encode(message.applySnapshotChunk, writer.uint32(122).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.echo = exports.RequestEcho.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.flush = exports.RequestFlush.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.info = exports.RequestInfo.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.setOption = exports.RequestSetOption.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.initChain = exports.RequestInitChain.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.query = exports.RequestQuery.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.beginBlock = exports.RequestBeginBlock.decode(reader, reader.uint32());
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.checkTx = exports.RequestCheckTx.decode(reader, reader.uint32());
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.deliverTx = exports.RequestDeliverTx.decode(reader, reader.uint32());
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.endBlock = exports.RequestEndBlock.decode(reader, reader.uint32());
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.commit = exports.RequestCommit.decode(reader, reader.uint32());
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.listSnapshots = exports.RequestListSnapshots.decode(reader, reader.uint32());
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.offerSnapshot = exports.RequestOfferSnapshot.decode(reader, reader.uint32());
                    continue;
                case 14:
                    if (tag !== 114) {
                        break;
                    }
                    message.loadSnapshotChunk = exports.RequestLoadSnapshotChunk.decode(reader, reader.uint32());
                    continue;
                case 15:
                    if (tag !== 122) {
                        break;
                    }
                    message.applySnapshotChunk = exports.RequestApplySnapshotChunk.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            echo: isSet(object.echo) ? exports.RequestEcho.fromJSON(object.echo) : undefined,
            flush: isSet(object.flush) ? exports.RequestFlush.fromJSON(object.flush) : undefined,
            info: isSet(object.info) ? exports.RequestInfo.fromJSON(object.info) : undefined,
            setOption: isSet(object.setOption) ? exports.RequestSetOption.fromJSON(object.setOption) : undefined,
            initChain: isSet(object.initChain) ? exports.RequestInitChain.fromJSON(object.initChain) : undefined,
            query: isSet(object.query) ? exports.RequestQuery.fromJSON(object.query) : undefined,
            beginBlock: isSet(object.beginBlock) ? exports.RequestBeginBlock.fromJSON(object.beginBlock) : undefined,
            checkTx: isSet(object.checkTx) ? exports.RequestCheckTx.fromJSON(object.checkTx) : undefined,
            deliverTx: isSet(object.deliverTx) ? exports.RequestDeliverTx.fromJSON(object.deliverTx) : undefined,
            endBlock: isSet(object.endBlock) ? exports.RequestEndBlock.fromJSON(object.endBlock) : undefined,
            commit: isSet(object.commit) ? exports.RequestCommit.fromJSON(object.commit) : undefined,
            listSnapshots: isSet(object.listSnapshots) ? exports.RequestListSnapshots.fromJSON(object.listSnapshots) : undefined,
            offerSnapshot: isSet(object.offerSnapshot) ? exports.RequestOfferSnapshot.fromJSON(object.offerSnapshot) : undefined,
            loadSnapshotChunk: isSet(object.loadSnapshotChunk)
                ? exports.RequestLoadSnapshotChunk.fromJSON(object.loadSnapshotChunk)
                : undefined,
            applySnapshotChunk: isSet(object.applySnapshotChunk)
                ? exports.RequestApplySnapshotChunk.fromJSON(object.applySnapshotChunk)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.echo !== undefined) {
            obj.echo = exports.RequestEcho.toJSON(message.echo);
        }
        if (message.flush !== undefined) {
            obj.flush = exports.RequestFlush.toJSON(message.flush);
        }
        if (message.info !== undefined) {
            obj.info = exports.RequestInfo.toJSON(message.info);
        }
        if (message.setOption !== undefined) {
            obj.setOption = exports.RequestSetOption.toJSON(message.setOption);
        }
        if (message.initChain !== undefined) {
            obj.initChain = exports.RequestInitChain.toJSON(message.initChain);
        }
        if (message.query !== undefined) {
            obj.query = exports.RequestQuery.toJSON(message.query);
        }
        if (message.beginBlock !== undefined) {
            obj.beginBlock = exports.RequestBeginBlock.toJSON(message.beginBlock);
        }
        if (message.checkTx !== undefined) {
            obj.checkTx = exports.RequestCheckTx.toJSON(message.checkTx);
        }
        if (message.deliverTx !== undefined) {
            obj.deliverTx = exports.RequestDeliverTx.toJSON(message.deliverTx);
        }
        if (message.endBlock !== undefined) {
            obj.endBlock = exports.RequestEndBlock.toJSON(message.endBlock);
        }
        if (message.commit !== undefined) {
            obj.commit = exports.RequestCommit.toJSON(message.commit);
        }
        if (message.listSnapshots !== undefined) {
            obj.listSnapshots = exports.RequestListSnapshots.toJSON(message.listSnapshots);
        }
        if (message.offerSnapshot !== undefined) {
            obj.offerSnapshot = exports.RequestOfferSnapshot.toJSON(message.offerSnapshot);
        }
        if (message.loadSnapshotChunk !== undefined) {
            obj.loadSnapshotChunk = exports.RequestLoadSnapshotChunk.toJSON(message.loadSnapshotChunk);
        }
        if (message.applySnapshotChunk !== undefined) {
            obj.applySnapshotChunk = exports.RequestApplySnapshotChunk.toJSON(message.applySnapshotChunk);
        }
        return obj;
    },
    create(base) {
        return exports.Request.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseRequest();
        message.echo = (object.echo !== undefined && object.echo !== null)
            ? exports.RequestEcho.fromPartial(object.echo)
            : undefined;
        message.flush = (object.flush !== undefined && object.flush !== null)
            ? exports.RequestFlush.fromPartial(object.flush)
            : undefined;
        message.info = (object.info !== undefined && object.info !== null)
            ? exports.RequestInfo.fromPartial(object.info)
            : undefined;
        message.setOption = (object.setOption !== undefined && object.setOption !== null)
            ? exports.RequestSetOption.fromPartial(object.setOption)
            : undefined;
        message.initChain = (object.initChain !== undefined && object.initChain !== null)
            ? exports.RequestInitChain.fromPartial(object.initChain)
            : undefined;
        message.query = (object.query !== undefined && object.query !== null)
            ? exports.RequestQuery.fromPartial(object.query)
            : undefined;
        message.beginBlock = (object.beginBlock !== undefined && object.beginBlock !== null)
            ? exports.RequestBeginBlock.fromPartial(object.beginBlock)
            : undefined;
        message.checkTx = (object.checkTx !== undefined && object.checkTx !== null)
            ? exports.RequestCheckTx.fromPartial(object.checkTx)
            : undefined;
        message.deliverTx = (object.deliverTx !== undefined && object.deliverTx !== null)
            ? exports.RequestDeliverTx.fromPartial(object.deliverTx)
            : undefined;
        message.endBlock = (object.endBlock !== undefined && object.endBlock !== null)
            ? exports.RequestEndBlock.fromPartial(object.endBlock)
            : undefined;
        message.commit = (object.commit !== undefined && object.commit !== null)
            ? exports.RequestCommit.fromPartial(object.commit)
            : undefined;
        message.listSnapshots = (object.listSnapshots !== undefined && object.listSnapshots !== null)
            ? exports.RequestListSnapshots.fromPartial(object.listSnapshots)
            : undefined;
        message.offerSnapshot = (object.offerSnapshot !== undefined && object.offerSnapshot !== null)
            ? exports.RequestOfferSnapshot.fromPartial(object.offerSnapshot)
            : undefined;
        message.loadSnapshotChunk = (object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null)
            ? exports.RequestLoadSnapshotChunk.fromPartial(object.loadSnapshotChunk)
            : undefined;
        message.applySnapshotChunk = (object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null)
            ? exports.RequestApplySnapshotChunk.fromPartial(object.applySnapshotChunk)
            : undefined;
        return message;
    },
};
function createBaseRequestEcho() {
    return { message: "" };
}
exports.RequestEcho = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestEcho();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.message = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { message: isSet(object.message) ? String(object.message) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.message !== "") {
            obj.message = message.message;
        }
        return obj;
    },
    create(base) {
        return exports.RequestEcho.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRequestEcho();
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseRequestFlush() {
    return {};
}
exports.RequestFlush = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestFlush();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return exports.RequestFlush.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseRequestFlush();
        return message;
    },
};
function createBaseRequestInfo() {
    return { version: "", blockVersion: "0", p2pVersion: "0" };
}
exports.RequestInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.version !== "") {
            writer.uint32(10).string(message.version);
        }
        if (message.blockVersion !== "0") {
            writer.uint32(16).uint64(message.blockVersion);
        }
        if (message.p2pVersion !== "0") {
            writer.uint32(24).uint64(message.p2pVersion);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.version = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.blockVersion = longToString(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.p2pVersion = longToString(reader.uint64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            version: isSet(object.version) ? String(object.version) : "",
            blockVersion: isSet(object.blockVersion) ? String(object.blockVersion) : "0",
            p2pVersion: isSet(object.p2pVersion) ? String(object.p2pVersion) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.version !== "") {
            obj.version = message.version;
        }
        if (message.blockVersion !== "0") {
            obj.blockVersion = message.blockVersion;
        }
        if (message.p2pVersion !== "0") {
            obj.p2pVersion = message.p2pVersion;
        }
        return obj;
    },
    create(base) {
        return exports.RequestInfo.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseRequestInfo();
        message.version = (_a = object.version) !== null && _a !== void 0 ? _a : "";
        message.blockVersion = (_b = object.blockVersion) !== null && _b !== void 0 ? _b : "0";
        message.p2pVersion = (_c = object.p2pVersion) !== null && _c !== void 0 ? _c : "0";
        return message;
    },
};
function createBaseRequestSetOption() {
    return { key: "", value: "" };
}
exports.RequestSetOption = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestSetOption();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.key = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.value = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.key !== "") {
            obj.key = message.key;
        }
        if (message.value !== "") {
            obj.value = message.value;
        }
        return obj;
    },
    create(base) {
        return exports.RequestSetOption.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseRequestSetOption();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseRequestInitChain() {
    return {
        time: undefined,
        chainId: "",
        consensusParams: undefined,
        validators: [],
        appStateBytes: new Uint8Array(0),
        initialHeight: "0",
    };
}
exports.RequestInitChain = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.time), writer.uint32(10).fork()).ldelim();
        }
        if (message.chainId !== "") {
            writer.uint32(18).string(message.chainId);
        }
        if (message.consensusParams !== undefined) {
            exports.ConsensusParams.encode(message.consensusParams, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.validators) {
            exports.ValidatorUpdate.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.appStateBytes.length !== 0) {
            writer.uint32(42).bytes(message.appStateBytes);
        }
        if (message.initialHeight !== "0") {
            writer.uint32(48).int64(message.initialHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestInitChain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.time = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.chainId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.consensusParams = exports.ConsensusParams.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.validators.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.appStateBytes = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.initialHeight = longToString(reader.int64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
            chainId: isSet(object.chainId) ? String(object.chainId) : "",
            consensusParams: isSet(object.consensusParams) ? exports.ConsensusParams.fromJSON(object.consensusParams) : undefined,
            validators: Array.isArray(object === null || object === void 0 ? void 0 : object.validators)
                ? object.validators.map((e) => exports.ValidatorUpdate.fromJSON(e))
                : [],
            appStateBytes: isSet(object.appStateBytes) ? bytesFromBase64(object.appStateBytes) : new Uint8Array(0),
            initialHeight: isSet(object.initialHeight) ? String(object.initialHeight) : "0",
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.time !== undefined) {
            obj.time = message.time.toISOString();
        }
        if (message.chainId !== "") {
            obj.chainId = message.chainId;
        }
        if (message.consensusParams !== undefined) {
            obj.consensusParams = exports.ConsensusParams.toJSON(message.consensusParams);
        }
        if ((_a = message.validators) === null || _a === void 0 ? void 0 : _a.length) {
            obj.validators = message.validators.map((e) => exports.ValidatorUpdate.toJSON(e));
        }
        if (message.appStateBytes.length !== 0) {
            obj.appStateBytes = base64FromBytes(message.appStateBytes);
        }
        if (message.initialHeight !== "0") {
            obj.initialHeight = message.initialHeight;
        }
        return obj;
    },
    create(base) {
        return exports.RequestInitChain.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseRequestInitChain();
        message.time = (_a = object.time) !== null && _a !== void 0 ? _a : undefined;
        message.chainId = (_b = object.chainId) !== null && _b !== void 0 ? _b : "";
        message.consensusParams = (object.consensusParams !== undefined && object.consensusParams !== null)
            ? exports.ConsensusParams.fromPartial(object.consensusParams)
            : undefined;
        message.validators = ((_c = object.validators) === null || _c === void 0 ? void 0 : _c.map((e) => exports.ValidatorUpdate.fromPartial(e))) || [];
        message.appStateBytes = (_d = object.appStateBytes) !== null && _d !== void 0 ? _d : new Uint8Array(0);
        message.initialHeight = (_e = object.initialHeight) !== null && _e !== void 0 ? _e : "0";
        return message;
    },
};
function createBaseRequestQuery() {
    return { data: new Uint8Array(0), path: "", height: "0", prove: false };
}
exports.RequestQuery = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.path !== "") {
            writer.uint32(18).string(message.path);
        }
        if (message.height !== "0") {
            writer.uint32(24).int64(message.height);
        }
        if (message.prove === true) {
            writer.uint32(32).bool(message.prove);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestQuery();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.path = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.height = longToString(reader.int64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.prove = reader.bool();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
            path: isSet(object.path) ? String(object.path) : "",
            height: isSet(object.height) ? String(object.height) : "0",
            prove: isSet(object.prove) ? Boolean(object.prove) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        if (message.path !== "") {
            obj.path = message.path;
        }
        if (message.height !== "0") {
            obj.height = message.height;
        }
        if (message.prove === true) {
            obj.prove = message.prove;
        }
        return obj;
    },
    create(base) {
        return exports.RequestQuery.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseRequestQuery();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.path = (_b = object.path) !== null && _b !== void 0 ? _b : "";
        message.height = (_c = object.height) !== null && _c !== void 0 ? _c : "0";
        message.prove = (_d = object.prove) !== null && _d !== void 0 ? _d : false;
        return message;
    },
};
function createBaseRequestBeginBlock() {
    return { hash: new Uint8Array(0), header: undefined, lastCommitInfo: undefined, byzantineValidators: [] };
}
exports.RequestBeginBlock = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        if (message.header !== undefined) {
            types_1.Header.encode(message.header, writer.uint32(18).fork()).ldelim();
        }
        if (message.lastCommitInfo !== undefined) {
            exports.LastCommitInfo.encode(message.lastCommitInfo, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.byzantineValidators) {
            exports.Evidence.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestBeginBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.hash = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.header = types_1.Header.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.lastCommitInfo = exports.LastCommitInfo.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.byzantineValidators.push(exports.Evidence.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
            header: isSet(object.header) ? types_1.Header.fromJSON(object.header) : undefined,
            lastCommitInfo: isSet(object.lastCommitInfo) ? exports.LastCommitInfo.fromJSON(object.lastCommitInfo) : undefined,
            byzantineValidators: Array.isArray(object === null || object === void 0 ? void 0 : object.byzantineValidators)
                ? object.byzantineValidators.map((e) => exports.Evidence.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.hash.length !== 0) {
            obj.hash = base64FromBytes(message.hash);
        }
        if (message.header !== undefined) {
            obj.header = types_1.Header.toJSON(message.header);
        }
        if (message.lastCommitInfo !== undefined) {
            obj.lastCommitInfo = exports.LastCommitInfo.toJSON(message.lastCommitInfo);
        }
        if ((_a = message.byzantineValidators) === null || _a === void 0 ? void 0 : _a.length) {
            obj.byzantineValidators = message.byzantineValidators.map((e) => exports.Evidence.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.RequestBeginBlock.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseRequestBeginBlock();
        message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.header = (object.header !== undefined && object.header !== null)
            ? types_1.Header.fromPartial(object.header)
            : undefined;
        message.lastCommitInfo = (object.lastCommitInfo !== undefined && object.lastCommitInfo !== null)
            ? exports.LastCommitInfo.fromPartial(object.lastCommitInfo)
            : undefined;
        message.byzantineValidators = ((_b = object.byzantineValidators) === null || _b === void 0 ? void 0 : _b.map((e) => exports.Evidence.fromPartial(e))) || [];
        return message;
    },
};
function createBaseRequestCheckTx() {
    return { tx: new Uint8Array(0), type: 0 };
}
exports.RequestCheckTx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.tx.length !== 0) {
            writer.uint32(10).bytes(message.tx);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestCheckTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.tx = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.type = reader.int32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(0),
            type: isSet(object.type) ? checkTxTypeFromJSON(object.type) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.tx.length !== 0) {
            obj.tx = base64FromBytes(message.tx);
        }
        if (message.type !== 0) {
            obj.type = checkTxTypeToJSON(message.type);
        }
        return obj;
    },
    create(base) {
        return exports.RequestCheckTx.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseRequestCheckTx();
        message.tx = (_a = object.tx) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.type = (_b = object.type) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseRequestDeliverTx() {
    return { tx: new Uint8Array(0) };
}
exports.RequestDeliverTx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.tx.length !== 0) {
            writer.uint32(10).bytes(message.tx);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestDeliverTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.tx = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.tx.length !== 0) {
            obj.tx = base64FromBytes(message.tx);
        }
        return obj;
    },
    create(base) {
        return exports.RequestDeliverTx.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRequestDeliverTx();
        message.tx = (_a = object.tx) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        return message;
    },
};
function createBaseRequestEndBlock() {
    return { height: "0" };
}
exports.RequestEndBlock = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.height !== "0") {
            writer.uint32(8).int64(message.height);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestEndBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.height = longToString(reader.int64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { height: isSet(object.height) ? String(object.height) : "0" };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== "0") {
            obj.height = message.height;
        }
        return obj;
    },
    create(base) {
        return exports.RequestEndBlock.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRequestEndBlock();
        message.height = (_a = object.height) !== null && _a !== void 0 ? _a : "0";
        return message;
    },
};
function createBaseRequestCommit() {
    return {};
}
exports.RequestCommit = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestCommit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return exports.RequestCommit.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseRequestCommit();
        return message;
    },
};
function createBaseRequestListSnapshots() {
    return {};
}
exports.RequestListSnapshots = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestListSnapshots();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return exports.RequestListSnapshots.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseRequestListSnapshots();
        return message;
    },
};
function createBaseRequestOfferSnapshot() {
    return { snapshot: undefined, appHash: new Uint8Array(0) };
}
exports.RequestOfferSnapshot = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.snapshot !== undefined) {
            exports.Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(18).bytes(message.appHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestOfferSnapshot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.snapshot = exports.Snapshot.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.appHash = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            snapshot: isSet(object.snapshot) ? exports.Snapshot.fromJSON(object.snapshot) : undefined,
            appHash: isSet(object.appHash) ? bytesFromBase64(object.appHash) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.snapshot !== undefined) {
            obj.snapshot = exports.Snapshot.toJSON(message.snapshot);
        }
        if (message.appHash.length !== 0) {
            obj.appHash = base64FromBytes(message.appHash);
        }
        return obj;
    },
    create(base) {
        return exports.RequestOfferSnapshot.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseRequestOfferSnapshot();
        message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
            ? exports.Snapshot.fromPartial(object.snapshot)
            : undefined;
        message.appHash = (_a = object.appHash) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        return message;
    },
};
function createBaseRequestLoadSnapshotChunk() {
    return { height: "0", format: 0, chunk: 0 };
}
exports.RequestLoadSnapshotChunk = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.height !== "0") {
            writer.uint32(8).uint64(message.height);
        }
        if (message.format !== 0) {
            writer.uint32(16).uint32(message.format);
        }
        if (message.chunk !== 0) {
            writer.uint32(24).uint32(message.chunk);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestLoadSnapshotChunk();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.height = longToString(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.format = reader.uint32();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.chunk = reader.uint32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            height: isSet(object.height) ? String(object.height) : "0",
            format: isSet(object.format) ? Number(object.format) : 0,
            chunk: isSet(object.chunk) ? Number(object.chunk) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== "0") {
            obj.height = message.height;
        }
        if (message.format !== 0) {
            obj.format = Math.round(message.format);
        }
        if (message.chunk !== 0) {
            obj.chunk = Math.round(message.chunk);
        }
        return obj;
    },
    create(base) {
        return exports.RequestLoadSnapshotChunk.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseRequestLoadSnapshotChunk();
        message.height = (_a = object.height) !== null && _a !== void 0 ? _a : "0";
        message.format = (_b = object.format) !== null && _b !== void 0 ? _b : 0;
        message.chunk = (_c = object.chunk) !== null && _c !== void 0 ? _c : 0;
        return message;
    },
};
function createBaseRequestApplySnapshotChunk() {
    return { index: 0, chunk: new Uint8Array(0), sender: "" };
}
exports.RequestApplySnapshotChunk = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.index !== 0) {
            writer.uint32(8).uint32(message.index);
        }
        if (message.chunk.length !== 0) {
            writer.uint32(18).bytes(message.chunk);
        }
        if (message.sender !== "") {
            writer.uint32(26).string(message.sender);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRequestApplySnapshotChunk();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.index = reader.uint32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.chunk = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            index: isSet(object.index) ? Number(object.index) : 0,
            chunk: isSet(object.chunk) ? bytesFromBase64(object.chunk) : new Uint8Array(0),
            sender: isSet(object.sender) ? String(object.sender) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.index !== 0) {
            obj.index = Math.round(message.index);
        }
        if (message.chunk.length !== 0) {
            obj.chunk = base64FromBytes(message.chunk);
        }
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        return obj;
    },
    create(base) {
        return exports.RequestApplySnapshotChunk.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseRequestApplySnapshotChunk();
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : 0;
        message.chunk = (_b = object.chunk) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        message.sender = (_c = object.sender) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseResponse() {
    return {
        exception: undefined,
        echo: undefined,
        flush: undefined,
        info: undefined,
        setOption: undefined,
        initChain: undefined,
        query: undefined,
        beginBlock: undefined,
        checkTx: undefined,
        deliverTx: undefined,
        endBlock: undefined,
        commit: undefined,
        listSnapshots: undefined,
        offerSnapshot: undefined,
        loadSnapshotChunk: undefined,
        applySnapshotChunk: undefined,
    };
}
exports.Response = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.exception !== undefined) {
            exports.ResponseException.encode(message.exception, writer.uint32(10).fork()).ldelim();
        }
        if (message.echo !== undefined) {
            exports.ResponseEcho.encode(message.echo, writer.uint32(18).fork()).ldelim();
        }
        if (message.flush !== undefined) {
            exports.ResponseFlush.encode(message.flush, writer.uint32(26).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.ResponseInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
        }
        if (message.setOption !== undefined) {
            exports.ResponseSetOption.encode(message.setOption, writer.uint32(42).fork()).ldelim();
        }
        if (message.initChain !== undefined) {
            exports.ResponseInitChain.encode(message.initChain, writer.uint32(50).fork()).ldelim();
        }
        if (message.query !== undefined) {
            exports.ResponseQuery.encode(message.query, writer.uint32(58).fork()).ldelim();
        }
        if (message.beginBlock !== undefined) {
            exports.ResponseBeginBlock.encode(message.beginBlock, writer.uint32(66).fork()).ldelim();
        }
        if (message.checkTx !== undefined) {
            exports.ResponseCheckTx.encode(message.checkTx, writer.uint32(74).fork()).ldelim();
        }
        if (message.deliverTx !== undefined) {
            exports.ResponseDeliverTx.encode(message.deliverTx, writer.uint32(82).fork()).ldelim();
        }
        if (message.endBlock !== undefined) {
            exports.ResponseEndBlock.encode(message.endBlock, writer.uint32(90).fork()).ldelim();
        }
        if (message.commit !== undefined) {
            exports.ResponseCommit.encode(message.commit, writer.uint32(98).fork()).ldelim();
        }
        if (message.listSnapshots !== undefined) {
            exports.ResponseListSnapshots.encode(message.listSnapshots, writer.uint32(106).fork()).ldelim();
        }
        if (message.offerSnapshot !== undefined) {
            exports.ResponseOfferSnapshot.encode(message.offerSnapshot, writer.uint32(114).fork()).ldelim();
        }
        if (message.loadSnapshotChunk !== undefined) {
            exports.ResponseLoadSnapshotChunk.encode(message.loadSnapshotChunk, writer.uint32(122).fork()).ldelim();
        }
        if (message.applySnapshotChunk !== undefined) {
            exports.ResponseApplySnapshotChunk.encode(message.applySnapshotChunk, writer.uint32(130).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.exception = exports.ResponseException.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.echo = exports.ResponseEcho.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.flush = exports.ResponseFlush.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.info = exports.ResponseInfo.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.setOption = exports.ResponseSetOption.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.initChain = exports.ResponseInitChain.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.query = exports.ResponseQuery.decode(reader, reader.uint32());
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.beginBlock = exports.ResponseBeginBlock.decode(reader, reader.uint32());
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.checkTx = exports.ResponseCheckTx.decode(reader, reader.uint32());
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.deliverTx = exports.ResponseDeliverTx.decode(reader, reader.uint32());
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.endBlock = exports.ResponseEndBlock.decode(reader, reader.uint32());
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.commit = exports.ResponseCommit.decode(reader, reader.uint32());
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.listSnapshots = exports.ResponseListSnapshots.decode(reader, reader.uint32());
                    continue;
                case 14:
                    if (tag !== 114) {
                        break;
                    }
                    message.offerSnapshot = exports.ResponseOfferSnapshot.decode(reader, reader.uint32());
                    continue;
                case 15:
                    if (tag !== 122) {
                        break;
                    }
                    message.loadSnapshotChunk = exports.ResponseLoadSnapshotChunk.decode(reader, reader.uint32());
                    continue;
                case 16:
                    if (tag !== 130) {
                        break;
                    }
                    message.applySnapshotChunk = exports.ResponseApplySnapshotChunk.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            exception: isSet(object.exception) ? exports.ResponseException.fromJSON(object.exception) : undefined,
            echo: isSet(object.echo) ? exports.ResponseEcho.fromJSON(object.echo) : undefined,
            flush: isSet(object.flush) ? exports.ResponseFlush.fromJSON(object.flush) : undefined,
            info: isSet(object.info) ? exports.ResponseInfo.fromJSON(object.info) : undefined,
            setOption: isSet(object.setOption) ? exports.ResponseSetOption.fromJSON(object.setOption) : undefined,
            initChain: isSet(object.initChain) ? exports.ResponseInitChain.fromJSON(object.initChain) : undefined,
            query: isSet(object.query) ? exports.ResponseQuery.fromJSON(object.query) : undefined,
            beginBlock: isSet(object.beginBlock) ? exports.ResponseBeginBlock.fromJSON(object.beginBlock) : undefined,
            checkTx: isSet(object.checkTx) ? exports.ResponseCheckTx.fromJSON(object.checkTx) : undefined,
            deliverTx: isSet(object.deliverTx) ? exports.ResponseDeliverTx.fromJSON(object.deliverTx) : undefined,
            endBlock: isSet(object.endBlock) ? exports.ResponseEndBlock.fromJSON(object.endBlock) : undefined,
            commit: isSet(object.commit) ? exports.ResponseCommit.fromJSON(object.commit) : undefined,
            listSnapshots: isSet(object.listSnapshots) ? exports.ResponseListSnapshots.fromJSON(object.listSnapshots) : undefined,
            offerSnapshot: isSet(object.offerSnapshot) ? exports.ResponseOfferSnapshot.fromJSON(object.offerSnapshot) : undefined,
            loadSnapshotChunk: isSet(object.loadSnapshotChunk)
                ? exports.ResponseLoadSnapshotChunk.fromJSON(object.loadSnapshotChunk)
                : undefined,
            applySnapshotChunk: isSet(object.applySnapshotChunk)
                ? exports.ResponseApplySnapshotChunk.fromJSON(object.applySnapshotChunk)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.exception !== undefined) {
            obj.exception = exports.ResponseException.toJSON(message.exception);
        }
        if (message.echo !== undefined) {
            obj.echo = exports.ResponseEcho.toJSON(message.echo);
        }
        if (message.flush !== undefined) {
            obj.flush = exports.ResponseFlush.toJSON(message.flush);
        }
        if (message.info !== undefined) {
            obj.info = exports.ResponseInfo.toJSON(message.info);
        }
        if (message.setOption !== undefined) {
            obj.setOption = exports.ResponseSetOption.toJSON(message.setOption);
        }
        if (message.initChain !== undefined) {
            obj.initChain = exports.ResponseInitChain.toJSON(message.initChain);
        }
        if (message.query !== undefined) {
            obj.query = exports.ResponseQuery.toJSON(message.query);
        }
        if (message.beginBlock !== undefined) {
            obj.beginBlock = exports.ResponseBeginBlock.toJSON(message.beginBlock);
        }
        if (message.checkTx !== undefined) {
            obj.checkTx = exports.ResponseCheckTx.toJSON(message.checkTx);
        }
        if (message.deliverTx !== undefined) {
            obj.deliverTx = exports.ResponseDeliverTx.toJSON(message.deliverTx);
        }
        if (message.endBlock !== undefined) {
            obj.endBlock = exports.ResponseEndBlock.toJSON(message.endBlock);
        }
        if (message.commit !== undefined) {
            obj.commit = exports.ResponseCommit.toJSON(message.commit);
        }
        if (message.listSnapshots !== undefined) {
            obj.listSnapshots = exports.ResponseListSnapshots.toJSON(message.listSnapshots);
        }
        if (message.offerSnapshot !== undefined) {
            obj.offerSnapshot = exports.ResponseOfferSnapshot.toJSON(message.offerSnapshot);
        }
        if (message.loadSnapshotChunk !== undefined) {
            obj.loadSnapshotChunk = exports.ResponseLoadSnapshotChunk.toJSON(message.loadSnapshotChunk);
        }
        if (message.applySnapshotChunk !== undefined) {
            obj.applySnapshotChunk = exports.ResponseApplySnapshotChunk.toJSON(message.applySnapshotChunk);
        }
        return obj;
    },
    create(base) {
        return exports.Response.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseResponse();
        message.exception = (object.exception !== undefined && object.exception !== null)
            ? exports.ResponseException.fromPartial(object.exception)
            : undefined;
        message.echo = (object.echo !== undefined && object.echo !== null)
            ? exports.ResponseEcho.fromPartial(object.echo)
            : undefined;
        message.flush = (object.flush !== undefined && object.flush !== null)
            ? exports.ResponseFlush.fromPartial(object.flush)
            : undefined;
        message.info = (object.info !== undefined && object.info !== null)
            ? exports.ResponseInfo.fromPartial(object.info)
            : undefined;
        message.setOption = (object.setOption !== undefined && object.setOption !== null)
            ? exports.ResponseSetOption.fromPartial(object.setOption)
            : undefined;
        message.initChain = (object.initChain !== undefined && object.initChain !== null)
            ? exports.ResponseInitChain.fromPartial(object.initChain)
            : undefined;
        message.query = (object.query !== undefined && object.query !== null)
            ? exports.ResponseQuery.fromPartial(object.query)
            : undefined;
        message.beginBlock = (object.beginBlock !== undefined && object.beginBlock !== null)
            ? exports.ResponseBeginBlock.fromPartial(object.beginBlock)
            : undefined;
        message.checkTx = (object.checkTx !== undefined && object.checkTx !== null)
            ? exports.ResponseCheckTx.fromPartial(object.checkTx)
            : undefined;
        message.deliverTx = (object.deliverTx !== undefined && object.deliverTx !== null)
            ? exports.ResponseDeliverTx.fromPartial(object.deliverTx)
            : undefined;
        message.endBlock = (object.endBlock !== undefined && object.endBlock !== null)
            ? exports.ResponseEndBlock.fromPartial(object.endBlock)
            : undefined;
        message.commit = (object.commit !== undefined && object.commit !== null)
            ? exports.ResponseCommit.fromPartial(object.commit)
            : undefined;
        message.listSnapshots = (object.listSnapshots !== undefined && object.listSnapshots !== null)
            ? exports.ResponseListSnapshots.fromPartial(object.listSnapshots)
            : undefined;
        message.offerSnapshot = (object.offerSnapshot !== undefined && object.offerSnapshot !== null)
            ? exports.ResponseOfferSnapshot.fromPartial(object.offerSnapshot)
            : undefined;
        message.loadSnapshotChunk = (object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null)
            ? exports.ResponseLoadSnapshotChunk.fromPartial(object.loadSnapshotChunk)
            : undefined;
        message.applySnapshotChunk = (object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null)
            ? exports.ResponseApplySnapshotChunk.fromPartial(object.applySnapshotChunk)
            : undefined;
        return message;
    },
};
function createBaseResponseException() {
    return { error: "" };
}
exports.ResponseException = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.error !== "") {
            writer.uint32(10).string(message.error);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseException();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.error = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { error: isSet(object.error) ? String(object.error) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.error !== "") {
            obj.error = message.error;
        }
        return obj;
    },
    create(base) {
        return exports.ResponseException.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseResponseException();
        message.error = (_a = object.error) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseResponseEcho() {
    return { message: "" };
}
exports.ResponseEcho = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseEcho();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.message = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { message: isSet(object.message) ? String(object.message) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.message !== "") {
            obj.message = message.message;
        }
        return obj;
    },
    create(base) {
        return exports.ResponseEcho.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseResponseEcho();
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseResponseFlush() {
    return {};
}
exports.ResponseFlush = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseFlush();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return exports.ResponseFlush.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseResponseFlush();
        return message;
    },
};
function createBaseResponseInfo() {
    return { data: "", version: "", appVersion: "0", lastBlockHeight: "0", lastBlockAppHash: new Uint8Array(0) };
}
exports.ResponseInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data !== "") {
            writer.uint32(10).string(message.data);
        }
        if (message.version !== "") {
            writer.uint32(18).string(message.version);
        }
        if (message.appVersion !== "0") {
            writer.uint32(24).uint64(message.appVersion);
        }
        if (message.lastBlockHeight !== "0") {
            writer.uint32(32).int64(message.lastBlockHeight);
        }
        if (message.lastBlockAppHash.length !== 0) {
            writer.uint32(42).bytes(message.lastBlockAppHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.version = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.appVersion = longToString(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.lastBlockHeight = longToString(reader.int64());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.lastBlockAppHash = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            data: isSet(object.data) ? String(object.data) : "",
            version: isSet(object.version) ? String(object.version) : "",
            appVersion: isSet(object.appVersion) ? String(object.appVersion) : "0",
            lastBlockHeight: isSet(object.lastBlockHeight) ? String(object.lastBlockHeight) : "0",
            lastBlockAppHash: isSet(object.lastBlockAppHash) ? bytesFromBase64(object.lastBlockAppHash) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.data !== "") {
            obj.data = message.data;
        }
        if (message.version !== "") {
            obj.version = message.version;
        }
        if (message.appVersion !== "0") {
            obj.appVersion = message.appVersion;
        }
        if (message.lastBlockHeight !== "0") {
            obj.lastBlockHeight = message.lastBlockHeight;
        }
        if (message.lastBlockAppHash.length !== 0) {
            obj.lastBlockAppHash = base64FromBytes(message.lastBlockAppHash);
        }
        return obj;
    },
    create(base) {
        return exports.ResponseInfo.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseResponseInfo();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : "";
        message.version = (_b = object.version) !== null && _b !== void 0 ? _b : "";
        message.appVersion = (_c = object.appVersion) !== null && _c !== void 0 ? _c : "0";
        message.lastBlockHeight = (_d = object.lastBlockHeight) !== null && _d !== void 0 ? _d : "0";
        message.lastBlockAppHash = (_e = object.lastBlockAppHash) !== null && _e !== void 0 ? _e : new Uint8Array(0);
        return message;
    },
};
function createBaseResponseSetOption() {
    return { code: 0, log: "", info: "" };
}
exports.ResponseSetOption = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseSetOption();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.code = reader.uint32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.log = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.info = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            code: isSet(object.code) ? Number(object.code) : 0,
            log: isSet(object.log) ? String(object.log) : "",
            info: isSet(object.info) ? String(object.info) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.code !== 0) {
            obj.code = Math.round(message.code);
        }
        if (message.log !== "") {
            obj.log = message.log;
        }
        if (message.info !== "") {
            obj.info = message.info;
        }
        return obj;
    },
    create(base) {
        return exports.ResponseSetOption.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseResponseSetOption();
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : 0;
        message.log = (_b = object.log) !== null && _b !== void 0 ? _b : "";
        message.info = (_c = object.info) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseResponseInitChain() {
    return { consensusParams: undefined, validators: [], appHash: new Uint8Array(0) };
}
exports.ResponseInitChain = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.consensusParams !== undefined) {
            exports.ConsensusParams.encode(message.consensusParams, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.validators) {
            exports.ValidatorUpdate.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(26).bytes(message.appHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseInitChain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.consensusParams = exports.ConsensusParams.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.validators.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.appHash = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            consensusParams: isSet(object.consensusParams) ? exports.ConsensusParams.fromJSON(object.consensusParams) : undefined,
            validators: Array.isArray(object === null || object === void 0 ? void 0 : object.validators)
                ? object.validators.map((e) => exports.ValidatorUpdate.fromJSON(e))
                : [],
            appHash: isSet(object.appHash) ? bytesFromBase64(object.appHash) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.consensusParams !== undefined) {
            obj.consensusParams = exports.ConsensusParams.toJSON(message.consensusParams);
        }
        if ((_a = message.validators) === null || _a === void 0 ? void 0 : _a.length) {
            obj.validators = message.validators.map((e) => exports.ValidatorUpdate.toJSON(e));
        }
        if (message.appHash.length !== 0) {
            obj.appHash = base64FromBytes(message.appHash);
        }
        return obj;
    },
    create(base) {
        return exports.ResponseInitChain.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseResponseInitChain();
        message.consensusParams = (object.consensusParams !== undefined && object.consensusParams !== null)
            ? exports.ConsensusParams.fromPartial(object.consensusParams)
            : undefined;
        message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidatorUpdate.fromPartial(e))) || [];
        message.appHash = (_b = object.appHash) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        return message;
    },
};
function createBaseResponseQuery() {
    return {
        code: 0,
        log: "",
        info: "",
        index: "0",
        key: new Uint8Array(0),
        value: new Uint8Array(0),
        proofOps: undefined,
        height: "0",
        codespace: "",
    };
}
exports.ResponseQuery = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (message.index !== "0") {
            writer.uint32(40).int64(message.index);
        }
        if (message.key.length !== 0) {
            writer.uint32(50).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(58).bytes(message.value);
        }
        if (message.proofOps !== undefined) {
            proof_1.ProofOps.encode(message.proofOps, writer.uint32(66).fork()).ldelim();
        }
        if (message.height !== "0") {
            writer.uint32(72).int64(message.height);
        }
        if (message.codespace !== "") {
            writer.uint32(82).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseQuery();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.code = reader.uint32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.log = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.info = reader.string();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.index = longToString(reader.int64());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.key = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.value = reader.bytes();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.proofOps = proof_1.ProofOps.decode(reader, reader.uint32());
                    continue;
                case 9:
                    if (tag !== 72) {
                        break;
                    }
                    message.height = longToString(reader.int64());
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.codespace = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            code: isSet(object.code) ? Number(object.code) : 0,
            log: isSet(object.log) ? String(object.log) : "",
            info: isSet(object.info) ? String(object.info) : "",
            index: isSet(object.index) ? String(object.index) : "0",
            key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
            value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
            proofOps: isSet(object.proofOps) ? proof_1.ProofOps.fromJSON(object.proofOps) : undefined,
            height: isSet(object.height) ? String(object.height) : "0",
            codespace: isSet(object.codespace) ? String(object.codespace) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.code !== 0) {
            obj.code = Math.round(message.code);
        }
        if (message.log !== "") {
            obj.log = message.log;
        }
        if (message.info !== "") {
            obj.info = message.info;
        }
        if (message.index !== "0") {
            obj.index = message.index;
        }
        if (message.key.length !== 0) {
            obj.key = base64FromBytes(message.key);
        }
        if (message.value.length !== 0) {
            obj.value = base64FromBytes(message.value);
        }
        if (message.proofOps !== undefined) {
            obj.proofOps = proof_1.ProofOps.toJSON(message.proofOps);
        }
        if (message.height !== "0") {
            obj.height = message.height;
        }
        if (message.codespace !== "") {
            obj.codespace = message.codespace;
        }
        return obj;
    },
    create(base) {
        return exports.ResponseQuery.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseResponseQuery();
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : 0;
        message.log = (_b = object.log) !== null && _b !== void 0 ? _b : "";
        message.info = (_c = object.info) !== null && _c !== void 0 ? _c : "";
        message.index = (_d = object.index) !== null && _d !== void 0 ? _d : "0";
        message.key = (_e = object.key) !== null && _e !== void 0 ? _e : new Uint8Array(0);
        message.value = (_f = object.value) !== null && _f !== void 0 ? _f : new Uint8Array(0);
        message.proofOps = (object.proofOps !== undefined && object.proofOps !== null)
            ? proof_1.ProofOps.fromPartial(object.proofOps)
            : undefined;
        message.height = (_g = object.height) !== null && _g !== void 0 ? _g : "0";
        message.codespace = (_h = object.codespace) !== null && _h !== void 0 ? _h : "";
        return message;
    },
};
function createBaseResponseBeginBlock() {
    return { events: [] };
}
exports.ResponseBeginBlock = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseBeginBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { events: Array.isArray(object === null || object === void 0 ? void 0 : object.events) ? object.events.map((e) => exports.Event.fromJSON(e)) : [] };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if ((_a = message.events) === null || _a === void 0 ? void 0 : _a.length) {
            obj.events = message.events.map((e) => exports.Event.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.ResponseBeginBlock.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseResponseBeginBlock();
        message.events = ((_a = object.events) === null || _a === void 0 ? void 0 : _a.map((e) => exports.Event.fromPartial(e))) || [];
        return message;
    },
};
function createBaseResponseCheckTx() {
    return {
        code: 0,
        data: new Uint8Array(0),
        log: "",
        info: "",
        gasWanted: "0",
        gasUsed: "0",
        events: [],
        codespace: "",
    };
}
exports.ResponseCheckTx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (message.gasWanted !== "0") {
            writer.uint32(40).int64(message.gasWanted);
        }
        if (message.gasUsed !== "0") {
            writer.uint32(48).int64(message.gasUsed);
        }
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.codespace !== "") {
            writer.uint32(66).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseCheckTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.code = reader.uint32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.log = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.info = reader.string();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.gasWanted = longToString(reader.int64());
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.gasUsed = longToString(reader.int64());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.codespace = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            code: isSet(object.code) ? Number(object.code) : 0,
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
            log: isSet(object.log) ? String(object.log) : "",
            info: isSet(object.info) ? String(object.info) : "",
            gasWanted: isSet(object.gas_wanted) ? String(object.gas_wanted) : "0",
            gasUsed: isSet(object.gas_used) ? String(object.gas_used) : "0",
            events: Array.isArray(object === null || object === void 0 ? void 0 : object.events) ? object.events.map((e) => exports.Event.fromJSON(e)) : [],
            codespace: isSet(object.codespace) ? String(object.codespace) : "",
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.code !== 0) {
            obj.code = Math.round(message.code);
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        if (message.log !== "") {
            obj.log = message.log;
        }
        if (message.info !== "") {
            obj.info = message.info;
        }
        if (message.gasWanted !== "0") {
            obj.gas_wanted = message.gasWanted;
        }
        if (message.gasUsed !== "0") {
            obj.gas_used = message.gasUsed;
        }
        if ((_a = message.events) === null || _a === void 0 ? void 0 : _a.length) {
            obj.events = message.events.map((e) => exports.Event.toJSON(e));
        }
        if (message.codespace !== "") {
            obj.codespace = message.codespace;
        }
        return obj;
    },
    create(base) {
        return exports.ResponseCheckTx.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseResponseCheckTx();
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : 0;
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        message.log = (_c = object.log) !== null && _c !== void 0 ? _c : "";
        message.info = (_d = object.info) !== null && _d !== void 0 ? _d : "";
        message.gasWanted = (_e = object.gasWanted) !== null && _e !== void 0 ? _e : "0";
        message.gasUsed = (_f = object.gasUsed) !== null && _f !== void 0 ? _f : "0";
        message.events = ((_g = object.events) === null || _g === void 0 ? void 0 : _g.map((e) => exports.Event.fromPartial(e))) || [];
        message.codespace = (_h = object.codespace) !== null && _h !== void 0 ? _h : "";
        return message;
    },
};
function createBaseResponseDeliverTx() {
    return {
        code: 0,
        data: new Uint8Array(0),
        log: "",
        info: "",
        gasWanted: "0",
        gasUsed: "0",
        events: [],
        codespace: "",
    };
}
exports.ResponseDeliverTx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (message.gasWanted !== "0") {
            writer.uint32(40).int64(message.gasWanted);
        }
        if (message.gasUsed !== "0") {
            writer.uint32(48).int64(message.gasUsed);
        }
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.codespace !== "") {
            writer.uint32(66).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseDeliverTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.code = reader.uint32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.log = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.info = reader.string();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.gasWanted = longToString(reader.int64());
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.gasUsed = longToString(reader.int64());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.codespace = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            code: isSet(object.code) ? Number(object.code) : 0,
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
            log: isSet(object.log) ? String(object.log) : "",
            info: isSet(object.info) ? String(object.info) : "",
            gasWanted: isSet(object.gas_wanted) ? String(object.gas_wanted) : "0",
            gasUsed: isSet(object.gas_used) ? String(object.gas_used) : "0",
            events: Array.isArray(object === null || object === void 0 ? void 0 : object.events) ? object.events.map((e) => exports.Event.fromJSON(e)) : [],
            codespace: isSet(object.codespace) ? String(object.codespace) : "",
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.code !== 0) {
            obj.code = Math.round(message.code);
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        if (message.log !== "") {
            obj.log = message.log;
        }
        if (message.info !== "") {
            obj.info = message.info;
        }
        if (message.gasWanted !== "0") {
            obj.gas_wanted = message.gasWanted;
        }
        if (message.gasUsed !== "0") {
            obj.gas_used = message.gasUsed;
        }
        if ((_a = message.events) === null || _a === void 0 ? void 0 : _a.length) {
            obj.events = message.events.map((e) => exports.Event.toJSON(e));
        }
        if (message.codespace !== "") {
            obj.codespace = message.codespace;
        }
        return obj;
    },
    create(base) {
        return exports.ResponseDeliverTx.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseResponseDeliverTx();
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : 0;
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        message.log = (_c = object.log) !== null && _c !== void 0 ? _c : "";
        message.info = (_d = object.info) !== null && _d !== void 0 ? _d : "";
        message.gasWanted = (_e = object.gasWanted) !== null && _e !== void 0 ? _e : "0";
        message.gasUsed = (_f = object.gasUsed) !== null && _f !== void 0 ? _f : "0";
        message.events = ((_g = object.events) === null || _g === void 0 ? void 0 : _g.map((e) => exports.Event.fromPartial(e))) || [];
        message.codespace = (_h = object.codespace) !== null && _h !== void 0 ? _h : "";
        return message;
    },
};
function createBaseResponseEndBlock() {
    return { validatorUpdates: [], consensusParamUpdates: undefined, events: [] };
}
exports.ResponseEndBlock = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.validatorUpdates) {
            exports.ValidatorUpdate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.consensusParamUpdates !== undefined) {
            exports.ConsensusParams.encode(message.consensusParamUpdates, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseEndBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.validatorUpdates.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.consensusParamUpdates = exports.ConsensusParams.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            validatorUpdates: Array.isArray(object === null || object === void 0 ? void 0 : object.validatorUpdates)
                ? object.validatorUpdates.map((e) => exports.ValidatorUpdate.fromJSON(e))
                : [],
            consensusParamUpdates: isSet(object.consensusParamUpdates)
                ? exports.ConsensusParams.fromJSON(object.consensusParamUpdates)
                : undefined,
            events: Array.isArray(object === null || object === void 0 ? void 0 : object.events) ? object.events.map((e) => exports.Event.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        var _a, _b;
        const obj = {};
        if ((_a = message.validatorUpdates) === null || _a === void 0 ? void 0 : _a.length) {
            obj.validatorUpdates = message.validatorUpdates.map((e) => exports.ValidatorUpdate.toJSON(e));
        }
        if (message.consensusParamUpdates !== undefined) {
            obj.consensusParamUpdates = exports.ConsensusParams.toJSON(message.consensusParamUpdates);
        }
        if ((_b = message.events) === null || _b === void 0 ? void 0 : _b.length) {
            obj.events = message.events.map((e) => exports.Event.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.ResponseEndBlock.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseResponseEndBlock();
        message.validatorUpdates = ((_a = object.validatorUpdates) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidatorUpdate.fromPartial(e))) || [];
        message.consensusParamUpdates =
            (object.consensusParamUpdates !== undefined && object.consensusParamUpdates !== null)
                ? exports.ConsensusParams.fromPartial(object.consensusParamUpdates)
                : undefined;
        message.events = ((_b = object.events) === null || _b === void 0 ? void 0 : _b.map((e) => exports.Event.fromPartial(e))) || [];
        return message;
    },
};
function createBaseResponseCommit() {
    return { data: new Uint8Array(0), retainHeight: "0" };
}
exports.ResponseCommit = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.retainHeight !== "0") {
            writer.uint32(24).int64(message.retainHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseCommit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.retainHeight = longToString(reader.int64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
            retainHeight: isSet(object.retainHeight) ? String(object.retainHeight) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        if (message.retainHeight !== "0") {
            obj.retainHeight = message.retainHeight;
        }
        return obj;
    },
    create(base) {
        return exports.ResponseCommit.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseResponseCommit();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.retainHeight = (_b = object.retainHeight) !== null && _b !== void 0 ? _b : "0";
        return message;
    },
};
function createBaseResponseListSnapshots() {
    return { snapshots: [] };
}
exports.ResponseListSnapshots = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.snapshots) {
            exports.Snapshot.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseListSnapshots();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.snapshots.push(exports.Snapshot.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            snapshots: Array.isArray(object === null || object === void 0 ? void 0 : object.snapshots) ? object.snapshots.map((e) => exports.Snapshot.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if ((_a = message.snapshots) === null || _a === void 0 ? void 0 : _a.length) {
            obj.snapshots = message.snapshots.map((e) => exports.Snapshot.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.ResponseListSnapshots.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseResponseListSnapshots();
        message.snapshots = ((_a = object.snapshots) === null || _a === void 0 ? void 0 : _a.map((e) => exports.Snapshot.fromPartial(e))) || [];
        return message;
    },
};
function createBaseResponseOfferSnapshot() {
    return { result: 0 };
}
exports.ResponseOfferSnapshot = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseOfferSnapshot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { result: isSet(object.result) ? responseOfferSnapshot_ResultFromJSON(object.result) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== 0) {
            obj.result = responseOfferSnapshot_ResultToJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return exports.ResponseOfferSnapshot.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseResponseOfferSnapshot();
        message.result = (_a = object.result) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBaseResponseLoadSnapshotChunk() {
    return { chunk: new Uint8Array(0) };
}
exports.ResponseLoadSnapshotChunk = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.chunk.length !== 0) {
            writer.uint32(10).bytes(message.chunk);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseLoadSnapshotChunk();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.chunk = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { chunk: isSet(object.chunk) ? bytesFromBase64(object.chunk) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.chunk.length !== 0) {
            obj.chunk = base64FromBytes(message.chunk);
        }
        return obj;
    },
    create(base) {
        return exports.ResponseLoadSnapshotChunk.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseResponseLoadSnapshotChunk();
        message.chunk = (_a = object.chunk) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        return message;
    },
};
function createBaseResponseApplySnapshotChunk() {
    return { result: 0, refetchChunks: [], rejectSenders: [] };
}
exports.ResponseApplySnapshotChunk = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        writer.uint32(18).fork();
        for (const v of message.refetchChunks) {
            writer.uint32(v);
        }
        writer.ldelim();
        for (const v of message.rejectSenders) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResponseApplySnapshotChunk();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32();
                    continue;
                case 2:
                    if (tag === 16) {
                        message.refetchChunks.push(reader.uint32());
                        continue;
                    }
                    if (tag === 18) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.refetchChunks.push(reader.uint32());
                        }
                        continue;
                    }
                    break;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.rejectSenders.push(reader.string());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            result: isSet(object.result) ? responseApplySnapshotChunk_ResultFromJSON(object.result) : 0,
            refetchChunks: Array.isArray(object === null || object === void 0 ? void 0 : object.refetchChunks) ? object.refetchChunks.map((e) => Number(e)) : [],
            rejectSenders: Array.isArray(object === null || object === void 0 ? void 0 : object.rejectSenders) ? object.rejectSenders.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        var _a, _b;
        const obj = {};
        if (message.result !== 0) {
            obj.result = responseApplySnapshotChunk_ResultToJSON(message.result);
        }
        if ((_a = message.refetchChunks) === null || _a === void 0 ? void 0 : _a.length) {
            obj.refetchChunks = message.refetchChunks.map((e) => Math.round(e));
        }
        if ((_b = message.rejectSenders) === null || _b === void 0 ? void 0 : _b.length) {
            obj.rejectSenders = message.rejectSenders;
        }
        return obj;
    },
    create(base) {
        return exports.ResponseApplySnapshotChunk.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseResponseApplySnapshotChunk();
        message.result = (_a = object.result) !== null && _a !== void 0 ? _a : 0;
        message.refetchChunks = ((_b = object.refetchChunks) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        message.rejectSenders = ((_c = object.rejectSenders) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        return message;
    },
};
function createBaseConsensusParams() {
    return { block: undefined, evidence: undefined, validator: undefined, version: undefined };
}
exports.ConsensusParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.block !== undefined) {
            exports.BlockParams.encode(message.block, writer.uint32(10).fork()).ldelim();
        }
        if (message.evidence !== undefined) {
            params_1.EvidenceParams.encode(message.evidence, writer.uint32(18).fork()).ldelim();
        }
        if (message.validator !== undefined) {
            params_1.ValidatorParams.encode(message.validator, writer.uint32(26).fork()).ldelim();
        }
        if (message.version !== undefined) {
            params_1.VersionParams.encode(message.version, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConsensusParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.block = exports.BlockParams.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.evidence = params_1.EvidenceParams.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.validator = params_1.ValidatorParams.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.version = params_1.VersionParams.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            block: isSet(object.block) ? exports.BlockParams.fromJSON(object.block) : undefined,
            evidence: isSet(object.evidence) ? params_1.EvidenceParams.fromJSON(object.evidence) : undefined,
            validator: isSet(object.validator) ? params_1.ValidatorParams.fromJSON(object.validator) : undefined,
            version: isSet(object.version) ? params_1.VersionParams.fromJSON(object.version) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.block !== undefined) {
            obj.block = exports.BlockParams.toJSON(message.block);
        }
        if (message.evidence !== undefined) {
            obj.evidence = params_1.EvidenceParams.toJSON(message.evidence);
        }
        if (message.validator !== undefined) {
            obj.validator = params_1.ValidatorParams.toJSON(message.validator);
        }
        if (message.version !== undefined) {
            obj.version = params_1.VersionParams.toJSON(message.version);
        }
        return obj;
    },
    create(base) {
        return exports.ConsensusParams.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseConsensusParams();
        message.block = (object.block !== undefined && object.block !== null)
            ? exports.BlockParams.fromPartial(object.block)
            : undefined;
        message.evidence = (object.evidence !== undefined && object.evidence !== null)
            ? params_1.EvidenceParams.fromPartial(object.evidence)
            : undefined;
        message.validator = (object.validator !== undefined && object.validator !== null)
            ? params_1.ValidatorParams.fromPartial(object.validator)
            : undefined;
        message.version = (object.version !== undefined && object.version !== null)
            ? params_1.VersionParams.fromPartial(object.version)
            : undefined;
        return message;
    },
};
function createBaseBlockParams() {
    return { maxBytes: "0", maxGas: "0" };
}
exports.BlockParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.maxBytes !== "0") {
            writer.uint32(8).int64(message.maxBytes);
        }
        if (message.maxGas !== "0") {
            writer.uint32(16).int64(message.maxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.maxBytes = longToString(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.maxGas = longToString(reader.int64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            maxBytes: isSet(object.maxBytes) ? String(object.maxBytes) : "0",
            maxGas: isSet(object.maxGas) ? String(object.maxGas) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.maxBytes !== "0") {
            obj.maxBytes = message.maxBytes;
        }
        if (message.maxGas !== "0") {
            obj.maxGas = message.maxGas;
        }
        return obj;
    },
    create(base) {
        return exports.BlockParams.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseBlockParams();
        message.maxBytes = (_a = object.maxBytes) !== null && _a !== void 0 ? _a : "0";
        message.maxGas = (_b = object.maxGas) !== null && _b !== void 0 ? _b : "0";
        return message;
    },
};
function createBaseLastCommitInfo() {
    return { round: 0, votes: [] };
}
exports.LastCommitInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.round !== 0) {
            writer.uint32(8).int32(message.round);
        }
        for (const v of message.votes) {
            exports.VoteInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLastCommitInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.round = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.votes.push(exports.VoteInfo.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            round: isSet(object.round) ? Number(object.round) : 0,
            votes: Array.isArray(object === null || object === void 0 ? void 0 : object.votes) ? object.votes.map((e) => exports.VoteInfo.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.round !== 0) {
            obj.round = Math.round(message.round);
        }
        if ((_a = message.votes) === null || _a === void 0 ? void 0 : _a.length) {
            obj.votes = message.votes.map((e) => exports.VoteInfo.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.LastCommitInfo.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseLastCommitInfo();
        message.round = (_a = object.round) !== null && _a !== void 0 ? _a : 0;
        message.votes = ((_b = object.votes) === null || _b === void 0 ? void 0 : _b.map((e) => exports.VoteInfo.fromPartial(e))) || [];
        return message;
    },
};
function createBaseEvent() {
    return { type: "", attributes: [] };
}
exports.Event = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        for (const v of message.attributes) {
            exports.EventAttribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.type = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.attributes.push(exports.EventAttribute.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            type: isSet(object.type) ? String(object.type) : "",
            attributes: Array.isArray(object === null || object === void 0 ? void 0 : object.attributes)
                ? object.attributes.map((e) => exports.EventAttribute.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.type !== "") {
            obj.type = message.type;
        }
        if ((_a = message.attributes) === null || _a === void 0 ? void 0 : _a.length) {
            obj.attributes = message.attributes.map((e) => exports.EventAttribute.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.Event.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEvent();
        message.type = (_a = object.type) !== null && _a !== void 0 ? _a : "";
        message.attributes = ((_b = object.attributes) === null || _b === void 0 ? void 0 : _b.map((e) => exports.EventAttribute.fromPartial(e))) || [];
        return message;
    },
};
function createBaseEventAttribute() {
    return { key: new Uint8Array(0), value: new Uint8Array(0), index: false };
}
exports.EventAttribute = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        if (message.index === true) {
            writer.uint32(24).bool(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventAttribute();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.key = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.value = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.index = reader.bool();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
            value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
            index: isSet(object.index) ? Boolean(object.index) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.key.length !== 0) {
            obj.key = base64FromBytes(message.key);
        }
        if (message.value.length !== 0) {
            obj.value = base64FromBytes(message.value);
        }
        if (message.index === true) {
            obj.index = message.index;
        }
        return obj;
    },
    create(base) {
        return exports.EventAttribute.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventAttribute();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        message.index = (_c = object.index) !== null && _c !== void 0 ? _c : false;
        return message;
    },
};
function createBaseTxResult() {
    return { height: "0", index: 0, tx: new Uint8Array(0), result: undefined };
}
exports.TxResult = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.height !== "0") {
            writer.uint32(8).int64(message.height);
        }
        if (message.index !== 0) {
            writer.uint32(16).uint32(message.index);
        }
        if (message.tx.length !== 0) {
            writer.uint32(26).bytes(message.tx);
        }
        if (message.result !== undefined) {
            exports.ResponseDeliverTx.encode(message.result, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxResult();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.height = longToString(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.index = reader.uint32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.tx = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.result = exports.ResponseDeliverTx.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            height: isSet(object.height) ? String(object.height) : "0",
            index: isSet(object.index) ? Number(object.index) : 0,
            tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(0),
            result: isSet(object.result) ? exports.ResponseDeliverTx.fromJSON(object.result) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== "0") {
            obj.height = message.height;
        }
        if (message.index !== 0) {
            obj.index = Math.round(message.index);
        }
        if (message.tx.length !== 0) {
            obj.tx = base64FromBytes(message.tx);
        }
        if (message.result !== undefined) {
            obj.result = exports.ResponseDeliverTx.toJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return exports.TxResult.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseTxResult();
        message.height = (_a = object.height) !== null && _a !== void 0 ? _a : "0";
        message.index = (_b = object.index) !== null && _b !== void 0 ? _b : 0;
        message.tx = (_c = object.tx) !== null && _c !== void 0 ? _c : new Uint8Array(0);
        message.result = (object.result !== undefined && object.result !== null)
            ? exports.ResponseDeliverTx.fromPartial(object.result)
            : undefined;
        return message;
    },
};
function createBaseValidator() {
    return { address: new Uint8Array(0), power: "0" };
}
exports.Validator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address.length !== 0) {
            writer.uint32(10).bytes(message.address);
        }
        if (message.power !== "0") {
            writer.uint32(24).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.power = longToString(reader.int64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array(0),
            power: isSet(object.power) ? String(object.power) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address.length !== 0) {
            obj.address = base64FromBytes(message.address);
        }
        if (message.power !== "0") {
            obj.power = message.power;
        }
        return obj;
    },
    create(base) {
        return exports.Validator.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseValidator();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.power = (_b = object.power) !== null && _b !== void 0 ? _b : "0";
        return message;
    },
};
function createBaseValidatorUpdate() {
    return { pubKey: undefined, power: "0" };
}
exports.ValidatorUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pubKey !== undefined) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.power !== "0") {
            writer.uint32(16).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.power = longToString(reader.int64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            pubKey: isSet(object.pubKey) ? keys_1.PublicKey.fromJSON(object.pubKey) : undefined,
            power: isSet(object.power) ? String(object.power) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pubKey !== undefined) {
            obj.pubKey = keys_1.PublicKey.toJSON(message.pubKey);
        }
        if (message.power !== "0") {
            obj.power = message.power;
        }
        return obj;
    },
    create(base) {
        return exports.ValidatorUpdate.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValidatorUpdate();
        message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
            ? keys_1.PublicKey.fromPartial(object.pubKey)
            : undefined;
        message.power = (_a = object.power) !== null && _a !== void 0 ? _a : "0";
        return message;
    },
};
function createBaseVoteInfo() {
    return { validator: undefined, signedLastBlock: false };
}
exports.VoteInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validator !== undefined) {
            exports.Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
        }
        if (message.signedLastBlock === true) {
            writer.uint32(16).bool(message.signedLastBlock);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVoteInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.validator = exports.Validator.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.signedLastBlock = reader.bool();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            validator: isSet(object.validator) ? exports.Validator.fromJSON(object.validator) : undefined,
            signedLastBlock: isSet(object.signedLastBlock) ? Boolean(object.signedLastBlock) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.validator !== undefined) {
            obj.validator = exports.Validator.toJSON(message.validator);
        }
        if (message.signedLastBlock === true) {
            obj.signedLastBlock = message.signedLastBlock;
        }
        return obj;
    },
    create(base) {
        return exports.VoteInfo.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseVoteInfo();
        message.validator = (object.validator !== undefined && object.validator !== null)
            ? exports.Validator.fromPartial(object.validator)
            : undefined;
        message.signedLastBlock = (_a = object.signedLastBlock) !== null && _a !== void 0 ? _a : false;
        return message;
    },
};
function createBaseEvidence() {
    return { type: 0, validator: undefined, height: "0", time: undefined, totalVotingPower: "0" };
}
exports.Evidence = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.validator !== undefined) {
            exports.Validator.encode(message.validator, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== "0") {
            writer.uint32(24).int64(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
        }
        if (message.totalVotingPower !== "0") {
            writer.uint32(40).int64(message.totalVotingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvidence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.type = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.validator = exports.Validator.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.height = longToString(reader.int64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.time = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.totalVotingPower = longToString(reader.int64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            type: isSet(object.type) ? evidenceTypeFromJSON(object.type) : 0,
            validator: isSet(object.validator) ? exports.Validator.fromJSON(object.validator) : undefined,
            height: isSet(object.height) ? String(object.height) : "0",
            time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
            totalVotingPower: isSet(object.totalVotingPower) ? String(object.totalVotingPower) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== 0) {
            obj.type = evidenceTypeToJSON(message.type);
        }
        if (message.validator !== undefined) {
            obj.validator = exports.Validator.toJSON(message.validator);
        }
        if (message.height !== "0") {
            obj.height = message.height;
        }
        if (message.time !== undefined) {
            obj.time = message.time.toISOString();
        }
        if (message.totalVotingPower !== "0") {
            obj.totalVotingPower = message.totalVotingPower;
        }
        return obj;
    },
    create(base) {
        return exports.Evidence.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseEvidence();
        message.type = (_a = object.type) !== null && _a !== void 0 ? _a : 0;
        message.validator = (object.validator !== undefined && object.validator !== null)
            ? exports.Validator.fromPartial(object.validator)
            : undefined;
        message.height = (_b = object.height) !== null && _b !== void 0 ? _b : "0";
        message.time = (_c = object.time) !== null && _c !== void 0 ? _c : undefined;
        message.totalVotingPower = (_d = object.totalVotingPower) !== null && _d !== void 0 ? _d : "0";
        return message;
    },
};
function createBaseSnapshot() {
    return { height: "0", format: 0, chunks: 0, hash: new Uint8Array(0), metadata: new Uint8Array(0) };
}
exports.Snapshot = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.height !== "0") {
            writer.uint32(8).uint64(message.height);
        }
        if (message.format !== 0) {
            writer.uint32(16).uint32(message.format);
        }
        if (message.chunks !== 0) {
            writer.uint32(24).uint32(message.chunks);
        }
        if (message.hash.length !== 0) {
            writer.uint32(34).bytes(message.hash);
        }
        if (message.metadata.length !== 0) {
            writer.uint32(42).bytes(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSnapshot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.height = longToString(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.format = reader.uint32();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.chunks = reader.uint32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.hash = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.metadata = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            height: isSet(object.height) ? String(object.height) : "0",
            format: isSet(object.format) ? Number(object.format) : 0,
            chunks: isSet(object.chunks) ? Number(object.chunks) : 0,
            hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
            metadata: isSet(object.metadata) ? bytesFromBase64(object.metadata) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== "0") {
            obj.height = message.height;
        }
        if (message.format !== 0) {
            obj.format = Math.round(message.format);
        }
        if (message.chunks !== 0) {
            obj.chunks = Math.round(message.chunks);
        }
        if (message.hash.length !== 0) {
            obj.hash = base64FromBytes(message.hash);
        }
        if (message.metadata.length !== 0) {
            obj.metadata = base64FromBytes(message.metadata);
        }
        return obj;
    },
    create(base) {
        return exports.Snapshot.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseSnapshot();
        message.height = (_a = object.height) !== null && _a !== void 0 ? _a : "0";
        message.format = (_b = object.format) !== null && _b !== void 0 ? _b : 0;
        message.chunks = (_c = object.chunks) !== null && _c !== void 0 ? _c : 0;
        message.hash = (_d = object.hash) !== null && _d !== void 0 ? _d : new Uint8Array(0);
        message.metadata = (_e = object.metadata) !== null && _e !== void 0 ? _e : new Uint8Array(0);
        return message;
    },
};
const tsProtoGlobalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = tsProtoGlobalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin.join(""));
    }
}
function toTimestamp(date) {
    const seconds = Math.trunc(date.getTime() / 1000).toString();
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = (Number(t.seconds) || 0) * 1000;
    millis += (t.nanos || 0) / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(timestamp_1.Timestamp.fromJSON(o));
    }
}
function longToString(long) {
    return long.toString();
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
