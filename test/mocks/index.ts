import { mock } from "node:test";
import { MOCK_BCRYPT_PASSWORD, MOCK_JWT_TOKEN } from "src/constants"
import { AccountDepositDto, AccountTransferDto, AccountWithdrawalDto, DeleteAccountDto } from "src/modules/account/account.dto";
import { AccountRepository } from "src/modules/account/account.repo";
import { AccountModelInterface, AccountRepositoryInterface, AccountServiceInterface, SingleAccountTransactionResponseInterface, TransactionModelInterface } from "src/modules/account/account.type";
import { UserModelinterface } from "src/modules/user/user.type";
import { DatabaseUtilsInterface } from "src/utils/db/type";

export const mockAuthService = {
    hashPassword: (password: string) => MOCK_BCRYPT_PASSWORD,
    comparePassword: (...passwords: string[]) => true,
    generateToken: () => MOCK_JWT_TOKEN,
    verifyToken: () => { id: "1" }
} as any

export const mockUser = {
    id: "61e6412963a7d5201cd53e84",
    email: "owoadeanu@yahoo.com",
    password: "owoadeanu"
}

export const mockAccount = {
    id: "61e6412963a7d5201cd53e84",
    User: mockUser.id,
    balance: 200
} as AccountModelInterface

export const mockTransaction = {
    fromAccount: mockAccount.id,
    type: "debit" as TransactionModelInterface['type'],
    amount: 200
}

export const mockAccountRepository: AccountRepositoryInterface = {

    create: async (userId: string) => {
        return {
            User: userId,
            balance: 0
        };
    },

    updateBalance: async (amount: number, accountId: string) => {

        const account = mockAccount;

        account.id = accountId;

        return account;

    },

    getAccount: async (accountId: string) => {

        const account = mockAccount;

        account.id = accountId;

        return account;

    },

    getUseraccount: async (accountId: string, userId: string) => {

        const account = mockAccount;

        account.id = accountId;

        return account;

    },

    createTransaction: async (payload: TransactionModelInterface) => {
        return payload;
    },

    getAllTransactions: async (accountId: string, page: number, perPage: number) => {
        return { count: 100, rows: Array.from({ length: perPage }, (data: TransactionModelInterface) => data )};
    },

    getAllAccounts: async (userId: string, page: number, perPage: number) => {
        return { count: 100, rows: Array.from({ length: perPage }, (data: AccountModelInterface) => data )};
    },

    deleteAccount: async (accountId: string) => {
        return true;
    }

};

class MockAccountService implements MockAccountServiceInterface  {

    createAccount = async (userId: string) => {

        const newAccount = mockAccount;

        newAccount.User = userId;

        return { newAccount: mockAccount };

    }

    deposit = async (dto: AccountDepositDto) => {

        const transaction = mockTransaction;

        transaction.type = 'debit';

        transaction.fromAccount = dto.accountId;

        const account = mockAccount;

        account.User = dto.userId

        account.id = dto.accountId

        return {
            account: account,
            accountTransaction: transaction
        };

    }

    getUserAccount = async (userId: string, accountId: string) => {

        const account = await mockAccountRepository.getUseraccount(accountId, userId)
        
        return account;

    }

    getUserAccounts = async (userId: string, page: number, perPage: number) => {
        return { accounts: { count: 100, rows: Array.from({ length: perPage }, (data: AccountModelInterface) => data )}};
    }

    getTransactions = async (accountId: string, userId: string, page: number, perPage: number) => {
        return { transactions: { count: 100, rows: Array.from({ length: perPage }, (data: TransactionModelInterface) => data )}};
    }

    withdraw = async (dto: AccountWithdrawalDto) => {

        const transaction = mockTransaction;

        transaction.type="credit";

        transaction.fromAccount = dto.accountId;

        const account = mockAccount;

        return {
            account: account,
            accountTransaction: transaction
        };

    } 

    transfer = async (dto: AccountTransferDto) => {

        const mockCreditTransaction = mockTransaction;

        const mockDebitTransaction = mockTransaction;

        const mockRecipientAccount = mockAccount;

        const mockSenderAccount = mockAccount;

        mockCreditTransaction.type = "credit";

        mockDebitTransaction.type = "debit";

        mockSenderAccount.User = dto.fromAccountId;

        mockRecipientAccount.User = dto.toAccountId;

        mockCreditTransaction.amount, mockTransaction.amount = dto.amount;

        return {
            fromAccount: mockSenderAccount,
            toAccount: mockRecipientAccount,
            debitTransaction: mockDebitTransaction,
            creditTransaction: mockCreditTransaction
        };

    }

    deleteAccount = async (dto: DeleteAccountDto) => {

        const status = await mockAccountRepository.deleteAccount(dto.accountId);

        return status;

    }

    depositTransaction = this.deposit;

    withdrawalTransaction = this.withdraw;

    transferTransaction = this.transfer;

};

export class MockDatabaseutils implements DatabaseUtilsInterface {

    async dbTransaction<T>( callback: (...args: any[]) => Promise<T>){
    
        try {
    
            console.log("in transaction try block")
    
            const data = await callback();
    
            return data;
    
        }catch(e){
    
            throw new Error("Transaction failed");
    
        }
        
    }
}

export const mockDatabaseUtils = new MockDatabaseutils();

export const mockAccountService = new MockAccountService(); 

interface MockAccountServiceInterface extends AccountServiceInterface {
    depositTransaction: AccountServiceInterface['deposit'];
    withdrawalTransaction: AccountServiceInterface['withdraw'],
    transferTransaction: AccountServiceInterface['transfer']
} 




export const mockUserRepository = {
    create: ( user: UserModelinterface) => Promise.resolve(user),
    findById: (id: string) => Promise.resolve(mockUser),
    findbyEmail: ( email: string ) => Promise.resolve(mockUser)
} as any;

