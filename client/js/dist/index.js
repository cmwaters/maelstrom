"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tx_1 = require("./proto/cosmos/bank/v1beta1/tx");
const tx_2 = require("./proto/cosmos/tx/v1beta1/tx");
const signing_1 = require("./proto/cosmos/tx/signing/v1beta1/signing");
const keys_1 = require("./proto/cosmos/crypto/secp256k1/keys");
const long_1 = __importDefault(require("long"));
const buffer_1 = require("buffer");
class Client {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.chainID = "";
        this.user_address = "";
        this.maelstrom_address = "";
        this.keplr = undefined;
    }
    connectToKeplr(keplr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.chainID == "") {
                yield this.info();
            }
            try {
                console.log("Enabling chain");
                yield keplr.enable(this.chainID);
            }
            catch (error) {
                console.log(error);
                try {
                    console.log("Suggesting chain");
                    yield keplr.experimentalSuggestChain(chainInfo(this.chainID));
                }
                catch (error) {
                    console.log(error);
                    throw new Error('Failed to suggest chain: ' + String(error));
                }
            }
            this.keplr = keplr;
            const offlineSigner = keplr.getOfflineSigner(this.chainID);
            const accounts = yield offlineSigner.getAccounts();
            if (accounts.length == 0) {
                throw new Error('No accounts found');
            }
            this.user_address = accounts[0].address;
            return accounts[0].address;
        });
    }
    balance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/v1/balance/${address}`);
            if (!response.ok) {
                throw new Error('Failed to fetch balance');
            }
            const body = response.json();
            if (!body) {
                throw new Error('Failed to parse info body');
            }
            return body;
        });
    }
    info() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/v1/info`);
            if (!response.ok) {
                throw new Error('Failed to fetch info');
            }
            const body = yield response.json();
            if (!body) {
                throw new Error('Failed to parse info body');
            }
            if (this.chainID == "") {
                this.chainID = body.chainId;
            }
            this.maelstrom_address = body.address;
            return body;
        });
    }
    deposit(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.user_address == "") {
                throw new Error('No user address found');
            }
            if (this.maelstrom_address == "") {
                throw new Error('No maelstrom address found');
            }
            console.log("Depositing", amount, "uTIA from", this.user_address, "to", this.maelstrom_address);
            const { pubKey } = yield this.keplr.getKey(this.chainID);
            const protoMsgs = {
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: tx_1.MsgSend.encode({
                    fromAddress: this.user_address,
                    toAddress: this.maelstrom_address,
                    amount: [
                        {
                            denom: "utia",
                            amount: amount.toString()
                        },
                    ],
                }).finish(),
            };
            const signDoc = {
                bodyBytes: tx_2.TxBody.encode(tx_2.TxBody.fromPartial({
                    messages: [protoMsgs],
                })).finish(),
                authInfoBytes: tx_2.AuthInfo.encode({
                    signerInfos: [
                        {
                            publicKey: {
                                typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                                value: keys_1.PubKey.encode({
                                    key: pubKey,
                                }).finish(),
                            },
                            modeInfo: {
                                single: {
                                    mode: signing_1.SignMode.SIGN_MODE_DIRECT,
                                },
                                multi: undefined,
                            },
                            sequence: "0",
                        },
                    ],
                    fee: tx_2.Fee.fromPartial({
                        amount: [{
                                denom: "utia",
                                amount: "2000",
                            }],
                        gasLimit: "200000",
                    }),
                }).finish(),
                chainId: this.chainID,
                accountNumber: long_1.default.fromString("1")
            };
            console.log("here");
            let signed;
            try {
                signed = yield this.keplr.signDirect(this.chainID, this.user_address, signDoc);
            }
            catch (error) {
                console.log("Error signing", error);
                throw new Error('Keplr failed to sign deposit: ' + String(error));
            }
            console.log("signed", signed);
            const tx = tx_2.TxRaw.encode({
                bodyBytes: signed.signed.bodyBytes,
                authInfoBytes: signed.signed.authInfoBytes,
                signatures: [buffer_1.Buffer.from(signed.signature.signature, "base64")],
            }).finish();
            console.log("tx", tx);
            try {
                const response = yield fetch(`${this.baseUrl}/cosmos/tx/v1beta1/txs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tx_bytes: tx
                    })
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = yield response.json();
                console.log('Transaction submitted successfully:', result);
            }
            catch (error) {
                console.error('Failed to submit transaction:', error);
            }
        });
    }
}
exports.Client = Client;
function chainInfo(chainID) {
    return {
        chainId: chainID,
        chainName: chainID,
        rpc: "http://localhost:26657",
        rest: "http://localhost:1317",
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: "celestia",
            bech32PrefixAccPub: "celestiapub",
            bech32PrefixValAddr: "celestiavaloper",
            bech32PrefixValPub: "celestiavaloperpub",
            bech32PrefixConsAddr: "celestiavalcons",
            bech32PrefixConsPub: "celestiavalconspub"
        },
        currencies: [
            {
                coinDenom: "TIA",
                coinMinimalDenom: "utia",
                coinDecimals: 6
            }
        ],
        feeCurrencies: [
            {
                coinDenom: "TIA",
                coinMinimalDenom: "utia",
                coinDecimals: 6,
                gasPriceStep: {
                    low: 0.01,
                    average: 0.02,
                    high: 0.1
                }
            }
        ],
    };
}
