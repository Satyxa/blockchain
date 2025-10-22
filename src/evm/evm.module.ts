import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EvmController } from './evm.controller';
import { EvmRepository } from './db/evm.repository';
import { GetEvmBlockByHeightHandler } from './use-cases/getBlockByHeight.evm.command';
import { GetEvmTransactionByHashHandler } from './use-cases/getTransactionByHash.evm.command';

@Module({
  imports: [CqrsModule],
  controllers: [EvmController],
  providers: [
    EvmRepository,
    GetEvmBlockByHeightHandler,
    GetEvmTransactionByHashHandler,
  ],
  exports: [EvmRepository],
})
export class EvmModule {}
