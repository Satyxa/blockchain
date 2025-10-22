import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CosmosRepository } from '../db/cosmos.repository';
import { extractSenderFromEvents } from '../helpers/extractSenderFromEvents';
import { extractFee } from '../helpers/extractFee';
import { GetTransactionByHashResponse } from '../types/getTransactionByHash.cosmos.response';

export class GetCosmosTransactionByHashCommand {
  constructor(public hash: string) {}
}

@CommandHandler(GetCosmosTransactionByHashCommand)
export class GetCosmosTransactionByHashHandler
  implements ICommandHandler<GetCosmosTransactionByHashCommand>
{
  constructor(private cosmosRepository: CosmosRepository) {}

  async execute({
    hash,
  }: GetCosmosTransactionByHashCommand): Promise<GetTransactionByHashResponse> {
    const data = await this.cosmosRepository.getTransactionByHash(hash);

    if (!data) throw new Error('Some error occured CosmosRepository');
    const gasUsed = data.tx_result.gas_used;
    const gasWanted = data.tx_result.gas_wanted;
    const sender =
      data.tx_result?.evm_tx_info?.senderAddress ||
      extractSenderFromEvents(data.tx_result.events);
    const fee = extractFee(data);
    const time = await this.cosmosRepository.getBlockTime(data.height);

    return {
      hash: data.hash,
      height: Number(data.height),
      gasUsed: Number(gasUsed),
      gasWanted: Number(gasWanted),
      sender,
      time,
      fee,
    };
  }
}
