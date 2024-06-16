"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fee = exports.ModeInfo_Multi = exports.ModeInfo_Single = exports.ModeInfo = exports.SignerInfo = exports.AuthInfo = exports.TxBody = exports.SignDoc = exports.TxRaw = exports.Tx = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../google/protobuf/any");
const coin_1 = require("../../base/v1beta1/coin");
const multisig_1 = require("../../crypto/multisig/v1beta1/multisig");
const signing_1 = require("../signing/v1beta1/signing");
exports.protobufPackage = "cosmos.tx.v1beta1";
function createBaseTx() {
    return { body: undefined, authInfo: undefined, signatures: [] };
}
exports.Tx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.body !== undefined) {
            exports.TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
        }
        if (message.authInfo !== undefined) {
            exports.AuthInfo.encode(message.authInfo, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.body = exports.TxBody.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.authInfo = exports.AuthInfo.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.signatures.push(reader.bytes());
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
            body: isSet(object.body) ? exports.TxBody.fromJSON(object.body) : undefined,
            authInfo: isSet(object.authInfo) ? exports.AuthInfo.fromJSON(object.authInfo) : undefined,
            signatures: Array.isArray(object === null || object === void 0 ? void 0 : object.signatures) ? object.signatures.map((e) => bytesFromBase64(e)) : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.body !== undefined) {
            obj.body = exports.TxBody.toJSON(message.body);
        }
        if (message.authInfo !== undefined) {
            obj.authInfo = exports.AuthInfo.toJSON(message.authInfo);
        }
        if ((_a = message.signatures) === null || _a === void 0 ? void 0 : _a.length) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return exports.Tx.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseTx();
        message.body = (object.body !== undefined && object.body !== null) ? exports.TxBody.fromPartial(object.body) : undefined;
        message.authInfo = (object.authInfo !== undefined && object.authInfo !== null)
            ? exports.AuthInfo.fromPartial(object.authInfo)
            : undefined;
        message.signatures = ((_a = object.signatures) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBaseTxRaw() {
    return { bodyBytes: new Uint8Array(0), authInfoBytes: new Uint8Array(0), signatures: [] };
}
exports.TxRaw = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            writer.uint32(18).bytes(message.authInfoBytes);
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxRaw();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bodyBytes = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.authInfoBytes = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.signatures.push(reader.bytes());
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
            bodyBytes: isSet(object.bodyBytes) ? bytesFromBase64(object.bodyBytes) : new Uint8Array(0),
            authInfoBytes: isSet(object.authInfoBytes) ? bytesFromBase64(object.authInfoBytes) : new Uint8Array(0),
            signatures: Array.isArray(object === null || object === void 0 ? void 0 : object.signatures) ? object.signatures.map((e) => bytesFromBase64(e)) : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.bodyBytes.length !== 0) {
            obj.bodyBytes = base64FromBytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            obj.authInfoBytes = base64FromBytes(message.authInfoBytes);
        }
        if ((_a = message.signatures) === null || _a === void 0 ? void 0 : _a.length) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return exports.TxRaw.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseTxRaw();
        message.bodyBytes = (_a = object.bodyBytes) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.authInfoBytes = (_b = object.authInfoBytes) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        message.signatures = ((_c = object.signatures) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        return message;
    },
};
function createBaseSignDoc() {
    return { bodyBytes: new Uint8Array(0), authInfoBytes: new Uint8Array(0), chainId: "", accountNumber: "0" };
}
exports.SignDoc = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            writer.uint32(18).bytes(message.authInfoBytes);
        }
        if (message.chainId !== "") {
            writer.uint32(26).string(message.chainId);
        }
        if (message.accountNumber !== "0") {
            writer.uint32(32).uint64(message.accountNumber);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignDoc();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bodyBytes = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.authInfoBytes = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.chainId = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.accountNumber = longToString(reader.uint64());
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
            bodyBytes: isSet(object.bodyBytes) ? bytesFromBase64(object.bodyBytes) : new Uint8Array(0),
            authInfoBytes: isSet(object.authInfoBytes) ? bytesFromBase64(object.authInfoBytes) : new Uint8Array(0),
            chainId: isSet(object.chainId) ? String(object.chainId) : "",
            accountNumber: isSet(object.accountNumber) ? String(object.accountNumber) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.bodyBytes.length !== 0) {
            obj.bodyBytes = base64FromBytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            obj.authInfoBytes = base64FromBytes(message.authInfoBytes);
        }
        if (message.chainId !== "") {
            obj.chainId = message.chainId;
        }
        if (message.accountNumber !== "0") {
            obj.accountNumber = message.accountNumber;
        }
        return obj;
    },
    create(base) {
        return exports.SignDoc.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseSignDoc();
        message.bodyBytes = (_a = object.bodyBytes) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.authInfoBytes = (_b = object.authInfoBytes) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        message.chainId = (_c = object.chainId) !== null && _c !== void 0 ? _c : "";
        message.accountNumber = (_d = object.accountNumber) !== null && _d !== void 0 ? _d : "0";
        return message;
    },
};
function createBaseTxBody() {
    return { messages: [], memo: "", timeoutHeight: "0", extensionOptions: [], nonCriticalExtensionOptions: [] };
}
exports.TxBody = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.messages) {
            any_1.Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.memo !== "") {
            writer.uint32(18).string(message.memo);
        }
        if (message.timeoutHeight !== "0") {
            writer.uint32(24).uint64(message.timeoutHeight);
        }
        for (const v of message.extensionOptions) {
            any_1.Any.encode(v, writer.uint32(8186).fork()).ldelim();
        }
        for (const v of message.nonCriticalExtensionOptions) {
            any_1.Any.encode(v, writer.uint32(16378).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxBody();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.messages.push(any_1.Any.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.memo = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.timeoutHeight = longToString(reader.uint64());
                    continue;
                case 1023:
                    if (tag !== 8186) {
                        break;
                    }
                    message.extensionOptions.push(any_1.Any.decode(reader, reader.uint32()));
                    continue;
                case 2047:
                    if (tag !== 16378) {
                        break;
                    }
                    message.nonCriticalExtensionOptions.push(any_1.Any.decode(reader, reader.uint32()));
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
            messages: Array.isArray(object === null || object === void 0 ? void 0 : object.messages) ? object.messages.map((e) => any_1.Any.fromJSON(e)) : [],
            memo: isSet(object.memo) ? String(object.memo) : "",
            timeoutHeight: isSet(object.timeoutHeight) ? String(object.timeoutHeight) : "0",
            extensionOptions: Array.isArray(object === null || object === void 0 ? void 0 : object.extensionOptions)
                ? object.extensionOptions.map((e) => any_1.Any.fromJSON(e))
                : [],
            nonCriticalExtensionOptions: Array.isArray(object === null || object === void 0 ? void 0 : object.nonCriticalExtensionOptions)
                ? object.nonCriticalExtensionOptions.map((e) => any_1.Any.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        var _a, _b, _c;
        const obj = {};
        if ((_a = message.messages) === null || _a === void 0 ? void 0 : _a.length) {
            obj.messages = message.messages.map((e) => any_1.Any.toJSON(e));
        }
        if (message.memo !== "") {
            obj.memo = message.memo;
        }
        if (message.timeoutHeight !== "0") {
            obj.timeoutHeight = message.timeoutHeight;
        }
        if ((_b = message.extensionOptions) === null || _b === void 0 ? void 0 : _b.length) {
            obj.extensionOptions = message.extensionOptions.map((e) => any_1.Any.toJSON(e));
        }
        if ((_c = message.nonCriticalExtensionOptions) === null || _c === void 0 ? void 0 : _c.length) {
            obj.nonCriticalExtensionOptions = message.nonCriticalExtensionOptions.map((e) => any_1.Any.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.TxBody.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseTxBody();
        message.messages = ((_a = object.messages) === null || _a === void 0 ? void 0 : _a.map((e) => any_1.Any.fromPartial(e))) || [];
        message.memo = (_b = object.memo) !== null && _b !== void 0 ? _b : "";
        message.timeoutHeight = (_c = object.timeoutHeight) !== null && _c !== void 0 ? _c : "0";
        message.extensionOptions = ((_d = object.extensionOptions) === null || _d === void 0 ? void 0 : _d.map((e) => any_1.Any.fromPartial(e))) || [];
        message.nonCriticalExtensionOptions = ((_e = object.nonCriticalExtensionOptions) === null || _e === void 0 ? void 0 : _e.map((e) => any_1.Any.fromPartial(e))) || [];
        return message;
    },
};
function createBaseAuthInfo() {
    return { signerInfos: [], fee: undefined };
}
exports.AuthInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.signerInfos) {
            exports.SignerInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.fee !== undefined) {
            exports.Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAuthInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.signerInfos.push(exports.SignerInfo.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.fee = exports.Fee.decode(reader, reader.uint32());
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
            signerInfos: Array.isArray(object === null || object === void 0 ? void 0 : object.signerInfos) ? object.signerInfos.map((e) => exports.SignerInfo.fromJSON(e)) : [],
            fee: isSet(object.fee) ? exports.Fee.fromJSON(object.fee) : undefined,
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if ((_a = message.signerInfos) === null || _a === void 0 ? void 0 : _a.length) {
            obj.signerInfos = message.signerInfos.map((e) => exports.SignerInfo.toJSON(e));
        }
        if (message.fee !== undefined) {
            obj.fee = exports.Fee.toJSON(message.fee);
        }
        return obj;
    },
    create(base) {
        return exports.AuthInfo.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseAuthInfo();
        message.signerInfos = ((_a = object.signerInfos) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SignerInfo.fromPartial(e))) || [];
        message.fee = (object.fee !== undefined && object.fee !== null) ? exports.Fee.fromPartial(object.fee) : undefined;
        return message;
    },
};
function createBaseSignerInfo() {
    return { publicKey: undefined, modeInfo: undefined, sequence: "0" };
}
exports.SignerInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.publicKey !== undefined) {
            any_1.Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.modeInfo !== undefined) {
            exports.ModeInfo.encode(message.modeInfo, writer.uint32(18).fork()).ldelim();
        }
        if (message.sequence !== "0") {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignerInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.publicKey = any_1.Any.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.modeInfo = exports.ModeInfo.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.sequence = longToString(reader.uint64());
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
            publicKey: isSet(object.publicKey) ? any_1.Any.fromJSON(object.publicKey) : undefined,
            modeInfo: isSet(object.modeInfo) ? exports.ModeInfo.fromJSON(object.modeInfo) : undefined,
            sequence: isSet(object.sequence) ? String(object.sequence) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.publicKey !== undefined) {
            obj.publicKey = any_1.Any.toJSON(message.publicKey);
        }
        if (message.modeInfo !== undefined) {
            obj.modeInfo = exports.ModeInfo.toJSON(message.modeInfo);
        }
        if (message.sequence !== "0") {
            obj.sequence = message.sequence;
        }
        return obj;
    },
    create(base) {
        return exports.SignerInfo.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSignerInfo();
        message.publicKey = (object.publicKey !== undefined && object.publicKey !== null)
            ? any_1.Any.fromPartial(object.publicKey)
            : undefined;
        message.modeInfo = (object.modeInfo !== undefined && object.modeInfo !== null)
            ? exports.ModeInfo.fromPartial(object.modeInfo)
            : undefined;
        message.sequence = (_a = object.sequence) !== null && _a !== void 0 ? _a : "0";
        return message;
    },
};
function createBaseModeInfo() {
    return { single: undefined, multi: undefined };
}
exports.ModeInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.single !== undefined) {
            exports.ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
        }
        if (message.multi !== undefined) {
            exports.ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModeInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.single = exports.ModeInfo_Single.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.multi = exports.ModeInfo_Multi.decode(reader, reader.uint32());
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
            single: isSet(object.single) ? exports.ModeInfo_Single.fromJSON(object.single) : undefined,
            multi: isSet(object.multi) ? exports.ModeInfo_Multi.fromJSON(object.multi) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.single !== undefined) {
            obj.single = exports.ModeInfo_Single.toJSON(message.single);
        }
        if (message.multi !== undefined) {
            obj.multi = exports.ModeInfo_Multi.toJSON(message.multi);
        }
        return obj;
    },
    create(base) {
        return exports.ModeInfo.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseModeInfo();
        message.single = (object.single !== undefined && object.single !== null)
            ? exports.ModeInfo_Single.fromPartial(object.single)
            : undefined;
        message.multi = (object.multi !== undefined && object.multi !== null)
            ? exports.ModeInfo_Multi.fromPartial(object.multi)
            : undefined;
        return message;
    },
};
function createBaseModeInfo_Single() {
    return { mode: 0 };
}
exports.ModeInfo_Single = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.mode !== 0) {
            writer.uint32(8).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModeInfo_Single();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.mode = reader.int32();
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
        return { mode: isSet(object.mode) ? (0, signing_1.signModeFromJSON)(object.mode) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.mode !== 0) {
            obj.mode = (0, signing_1.signModeToJSON)(message.mode);
        }
        return obj;
    },
    create(base) {
        return exports.ModeInfo_Single.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseModeInfo_Single();
        message.mode = (_a = object.mode) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBaseModeInfo_Multi() {
    return { bitarray: undefined, modeInfos: [] };
}
exports.ModeInfo_Multi = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bitarray !== undefined) {
            multisig_1.CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.modeInfos) {
            exports.ModeInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModeInfo_Multi();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bitarray = multisig_1.CompactBitArray.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.modeInfos.push(exports.ModeInfo.decode(reader, reader.uint32()));
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
            bitarray: isSet(object.bitarray) ? multisig_1.CompactBitArray.fromJSON(object.bitarray) : undefined,
            modeInfos: Array.isArray(object === null || object === void 0 ? void 0 : object.modeInfos) ? object.modeInfos.map((e) => exports.ModeInfo.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.bitarray !== undefined) {
            obj.bitarray = multisig_1.CompactBitArray.toJSON(message.bitarray);
        }
        if ((_a = message.modeInfos) === null || _a === void 0 ? void 0 : _a.length) {
            obj.modeInfos = message.modeInfos.map((e) => exports.ModeInfo.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.ModeInfo_Multi.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseModeInfo_Multi();
        message.bitarray = (object.bitarray !== undefined && object.bitarray !== null)
            ? multisig_1.CompactBitArray.fromPartial(object.bitarray)
            : undefined;
        message.modeInfos = ((_a = object.modeInfos) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ModeInfo.fromPartial(e))) || [];
        return message;
    },
};
function createBaseFee() {
    return { amount: [], gasLimit: "0", payer: "", granter: "" };
}
exports.Fee = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.gasLimit !== "0") {
            writer.uint32(16).uint64(message.gasLimit);
        }
        if (message.payer !== "") {
            writer.uint32(26).string(message.payer);
        }
        if (message.granter !== "") {
            writer.uint32(34).string(message.granter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFee();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.gasLimit = longToString(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.payer = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.granter = reader.string();
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
            amount: Array.isArray(object === null || object === void 0 ? void 0 : object.amount) ? object.amount.map((e) => coin_1.Coin.fromJSON(e)) : [],
            gasLimit: isSet(object.gasLimit) ? String(object.gasLimit) : "0",
            payer: isSet(object.payer) ? String(object.payer) : "",
            granter: isSet(object.granter) ? String(object.granter) : "",
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if ((_a = message.amount) === null || _a === void 0 ? void 0 : _a.length) {
            obj.amount = message.amount.map((e) => coin_1.Coin.toJSON(e));
        }
        if (message.gasLimit !== "0") {
            obj.gasLimit = message.gasLimit;
        }
        if (message.payer !== "") {
            obj.payer = message.payer;
        }
        if (message.granter !== "") {
            obj.granter = message.granter;
        }
        return obj;
    },
    create(base) {
        return exports.Fee.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseFee();
        message.amount = ((_a = object.amount) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.Coin.fromPartial(e))) || [];
        message.gasLimit = (_b = object.gasLimit) !== null && _b !== void 0 ? _b : "0";
        message.payer = (_c = object.payer) !== null && _c !== void 0 ? _c : "";
        message.granter = (_d = object.granter) !== null && _d !== void 0 ? _d : "";
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
