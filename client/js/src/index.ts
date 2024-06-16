import { Keplr } from '@keplr-wallet/types';
import { MsgSend } from "./proto/cosmos/bank/v1beta1/tx"; 
import {AuthInfo, Fee, TxBody, TxRaw} from "./proto/cosmos/tx/v1beta1/tx";
import {SignMode} from "./proto/cosmos/tx/signing/v1beta1/signing";
import {PubKey} from "./proto/cosmos/crypto/secp256k1/keys";
import Long from "long";
import {Buffer} from "buffer";

export class Client {
  private baseUrl: string;
  private chainID: string;
  private keplr: Keplr | undefined;
  private user_address: string
  private maelstrom_address: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.chainID = "";
    this.user_address = "";
    this.maelstrom_address = "";
    this.keplr = undefined;
  }

  async connectToKeplr(keplr: Keplr): Promise<string> {
    if (this.chainID == "") {
        await this.info()
    }
    try {
        console.log("Enabling chain")
        await keplr.enable(this.chainID);
    } catch (error) {
        console.log(error);
        try {
            console.log("Suggesting chain")
            await keplr.experimentalSuggestChain(chainInfo(this.chainID))
        } catch (error) {
            console.log(error);
            throw new Error('Failed to suggest chain: ' + String(error));
        }
    }
    this.keplr = keplr
    const offlineSigner = keplr.getOfflineSigner(this.chainID);
    const accounts = await offlineSigner.getAccounts();
    if (accounts.length == 0) {
        throw new Error('No accounts found');
    }
    this.user_address = accounts[0].address
    return accounts[0].address
  }

  async balance(address: string): Promise<BalanceResponse> {
    const response = await fetch(`${this.baseUrl}/v1/balance/${address}`);
    if (!response.ok) {
      throw new Error('Failed to fetch balance');
    }
    const body = response.json();
    if (!body) {
        throw new Error('Failed to parse info body');
    }
    return body as Promise<BalanceResponse>;
  }

  async info(): Promise<InfoResponse> {
    const response = await fetch(`${this.baseUrl}/v1/info`);
    if (!response.ok) {
      throw new Error('Failed to fetch info');
    }
    const body = await response.json() as InfoResponse;
    if (!body) {
        throw new Error('Failed to parse info body');
    }
    if (this.chainID == "") {
        this.chainID = body.chainId
    }
    this.maelstrom_address = body.address
    return body;
  }

  async deposit(amount: number): Promise<void> {
    if (this.user_address == "") {
        throw new Error('No user address found');
    }
    if (this.maelstrom_address == "") {
        throw new Error('No maelstrom address found');
    }
    console.log("Depositing", amount, "uTIA from", this.user_address, "to", this.maelstrom_address)
    const { pubKey } = await this.keplr!.getKey(this.chainID);

    const protoMsgs = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.encode({
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
      bodyBytes: TxBody.encode(
        TxBody.fromPartial({
          messages: [protoMsgs],
        })
      ).finish(),
      authInfoBytes: AuthInfo.encode({
        signerInfos: [
          {
            publicKey: {
              typeUrl: "/cosmos.crypto.secp256k1.PubKey",
              value: PubKey.encode({
                key: pubKey,
              }).finish(),
            },
            modeInfo: {
              single: {
                mode: SignMode.SIGN_MODE_DIRECT,
              },
              multi: undefined,
            },
            sequence: "0",
          },
        ],
        fee: Fee.fromPartial({
          amount: [{
            denom: "utia",
            amount: "2000",
          }],
          gasLimit: "200000",
        }),
      }).finish(),
      chainId: this.chainID,
      accountNumber: Long.fromString("1")
    }

    console.log("here")
    let signed: any
    try {
        signed = await this.keplr!.signDirect(
          this.chainID,
          this.user_address,
          signDoc,
        )
    } catch (error) {
        console.log("Error signing", error)
        throw new Error('Keplr failed to sign deposit: ' + String(error));
    }
    console.log("signed", signed)

    const tx = TxRaw.encode({
        bodyBytes: signed.signed.bodyBytes,
        authInfoBytes: signed.signed.authInfoBytes,
        signatures: [Buffer.from(signed.signature.signature, "base64")],
    }).finish()

    try {
        const response = await fetch(`${this.baseUrl}/cosmos/tx/v1beta1/txs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tx_bytes: tx
            })
        });

        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to submit transaction');
        }
        const result = await response.json();
        console.log('Transaction submitted successfully:', result);
    } catch (error) {
        console.error('Failed to submit transaction:', error);
    }
  }
}


export interface InfoResponse {
    address: string,
    height: number,
    chainId: string,
    minGasPrice: number,
}

export interface BalanceResponse {
    celestiaBalance: number,
    maelstromBalance: number,
}

function chainInfo(chainID: string): any {
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
    }
}