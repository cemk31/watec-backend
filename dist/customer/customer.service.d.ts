import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerDTO } from './dto/create-customer.dto';
export declare class CustomerService {
    private prisma;
    constructor(prisma: PrismaService);
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
        propertyNumber: string;
        addressId: number;
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
        propertyNumber: string;
        addressId: number;
    }, unknown, never> & {})[]>;
    updateCustomer(userId: number, dto: CustomerDTO): Promise<import("@prisma/client/runtime").GetResult<{
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
        propertyNumber: string;
        addressId: number;
    }, unknown, never> & {}>;
}
