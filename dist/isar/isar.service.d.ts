import { PrismaService } from "src/prisma/prisma.service";
export declare class IsarService {
    private prisma;
    constructor(prisma: PrismaService);
    updateAddress(addressId: number, addressData: any): Promise<any>;
    deleteAddress(addressId: number): Promise<void>;
}
