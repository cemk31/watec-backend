import { Order, User } from '@prisma/client';
import { Client } from 'nestjs-soap';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { SyncDto } from 'src/ista/dto';
import { SoapHelperService } from './soap.helper.service';
export declare class SoapService {
    private readonly client;
    private prisma;
    private userService;
    private soapHelperService;
    user: User;
    constructor(client: Client, prisma: PrismaService, userService: UserService, soapHelperService: SoapHelperService);
    private soapUrl;
    polling(soapResponse: string): Promise<void>;
    private createAddress;
    pollingWithMockData(): Promise<void>;
    getPlanned(id: number): Promise<{
        customerContacts: (import("@prisma/client/runtime").GetResult<{
            id: number;
            contactAttemptOn: Date;
            contactPersonCustomer: string;
            agentCP: string;
            result: string;
            remark: string;
            orderId: number;
            plannedId: number;
            receivedId: number;
            statusReportId: number;
            executionOnSiteNotPossibleId: number;
            notPossibleId: number;
            rejectedId: number;
            postponedId: number;
            cancelledId: number;
            DoneId: number;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        orderId: number;
        orderstatusType: string;
        setOn: Date;
        detailedScheduleDate: Date;
        detailedScheduleTimeFrom: string;
        detailedScheduleTimeTo: string;
        detailedScheduleDelayReason: string;
        requestId: number;
        createdAt: Date;
        updatedAt: Date;
        syncDataId: number;
    }, unknown, never> & {}>;
    getOrderById(id: number): Promise<Order>;
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
    xmlToJson(xml: string): Promise<any>;
    syncStatus(syncDTO: SyncDto, user: User): Promise<any>;
}
