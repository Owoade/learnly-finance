import { Test } from "@nestjs/testing";
import { AuthService } from "../core/auth/auth.service";
import { UserRepository } from "./user.repo";
import { UserService } from "./user.service"
import { UserModelinterface } from "./user.type";
import { MOCK_BCRYPT_PASSWORD, MOCK_JWT_TOKEN } from "src/constants";
import { mockAuthService, mockUser, mockUserRepository } from '../../../test/mocks';

describe('User Service', ()=>{

    let service: UserService

    beforeEach( async ()=> {


        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: AuthService,
                    useValue: mockAuthService 
                },
                {
                    provide: UserRepository,
                    useValue: mockUserRepository
                }
            ]
        }).compile()

        service = module.get(UserService);

    })

    it("should be defined", ()=>{
        expect(service).toBeDefined();
    })

    it("should log a user in", async ()=>{


        const response = await service.login(mockUser);

        expect(response.token).toEqual(MOCK_JWT_TOKEN);
        expect(response.userId).toEqual(mockUser.id);

    })

    it("should throw an error: User already exists", async ()=>{

        try {

            const response = await service.signUp(mockUser);

            expect(true).toBe(false) // Test fails if error is not thrown

        }catch(e){

            expect(e.message).toEqual('User with this email exists')
        }

    })

    it("should sign a user up", async ()=>{

        mockUserRepository.findbyEmail = (( email: string ) => Promise.resolve(null)) as any

        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: AuthService,
                    useValue: mockAuthService
                },
                {
                    provide: UserRepository,
                    useValue: mockUserRepository
                }
            ]
        }).compile()

        const _service = module.get(UserService);

        const response = await _service.signUp(mockUser);


        expect(response.token).toEqual(MOCK_JWT_TOKEN);
        expect(response.userId).toEqual(mockUser.id);

    })



    it("should get a user profile", async ()=>{

        const userId = "1";

        const user = await service.findUserbyId(userId);

        expect(user).toEqual(mockUser)

    })





})