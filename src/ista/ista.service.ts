import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./dto";

@Injectable()
export class IstaService {
    constructor(private prisma: PrismaService) {

    }

    async createOrder(userId: number, dto: OrderDto) {
        const order = await this.prisma.order.create({
            data: {
              number: dto.number,
              remarkExternal: dto.remarkExternal,
              createdAt: dto.createdAt,
              status: {
                create: dto.status.map(status => ({
                  // map fields from your OrderStatusDto here
                })),
              },
              customerContacts: {
                create: dto.customerContacts.map(contact => ({
                  // map fields from your CustomerContactDto here
                })),
              },
              notPossible: {
                create: dto.notPossible.map(notPossibleItem => ({
                  // map fields from your NotPossibleDto here
                })),
              },
              postponed: {
                create: dto.postponed.map(postponedItem => ({
                  // map fields from your PostponedDto here
                })),
              },
              cancelled: {
                create: dto.cancelled.map(cancelledItem => ({
                  // map fields from your CancelledDto here
                })),
              },
              rejected: {
                create: dto.rejected.map(rejectedItem => ({
                  // map fields from your RejectedDto here
                })),
              },
              closedContractPartner: {
                create: dto.closedContractPartner.map(partner => ({
                  // map fields from your ClosedContractPartnerDto here
                })),
              },
              planned: {
                create: dto.planned.map(plannedItem => ({
                  // map fields from your PlannedDto here
                })),
              },
              received: {
                create: dto.received.map(receivedItem => ({
                  // map fields from your ReceivedDto here
                })),
              },
            },
        });
        return order;
    }
    
}