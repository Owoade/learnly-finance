import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repo';
import { UserService } from '../user/user.service';
import { accountProviders } from './account.provider';
import { transactionProviders } from './transaction.provider';
import { DatabaseModule } from '../core/database';
import { AccountDepositDto, AccountTransferDto, AccountWithdrawalDto, DeleteAccountDto } from './account.dto';
import { AuthService } from '../core/auth/auth.service';
import { mockAccountService, mockAuthService } from '../../../test/mocks';
import { AUTH_SERVICE_CONSTANT } from 'src/constants';
import { JwtService } from '@nestjs/jwt';

describe('Account Controller', () => {

  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    controller = new AccountController(mockAccountService as any);
  });

  it("should be defined", ()=>{
    expect(controller).toBeDefined();
  })
  it('should create an account', async () => {
    // Arrange
    const mockUserId = 'user123';
    const mockRequest = { userId: mockUserId };

    // Act
    const result = await controller.create(mockRequest);

    // Assert
    expect(result).toBeDefined();
  });

  it('should deposit into an account', async () => {
    // Arrange
    const mockUserId = 'user123';
    const mockAccountId = '123'
    const mockRequest = { userId: mockUserId };
    const mockDepositDto = { amount: 100, userId: mockUserId, accountId: mockAccountId };

    // Act
    const result = await controller.deposit(mockDepositDto, mockRequest);

    // Assert
    expect(result).toBeDefined();
  });

  it('should get an account', async () => {
    // Arrange
    const mockUserId = 'user123';
    const mockAccountId = 'account123';
    const mockRequest = { userId: mockUserId };

    // Act
    const result = await controller.getAccount({ accountId: mockAccountId }, mockRequest);

    // Assert
    expect(result).toBeDefined();
  });

  it('should get all accounts', async () => {
    // Arrange
    const mockUserId = 'user123';
    const mockRequest = { userId: mockUserId };

    // Act
    const result = await controller.getAccounts({}, mockRequest);

    // Assert
    expect(result).toBeDefined();
  });

  it('should get transactions for an account', async () => {
    // Arrange
    const mockUserId = 'user123';
    const mockAccountId = 'account123';
    const mockRequest = { userId: mockUserId };

    // Act
    const result = await controller.getTransactions({ accountId: mockAccountId }, mockRequest);

    // Assert
    expect(result).toBeDefined();
  });

  it('should withdraw from an account', async () => {
    // Arrange
    const mockUserId = 'user123';
    const mockAccountId = 'accountId'
    const mockRequest = { userId: mockUserId };
    const mockWithdrawalDto = { amount: 50, userId: mockUserId, accountId: mockAccountId };

    // Act
    const result = await controller.withdraw(mockWithdrawalDto, mockRequest);

    // Assert
    expect(result).toBeDefined();
  });

  it('should transfer between accounts', async () => {
    // Arrange
    const mockUserId = 'user123';
    const mockRequest = { userId: mockUserId };
    const mockTransferDto = { fromAccountId: 'from123', toAccountId: 'to456', amount: 100, fromUserId: mockUserId };

    // Act
    const result = await controller.transfer(mockTransferDto, mockRequest);

    // Assert
    expect(result).toBeDefined();
  });

  it('should delete an account', async () => {
    // Arrange
    const mockUserId = 'user123';
    const mockAccountId = 'account123';
    const mockRequest = { userId: mockUserId };

    // Act
    const result = await controller.deleteAccount({ accountId: mockAccountId, userId: mockUserId }, mockRequest);

    // Assert
    expect(result).toBeDefined();
  });

 
});
