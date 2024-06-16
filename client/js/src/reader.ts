import { InfoResponse } from "./types";

export default class Reader {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

//   async balance(address: string): Promise<number> {
//     const response = await fetch(`${this.baseUrl}/balance/${address}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch balance');
//     }
//     const data = await response.json();
//     return data.balance;
//   }

  async info(): Promise<InfoResponse> {
    const response = await fetch(`${this.baseUrl}/v1/info`);
    if (!response.ok) {
      throw new Error('Failed to fetch info');
    }
    const body = response.json();
    if (!body) {
        throw new Error('Failed to parse info body');
    }
    return body as Promise<InfoResponse>;
  }
}
