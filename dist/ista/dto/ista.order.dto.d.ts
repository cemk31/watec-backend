import { CancelledDto } from './CancelledDto';
import { ClosedContractPartnerDto } from './ClosedContractPartnerDto';
import { CustomerContactDto } from './CustomerContactDto';
import { NotPossibleDto } from './NotPossibleDto';
import { OrderStatusDto } from './OrderStatusDto';
import { PlannedDto } from './PlannedDto';
import { PostponedDto } from './PostponedDto';
import { RejectedDto } from './RejectedDto';
import { received } from './ReceivedDto';
import { DoneDto } from './DoneDto';
import { CustomerDTO } from './CustomerDTO';
export declare class OrderDto {
    id: number;
    number: string;
    remarkExternal?: string;
    createdAt: Date;
    status: OrderStatusDto[];
    customerContacts: CustomerContactDto[];
    notPossible: NotPossibleDto[];
    postponed: PostponedDto[];
    cancelled: CancelledDto[];
    rejected: RejectedDto[];
    closedContractPartner: ClosedContractPartnerDto[];
    planned: PlannedDto[];
    Done: DoneDto[];
    received: received[];
    customer: CustomerDTO;
}
