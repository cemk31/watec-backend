import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerOrderDTO, CustomerDTO, OrderDto, ReceivedDto } from './dto';
import { RejectedDto } from './dto/RejectedDto';
import { PostponedDto } from './dto/PostponedDto';
import { Cancelled, ClosedContractPartner, NotPossible, Order, Planned, Postponed, Received } from '@prisma/client';
import { CancelledDto } from './dto/CancelledDto';
import { PlannedDto } from './dto/PlannedDto';
import { NotPossibleDto } from './dto/NotPossibleDto';
import { ClosedContractPartnerDto } from './dto/ClosedContractPartnerDto';

@Injectable()
export class IstaService {
  constructor(private prisma: PrismaService) {}

  //create Order with status Received
  async receivedOrder(dto: CreateCustomerOrderDTO) {
    try {
      const order = await this.prisma.order.create({
        data: {
          number: dto.number,
          remarkExternal: dto.remarkExternal,
          Received: {
            create: dto.Received?.map(received => ({
              orderstatusType: received.orderstatusType,
              setOn: received.setOn,
              CustomerContact: {
                create: received.customerContacts?.map(contact => ({
                  contactAttemptOn: contact.contactAttemptOn,
                  contactPersonCustomer: contact.contactPersonCustomer,
                  agentCP: contact.agentCP,
                  result: contact.result,
                  remark: contact.remark,
                })) ?? []
              }
            })) ?? [] 
          },
          Customer: {
            create: { 
              firstName: dto.Customer?.firstName,
              lastName: dto.Customer?.lastName,
              companyName: dto.Customer?.companyName,
              street: dto.Customer?.street,
              propertyNumber: dto.Customer?.propertyNumber,
              zipCode: dto.Customer?.zipCode,
              place: dto.Customer?.place,
              country: dto.Customer?.country,
              email: dto.Customer?.email,
              phoneNumber: dto.Customer?.phoneNumber,

             },
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
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      throw new Error("Fehler beim Speichern der Bestellung und des Kunden");
    }
  }
  

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
        // Die Annahme hier ist, dass `customer` in dto ein Array ist, und Sie möchten mehrere Kunden erstellen
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
        Customer: true,
      },
    });
    return order;
  }

  async orderReceived(dto: CreateCustomerOrderDTO) {
    const { Customer, number, remarkExternal, Received } = dto;
  
    try {
      // const customer = await this.createCustomer(dto.Customer);
      const order = await this.receivedOrder(dto);
  
      return order;
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      throw new Error("Fehler beim Speichern der Bestellung und des Kunden");
    }
  }  

  async getOrderById(orderId: number) {
    return this.prisma.order.findFirst({
      where: { id: orderId },
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
        Customer: true,
      },
    });
  }

  async updateOrder(orderId: number, dto: OrderDto) {
    if (!orderId) {
      throw new Error('orderId is required.');
    }

    if (!dto) {
      throw new Error('dto is required.');
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
          create: {
            firstName: dto.customer?.firstName,
            lastName: dto.customer?.lastName,
            companyName: dto.customer?.name,
            street: dto.customer?.street,
            // propertyNumber: dto.customer?.propertyNumber,
            zipCode: dto.customer?.zipCode,
            place: dto.customer?.place,
            country: dto.customer?.country,
            email: dto.customer?.email,
            phoneNumber: dto.customer?.phoneNumber,
            // ... andere Felder entsprechend der CustomerDTO-Definition
          },
        },
      },
      include: {
        status: true,
        Received: {
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
        Customer: true,
      },
    });

    return order;
  }

  async createCustomer(dto: CustomerDTO) {
    const customer = await this.prisma.customer.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber, // hinzugefügt
        street: dto.street, // hinzugefügt
        zipCode: dto.zipCode, // hinzugefügt
        place: dto.place, // hinzugefügt
        email: dto.email, // hinzugefügt
        country: dto.country, // hinzugefügt
        fax: dto.fax, // hinzugefügt
        companyName: dto.companyName, // hinzugefügt
        propertyNumber: dto.propertyNumber, // hinzugefügt
        // ... andere Felder entsprechend der CustomerDTO-Definition
      },
    });
    return customer;
  }

  async getCustomerById(customerId: number) {
    return this.prisma.customer.findFirst({
      where: { id: customerId },
    });
  }

  async orderRejected(orderId: number, requestId: number, dto: RejectedDto) {
    await this.prisma.rejected.create({
      data: {
        // Andere Felder wie reason, setOn, etc.
        reason: dto.reason,
        setOn: dto.setOn,
        statusType: dto.statusType,
        // Verbindet den Rejected-Eintrag mit einem Order-Eintrag
        Order: {
          connect: {
            id: orderId,
          },
        },
        // Verbindet den Rejected-Eintrag mit einem Request-Eintrag
        // Request: {
        //   connect: {
        //     id: requestId,
        //   },
        // },
      },
    });
  }

  async orderPostponed(orderId: number, requestId: number | null, dto: PostponedDto): Promise<Postponed | null> {
    try {
      console.log("orderPostponed: ", dto);
      console.log("orderID: ", orderId);
      console.log("requestID: ", requestId);  // Log the requestId to debug
  
      const postponedEntry = await this.prisma.postponed.create({
        data: {
          statusType: dto.statusType,
          setOn: dto.setOn,
          nextContactAttemptOn: dto.nextContactAttemptOn,
          postponedReason: dto.postponedReason,
          Order: {
            connect: {
              id: orderId,
            },
          },
          Request: requestId ? {
            connect: {
              id: requestId,
            },
          } : undefined,
        },
      });
      
      return postponedEntry;
    } catch (error) {
      console.error('Error creating postponed entry:', error);
      return null;
    }
  }

  async orderCancelled(orderId: number, requestId: number | null, dto: CancelledDto): Promise<Cancelled | null> {
    try {
      console.log("orderCancelled: ", dto);
      console.log("orderID: ", orderId);
      console.log("requestID: ", requestId);  // Log the requestId to debug
  
      const cancelledEntry = await this.prisma.cancelled.create({
        data: {
          statusType: dto.statusType,
          setOn: dto.setOn,
          cancellationReason: dto.cancellationReason,
          Order: {
            connect: {
              id: orderId,
            },
          },
          Request: requestId ? {
            connect: {
              id: requestId,
            },
          } : undefined,
          // Wenn Sie auch Contact-Daten haben, fügen Sie diese hier hinzu
        },
      });
      return cancelledEntry;
    } catch (error) {
      console.error('Error creating cancelled entry:', error);
      return null;
    }
  }

  async orderPlanned(orderId: number, requestId: number | null, dto: PlannedDto): Promise<Planned | null> {
    try {
      console.log("orderPlanned: ", dto);
      console.log("orderID: ", orderId);
      console.log("requestID: ", requestId);  // Log the requestId to debug
  
      const plannedEntry = await this.prisma.planned.create({
        data: {
          orderstatusType: dto.orderstatusType, // Optional, gemäß Ihrem Schema
          setOn: dto.setOn, // Optional, gemäß Ihrem Schema
          detailedScheduleDate: dto.detailedScheduleDate, // Optional, gemäß Ihrem Schema
          detailedScheduleTimeFrom: dto.detailedScheduleTimeFrom, // Optional, gemäß Ihrem Schema
          detailedScheduleTimeTo: dto.detailedScheduleTimeTo, // Optional, gemäß Ihrem Schema
          detailedScheduleDelayReason: dto.detailedScheduleDelayReason, // Optional, gemäß Ihrem Schema
          Order: { // Verbindung zur Order-Entität durch die orderId
            connect: {
              id: orderId,
            },
          },
          Request: requestId ? { // Verbindung zur Request-Entität, falls requestId vorhanden ist
            connect: {
              id: requestId,
            },
          } : undefined,
          // Falls notwendig, fügen Sie hier die Logik hinzu, um CustomerContacts zu verbinden
        },
      });
      
      return plannedEntry;
    } catch (error) {
      console.error('Error creating planned entry:', error);
      return null;
    }
  }

  async orderNotPossible(orderId: number, requestId: number | null, dto: NotPossibleDto): Promise<NotPossible | null> {
    try {
      console.log("createNotPossibleEntry: ", dto);
      console.log("orderID: ", orderId);
      console.log("requestID: ", requestId); // Log the requestId to debug
  
      const notPossibleEntry = await this.prisma.notPossible.create({
        data: {
          statusType: dto.statusType, // Optional, gemäß Ihrem Schema
          setOn: dto.setOn, // Optional, gemäß Ihrem Schema
          Contact: {
            // Hier können Sie Logik zum Verbinden von Kontakten hinzufügen, wenn notwendig
          },
          Order: { // Verbindung zur Order-Entität durch die orderId
            connect: {
              id: orderId,
            },
          },
          Request: requestId ? { // Verbindung zur Request-Entität, falls requestId vorhanden ist
            connect: {
              id: requestId,
            },
          } : undefined,
        },
      });
  
      return notPossibleEntry;
    } catch (error) {
      console.error('Error creating not possible entry:', error);
      return null;
    }
  }

  async orderClosedContractPartner(orderId: number | null, dto: ClosedContractPartnerDto): Promise<ClosedContractPartner | null> {
    try {  
      const closedContractPartnerEntry = await this.prisma.closedContractPartner.create({
        data: {
          orderstatusType: dto.orderstatusType,
          setOn: dto.setOn,
          deficiencyDescription: dto.deficiencyDescription,
          registrationHealthAuthoritiesOn: dto.registrationHealthAuthoritiesOn,
          extraordinaryExpenditureReason: dto.extraordinaryExpenditureReason,
          order: orderId ? {
            connect: {
              id: orderId,
            },
          } : undefined,
          // Für die nachfolgenden Beziehungen könnten Sie zusätzliche Logik hinzufügen, um sie je nach den in dto übergebenen Daten zu verbinden oder zu erstellen
          Contact: {
            // ... (Logik zum Verbinden oder Erstellen von Kontakten)
          },
          recordedSystem: {
            // ... (Logik zum Verbinden oder Erstellen von recordedSystem Einträgen)
          },
          ReportOrderStatusRequest: {
            // ... (Logik zum Verbinden oder Erstellen von ReportOrderStatusRequest Einträgen)
          },
          suppliedDocuments: {
            // ... (Logik zum Verbinden oder Erstellen von suppliedDocuments Einträgen)
          },
          CustomerContact: {
            // ... (Logik zum Verbinden oder Erstellen von CustomerContact Einträgen)
          },
        },
      });
  
      return closedContractPartnerEntry;
    } catch (error) {
      console.error('Error creating closed contract partner entry:', error);
      return null;
    }
  }

  //Received
  async updateOrderReceived(orderId:number | null, dto: ReceivedDto): Promise<Order | null> {
    try {
      console.log("createReceivedEntry: ", dto);
      console.log("orderID: ", orderId); // Log the orderId to debug
  
      const receivedEntry = await this.prisma.received.create({
        data: {
          orderstatusType: dto.orderstatusType, // Optional, gemäß Ihrem Schema
          setOn: dto.setOn, // Optional, gemäß Ihrem Schema
          CustomerContact: {
            create: dto.customerContacts?.map(contact => ({
              contactAttemptOn: contact.contactAttemptOn,
              contactPersonCustomer: contact.contactPersonCustomer,
              agentCP: contact.agentCP,
              result: contact.result,
              remark: contact.remark,
            })) ?? []
          },
          Order: orderId ? { // Verbindung zur Order-Entität durch die orderId
            connect: {
              id: orderId,
            },
          } : undefined,
          // Falls notwendig, fügen Sie hier die Logik hinzu, um CustomerContacts zu verbinden
        },
      });
  
      // Find and return the updated Order entity
      if (orderId) {
        const updatedOrder = await this.prisma.order.findUnique({
          where: { id: orderId },
          include: { Received: true } // Include the Received entities related to the Order
        });
        return updatedOrder;
      }
    } catch (error) {
      console.error('Error creating received entry:', error);
      return null;
    }
  }
  
}