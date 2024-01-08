import { CustomerDTO } from "./CustomerDTO";
import { ReceivedDto } from "./ReceivedDto";
export declare class CreateCustomerOrderDTO {
    number: string;
    remarkExternal?: string;
    Received: ReceivedDto[];
    Customer: CustomerDTO;
}
