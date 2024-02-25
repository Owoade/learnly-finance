import { mockAccountRepository, mockUser } from '../../../test/mocks';
import { AccountService } from "./account.service";

describe('AccountService', () => {

    let service: any;
  
    beforeEach(async () => {
        const mockUserService = {
            async findUserbyId(userId: string) {
              return {}
            }
          };
      service = new AccountService(mockAccountRepository as any, mockUserService as any);

    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('should create an account', async () => {
      const userId = 'existingUserId';
      expect(await service.createAccount(userId)).toBeDefined();
    });
  
    it('should deposit amount to account', async () => {
      const dto = { accountId: 'mockAccountId', userId: mockUser.id, amount: 500 };
      expect(await service.deposit(dto)).toBeDefined();
    });
  
    it('should get user account', async () => {
      const userId = mockUser.id;
      const accountId = 'mockAccountId';
      expect(await service.getUserAccount(userId, accountId)).toBeDefined();
    });
  
    it('should get user accounts', async () => {
      const userId = mockUser.id;
      const page = 1;
      const perPage = 10;
      expect(await service.getUserAccounts(userId, page, perPage)).toBeDefined();
    });
  
    it('should get transactions', async () => {
      const accountId = 'mockAccountId';
      const userId = mockUser.id;
      const page = 1;
      const perPage = 10;
      expect(await service.getTransactions(accountId, userId, page, perPage)).toBeDefined();
    });
  
    it('should withdraw amount from account', async () => {
      const dto = { accountId: 'mockAccountId', userId: mockUser.id, amount: 500 };
      expect(await service.withdraw(dto)).toBeDefined();
    });
  
    it('should transfer amount between accounts', async () => {
      const dto = { fromAccountId: 'mockAccountId', toAccountId: 'mockAccountId2', fromUserId: mockUser.id, amount: 500 };
      expect(await service.transfer(dto)).toBeDefined();
    });
  
    it('should delete an account', async () => {
      const dto = { accountId: 'mockAccountId', userId: mockUser.id };
      expect(await service.deleteAccount(dto)).toBeDefined();
    });
  });