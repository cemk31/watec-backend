import { CustomerContactDto } from './CustomerContactDto';
export declare class PlannedDto {
    id: number;
    orderId: number;
    orderstatusType: string;
    setOn: Date;
    customerContacts: CustomerContactDto[];
    detailedScheduleDate: Date;
    detailedScheduleTimeFrom?: string;
    detailedScheduleTimeTo?: string;
    detailedScheduleDelayReason?: string;
    requestId: number;
    remarkExternal?: string;
}
