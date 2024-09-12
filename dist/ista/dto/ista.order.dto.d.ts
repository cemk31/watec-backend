import { CancelledDto } from './CancelledDto';
import { ClosedContractPartnerDto } from './ClosedContractPartnerDto';
import { CustomerContactDto } from './CustomerContactDto';
import { NotPossibleDto } from './NotPossibleDto';
import { OrderStatusDto } from './OrderStatusDto';
import { PlannedDto } from './PlannedDto';
import { PostponedDto } from './PostponedDto';
import { RejectedDto } from './RejectedDto';
import { CustomerDTO } from 'src/customer/dto';
import { received } from './ReceivedDto';
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
    received: received[];
    customer: CustomerDTO;
}
