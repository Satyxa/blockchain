import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Block, JsonRpcProvider, TransactionResponse } from 'ethers';

@Injectable()
export class EvmRepository {
  private provider: JsonRpcProvider;
  constructor(private configService: ConfigService) {
    this.provider = new JsonRpcProvider(
      this.configService.get<string>('EVM_NODE_LINK'),
    );
  }

  async getBlockByHeight(height: string): Promise<Block | null> {
    const hexHeight = '0x' + Number(height).toString(16);

    return await this.provider.send('eth_getBlockByNumber', [hexHeight, false]);
  }

  async getTransactionByHash(hash: string): Promise<TransactionResponse> {
    const tx = await this.provider.getTransaction(hash);
    if (!tx) {
      throw new Error(`Transaction ${hash} not found`);
    }
    return tx;
  }
}
