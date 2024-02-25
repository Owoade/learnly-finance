import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserModelinterface } from "./user.type";
import { UserService } from "./user.service";


describe('User Controller', () => {

    let controller: UserController;
    let mockUserService;

    beforeEach(async () => {

        mockUserService = {
            login: jest.fn(),
            signUp: jest.fn(),
            findUserbyId: jest.fn()
        };

        controller = new UserController(mockUserService); 
          
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should sign a user up", async () => {
        // Arrange
        const user = {
            email: "owoadeanuoluwapo@gmail.com",
            password: "owoadeanu"
        } as UserModelinterface;

        // Act
        await controller.signup(user);

        // Assert
        expect(mockUserService.signUp).toHaveBeenCalledWith(user);

    });

    it("should get user profile", async () => {
        // Arrange
        const mockUser = {
            email: "test@example.com",
            password: "password",
        };

        const mockRequest = {
            user: mockUser
        };

        // Act
        const userProfile = await controller.profile(mockRequest);

        expect(userProfile.user.password).toBeUndefined()

        // Assert
        expect(userProfile.user.email).toEqual(mockUser.email );
        
    });

});
