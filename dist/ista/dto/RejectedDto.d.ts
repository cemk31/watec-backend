import { ContactDto } from './ContactDto';
import { CustomerContactDto } from './CustomerContactDto';
export declare class RejectedDto {
    id: number;
    orderId: number;
    statusType: number;
    setOn: Date;
    contact: ContactDto[];
    customerContacts: CustomerContactDto[];
    rejectionReason: string;
    rejectionReasonText?: string;
    remarkExternal?: string;
}
