import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CosmosController } from './cosmos.controller';
import { CosmosRepository } from './db/cosmos.repository';
import { GetCosmosBlockByHeightHandler } from './use-cases/getBlockByHeight.cosmos.command';
import { GetCosmosTransactionByHashHandler } from './use-cases/getTransactionByHash.cosmos.command';

@Module({
  imports: [CqrsModule],
  controllers: [CosmosController],
  providers: [
    CosmosRepository,
    GetCosmosBlockByHeightHandler,
    GetCosmosTransactionByHashHandler,
  ],
  exports: [CosmosRepository],
})
export class CosmosModule {}
