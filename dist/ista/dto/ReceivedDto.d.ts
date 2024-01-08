import { CustomerContactDto } from "./CustomerContactDto";
export declare class ReceivedDto {
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
    customerContacts: CustomerContactDto[];
}
