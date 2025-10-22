import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvmModule } from './evm/evm.module';
import { CosmosModule } from './cosmos/cosmos.module';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    EvmModule,
    CosmosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
