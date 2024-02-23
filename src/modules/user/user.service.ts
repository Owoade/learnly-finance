import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repo";
import { UserModelinterface } from "./user.type";
import * as crypto from "crypto";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../core/auth/auth.service";
import { JWT_SECRET } from "src/constants";

@Injectable()
export class UserService {
    constructor(
        private authService: AuthService,
        private userRepo: UserRepository
    ){}

    async login( user: UserModelinterface ){

        const existingUser = await this.userRepo.findbyEmail( user.email );

        if(!existingUser) throw new NotFoundException('User not found');

        const userPassword = this.authService.hashPassword(user.password);

        if( userPassword !== existingUser.password ) throw new UnauthorizedException('Invalid password'); 

        const token = this.authService.generateToken( JWT_SECRET, { id: existingUser.id });

        return token;
        
    }

    async signUp( user: UserModelinterface ){

        const existingUser = await this.userRepo.findbyEmail( user.email );

        if(existingUser) throw new BadRequestException('User with this email exists');

        const hashedPassword = this.authService.hashPassword( user.password );

        user.password = hashedPassword;

        const newUser = await this.userRepo.create(user);

        const token = this.authService.generateToken( JWT_SECRET, { id: newUser.id });

        return token;

    }

    async findUserbyId( id: string ){
        return await this.userRepo.findById(id);
    }


}