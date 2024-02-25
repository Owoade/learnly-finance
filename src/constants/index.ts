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

// Mock Values

export const MOCK_JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJ1c2VybmFtZSI6InVzZXI0NTYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY0MzI5NjE0MiwiZXhwIjoxNjQzMjk5MDQyfQ.YMkoRBFw3soRmb3oh4qPjX2oyL5nGjxmtEVQLxB6UAg";
export const MOCK_BCRYPT_PASSWORD = "$2b$10$jysw7e8F5BKiM9jouoTJSO3IZu2X7/OtdWqaf08gZtxwX2DDw2N2i";

