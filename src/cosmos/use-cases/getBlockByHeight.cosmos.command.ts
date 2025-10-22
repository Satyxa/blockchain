import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CosmosRepository } from '../db/cosmos.repository';
import { BlockResponse } from '@cosmjs/tendermint-rpc';
import { getBlockByHeightResponse } from '../types/getBlockByHeight.cosmos.response';

export class GetCosmosBlockByHeightCommand {
  constructor(public height: number) {}
}

@CommandHandler(GetCosmosBlockByHeightCommand)
export class GetCosmosBlockByHeightHandler
  implements ICommandHandler<GetCosmosBlockByHeightCommand>
{
  constructor(private cosmosRepository: CosmosRepository) {}

  async execute({
    height,
  }: GetCosmosBlockByHeightCommand): Promise<getBlockByHeightResponse> {
    const response: BlockResponse =
      await this.cosmosRepository.getBlockByHeight(Number(height));
    const { header } = response.block;
    const hash = Array.from(response.blockId.hash)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const proposerAddress = Array.from(header.proposerAddress)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return {
      height: header.height,
      time: header.time.toISOString(),
      hash,
      proposerAddress,
    };
  }
}
