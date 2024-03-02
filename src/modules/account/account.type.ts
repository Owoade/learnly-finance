import { UserModelinterface } from "../user/user.type";
import { AccountDepositDto, AccountTransferDto, AccountWithdrawalDto, DeleteAccountDto } from "./account.dto";

export interface AccountModelInterface {
    id?: string;
    User: string | UserModelinterface;
    balance: number;
    Transactions?: string | TransactionModelInterface[]
}

export interface TransactionModelInterface {
    fromAccount: string | AccountModelInterface;
    type: "debit" | "credit";
    amount: number;
    toAccount?: string | AccountModelInterface;
}

export interface AccountRepositoryInterface {
    create(userId: string): Promise<AccountModelInterface>;
    updateBalance(amount: number, accountId: string): Promise<AccountModelInterface>;
    getAccount(accountId: string): Promise<AccountModelInterface>;
    getUseraccount(accountId: string, userId: string): Promise<AccountModelInterface>;
    createTransaction(payload: TransactionModelInterface): Promise<TransactionModelInterface>;
    getAllTransactions(accountId: string, page: number, perPage: number): Promise<{ count: number; rows: TransactionModelInterface[] }>;
    getAllAccounts(userId: string, page: number, perPage: number): Promise<{ count: number; rows: AccountModelInterface[] }>;
    deleteAccount(accountId: string): Promise<boolean>;
}

export interface SingleAccountTransactionResponseInterface {
    account: AccountModelInterface,
    accountTransaction: TransactionModelInterface
}

export interface MultipleAccountsTransactioninterface {
    fromAccount: AccountModelInterface,
    toAccount: AccountModelInterface,
    debitTransaction: TransactionModelInterface,
    creditTransaction: TransactionModelInterface
}

export interface PaginatedResponse<T>{
    count: number,
    rows: T[]
}

export interface AccountServiceInterface {
    createAccount(userId: string): Promise<{newAccount: AccountModelInterface}>;
    deposit(dto: AccountDepositDto): Promise<SingleAccountTransactionResponseInterface>;
    getUserAccount(userId: string, accountId: string): Promise<AccountModelInterface>;
    getUserAccounts(userId: string, page: number, perPage: number): Promise<{accounts: PaginatedResponse<AccountModelInterface>}>;
    getTransactions(accountId: string, userId: string, page: number, perPage: number): Promise<{transactions: PaginatedResponse<TransactionModelInterface>}>;
    withdraw(dto: AccountWithdrawalDto): Promise<SingleAccountTransactionResponseInterface>;
    transfer(dto: AccountTransferDto): Promise<MultipleAccountsTransactioninterface>;
    deleteAccount(dto: DeleteAccountDto): Promise<boolean | void>;
}

