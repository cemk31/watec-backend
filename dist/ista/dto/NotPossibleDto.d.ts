import { ContactDto } from "./ContactDto";
export declare class NotPossibleDto {
    id: number;
    requestId: number;
    orderId: number;
    statusType: string;
    setOn: Date;
    contact: ContactDto[];
}
