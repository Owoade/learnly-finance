import { Inject, Injectable } from "@nestjs/common";
import { ACCOUNT_MODEL, ACCOUNT_TRANSACTION_MODEL } from "src/constants";
import { AccountModelInterface, TransactionModelInterface } from "./account.type";
import mongoose, { Model } from "mongoose";

@Injectable()
export class AccountRepository {

    constructor(
        @Inject(ACCOUNT_MODEL)
        private Account: Model<AccountModelInterface>,
        @Inject(ACCOUNT_TRANSACTION_MODEL)
        private Transaction: Model<TransactionModelInterface>
    ){}

    async create( userId: string ){

        const newAccount = await this.Account.create({
            User: userId            
        })

        return newAccount;

    }

    async updateBalance( amount: number, accountId ){

        const account = await this.Account.findByIdAndUpdate(accountId, {
            $inc: {
                balance: amount
            },
        },{ new: true });

        return account;

    }

    async getAccount( accountId: string ){

        const account = await this.Account.findById(accountId);

        return account;

    }

    async getUseraccount( accountId: string, userId: string ){
        return await this.Account.findOne({ id: accountId, User: userId }).exec();
    }

    async createTransaction( payload: TransactionModelInterface ){

        const transaction = await this.Transaction.create(payload);

        return transaction;

    }

    async getAllTransactions( accountId: string, page: number, perPage: number  ){

        const transactions = await this.Transaction.find({fromAccount: accountId}).limit(perPage).skip((page - 1)*perPage).exec();

        return transactions;

    }

    async getAllAccounts( userId: string, page: number, perPage:number ){

        const accounts = await this.Account.find({User: userId}).limit(perPage).skip((page - 1)*perPage).exec();

        return accounts;

    }

    async deleteAccount(accountId: string){

        await this.Account.findByIdAndDelete(accountId);

        await this.Transaction.deleteMany({fromAccount: accountId});

    }

}