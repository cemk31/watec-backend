import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    editUser(userId: number, dto: EditUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
        confirmationToken: string;
        isConfirmed: boolean;
    }, unknown, never> & {}>;
    getUserById(userId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
        confirmationToken: string;
        isConfirmed: boolean;
    }, unknown, never> & {}>;
    getUserByEmail(email: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
        confirmationToken: string;
        isConfirmed: boolean;
    }, unknown, never> & {}>;
    getCurrentUser(user: User): Promise<{
        user: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            hash: string;
            firstName: string;
            lastName: string;
            confirmationToken: string;
            isConfirmed: boolean;
        }, unknown, never> & {};
    }>;
}
