import { EvmRepository } from '../db/evm.repository';
import { GetTransactionByHashResponse } from '../types/getTransactionByHash.evm.response';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransactionResponse } from 'ethers';
import { NotFoundException } from '@nestjs/common';

export class GetEvmTransactionByHashCommand {
  constructor(public readonly hash: string) {}
}

@CommandHandler(GetEvmTransactionByHashCommand)
export class GetEvmTransactionByHashHandler
  implements ICommandHandler<GetEvmTransactionByHashCommand>
{
  constructor(private readonly evmRepository: EvmRepository) {}

  async execute(
    command: GetEvmTransactionByHashCommand,
  ): Promise<GetTransactionByHashResponse> {
    const { hash } = command;

    const tx: TransactionResponse | null =
      await this.evmRepository.getTransactionByHash(hash);

    if (!tx) {
      throw new NotFoundException(`Transaction ${hash} not found`);
    }

    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to ?? null,
      value: tx.value.toString(),
      input: tx.data,
      maxFeePerGas: tx.maxFeePerGas ? tx.maxFeePerGas.toString() : null,
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas
        ? tx.maxPriorityFeePerGas.toString()
        : null,
      gasPrice: tx.gasPrice ? tx.gasPrice.toString() : null,
    };
  }
}
