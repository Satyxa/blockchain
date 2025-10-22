export interface GetTransactionByHashResponse {
  hash: string;
  height: number;
  gasUsed: number | bigint;
  gasWanted: number | bigint;
  sender: string;
  time: string;
  fee: object;
}
