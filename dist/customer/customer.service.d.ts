import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerDTO } from './dto/create-customer.dto';
export declare class CustomerService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getCustomers(): Promise<({
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
    updateCustomer(userId: number, dto: CustomerDTO): Promise<import("@prisma/client/runtime").GetResult<{
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
}
