import { Matches } from 'class-validator';

export class GetEvmTransactionByHashDto {
  @Matches(/^0x[a-fA-F0-9]{64}$/, {
    message:
      'hash must be a valid 0x-prefixed 64-character hex string. Like 0x372b358bfa90aaf015e0f2933acc1f350edf148083dec8ef1159d5f57e8a2e41.',
  })
  hash: string;
}

export class GetCosmosTransactionByHashDto {
  @Matches(/^[A-Fa-f0-9]{64}$/, {
    message:
      'hash must be a valid 64-character hex string without 0x prefix. Like 172D3770F15A6D5E232C0C68D49567BD128CC871C30F09550B86E16A85F2AA6B.',
  })
  hash: string;
}
