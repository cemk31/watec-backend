import { ContactDto } from './ContactDto';
export declare class CancelledDto {
    id: number;
    requestId: number;
    orderId: number;
    statusType: string;
    setOn: Date;
    contact: ContactDto[];
    cancellationReason: string;
    remarkExternal?: string;
}
