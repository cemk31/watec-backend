import { ContactDto } from './ContactDto';
export declare class RejectedDto {
    id: number;
    orderId: number;
    statusType: number;
    setOn: Date;
    contact: ContactDto[];
    rejectionReason: string;
    rejectionReasonText?: string;
    remarkExternal?: string;
}
