import { CustomerContactDto } from './CustomerContactDto';
export declare class received {
    id: number;
    orderId: number;
    orderstatusType: string;
    setOn: Date;
    contactAttemptOn: Date;
    contactPersonCustomer?: string;
    agentCP: string;
    result: string;
    remark?: string;
    requestId: number;
    propertyNumber: number;
    customerContacts: CustomerContactDto[];
}
