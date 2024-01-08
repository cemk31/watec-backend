import { CustomerContactDto } from "./CustomerContactDto";
export declare class PlannedDto {
    id: number;
    orderId: number;
    orderstatusType: string;
    setOn: Date;
    customerContact: CustomerContactDto[];
    detailedScheduleDate: Date;
    detailedScheduleTimeFrom?: Date;
    detailedScheduleTimeTo?: Date;
    detailedScheduleDelayReason?: string;
    requestId: number;
}
