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
          // CustomerContacts: {
          //   create: dto.CustomerContacts,
          // },
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
          Customer: {
            create: dto.customer,
            
          },
        },
        include: {
          status: true,
          Received: true,
          Planned: true,
          CustomerContacts: true,
          NotPossible: true,
          Postponed: true,   
          Cancelled: true,      
          Rejected: true,
          ClosedContractPartner: true,
          Customer: true,
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
              CustomerContact: true, // include CustomerContact related to Planned
              Request: true, // include Request related to Planned
            },
          },
          // customerContacts: true,
          NotPossible: {
            include: {
              Contact: true, // include CustomerContact related to NotPossible
              Request: true, // include Request related to NotPossible
            },
          },
          Postponed: {
            include: {
              Contact: true, // include CustomerContact related to Postponed
              Request: true, // include Request related to Postponed
            },
          },
          Cancelled: {
            include: {
              Contact: true, // include CustomerContact related to Cancelled
              Request: true, // include Request related to Cancelled
            },
          },      
          Rejected: {
            include: {
              Contact: true, // include CustomerContact related to Rejected
              Request: true, // include Request related to Rejected
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
          },
        },
        Customer: {
          create: {
            ...dto.customer,
          }
        }
      };
    
      const order = await this.prisma.order.create({
        data: {
          number: dto.number,
          remarkExternal: dto.remarkExternal,
          createdAt: dto.createdAt,
          Received: {
            create: {
              orderstatusType: 'YOUR_ORDER_STATUS_TYPE', 
              setOn: new Date('2023-06-16T12:33:08.298Z')
            }
          },
          CustomerContacts: {
            create: dto.CustomerContacts.map(contact => ({
              contactAttemptOn: contact.contactAttemptOn,
              contactPersonCustomer: contact.contactPersonCustomer,
              agentCP: contact.agentCP,
              result: contact.result,
              remark: contact.remark,
              // Weitere Felder je nach Schema hinzufügen
            }))
          },          
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
          CustomerContacts: {
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
          // CustomerContacts: {
          //   create: dto.customerContacts,
          // },
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
          CustomerContacts: true,
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
