import { ContactDto } from "./ContactDto";
export declare class PostponedDto {
    id: number;
    requestId: number;
    orderId: number;
    statusType: string;
    setOn: Date;
    contact: ContactDto[];
    nextContactAttemptOn: Date;
    postponedReason: string;
}
