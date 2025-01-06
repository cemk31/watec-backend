import { CustomerContactDto } from './CustomerContactDto';
export declare class DoneDto {
    id: number;
    orderId: number;
    orderstatusType: string;
    customerContacts: CustomerContactDto[];
    isChecked: boolean;
    setOn: Date;
}
