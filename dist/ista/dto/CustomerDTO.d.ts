import { CreateObjektDto } from 'src/auftrag/dto/create-objekt.dto';
export declare class CustomerDTO {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    street?: string;
    zipCode?: string;
    place?: string;
    email?: string;
    country?: string;
    fax?: string;
    companyName?: string;
    propertyNumber?: number;
    objekt?: CreateObjektDto[];
    name?: string;
}
