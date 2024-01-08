import { CreateObjektDto } from "src/auftrag/dto/create-objekt.dto";
export declare class CustomerDTO {
    name?: string;
    email?: string;
    phoneNumber?: string;
    lastName?: string;
    firstName?: string;
    street?: string;
    zipCode?: string;
    place?: string;
    country?: string;
    objekt?: CreateObjektDto[];
}
