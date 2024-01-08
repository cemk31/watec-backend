import { ContactDto } from "./ContactDto";
export declare class RejectedDto {
    id: number;
    requestId: number;
    orderId: number;
    statusType: number;
    setOn: Date;
    contact: ContactDto[];
    reason: string;
    reasonText?: string;
}
