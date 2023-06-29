import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./dto";
import { Prisma} from '@prisma/client';
import { PlannedDto } from "./dto/PlannedDto";
import { HttpService } from "@nestjs/axios";

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

    // async orderReceived(dto: OrderDto) {
    //   const order = await this.prisma.order.create({
    //     data: {
    //       number: dto.number,
    //       remarkExternal: dto.remarkExternal,
    //       createdAt: dto.createdAt,
    //       status: {
    //         create: dto.status,
    //       },
    //       Received: {
    //         create: dto.received,
    //       },
    //     },
    //     include: {
    //       status: true,
    //       Received: true,
    //       Planned: true,
    //       customerContacts: true,
    //       NotPossible: true,
    //       Postponed: true,   
    //       Cancelled: true,      
    //       Rejected: true,
    //       ClosedContractPartner: true,
    //     },
    //   });
    //   return order;
    // }

    async getAllOrders() {
      const order = await this.prisma.order.findMany({
        include: {
          status: true,
          Received: {
            include: {
              CustomerContact: true, // include CustomerContact related to Received
              Request: true, // include Request related to Received
            },
          },
          Planned: {
            include: {
              CustomerContact: true, // include CustomerContact related to Received
              Request: true, // include Request related to Received
            },
          },
          customerContacts: true,
          NotPossible: {
            include: {
              Contact: true, // include CustomerContact related to Received
              Request: true, // include Request related to Received
            },
          },
          Postponed: {
            include: {
              Contact: true, // include CustomerContact related to Received
              Request: true, // include Request related to Received
            },
          },
          Cancelled: {
            include: {
              Contact: true, // include CustomerContact related to Received
              Request: true, // include Request related to Received
            },
          },      
          Rejected: {
            include: {
              Contact: true, // include CustomerContact related to Received
              Request: true, // include Request related to Received
            },
          },
          ClosedContractPartner: true,
        },
      });
      return order;
    }

    async orderReceived(dto: OrderDto) {
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
          number: dto.number,
          remarkExternal: dto.remarkExternal,
          createdAt: dto.createdAt,
          Received: {
            create: {
              orderstatusType: 'YOUR_ORDER_STATUS_TYPE', // Provide your order status type here.
              setOn: new Date('2023-06-16T12:33:08.298Z'), // Provide your setOn DateTime here.
              CustomerContacts: {
                create: dto.customerContacts,
              },
            }
          }
        },
        include: {
          Received: true
        }
      });
    
      return order;
    }

    async createOrderPlanned(dto: PlannedDto) {

    }

    async getOrderById(orderId:number) {
      return this.prisma.order.findFirst({
        where:{id:orderId},
        include: {
          status: true,
          Received: {
            include: {
              CustomerContact: true, // include CustomerContact related to Received
              Request: true, // include Request related to Received
            },
          },
          customerContacts: {
            include: {
              ClosedContractPartner: true, // include ClosedContractPartner related to customerContacts
              planned: true, // include planned related to customerContacts
              received: true, // include received related to customerContacts
            },
          },
          Planned: true,
          NotPossible: true,
          Postponed: true,   
          Cancelled: true,      
          Rejected: true,
          ClosedContractPartner: true,
        },
      })
    }

    async updateOrder(orderId: number, dto: OrderDto) {
      if(!orderId) {
        throw new Error("orderId is required.");
      }
    
      if(!dto) {
        throw new Error("dto is required.");
      }
    
      const order = await this.prisma.order.update({
        where: { id: orderId },
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
          Received:  {
            include: {
              CustomerContact: true, // include CustomerContact related to Received
              Request: true, // include Request related to Received
            },
          },
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
    
    
}
