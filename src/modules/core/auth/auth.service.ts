import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ){}

    hashPassword( password: string ){

        const sha1 = crypto.createHash("sha1");

        sha1.update(password);

        return sha1.digest("hex");

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