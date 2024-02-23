import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth';
import { UserModule } from './modules/user';
import { AccountModule } from './modules/account';

@Module({
  imports: [UserModule, AccountModule],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
