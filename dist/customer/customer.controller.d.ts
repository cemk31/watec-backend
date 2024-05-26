import { CustomerDTO } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    createCustomer(userId: number, dto: CustomerDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        firstName: string;
        lastName: string;
        addressId: number;
        phoneNumber: string;
        street: string;
        zipCode: string;
        email: string;
        country: string;
        place: string;
        companyName: string;
        fax: string;
        propertyNumber: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    updateCustomer(customerId: number, dto: CustomerDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        firstName: string;
        lastName: string;
        addressId: number;
        phoneNumber: string;
        street: string;
        zipCode: string;
        email: string;
        country: string;
        place: string;
        companyName: string;
        fax: string;
        propertyNumber: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    getAllCustomersForUser(): Promise<({
        orders: (import("@prisma/client/runtime").GetResult<{
            id: number;
            number: string;
            remarkExternal: string;
            createdAt: Date;
            actualStatus: import(".prisma/client").Status;
            customerId: number;
            updatedAt: Date;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        firstName: string;
        lastName: string;
        addressId: number;
        phoneNumber: string;
        street: string;
        zipCode: string;
        email: string;
        country: string;
        place: string;
        companyName: string;
        fax: string;
        propertyNumber: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
}
