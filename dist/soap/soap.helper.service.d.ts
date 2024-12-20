import { User } from '@prisma/client';
import { Client } from 'soap';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
export declare class SoapHelperService {
    private readonly client;
    private prisma;
    private userService;
    constructor(client: Client, prisma: PrismaService, userService: UserService);
    processStatus(statusType: string, statusId: number, user: User): Promise<any>;
    private getStatus;
    private createPayload;
    private sendSoapRequest;
    private updateStatusWithSyncId;
    private handleResponse;
}
