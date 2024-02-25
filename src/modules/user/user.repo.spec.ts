import { Model } from "mongoose";
import { UserModelinterface } from "./user.type"
import { UserRepository } from "./user.repo";
import { mock } from "node:test";
import { USER_MODEL } from "src/constants";
import { Test } from "@nestjs/testing";

describe("User Repository", ()=>{

    let repo: UserRepository;

    let mockUser;

    beforeEach(async ()=> {

        mockUser = {
            id: "61e6412963a7d5201cd53e84",
            email: "owoadeanu@yahoo.com",
            password: "owoadeanu"
        }

        const mockUserModel = {
            findOne: (  filter: Partial<UserModelinterface> ) => Promise.resolve(mockUser),
            findById: ( id: string ) => Promise.resolve(mockUser),
            create: ( user: UserModelinterface ) => Promise.resolve(mockUser) 
        }

        const module =  await Test.createTestingModule({
            providers: [
                UserRepository,
                {
                    provide: USER_MODEL,
                    useValue: mockUserModel
                }
            ]
        }).compile()

        repo = module.get(UserRepository);

    })
    
    it("should create a user", async ()=> {

        const user = await repo.create(mockUser);

        expect(user).toEqual(mockUser);

    })

    it( "should get user by id", async ()=>{

        const user = await repo.findById(mockUser.id);

        expect(user).toEqual(mockUser);

    })

    it( "should get user by email", async ()=>{

        const user = await repo.findbyEmail(mockUser.email);

        expect(user).toEqual(mockUser);

    })

})