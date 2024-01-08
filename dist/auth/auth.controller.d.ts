import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { ResetPasswordDto } from './dto/resetPasswort.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    verifyEmail(confirmationToken: string): Promise<void>;
    signin(dto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
    forgotPassword(dto: ResetPasswordDto): Promise<import("@prisma/client/runtime").GetResult<{
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
    resetPassword(dto: ResetPasswordDto): Promise<import("@prisma/client/runtime").GetResult<{
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
    updateUser(dto: UpdateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
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
}
