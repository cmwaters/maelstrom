"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOps = exports.ProofOp = exports.DominoOp = exports.ValueOp = exports.Proof = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "tendermint.crypto";
function createBaseProof() {
    return { total: "0", index: "0", leafHash: new Uint8Array(0), aunts: [] };
}
exports.Proof = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.total !== "0") {
            writer.uint32(8).int64(message.total);
        }
        if (message.index !== "0") {
            writer.uint32(16).int64(message.index);
        }
        if (message.leafHash.length !== 0) {
            writer.uint32(26).bytes(message.leafHash);
        }
        for (const v of message.aunts) {
            writer.uint32(34).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProof();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.total = longToString(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.index = longToString(reader.int64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.leafHash = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.aunts.push(reader.bytes());
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
            total: isSet(object.total) ? String(object.total) : "0",
            index: isSet(object.index) ? String(object.index) : "0",
            leafHash: isSet(object.leafHash) ? bytesFromBase64(object.leafHash) : new Uint8Array(0),
            aunts: Array.isArray(object === null || object === void 0 ? void 0 : object.aunts) ? object.aunts.map((e) => bytesFromBase64(e)) : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.total !== "0") {
            obj.total = message.total;
        }
        if (message.index !== "0") {
            obj.index = message.index;
        }
        if (message.leafHash.length !== 0) {
            obj.leafHash = base64FromBytes(message.leafHash);
        }
        if ((_a = message.aunts) === null || _a === void 0 ? void 0 : _a.length) {
            obj.aunts = message.aunts.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return exports.Proof.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseProof();
        message.total = (_a = object.total) !== null && _a !== void 0 ? _a : "0";
        message.index = (_b = object.index) !== null && _b !== void 0 ? _b : "0";
        message.leafHash = (_c = object.leafHash) !== null && _c !== void 0 ? _c : new Uint8Array(0);
        message.aunts = ((_d = object.aunts) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        return message;
    },
};
function createBaseValueOp() {
    return { key: new Uint8Array(0), proof: undefined };
}
exports.ValueOp = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.proof !== undefined) {
            exports.Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValueOp();
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
                    message.proof = exports.Proof.decode(reader, reader.uint32());
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
            proof: isSet(object.proof) ? exports.Proof.fromJSON(object.proof) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.key.length !== 0) {
            obj.key = base64FromBytes(message.key);
        }
        if (message.proof !== undefined) {
            obj.proof = exports.Proof.toJSON(message.proof);
        }
        return obj;
    },
    create(base) {
        return exports.ValueOp.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValueOp();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.proof = (object.proof !== undefined && object.proof !== null) ? exports.Proof.fromPartial(object.proof) : undefined;
        return message;
    },
};
function createBaseDominoOp() {
    return { key: "", input: "", output: "" };
}
exports.DominoOp = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.input !== "") {
            writer.uint32(18).string(message.input);
        }
        if (message.output !== "") {
            writer.uint32(26).string(message.output);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDominoOp();
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
                    message.input = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.output = reader.string();
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
            key: isSet(object.key) ? String(object.key) : "",
            input: isSet(object.input) ? String(object.input) : "",
            output: isSet(object.output) ? String(object.output) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.key !== "") {
            obj.key = message.key;
        }
        if (message.input !== "") {
            obj.input = message.input;
        }
        if (message.output !== "") {
            obj.output = message.output;
        }
        return obj;
    },
    create(base) {
        return exports.DominoOp.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseDominoOp();
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.input = (_b = object.input) !== null && _b !== void 0 ? _b : "";
        message.output = (_c = object.output) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseProofOp() {
    return { type: "", key: new Uint8Array(0), data: new Uint8Array(0) };
}
exports.ProofOp = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        if (message.key.length !== 0) {
            writer.uint32(18).bytes(message.key);
        }
        if (message.data.length !== 0) {
            writer.uint32(26).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProofOp();
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
                    message.key = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.data = reader.bytes();
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
            key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== "") {
            obj.type = message.type;
        }
        if (message.key.length !== 0) {
            obj.key = base64FromBytes(message.key);
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return exports.ProofOp.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseProofOp();
        message.type = (_a = object.type) !== null && _a !== void 0 ? _a : "";
        message.key = (_b = object.key) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        message.data = (_c = object.data) !== null && _c !== void 0 ? _c : new Uint8Array(0);
        return message;
    },
};
function createBaseProofOps() {
    return { ops: [] };
}
exports.ProofOps = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.ops) {
            exports.ProofOp.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProofOps();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.ops.push(exports.ProofOp.decode(reader, reader.uint32()));
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
        return { ops: Array.isArray(object === null || object === void 0 ? void 0 : object.ops) ? object.ops.map((e) => exports.ProofOp.fromJSON(e)) : [] };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if ((_a = message.ops) === null || _a === void 0 ? void 0 : _a.length) {
            obj.ops = message.ops.map((e) => exports.ProofOp.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.ProofOps.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseProofOps();
        message.ops = ((_a = object.ops) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ProofOp.fromPartial(e))) || [];
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
