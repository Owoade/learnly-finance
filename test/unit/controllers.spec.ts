import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "src/modules/user/user.controller"
import { UserModelinterface } from "src/modules/user/user.type";

describe('User Controller', () => {

    let controller: UserController;
    let mockUserService;

    beforeEach(async () => {
        mockUserService = {
            login: jest.fn(),
            signUp: jest.fn(),
            findUserbyId: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: 'UserService', // Provide the token used in UserController constructor
                    useValue: mockUserService,
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
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
