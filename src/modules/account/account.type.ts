import { UserModelinterface } from "../user/user.type";

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