export interface GetBlockByHeightResponse {
  height: number;
  hash: string | null;
  parentHash: string;
  gasLimit: number | bigint;
  gasUsed: number | bigint;
  size: number;
}
