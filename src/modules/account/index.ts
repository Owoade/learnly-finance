import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { DatabaseModule } from '../core/database';
import { AccountService } from './account.service';
import { accountProviders } from './account.provider';
import { transactionProviders } from './transaction.provider';
import { AccountRepository } from './account.repo';
import { UserModule } from '../user';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth';

@Module({
  controllers: [AccountController],
  imports: [DatabaseModule, UserModule],
  providers: [
    AccountService,
    ...accountProviders,
    ...transactionProviders,
    AccountRepository,

  ],
  exports: [AccountService],
})
export class AccountModule {}
