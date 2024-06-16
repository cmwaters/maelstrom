import { Keplr } from '@keplr-wallet/types';
export declare class Client {
    private baseUrl;
    private chainID;
    private keplr;
    private user_address;
    private maelstrom_address;
    constructor(baseUrl: string);
    connectToKeplr(keplr: Keplr): Promise<string>;
    balance(address: string): Promise<BalanceResponse>;
    info(): Promise<InfoResponse>;
    deposit(amount: number): Promise<void>;
}
export interface InfoResponse {
    address: string;
    height: number;
    chainId: string;
    minGasPrice: number;
}
export interface BalanceResponse {
    celestiaBalance: number;
    maelstromBalance: number;
}
