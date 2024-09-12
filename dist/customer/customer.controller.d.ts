import { CustomerDTO } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    createCustomer(userId: number, dto: CustomerDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        street: string;
        zipCode: string;
        userId: number;
        email: string;
        country: string;
        createdAt: Date;
        place: string;
        updatedAt: Date;
        companyName: string;
        fax: string;
        propertyNumber: number;
        addressId: number;
    }, unknown, never> & {}>;
    updateCustomer(customerId: number, dto: CustomerDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        street: string;
        zipCode: string;
        userId: number;
        email: string;
        country: string;
        createdAt: Date;
        place: string;
        updatedAt: Date;
        companyName: string;
        fax: string;
        propertyNumber: number;
        addressId: number;
    }, unknown, never> & {}>;
    getAllCustomersForUser(): Promise<({
        orders: (import("@prisma/client/runtime").GetResult<{
            id: number;
            propertyNumber: number;
            orderNumberIsta: string;
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
        phoneNumber: string;
        street: string;
        zipCode: string;
        userId: number;
        email: string;
        country: string;
        createdAt: Date;
        place: string;
        updatedAt: Date;
        companyName: string;
        fax: string;
        propertyNumber: number;
        addressId: number;
    }, unknown, never> & {})[]>;
}
