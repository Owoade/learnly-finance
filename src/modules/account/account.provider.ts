import { Connection } from 'mongoose';
import { ACCOUNT_MODEL, ACCOUNT_TRANSACTION_MODEL, DATABASE_CONNECTION_CONSTANT, USER_MODEL } from 'src/constants';
import { AccountSchema } from './account.schema';

export const accountProviders = [
  {
    provide: ACCOUNT_MODEL,
    useFactory: (connection: Connection) => connection.model('Accounts', AccountSchema ),
    inject: [DATABASE_CONNECTION_CONSTANT],
  },
];