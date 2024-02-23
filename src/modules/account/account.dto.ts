export interface AccountDepositDto {
    userId: string;
    amount: number;
    accountId: string;
}

export type AccountWithdrawalDto = AccountDepositDto;  

export interface AccountTransferDto {
    fromAccountId: string;
    fromUserId: string;
    toAccountId: string;
    amount: number;
}

export type DeleteAccountDto = Omit<AccountDepositDto, "amount">