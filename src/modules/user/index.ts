import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userProviders } from "./user.provider";
import { DatabaseModule } from "../core/database";
import { UserRepository } from "./user.repo";
import { AuthModule } from "../core/auth";
import { userServiceProviders } from "./user.service.provider";



@Module({
  controllers: [UserController],
  imports: [DatabaseModule, AuthModule],
  providers: [
    UserService,
    ...userProviders,
    UserRepository,
    ...userServiceProviders,
  ],
  exports: [UserService, ...userServiceProviders],
})
export class UserModule {}
