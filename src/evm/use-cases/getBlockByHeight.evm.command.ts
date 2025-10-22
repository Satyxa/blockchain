import { NotFoundException } from '@nestjs/common';
import { GetBlockByHeightResponse } from '../types/getBlockByHeight.evm.response';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EvmRepository } from '../db/evm.repository';

export class GetEvmBlockByHeightCommand {
  constructor(public height: string) {}
}

@CommandHandler(GetEvmBlockByHeightCommand)
export class GetEvmBlockByHeightHandler
  implements ICommandHandler<GetEvmBlockByHeightCommand>
{
  constructor(private evmRepository: EvmRepository) {}

  async execute({
    height,
  }: GetEvmBlockByHeightCommand): Promise<GetBlockByHeightResponse> {
    const block = await this.evmRepository.getBlockByHeight(height);
    if (!block) {
      throw new NotFoundException(`Block ${height} not found`);
    }

    return {
      height: parseInt(block.number.toString(), 16),
      hash: block.hash,
      parentHash: block.parentHash,
      gasLimit: parseInt(block.gasLimit.toString(), 16),
      gasUsed: parseInt(block.gasUsed.toString(), 16),
      size: parseInt(block.size, 16),
    };
  }
}
