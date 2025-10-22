import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetCosmosBlockByHeightCommand } from './use-cases/getBlockByHeight.cosmos.command';
import { GetBlockByHeightDto } from '../pipes/getBlockByHeight.pipe';
import { GetCosmosTransactionByHashDto } from '../pipes/getTransactionByHash.pipe';
import { GetCosmosTransactionByHashCommand } from './use-cases/getTransactionByHash.cosmos.command';
import { getBlockByHeightResponse } from './types/getBlockByHeight.cosmos.response';
import { GetTransactionByHashResponse } from './types/getTransactionByHash.cosmos.response';

@Controller('cosmos')
export class CosmosController {
  constructor(private commandBus: CommandBus) {}

  @Get('block/:height')
  async getBlockByHeight(
    @Param() params: GetBlockByHeightDto,
  ): Promise<getBlockByHeightResponse> {
    return await this.commandBus.execute(
      new GetCosmosBlockByHeightCommand(params.height),
    );
  }

  @Get('transactions/:hash')
  async getTransactionByHash(
    @Param() params: GetCosmosTransactionByHashDto,
  ): Promise<GetTransactionByHashResponse> {
    return await this.commandBus.execute(
      new GetCosmosTransactionByHashCommand(params.hash),
    );
  }
}
