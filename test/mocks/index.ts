import { MOCK_BCRYPT_PASSWORD, MOCK_JWT_TOKEN } from "src/constants"
import { AccountDepositDto, AccountTransferDto, AccountWithdrawalDto, DeleteAccountDto } from "src/modules/account/account.dto";
import { AccountRepository } from "src/modules/account/account.repo";
import { TransactionModelInterface } from "src/modules/account/account.type";
import { UserModelinterface } from "src/modules/user/user.type";

export const mockAuthService = {
    hashPassword: (password: string) => MOCK_BCRYPT_PASSWORD,
    comparePassword: (...passwords: string[]) => true,
    generateToken: () => MOCK_JWT_TOKEN,
    verifyToken: () => { id: "1" }
} as any

export const mockAccountService = {
    createAccount: async (userId: string) => {
        return { newAccount: {} };
    },
    deposit: async (dto: AccountDepositDto) => {
        return {};
    },
    getUserAccount: async (userId: string, accountId: string) => {
        return {};
    },
    getUserAccounts: async (userId: string, page: number, perPage: number) => {
        return { accounts: [] };
    },
    getTransactions: async (accountId: string, userId: string, page: number, perPage: number) => {
        return { transactions: [] };
    },
    withdraw: async (dto: AccountWithdrawalDto) => {
        return {};
    },
    transfer: async (dto: AccountTransferDto) => {
        return {};
    },
    deleteAccount: async (dto: DeleteAccountDto) => {
        return {};
    }
};

export const mockAccountRepository = {
    create: async (userId: string) => {
        return {};
    },
    updateBalance: async (amount: number, accountId: string) => {
        return {};
    },
    getAccount: async (accountId: string) => {
        return { User: mockUser.id };
    },
    getUseraccount: async (accountId: string, userId: string) => {
        return {};
    },
    createTransaction: async (payload: TransactionModelInterface) => {
        return {};
    },
    getAllTransactions: async (accountId: string, page: number, perPage: number) => {
        return { count: 0, rows: [] };
    },
    getAllAccounts: async (userId: string, page: number, perPage: number) => {
        return { count: 0, rows: [] };
    },
    deleteAccount: async (accountId: string) => {
        return {};
    }
};

export const mockUser = {
    id: "61e6412963a7d5201cd53e84",
    email: "owoadeanu@yahoo.com",
    password: "owoadeanu"
}



export const mockUserRepository = {
    create: ( user: UserModelinterface) => Promise.resolve(mockUser),
    findById: (id: string) => Promise.resolve(mockUser),
    findbyEmail: ( email: string ) => Promise.resolve(mockUser)
} as any;

