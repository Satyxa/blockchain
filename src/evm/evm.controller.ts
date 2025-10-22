import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetEvmBlockByHeightCommand } from './use-cases/getBlockByHeight.evm.command';
import { GetEvmTransactionByHashCommand } from './use-cases/getTransactionByHash.evm.command';
import { GetTransactionByHashResponse } from './types/getTransactionByHash.evm.response';
import { GetEvmTransactionByHashDto } from '../pipes/getTransactionByHash.pipe';
import { GetBlockByHeightResponse } from './types/getBlockByHeight.evm.response';
import { GetBlockByHeightDto } from '../pipes/getBlockByHeight.pipe';

@Controller('evm')
export class EvmController {
  constructor(private commandBus: CommandBus) {}

  @Get('block/:height')
  async getBlockByHeight(
    @Param() params: GetBlockByHeightDto,
  ): Promise<GetBlockByHeightResponse> {
    return await this.commandBus.execute(
      new GetEvmBlockByHeightCommand(params.height.toString()),
    );
  }

  @Get('transactions/:hash')
  async getTransactionByHash(
    @Param() params: GetEvmTransactionByHashDto,
  ): Promise<GetTransactionByHashResponse> {
    return await this.commandBus.execute(
      new GetEvmTransactionByHashCommand(params.hash),
    );
  }
}
