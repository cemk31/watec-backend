import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./dto";

@Injectable()
export class IstaService {
    constructor(private prisma: PrismaService) {

    }

    async createOrder(userId: number, dto: OrderDto) {
        const order = this.prisma.order.create({
            data: {
                userId,
                ...dto,
            },
        });
        return order;
    }
}