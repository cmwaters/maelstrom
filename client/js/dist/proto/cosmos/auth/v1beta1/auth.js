"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.ModuleAccount = exports.BaseAccount = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../google/protobuf/any");
exports.protobufPackage = "cosmos.auth.v1beta1";
function createBaseBaseAccount() {
    return { address: "", pubKey: undefined, accountNumber: "0", sequence: "0" };
}
exports.BaseAccount = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.pubKey !== undefined) {
            any_1.Any.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
        }
        if (message.accountNumber !== "0") {
            writer.uint32(24).uint64(message.accountNumber);
        }
        if (message.sequence !== "0") {
            writer.uint32(32).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBaseAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pubKey = any_1.Any.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.accountNumber = longToString(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 32) {
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
            address: isSet(object.address) ? String(object.address) : "",
            pubKey: isSet(object.pubKey) ? any_1.Any.fromJSON(object.pubKey) : undefined,
            accountNumber: isSet(object.accountNumber) ? String(object.accountNumber) : "0",
            sequence: isSet(object.sequence) ? String(object.sequence) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.pubKey !== undefined) {
            obj.pubKey = any_1.Any.toJSON(message.pubKey);
        }
        if (message.accountNumber !== "0") {
            obj.accountNumber = message.accountNumber;
        }
        if (message.sequence !== "0") {
            obj.sequence = message.sequence;
        }
        return obj;
    },
    create(base) {
        return exports.BaseAccount.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseBaseAccount();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
            ? any_1.Any.fromPartial(object.pubKey)
            : undefined;
        message.accountNumber = (_b = object.accountNumber) !== null && _b !== void 0 ? _b : "0";
        message.sequence = (_c = object.sequence) !== null && _c !== void 0 ? _c : "0";
        return message;
    },
};
function createBaseModuleAccount() {
    return { baseAccount: undefined, name: "", permissions: [] };
}
exports.ModuleAccount = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.baseAccount !== undefined) {
            exports.BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        for (const v of message.permissions) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModuleAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.baseAccount = exports.BaseAccount.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.permissions.push(reader.string());
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
            baseAccount: isSet(object.baseAccount) ? exports.BaseAccount.fromJSON(object.baseAccount) : undefined,
            name: isSet(object.name) ? String(object.name) : "",
            permissions: Array.isArray(object === null || object === void 0 ? void 0 : object.permissions) ? object.permissions.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.baseAccount !== undefined) {
            obj.baseAccount = exports.BaseAccount.toJSON(message.baseAccount);
        }
        if (message.name !== "") {
            obj.name = message.name;
        }
        if ((_a = message.permissions) === null || _a === void 0 ? void 0 : _a.length) {
            obj.permissions = message.permissions;
        }
        return obj;
    },
    create(base) {
        return exports.ModuleAccount.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseModuleAccount();
        message.baseAccount = (object.baseAccount !== undefined && object.baseAccount !== null)
            ? exports.BaseAccount.fromPartial(object.baseAccount)
            : undefined;
        message.name = (_a = object.name) !== null && _a !== void 0 ? _a : "";
        message.permissions = ((_b = object.permissions) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        return message;
    },
};
function createBaseParams() {
    return {
        maxMemoCharacters: "0",
        txSigLimit: "0",
        txSizeCostPerByte: "0",
        sigVerifyCostEd25519: "0",
        sigVerifyCostSecp256k1: "0",
    };
}
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.maxMemoCharacters !== "0") {
            writer.uint32(8).uint64(message.maxMemoCharacters);
        }
        if (message.txSigLimit !== "0") {
            writer.uint32(16).uint64(message.txSigLimit);
        }
        if (message.txSizeCostPerByte !== "0") {
            writer.uint32(24).uint64(message.txSizeCostPerByte);
        }
        if (message.sigVerifyCostEd25519 !== "0") {
            writer.uint32(32).uint64(message.sigVerifyCostEd25519);
        }
        if (message.sigVerifyCostSecp256k1 !== "0") {
            writer.uint32(40).uint64(message.sigVerifyCostSecp256k1);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.maxMemoCharacters = longToString(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.txSigLimit = longToString(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.txSizeCostPerByte = longToString(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.sigVerifyCostEd25519 = longToString(reader.uint64());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.sigVerifyCostSecp256k1 = longToString(reader.uint64());
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
            maxMemoCharacters: isSet(object.maxMemoCharacters) ? String(object.maxMemoCharacters) : "0",
            txSigLimit: isSet(object.txSigLimit) ? String(object.txSigLimit) : "0",
            txSizeCostPerByte: isSet(object.txSizeCostPerByte) ? String(object.txSizeCostPerByte) : "0",
            sigVerifyCostEd25519: isSet(object.sigVerifyCostEd25519) ? String(object.sigVerifyCostEd25519) : "0",
            sigVerifyCostSecp256k1: isSet(object.sigVerifyCostSecp256k1) ? String(object.sigVerifyCostSecp256k1) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.maxMemoCharacters !== "0") {
            obj.maxMemoCharacters = message.maxMemoCharacters;
        }
        if (message.txSigLimit !== "0") {
            obj.txSigLimit = message.txSigLimit;
        }
        if (message.txSizeCostPerByte !== "0") {
            obj.txSizeCostPerByte = message.txSizeCostPerByte;
        }
        if (message.sigVerifyCostEd25519 !== "0") {
            obj.sigVerifyCostEd25519 = message.sigVerifyCostEd25519;
        }
        if (message.sigVerifyCostSecp256k1 !== "0") {
            obj.sigVerifyCostSecp256k1 = message.sigVerifyCostSecp256k1;
        }
        return obj;
    },
    create(base) {
        return exports.Params.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseParams();
        message.maxMemoCharacters = (_a = object.maxMemoCharacters) !== null && _a !== void 0 ? _a : "0";
        message.txSigLimit = (_b = object.txSigLimit) !== null && _b !== void 0 ? _b : "0";
        message.txSizeCostPerByte = (_c = object.txSizeCostPerByte) !== null && _c !== void 0 ? _c : "0";
        message.sigVerifyCostEd25519 = (_d = object.sigVerifyCostEd25519) !== null && _d !== void 0 ? _d : "0";
        message.sigVerifyCostSecp256k1 = (_e = object.sigVerifyCostSecp256k1) !== null && _e !== void 0 ? _e : "0";
        return message;
    },
};
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
