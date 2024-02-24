import { Body, Controller, Delete, Get, Post, Query, Req, Request, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AuthGuard } from "src/guards/auth.guard";
import { AccountDepositDto, AccountTransferDto, AccountWithdrawalDto, DeleteAccountDto } from "./account.dto";
import JoiValidationPipe from "src/pipes";
import { accountIdValidator, accountTransferValidator, getAccountsValidator, getTransactionsValidator, singleAccountValidator } from "src/pipes/validators/account";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";

@Controller("account")
@UseInterceptors(ResponseInterceptor)
@UseGuards(AuthGuard)
export class AccountController {
    constructor(
        private accountService: AccountService
    ){}

    
   @Post("/")
   async  create( @Request() req ){

        const userId = req.userId;

        const account = await this.accountService.createAccount(userId);

        return account;

    }

    @Post("/deposit")
    @UsePipes(new JoiValidationPipe(singleAccountValidator))
    async deposit( @Body() body: AccountDepositDto, @Request() req ){
        
        const userId = req.userId;

        console.log( userId )

        body.userId = userId;

        const response = await this.accountService.deposit(body);

        return response;

    }

    @Get('/')
    @UsePipes(new JoiValidationPipe(accountIdValidator))
    async getAccount(@Query() query, @Req() req ){

        const userId = req.userId;

        const account = await this.accountService.getUserAccount(userId, query.accountId);

        console.log(account);
        
        return {account};

    }

    @Get('/all')
    @UsePipes(new JoiValidationPipe(getAccountsValidator))
    async getAccounts( @Query() query, @Req() req ){

        const page = parseInt( query.page ) || 1;

        const perPage = parseInt( query.perPage ) || 50;

        const accounts = await this.accountService.getUserAccounts(req.userId, page, perPage);

        return accounts;

    }

    @Get('/transactions')
    @UsePipes(new JoiValidationPipe(getTransactionsValidator))
    async getTransactions( @Query() query, @Req() req ){

        const page = parseInt( query.page ) || 1;

        const perPage = parseInt( query.perPage ) || 50;

        const accounts = await this.accountService.getTransactions(query.accountId,req.userId, page, perPage);

        return accounts;

    }

    @Post("/withdraw")
    @UsePipes(new JoiValidationPipe(singleAccountValidator))
    async withdraw( @Body() body: AccountWithdrawalDto, @Request() req ){
        
        const userId = req.userId;

        body.userId = userId;

        const response = await this.accountService.withdraw(body);

        return response;

    }

    @Post("/transfer")
    @UsePipes(new JoiValidationPipe(accountTransferValidator))
    async transfer( @Body() body: AccountTransferDto, @Request() req ){
        
        const userId = req.userId;

        body.fromUserId = userId;

        const response = await this.accountService.transfer(body);

        return response;

    }

    @Delete("/")
    @UsePipes(new JoiValidationPipe(accountIdValidator))
    async deleteAccount(@Query() query: DeleteAccountDto, @Req() req ){

      const userId = req.userId;

      query.userId = userId;

      await this.accountService.deleteAccount(query)

      return "Account deleted";

    }





    
    
}