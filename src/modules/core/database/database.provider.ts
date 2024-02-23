import * as mongoose from "mongoose";
import { DATABASE_CONNECTION_CONSTANT, MONGO_URL } from "src/constants";

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION_CONSTANT,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(MONGO_URL),
  },
];
