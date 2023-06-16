import { Injectable } from "@nestjs/common";
import { CreateAddressDTO } from "./dto/create-address.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class IsarService {
    constructor(private prisma: PrismaService) {

    }

    // async createAddress(
    //     userId: number, 
    //     dto: CreateAddressDTO,
    //     ) {
    //     const adresse_SST =
    //         await this.prisma.adresse_SST.create({
    //           data: {
    //             userId,
    //             ...dto,
    //           },
    //         });
    //     return adresse_SST;
    // }

    async updateAddress(addressId: number, addressData: any): Promise<any> {
    // Implementieren Sie hier die Logik, um eine Adresse in der Datenbank zu aktualisieren
    }

    async deleteAddress(addressId: number): Promise<void> {
    // Implementieren Sie hier die Logik, um eine Adresse aus der Datenbank zu löschen
    }

    // async getAllAddresses(userId: number) {
    // return this.prisma.adresse_SST.findMany({
    //         where: {
    //           userId,
    //         },
    //     });
    // }
}