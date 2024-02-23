import { Model } from "mongoose";
import { UserModelinterface } from "./user.type";
import { Inject, Injectable } from "@nestjs/common";
import { USER_MODEL } from "src/constants";

@Injectable()
export class UserRepository {
    constructor(
        @Inject(USER_MODEL)
        private User: Model<UserModelinterface>
    ){}

    async create( user: UserModelinterface ){
        return await this.User.create(user);
    }

    async findById( id: string ){
        return await this.User.findById(id);
    }

    async findbyEmail( email: string ){
        return await this.User.findOne({ email });
    }

}