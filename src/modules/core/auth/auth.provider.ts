import { AUTH_SERVICE_CONSTANT } from "src/constants";
import { AuthService } from "./auth.service";

export const authProviders = [
  {
    provide: AUTH_SERVICE_CONSTANT,
    useClass: AuthService
    
  },
];