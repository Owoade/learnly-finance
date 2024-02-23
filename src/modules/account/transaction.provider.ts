import { Connection } from "mongoose";
import { ACCOUNT_TRANSACTION_MODEL, DATABASE_CONNECTION_CONSTANT } from "src/constants";
import { TransactionSchema } from "./transaction.schema";


export const transactionProviders = [
  {
    provide: ACCOUNT_TRANSACTION_MODEL,
    useFactory: (connection: Connection) => connection.model('AccountsTransactions', TransactionSchema ),
    inject: [DATABASE_CONNECTION_CONSTANT],
  },
];