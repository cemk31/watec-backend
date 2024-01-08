import { CancelledDto } from "./CancelledDto";
import { ClosedContractPartnerDto } from "./ClosedContractPartnerDto";
import { CustomerContactDto } from "./CustomerContactDto";
import { NotPossibleDto } from "./NotPossibleDto";
import { OrderStatusDto } from "./OrderStatusDto";
import { PlannedDto } from "./PlannedDto";
import { PostponedDto } from "./PostponedDto";
import { ReceivedDto } from "./ReceivedDto";
import { RejectedDto } from "./RejectedDto";
import { CustomerDTO } from "src/customer/dto";
export declare class OrderDto {
    id: number;
    number: string;
    remarkExternal?: string;
    createdAt: Date;
    status: OrderStatusDto[];
    CustomerContacts: CustomerContactDto[];
    notPossible: NotPossibleDto[];
    postponed: PostponedDto[];
    cancelled: CancelledDto[];
    rejected: RejectedDto[];
    closedContractPartner: ClosedContractPartnerDto[];
    planned: PlannedDto[];
    received: ReceivedDto[];
    customer: CustomerDTO;
}
