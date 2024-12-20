import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
export declare class SoapHelperService {
    private prisma;
    private userService;
    constructor(prisma: PrismaService, userService: UserService);
    processStatus(statusType: string, statusId: number, user: User): Promise<any>;
    private getStatus;
    private createPayload;
    private sendSoapRequest;
    private updateStatusWithSyncId;
    private handleResponse;
}
