import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AccountRepository } from "./account.repo";
import { UserService } from "../user/user.service";
import { NotFoundError } from "rxjs";
import { AccountDepositDto, AccountTransferDto, AccountWithdrawalDto, DeleteAccountDto } from "./account.dto";
import dbTransaction from "src/utils/dbTransaction";

@Injectable()
export class AccountService {

    constructor(
        private accountRepo: AccountRepository,
        private userService: UserService
    ){}

    async createAccount( userId: string ){

        const user = await this.userService.findUserbyId(userId);

        if(!user) throw new NotFoundException("User not found");

        const newAccount = await this.accountRepo.create(userId);

        return newAccount;

    }

    async deposit( dto: AccountDepositDto ){

        const account = await this.accountRepo.getAccount(dto.accountId);

        if( !account ) throw new NotFoundException('Senders account not found');

        console.log( account.User, dto.userId)

        if( account.User.toString() !== dto.userId ) throw new ForbiddenException("Account mismatch");

        try {

            const trx = await dbTransaction(
                async () => await this.depositTransaction(dto)
            )
    
            return trx;

        }catch(e){

            throw new InternalServerErrorException(e.message)

        }

     
        
    }

    async getUserAccount( userId: string, accountId: string ){

        const account = await this.accountRepo.getUseraccount(accountId, userId);

        return account;

    }

    async getUserAccounts( userId: string, page: number, perPage: number ){

        const accounts = await this.accountRepo.getAllAccounts(userId, page, perPage );

        return accounts;

    }

    async getTransactions( accountId: string, userId: string, page: number, perPage: number ){

        const account = await this.accountRepo.getAccount(accountId);

        if( !account ) throw new NotFoundException("Account not found");

        if( account.User.toString() !== userId ) throw new ForbiddenException("Account mismatch");

        const transactions = await this.accountRepo.getAllTransactions(accountId, page, perPage);

        return transactions;

    }

    async withdraw( dto: AccountWithdrawalDto ){

        const account = await this.accountRepo.getAccount(dto.accountId);

        if( !account ) throw new NotFoundException('Senders account not found')

        if( account.User.toString() !== dto.userId ) throw new ForbiddenException("Account mismatch");

        if( account.balance < dto.amount ) throw new BadRequestException("Insufficient funds");

        try {

            const trx = await dbTransaction(
                async ()=> await this.withdrawalTransaction(dto)
            )
    
            return trx;

        }catch(e){

            throw new InternalServerErrorException(e.message)

        } 

    }

    async transfer( dto: AccountTransferDto ){

        const fromAccount = await this.accountRepo.getAccount(dto.fromAccountId);

        if( !fromAccount ) throw new NotFoundException('Senders account not found')

        if( fromAccount.User.toString() !== dto.fromUserId ) throw new ForbiddenException("Account mismatch");

        if( fromAccount.balance < dto.amount ) throw new BadRequestException("Insufficient funds");

        const toAccount = await this.accountRepo.getAccount(dto.toAccountId);

        if( !toAccount ) throw new NotFoundException("Recipient account not found");

        try {

            const trx = await dbTransaction(
                async ()=> this.transferTransaction(dto)
            )
    
            return trx;    

        }catch(e){

            throw new InternalServerErrorException(e.message)

        }

    }

    async deleteAccount( dto: DeleteAccountDto ){

        const account = await this.accountRepo.getAccount(dto.accountId);

        if(!account) throw new NotFoundException("Account not found");

        if( account.User !== dto.userId ) throw new ForbiddenException("Account mismatch");

        if( account.balance > 0 ) throw new BadRequestException("Withdraw all funds before deleting");

        try {

            await dbTransaction(
                async ()=> await this.accountRepo.deleteAccount(dto.accountId)
            ) 

        }catch(e){

            throw new InternalServerErrorException(e.message)

        }
    }

    private async depositTransaction( dto: AccountDepositDto ){

        const account = await this.accountRepo.updateBalance(dto.amount, dto.accountId);

        const accountTransaction = await this.accountRepo.createTransaction({
            amount: dto.amount,
            type: "credit",
            fromAccount: dto.accountId
        })

        return {
            account,
            accountTransaction
        }
    }

    private async withdrawalTransaction( dto: AccountWithdrawalDto ){

        const account = await this.accountRepo.updateBalance(-dto.amount, dto.accountId);

        const accountTransaction = await this.accountRepo.createTransaction({
            amount: dto.amount,
            type: "debit",
            fromAccount: dto.accountId
        })

        return {
            account,
            accountTransaction
        }

    }

    private async transferTransaction( dto: AccountTransferDto ){

        const fromAccount = await this.accountRepo.updateBalance(-dto.amount, dto.fromAccountId);

        const toAccount = await this.accountRepo.updateBalance(dto.amount, dto.toAccountId); 

        const debitTransaction = await this.accountRepo.createTransaction({
            amount: dto.amount,
            type: "debit",
            fromAccount: dto.fromAccountId,
            toAccount: dto.toAccountId
        })

        const creditTransaction = await this.accountRepo.createTransaction({
            amount: dto.amount,
            type: "credit",
            fromAccount: dto.fromAccountId,
            toAccount: dto.toAccountId
        })

        return {
            fromAccount,
            toAccount,
            debitTransaction,
            creditTransaction
        }

    }

}