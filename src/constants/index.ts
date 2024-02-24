import { config } from "dotenv";

config();

export const MONGO_URL = process.env.MONGO_URL;

export const REDIS_URL = process.env.REDIS_URL;

export const SENTRY_DSN = process.env.SENTRY_DSN;

export const DATABASE_CONNECTION_CONSTANT = "DATABASE_CONNECTION";

export const USER_MODEL =  'CAT_MODEL';

export const ACCOUNT_MODEL =  'ACCOUNT_MODEL';

export const ACCOUNT_TRANSACTION_MODEL =  'ACCOUNT_TRANSACTION_MODEL';

export const JWT_SECRET = 'LEARNLY';

export const AUTH_SERVICE_CONSTANT = "AUTH_SERVICE";

export const USER_SERVICE_CONSTANT = "USER_SERVICE";

