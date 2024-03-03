import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCustomerOrderDTO,
  CustomerDTO,
  OrderDto,
  ReceivedDto,
} from './dto';
import { RejectedDto } from './dto/RejectedDto';
import { PostponedDto } from './dto/PostponedDto';
import {
  Cancelled,
  ClosedContractPartner,
  NotPossible,
  Order,
  Planned,
  Postponed,
  Received,
  Status,
} from '@prisma/client';
import { CancelledDto } from './dto/CancelledDto';
import { PlannedDto } from './dto/PlannedDto';
import { NotPossibleDto } from './dto/NotPossibleDto';
import { ClosedContractPartnerDto } from './dto/ClosedContractPartnerDto';
import { ConfigService } from '@nestjs/config';
import { DrinkingWaterFacilityDto } from './dto/DrinkingWaterFacilityDto';
import { SamplingPointsDto } from './dto/SamplingPointsDto';
import { AscendingPipeDto } from './dto/AscendingPipeDto';
import { SamplingPointDto } from './dto/SamplingPointDto';
import { DrinkingWaterHeaterDto } from './dto/DrinkingWaterHeaterDto';

@Injectable()
export class IstaService {
  // private client: soap.Client | null = null;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  //create Order with status Received
  async receivedOrder(dto: CreateCustomerOrderDTO) {
    try {
      const order = await this.prisma.order.create({
        data: {
          number: dto.number,
          remarkExternal: dto.remarkExternal,
          actualStatus: Status.RECEIVED,
          Received: {
            create:
              dto.Received?.map((received) => ({
                orderstatusType: 'RECEIVED',
                setOn: received.setOn,
                CustomerContact: {
                  create:
                    received.customerContacts?.map((contact) => ({
                      contactAttemptOn: contact.contactAttemptOn,
                      contactPersonCustomer: contact.contactPersonCustomer,
                      agentCP: contact.agentCP,
                      result: contact.result,
                      remark: contact.remark,
                    })) ?? [],
                },
              })) ?? [],
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
      console.error('Fehler beim Speichern:', error);
      throw new Error('Fehler beim Speichern der Bestellung und des Kunden');
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
          create: {
            // Add the necessary properties from dto.customer
            firstName: dto.customer.firstName,
            lastName: dto.customer.lastName,
            street: dto.customer.street,
            zipCode: dto.customer.zipCode,
            place: dto.customer.place,
            country: dto.customer.country,
            email: dto.customer.email,
            phoneNumber: dto.customer.phoneNumber,
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
      console.error('Fehler beim Speichern:', error);
      throw new Error('Fehler beim Speichern der Bestellung und des Kunden');
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
        ClosedContractPartner: {
          include: {
            recordedSystem: {
              include: {
                property: true, // include Property related to recordedSystem
                drinkingWaterFacility: true, // include DrinkingWaterFacility related to recordedSystem
                services: true, // include Service related to recordedSystem
              },
            },
            suppliedDocuments: true, // include Request related to ClosedContractPartner
            ReportOrderStatusRequest: true,
          },
        },
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
      },
    });
  }

  async orderPostponed(
    orderId: number,
    requestId: number | null,
    dto: PostponedDto,
  ): Promise<Postponed | null> {
    try {
      // Aktualisieren des updatedAt Feldes der Order
      await this.prisma.order.update({
        where: { id: orderId },
        data: { updatedAt: new Date(), actualStatus: Status.POSTPONED },
      });

      const postponedEntry = await this.prisma.postponed.create({
        data: {
          statusType: Status.POSTPONED || 'POSTPONED',
          setOn: dto.setOn || new Date(), // Set new date if empty
          nextContactAttemptOn: dto.nextContactAttemptOn || new Date(),
          postponedReason: dto.postponedReason,
          Order: {
            connect: { id: orderId },
          },
          Request: requestId
            ? {
                connect: { id: requestId },
              }
            : undefined,
        },
      });

      return postponedEntry;
    } catch (error) {
      console.error('Error creating postponed entry:', error);
      return null;
    }
  }

  async orderCancelled(
    orderId: number,
    requestId: number | null,
    dto: CancelledDto,
  ): Promise<Cancelled | null> {
    try {
      console.log('orderCancelled: ', dto);
      console.log('orderID: ', orderId);
      console.log('requestID: ', requestId); // Log the requestId to debug

      await this.prisma.order.update({
        where: { id: orderId },
        data: { updatedAt: new Date(), actualStatus: Status.CANCELLED },
      });

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
          Request: requestId
            ? {
                connect: {
                  id: requestId,
                },
              }
            : undefined,
          // Wenn Sie auch Contact-Daten haben, fügen Sie diese hier hinzu
        },
      });
      return cancelledEntry;
    } catch (error) {
      console.error('Error creating cancelled entry:', error);
      return null;
    }
  }

  async orderPlanned(
    orderId: number,
    requestId: number | null,
    dto: PlannedDto,
  ): Promise<Planned | null> {
    try {
      console.log('orderPlanned: ', dto);
      console.log('orderID: ', orderId);
      console.log('requestID: ', requestId); // Log the requestId to debug

      await this.prisma.order.update({
        where: { id: orderId },
        data: { updatedAt: new Date(), actualStatus: Status.PLANNED },
      });

      const plannedEntry = await this.prisma.planned.create({
        data: {
          orderstatusType: Status.PLANNED, // Optional, gemäß Ihrem Schema
          setOn: dto.setOn, // Optional, gemäß Ihrem Schema
          detailedScheduleDate: dto.detailedScheduleDate, // Optional, gemäß Ihrem Schema
          detailedScheduleTimeFrom: dto.detailedScheduleTimeFrom, // Optional, gemäß Ihrem Schema
          detailedScheduleTimeTo: dto.detailedScheduleTimeTo, // Optional, gemäß Ihrem Schema
          detailedScheduleDelayReason: dto.detailedScheduleDelayReason, // Optional, gemäß Ihrem Schema
          Order: {
            // Verbindung zur Order-Entität durch die orderId
            connect: {
              id: orderId,
            },
          },
          Request: requestId
            ? {
                // Verbindung zur Request-Entität, falls requestId vorhanden ist
                connect: {
                  id: requestId,
                },
              }
            : undefined,
          // Falls notwendig, fügen Sie hier die Logik hinzu, um CustomerContacts zu verbinden
        },
      });

      return plannedEntry;
    } catch (error) {
      console.error('Error creating planned entry:', error);
      return null;
    }
  }

  async orderNotPossible(
    orderId: number,
    requestId: number | null,
    dto: NotPossibleDto,
  ): Promise<NotPossible | null> {
    try {
      await this.prisma.order.update({
        where: { id: orderId },
        data: { updatedAt: new Date(), actualStatus: Status.NOTPOSSIBLE },
      });

      const notPossibleEntry = await this.prisma.notPossible.create({
        data: {
          statusType: dto.statusType, // Optional, gemäß Ihrem Schema
          setOn: dto.setOn, // Optional, gemäß Ihrem Schema
          Contact: {
            // Hier können Sie Logik zum Verbinden von Kontakten hinzufügen, wenn notwendig
          },
          Order: {
            // Verbindung zur Order-Entität durch die orderId
            connect: {
              id: orderId,
            },
          },
          Request: requestId
            ? {
                // Verbindung zur Request-Entität, falls requestId vorhanden ist
                connect: {
                  id: requestId,
                },
              }
            : undefined,
        },
      });

      return notPossibleEntry;
    } catch (error) {
      console.error('Error creating not possible entry:', error);
      return null;
    }
  }

  // async CP(
  //   orderId: number | null,
  //   dto: ClosedContractPartnerDto,
  // ): Promise<ClosedContractPartner | null> {
  //   console.log('CP: ', dto);
  //   try {
  //     const CP = await this.prisma.closedContractPartner.create({
  //       data: {
  //         order: {
  //           connect: {
  //             id: orderId,
  //           },
  //         },
  //         orderstatusType: dto?.orderstatusType,
  //         setOn: dto?.setOn,
  //         deficiencyDescription: dto?.deficiencyDescription,
  //         registrationHealthAuthoritiesOn: dto?.registrationHealthAuthoritiesOn,
  //         extraordinaryExpenditureReason: dto?.extraordinaryExpenditureReason,
  //         CustomerContact: {
  //           create: dto.customerContacts,
  //         },
  //         recordedSystem: {
  //           create: dto.recordedSystem.map((system) => ({
  //             drinkingWaterFacility: system.drinkingWaterFacility,
  //           })),
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error creating closed contract partner entry:', error);
  //     return null;
  //   }
  // }

  async orderClosedContractPartner(
    orderId: number | null,
    dto: ClosedContractPartnerDto,
  ): Promise<ClosedContractPartner | null> {
    console.log('orderClosedContractPartner: ', dto);
    try {
      const closedContractPartnerEntry =
        await this.prisma.closedContractPartner.create({
          data: {
            order: {
              connect: {
                id: orderId,
              },
            },
            orderstatusType: dto?.orderstatusType,
            setOn: dto?.setOn,
            deficiencyDescription: dto?.deficiencyDescription,
            registrationHealthAuthoritiesOn:
              dto?.registrationHealthAuthoritiesOn,
            extraordinaryExpenditureReason: dto?.extraordinaryExpenditureReason,
            CustomerContact: {
              create:
                dto.customerContacts?.map((contact) => ({
                  contactAttemptOn: contact?.contactAttemptOn,
                  contactPersonCustomer: contact?.contactPersonCustomer,
                  agentCP: contact?.agentCP,
                  result: contact?.result,
                  remark: contact?.remark,
                })) ?? [],
            },
            recordedSystem: {
              create:
                dto.recordedSystem?.map((rs) => ({
                  drinkingWaterFacility: {
                    create:
                      rs.drinkingWaterFacility?.map((dwf) => ({
                        data: {
                          consecutiveNumber: dwf?.consecutiveNumber,
                          usageType: dwf?.usageType,
                          usageTypeOthers: dwf?.usageTypeOthers,
                          numberSuppliedUnits: dwf?.numberSuppliedUnits,
                          numberDrinkingWaterHeater:
                            dwf?.numberDrinkingWaterHeater,
                          totalVolumeLitres: dwf?.totalVolumeLitres,
                          pipingSystemType_Circulation:
                            dwf?.pipingSystemType_Circulation,
                          pipingSystemType_Waterbranchline:
                            dwf?.pipingSystemType_Waterbranchline,
                          pipingSystemType_Pipetraceheater:
                            dwf?.pipingSystemType_Pipetraceheater,
                          pipingVolumeGr3Litres: dwf?.pipingVolumeGr3Litres,
                          deadPipeKnown: dwf?.deadPipeKnown,
                          deadPipesPosition: dwf?.deadPipesPosition,
                          numberAscendingPipes: dwf?.numberAscendingPipes,
                          explanation: dwf?.explanation,
                          numberSuppliedPersons: dwf?.numberSuppliedPersons,
                          aerosolformation: dwf?.aerosolformation,
                          pipeworkSchematicsAvailable:
                            dwf?.pipeworkSchematicsAvailable,
                          numberColdWaterLegs: dwf?.numberColdWaterLegs,
                          numberHotWaterLegs: dwf?.numberHotWaterLegs,
                          temperatureCirculationDWH_A:
                            dwf?.temperatureCirculationDWH_A,
                          temperatureCirculationDWH_B:
                            dwf?.temperatureCirculationDWH_B,
                          heatExchangerSystem_central:
                            dwf?.heatExchangerSystem_central,
                          heatExchangerSystem_districtheating:
                            dwf?.heatExchangerSystem_districtheating,
                          heatExchangerSystem_continuousflowprinciple:
                            dwf?.heatExchangerSystem_continuousflowprinciple,
                          samplingPoints:
                            dwf?.samplingPoints?.map((sp) => ({
                              consecutiveNumber: sp?.consecutiveNumber,
                              installationNumber: sp?.installationNumber,
                              numberObjectInstallationLocation:
                                sp?.numberObjectInstallationLocation,
                              pipingSystemType: sp?.pipingSystemType,
                              remoteSamplingPoint: sp?.remoteSamplingPoint,
                              roomType: sp?.roomType,
                              roomPosition: sp?.roomPosition,
                              positionDetail: sp?.positionDetail,
                            })) ?? [ SamplingPointDto ],
                          ascendingPipes:
                            dwf?.ascendingPipes?.map((ap) => ({
                              consecutiveNumber: ap?.consecutiveNumber,
                              ascendingPipeTemperatureDisplayPresent:
                                ap?.ascendingPipeTemperatureDisplayPresent,
                              flowTemperature: ap?.flowTemperature,
                              circulationTemperatureDisplayPresent:
                                ap?.circulationTemperatureDisplayPresent,
                              circulationTemperature:
                                ap?.circulationTemperature,
                              pipeDiameter: ap?.pipeDiameter,
                              pipeMaterialtype: ap?.pipeMaterialtype,
                            })) ?? [ AscendingPipeDto ],
                          drinkingWaterHeaters:
                            dwf?.drinkingWaterHeaters?.map((dwh) => ({
                              consecutiveNumber: dwh?.consecutiveNumber,
                              inletTemperatureDisplayPresent:
                                dwh?.inletTemperatureDisplayPresent,
                              inletTemperature: dwh?.inletTemperature,
                              outletTemperatureDisplayPresent:
                                dwh?.outletTemperatureDisplayPresent,
                              outletTemperature: dwh?.outletTemperature,
                              pipeDiameterOutlet: dwh?.pipeDiameterOutlet,
                              pipeMaterialtypeOutlet:
                                dwh?.pipeMaterialtypeOutlet,
                              volumeLitre: dwh?.volumeLitre,
                              roomType: dwh?.roomType,
                              roomPosition: dwh?.roomPosition,
                              positionDetail: dwh?.positionDetail,
                              unit: {
                                create: {
                                  floor: dwh?.unit?.floor,
                                  storey: dwh?.unit?.storey,
                                  position: dwh?.unit?.position,
                                  userName: dwh?.unit?.userName,
                                  generalUnit: dwh?.unit?.generalUnit,
                                  buildingId: dwh?.unit?.buildingId,
                                },
                              },
                            })) ?? [ DrinkingWaterHeaterDto ],
                        },
                      })) ?? [ DrinkingWaterFacilityDto ],
                  },
                  property: {
                    create: {
                      hotwatersupplyType_central:
                        rs?.property?.hotwatersupplyType_central,
                      hotwatersupplyType_decentral:
                        rs?.property?.hotwatersupplyType_decentral,
                    },
                  },
                  services: {
                    create: rs?.services.map((s) => ({
                      articleNumber_ista: s?.articleNumber_ista,
                      quantity: s?.quantity,
                      unit: s?.unit,
                      extraordinaryExpenditure: s?.extraordinaryExpenditure,
                      purchasePrice_ista: s?.purchasePrice_ista,
                      warranty: s?.warranty,
                      serviceRenderedIn: {
                        create: {
                          street: s?.serviceRenderedIn?.street,
                          streetnumber: s?.serviceRenderedIn?.streetnumber,
                          postcode: s?.serviceRenderedIn?.postcode,
                          city: s?.serviceRenderedIn?.city,
                          country: s?.serviceRenderedIn?.country,
                        },
                      },
                    })),
                  },
                })) ?? [ undefined ],
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
  async updateOrderReceived(
    orderId: number | null,
    dto: ReceivedDto,
  ): Promise<Order | null> {
    try {
      const receivedEntry = await this.prisma.received.create({
        data: {
          orderstatusType: Status.RECEIVED,
          setOn: dto.setOn,
          CustomerContact: {
            create: {
              contactAttemptOn: dto?.contactAttemptOn
                ? new Date(dto?.contactAttemptOn)
                : new Date(),
              contactPersonCustomer: dto?.contactPersonCustomer,
              agentCP: dto?.agentCP,
              result: dto?.result,
              remark: dto?.remark,
            },
          },
          Order: orderId
            ? {
                // Verbindung zur Order-Entität durch die orderId
                connect: {
                  id: orderId,
                },
              }
            : undefined,
          // Falls notwendig, fügen Sie hier die Logik hinzu, um CustomerContacts zu verbinden
        },
      });

      console.log('receivedEntry: ', receivedEntry);

      // Find and return the updated Order entity
      if (orderId) {
        const updatedOrder = await this.prisma.order.findUnique({
          where: { id: orderId },
          include: {
            Received: true, // Include the Received entities related to the Order
            CustomerContacts: true, // Include the CustomerContact entities related to the Order
          },
        });
        return updatedOrder;
      }
    } catch (error) {
      console.error('Error creating received entry:', error);
      return null;
    }
  }

  async deleteOrder(orderId: number): Promise<Order | null> {
    console.log('Deleting order with id:', orderId);
    try {
      // Löschen der abhängigen Datensätze
      await this.prisma.cancelled.deleteMany({ where: { orderId } });
      await this.prisma.closedContractPartner.deleteMany({
        where: { orderId },
      });
      await this.prisma.notPossible.deleteMany({ where: { orderId } });
      await this.prisma.planned.deleteMany({ where: { orderId } });
      await this.prisma.postponed.deleteMany({ where: { orderId } });
      await this.prisma.received.deleteMany({ where: { orderId } });
      await this.prisma.rejected.deleteMany({ where: { orderId } });
      await this.prisma.orderStatus.deleteMany({ where: { orderId } });
      await this.prisma.customerContact.deleteMany({ where: { orderId } });
      // Fügen Sie hier ähnliche Löschvorgänge für andere abhängige Tabellen hinzu...

      // Löschen des Auftrags
      const deletedOrder = await this.prisma.order.delete({
        where: { id: orderId },
      });
      console.log('Deleted order:', deletedOrder);

      return deletedOrder;
    } catch (error) {
      console.error('Error deleting order:', error);
      // Hier könnten Sie einen spezifischen Fehlercode zurückgeben oder eine benutzerfreundliche Fehlermeldung
      throw new Error(
        'Order could not be deleted. Please check for related data.',
      );
    }
  }

  async doneOrder(orderId: number): Promise<Order | null> {
    try {
      console.log('Updating order with id:', orderId);
      const updatedOrder = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          actualStatus: Status.DONE,
          updatedAt: new Date(),
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
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      return null;
    }
  }

  async reportStatusToISTA(order: OrderDto) {
    // const URL = this.configService.get('ISTA_URL');
    const URL =
      'http://10.49.139.248:18080/dws_webservices/InstallationServiceImpl';
    const soap = require('soap');
  }
}
