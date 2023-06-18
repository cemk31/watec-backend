import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./dto";
import { Prisma} from '@prisma/client';

@Injectable()
export class IstaService {

    constructor(private prisma: PrismaService) {}

    async createOrder(dto: OrderDto) {
      const order = await this.prisma.order.create({
        data: {
          number: dto.number,
          remarkExternal: dto.remarkExternal,
          createdAt: dto.createdAt,
          status: {
            create: dto.status,
          },
          customerContacts: {
            create: dto.customerContacts,
          },
          NotPossible: {
            create: dto.notPossible,
          },
          Postponed: {
            create: dto.postponed,
          },
          Cancelled: {
            create: dto.cancelled,
          },
          Rejected: {
            create: dto.rejected,
          },
          // ClosedContractPartner: {
          //   create: dto.closedContractPartner,
          // },
          Planned: {
            create: dto.planned,
          },
          Received: {
            create: dto.received,
          },
        },
        include: {
          status: true,
          Received: true,
          Planned: true,
          customerContacts: true,
          NotPossible: true,
          Postponed: true,   
          Cancelled: true,      
          Rejected: true,
          ClosedContractPartner: true,
        },
      });
      return order;
    }

    async orderReceived(dto: OrderDto) {
      const order = await this.prisma.order.create({
        data: {
          number: dto.number,
          remarkExternal: dto.remarkExternal,
          createdAt: dto.createdAt,
          status: {
            create: dto.status,
          },
          Received: {
            create: dto.received,
          },
        },
        include: {
          status: true,
          Received: true,
          Planned: true,
          customerContacts: true,
          NotPossible: true,
          Postponed: true,   
          Cancelled: true,      
          Rejected: true,
          ClosedContractPartner: true,
        },
      });
      return order;
    }

    async getAllOrders() {
      const order = await this.prisma.order.findMany({
        include: {
          status: true,
          Received: true,
          Planned: true,
          customerContacts: true,
          NotPossible: true,
          Postponed: true,   
          Cancelled: true,      
          Rejected: true,
          ClosedContractPartner: true,
        },
      });
      return order;
    }

    async createNewOrder(dto: OrderDto) {
      const newOrder: Prisma.OrderCreateInput = {
        number: dto.number, 
        remarkExternal: dto.remarkExternal,
        createdAt: dto.createdAt,
        // Assuming `Received` is a relation field in your `Order` model.
        // This will create the related `Received` record.
        Received: {
          create: {
            ...dto.received,
            // No need to set orderId here, Prisma does it automatically.
          },
        },
        // add other fields here...
      };
    
      const order = await this.prisma.order.create({
        data: {
          number: '',
          remarkExternal: 'asdasd',
          createdAt: new Date('2023-06-16T12:33:08.298Z'),
          Received: {
            create: {
              orderstatusType: 'YOUR_ORDER_STATUS_TYPE', // Provide your order status type here.
              setOn: new Date('2023-06-16T12:33:08.298Z'), // Provide your setOn DateTime here.
              // other properties...
            }
          }
        },
        include: {
          Received: true
        }
      });
    
      return order;
    }
}
