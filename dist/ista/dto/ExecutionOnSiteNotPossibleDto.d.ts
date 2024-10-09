import { CustomerContact } from '@prisma/client';
export declare class ExecutionOnSiteNotPossibleDto {
    id: number;
    requestId: number;
    orderId: number;
    statusType: string;
    setOn: Date;
    customerContacts: CustomerContact[];
    remarkExternal?: string;
    nonExecutionReason?: string;
}
