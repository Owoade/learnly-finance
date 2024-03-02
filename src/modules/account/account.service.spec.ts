import { DatabaseUtilsInterface } from 'src/utils/db/type';
import { mockAccount, mockAccountRepository, mockDatabaseUtils, mockUser, mockUserRepository } from '../../../test/mocks';
import { UserModelinterface } from '../user/user.type';
import { AccountService } from "./account.service";
import { AccountModelInterface, AccountRepositoryInterface, AccountServiceInterface } from './account.type';

describe('AccountService', () => {

    let service: AccountServiceInterface;
    let MockUser: UserModelinterface;
    let MockAccount: AccountModelInterface;
    let MockAccountRepository: AccountRepositoryInterface;
    let MockDatabaseUtilsInstance   : DatabaseUtilsInterface
  
    beforeEach(async () => {

        const mockUserService = {
            async findUserbyId(userId: string) {
              return {}
            }
        };

        MockAccount = mockAccount;

        MockUser = mockUser;

        MockAccountRepository = mockAccountRepository;

        MockDatabaseUtilsInstance = mockDatabaseUtils;

        service = new AccountService(MockAccountRepository as any, mockUserService as any, MockDatabaseUtilsInstance );

    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('should create an account', async () => {
      
      const userId = 'existingUserId';

      const response = await service.createAccount(userId);

      expect(response.newAccount.User).toEqual(userId);

    });
  
    it('should deposit amount to account', async () => {

      const dto = { accountId: 'mockAccountId', userId: mockUser.id, amount: 500 };

      try {
        const response = await service.deposit(dto);

        expect(response.account.User).toEqual(dto.userId);
        expect(response.account.id).toEqual(dto.accountId);
        expect(response.accountTransaction.type).toEqual('credit');
        expect(response.accountTransaction.amount).toEqual(dto.amount);

      }catch(e){
        console.log(e)
        expect(true).toBe(false)
      }
      
    });

    // it("throws an error when transaction fails", async ( done )=> {

    // })
  
    // it('should get user account', async () => {
    //   const userId = mockUser.id;
    //   const accountId = 'mockAccountId';
    //   expect(await service.getUserAccount(userId, accountId)).toBeDefined();
    // });
  
    // it('should get user accounts', async () => {
    //   const userId = mockUser.id;
    //   const page = 1;
    //   const perPage = 10;
    //   expect(await service.getUserAccounts(userId, page, perPage)).toBeDefined();
    // });
  
    // it('should get transactions', async () => {
    //   const accountId = 'mockAccountId';
    //   const userId = mockUser.id;
    //   const page = 1;
    //   const perPage = 10;
    //   expect(await service.getTransactions(accountId, userId, page, perPage)).toBeDefined();
    // });
  
    // it('should withdraw amount from account', async () => {
    //   const dto = { accountId: 'mockAccountId', userId: mockUser.id, amount: 500 };
    //   expect(await service.withdraw(dto)).toBeDefined();
    // });
  
    // it('should transfer amount between accounts', async () => {
    //   const dto = { fromAccountId: 'mockAccountId', toAccountId: 'mockAccountId2', fromUserId: mockUser.id, amount: 500 };
    //   expect(await service.transfer(dto)).toBeDefined();
    // });
  
    // it('should delete an account', async () => {
    //   const dto = { accountId: 'mockAccountId', userId: mockUser.id };
    //   expect(await service.deleteAccount(dto)).toBeDefined();
    // });
  });