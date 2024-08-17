import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { ServiceDto } from "./dto/ServiceDto";
import { AddressDto } from "./dto/AddressDto";

@Injectable()
export class IstaHelperService {

    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
      ) {}

    async createService(dto: ServiceDto, closedContractPartnerId: number | string) {
        const service = await this.prisma.service.create({
            data: {
                ClosedContractPartner: {
                    connect: {
                        id: closedContractPartnerId as number
                    }
                },
                articleNumber_ista: dto?.articleNumber_ista || null,
                quantity: dto?.quantity || null,
                unit: dto?.unit || null,
                extraordinaryExpenditure: dto?.extraordinaryExpenditure || null,
                purchasePrice_ista: dto?.purchasePrice_ista || null,
                warranty: dto?.warranty|| false,
                serviceRenderedIn: {
                    create: {
                        street: dto?.serviceRenderedIn?.street || null,
                        houseNumber: dto?.serviceRenderedIn?.streetnumber || null,
                        postcode: dto?.serviceRenderedIn?.postcode || null,
                        city: dto?.serviceRenderedIn?.city || null,
                        country: dto?.serviceRenderedIn?.country || null,
                    }
                }
            },
        });

        // await this.prisma.service.update({
        //     where: { id: service.id },
        //     data: { 
        //         serviceRenderedIn: {
        //             create: {
        //                 street: dto?.serviceRenderedIn?.street || null,
        //                 houseNumber: dto?.serviceRenderedIn?.streetnumber || null,
        //                 postcode: dto?.serviceRenderedIn?.postcode || null,
        //                 city: dto?.serviceRenderedIn?.city || null,
        //                 country: dto?.serviceRenderedIn?.country || null,
        //             }
        //         }
        //     },
        //   });
        // this.createAddress(dto?.serviceRenderedIn, service.id);
        
        return service;
    }

    async createAddress(dto: AddressDto, serviceId: number) {
        return this.prisma.address.create({
            data: {
                street: dto?.street || null,
                houseNumber: dto?.streetnumber || null,
                postcode: dto?.postcode || null,
                city: dto?.city || null,
                country: dto?.country || null,
                Service: {
                    connect: {
                        id: serviceId
                    }
                }
            }
        });
    }
}