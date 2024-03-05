import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { ServiceDto } from "./dto/ServiceDto";
import { AddressDto } from "./dto/AddressDto";
export declare class IstaHelperService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    createService(dto: ServiceDto, closedContractPartnerId: number | string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        articleNumber_ista: number;
        quantity: number;
        unit: string;
        extraordinaryExpenditure: boolean;
        purchasePrice_ista: number;
        warranty: boolean;
        addressId: number;
        closedContractPartnerId: number;
    }, unknown, never> & {}>;
    createAddress(dto: AddressDto, serviceId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        street: string;
        streetnumber: string;
        houseNumber: string;
        postcode: string;
        city: string;
        country: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: number;
    }, unknown, never> & {}>;
}
