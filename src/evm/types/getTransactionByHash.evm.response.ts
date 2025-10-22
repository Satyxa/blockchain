export interface GetTransactionByHashResponse {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  input: string;
  maxFeePerGas: string | null;
  maxPriorityFeePerGas: string | null;
  gasPrice: string | null;
}
