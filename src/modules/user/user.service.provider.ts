import { USER_SERVICE_CONSTANT } from "src/constants";
import { UserService } from "./user.service";

export const userServiceProviders = [
  {
    provide: USER_SERVICE_CONSTANT,
    useClass: UserService
  },
];