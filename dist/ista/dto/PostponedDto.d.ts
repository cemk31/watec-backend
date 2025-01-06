import { CustomerContact } from '@prisma/client';
export declare class PostponedDto {
    id: number;
    orderId: number;
    requestId: number;
    statusType: string;
    setOn: Date;
    customerContacts: CustomerContact[];
    nextContactAttemptOn: Date;
    postponedReason: string;
    remarkExternal?: string;
}
