
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION_CONSTANT, USER_MODEL } from 'src/constants';
import { UserSchema } from './user.schema';

export const userProviders = [
  {
    provide:USER_MODEL,
    useFactory: (connection: Connection) => connection.model('Users', UserSchema),
    inject: [DATABASE_CONNECTION_CONSTANT],
  },
];