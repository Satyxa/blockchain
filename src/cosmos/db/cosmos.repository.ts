import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockResponse, Tendermint34Client } from '@cosmjs/tendermint-rpc';
import axios from 'axios';

@Injectable()
export class CosmosRepository {
  private client: Promise<Tendermint34Client>;
  private rpcUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.rpcUrl = this.configService.get<string>('COSMOS_RPC_NODE_LINK')!;
    this.client = Tendermint34Client.connect(this.rpcUrl);
  }

  async getBlockByHeight(height: number): Promise<BlockResponse> {
    const tmClient: Tendermint34Client = await this.client;
    return await tmClient.block(height);
  }

  async getTransactionByHash(hash: string) {
    const url = `${this.rpcUrl}/tx?hash=${hash}`;

    const { data } = await axios.get(url);
    return data;
  }

  async getBlockTime(height: string): Promise<string> {
    const { data } = await axios.get(`${this.rpcUrl}/block?height=${height}`);
    const time = data?.block?.header?.time;
    if (!time) throw new Error('Block time not found');
    return time;
  }
}
