import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ){}

    hashPassword( password: string ){

        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);

        return hash;

    }

    comparePassword( password: string, hash: string ){

        return bcrypt.compareSync(password, hash);
        
    }

    generateToken( secret: string, payload: any ){

        return this.jwtService.sign(payload, { secret, });

    }

    verifyToken( secret: string, token: string ){

        try{

            const payload = this.jwtService.verify(token, { secret });

            return payload

        }catch(e){
            return null
        }

    }
}