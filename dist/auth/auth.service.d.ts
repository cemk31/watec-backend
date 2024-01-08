import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { Order } from '@prisma/client';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    sendSuccessFullRegistrationEmail(email: string): Promise<void>;
    sendConfirmationEmail(email: string, confirmationToken: string): Promise<void>;
    generateToken: () => string;
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    verifyEmail(confirmationToken: string): Promise<void>;
    signin(dto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
    updateUser(userId: number, newEmail: string, newPassword: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
        isConfirmed: boolean;
        confirmationToken: string;
    }, unknown, never> & {}>;
    forgotPassword(email: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
        isConfirmed: boolean;
        confirmationToken: string;
    }, unknown, never> & {}>;
    resetPassword(email: string, newPassword: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
        isConfirmed: boolean;
        confirmationToken: string;
    }, unknown, never> & {}>;
    deleteOrder(orderId: number): Promise<Order | null>;
}
