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
    getCustomers(userId: number): Promise<(import("@prisma/client/runtime").GetResult<{
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
