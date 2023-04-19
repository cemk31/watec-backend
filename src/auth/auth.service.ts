import { ForbiddenException, Injectable } from "@nestjs/common";
import { User,Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {

    }
    login(){
        return {"message": "login" }
    }

    async signup(dto: AuthDto){
        //generate the new password hash
        const hash = await argon.hash(dto.password);
        //save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true,
                // }
            });
            // delete user.hash;
            //return the user saved user
            // return user;
            return this.signToken(user.id, user.email);
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken',)
                }
            }
            throw error;
        }

    }

    async signin(dto: AuthDto){
        //find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        //if user does not exists throw exception
        if (!user)
            throw new ForbiddenException('Credentials incorrect',
            );

        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password,);
        //if password incorrect throw exception
        if(!pwMatches)
            throw new ForbiddenException('Credentials incorrect',
        );
        //send back the user
        return this.signToken(user.id, user.email);
    }

    register(){
        return {"message": "register" }
    }

    async signToken(userId: number, email: string,): 
    Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwt.signAsync(
            payload, 
            {
                expiresIn: '15m',
                secret: secret,
            },
        );
        return { access_token: token}
    }
}
