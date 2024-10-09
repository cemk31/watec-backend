import { CustomerContact } from '@prisma/client';
export declare class NotPossibleDto {
    id: number;
    requestId: number;
    orderId: number;
    statusType: string;
    setOn: Date;
    customerContacts: CustomerContact[];
    remarkExternal?: string;
}
