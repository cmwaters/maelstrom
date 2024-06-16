"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consensus = exports.App = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "tendermint.version";
function createBaseApp() {
    return { protocol: "0", software: "" };
}
exports.App = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.protocol !== "0") {
            writer.uint32(8).uint64(message.protocol);
        }
        if (message.software !== "") {
            writer.uint32(18).string(message.software);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseApp();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.protocol = longToString(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.software = reader.string();
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
            protocol: isSet(object.protocol) ? String(object.protocol) : "0",
            software: isSet(object.software) ? String(object.software) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.protocol !== "0") {
            obj.protocol = message.protocol;
        }
        if (message.software !== "") {
            obj.software = message.software;
        }
        return obj;
    },
    create(base) {
        return exports.App.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseApp();
        message.protocol = (_a = object.protocol) !== null && _a !== void 0 ? _a : "0";
        message.software = (_b = object.software) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseConsensus() {
    return { block: "0", app: "0" };
}
exports.Consensus = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.block !== "0") {
            writer.uint32(8).uint64(message.block);
        }
        if (message.app !== "0") {
            writer.uint32(16).uint64(message.app);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConsensus();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.block = longToString(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.app = longToString(reader.uint64());
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
            block: isSet(object.block) ? String(object.block) : "0",
            app: isSet(object.app) ? String(object.app) : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.block !== "0") {
            obj.block = message.block;
        }
        if (message.app !== "0") {
            obj.app = message.app;
        }
        return obj;
    },
    create(base) {
        return exports.Consensus.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseConsensus();
        message.block = (_a = object.block) !== null && _a !== void 0 ? _a : "0";
        message.app = (_b = object.app) !== null && _b !== void 0 ? _b : "0";
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
