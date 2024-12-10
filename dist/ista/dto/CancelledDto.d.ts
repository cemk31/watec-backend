import { ContactDto } from './ContactDto';
import { CustomerContactDto } from './CustomerContactDto';
export declare class CancelledDto {
    id: number;
    requestId: number;
    orderId: number;
    statusType: string;
    setOn: Date;
    contact: ContactDto[];
    customerContacts: CustomerContactDto[];
    cancellationReason: string;
    remarkExternal?: string;
}
