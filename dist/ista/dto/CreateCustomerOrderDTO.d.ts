import { CustomerDTO } from './CustomerDTO';
import { received } from './ReceivedDto';
export declare class CreateCustomerOrderDTO {
    number: string;
    remarkExternal?: string;
    Received: received[];
    Customer: CustomerDTO;
}
