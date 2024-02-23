import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { authProviders } from "./auth.provider";

@Global()
@Module({
    imports: [
      JwtModule.register({
        global: false,
        signOptions: { expiresIn: '1h' },
      }),
    ],
    providers: [AuthService, ...authProviders],
    exports: [AuthService, ...authProviders],
  })
  export class AuthModule {}