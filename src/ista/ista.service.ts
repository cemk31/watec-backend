import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCustomerOrderDTO,
  CustomerDTO,
  ExecutionOnSiteNotPossibleDto,
  OrderDto,
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
  ExecutionOnSiteNotPossible,
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
import { IstaHelperService } from './ista.helper.service';
import * as moment from 'moment';
import { received } from './dto/ReceivedDto';

@Injectable()
export class IstaService {
  // private client: soap.Client | null = null;

  constructor(private prisma: PrismaService) {}

  //create Order with status Received
  // async receivedOrder(dto: CreateCustomerOrderDTO) {
  //   try {
  //     const order = await this.prisma.order.create({
  //       data: {
  //         number: dto.number,
  //         remarkExternal: dto.remarkExternal,
  //         actualStatus: Status.RECEIVED,
  //         Received: {
  //           create:
  //             dto.Received?.map((received) => ({
  //               orderstatusType: 'RECEIVED',
  //               setOn: received.setOn,
  //               CustomerContact: {
  //                 create:
  //                   received.customerContacts?.map((contact) => ({
  //                     contactAttemptOn: contact.contactAttemptOn,
  //                     contactPersonCustomer: contact.contactPersonCustomer,
  //                     agentCP: contact.agentCP,
  //                     result: contact.result,
  //                     remark: contact.remark,
  //                   })) ?? [],
  //               },
  //             })) ?? [],
  //         },
  //         Customer: {
  //           create: {
  //             firstName: dto.Customer?.firstName,
  //             lastName: dto.Customer?.lastName,
  //             companyName: dto.Customer?.companyName,
  //             street: dto.Customer?.street,
  //             propertyNumber: dto.Customer?.propertyNumber,
  //             zipCode: dto.Customer?.zipCode,
  //             place: dto.Customer?.place,
  //             country: dto.Customer?.country,
  //             email: dto.Customer?.email,
  //             phoneNumber: dto.Customer?.phoneNumber,
  //           },
  //         },
  //       },
  //       include: {
  //         status: true,
  //         Received: true,
  //         Planned: true,
  //         customerContacts: true,
  //         NotPossible: true,
  //         Postponed: true,
  //         Cancelled: true,
  //         Rejected: true,
  //         ClosedContractPartner: true,
  //         Customer: true,
  //       },
  //     });
  //     return order;
  //   } catch (error) {
  //     console.error('Fehler beim Speichern:', error);
  //     throw new Error('Fehler beim Speichern der Bestellung und des Kunden');
  //   }
  // }

  async receivedOrderWithCustomerId(customerId: number, dto: received) {
    console.log('customerId:', customerId);
    console.log('receivedDto:', dto);

    try {
      const order = await this.prisma.order.create({
        data: {
          actualStatus: Status.RECEIVED,
          propertyNumber: dto.propertyNumber,
          // orderNumberIsta: dto.propertyNumber.toString(),
          Customer: {
            connect: {
              id: customerId,
            },
          },
          Received: {
            create: {
              orderstatusType: dto.orderstatusType || '007',
              setOn: dto.setOn,
              // customerContacts: {
              //   create:
              //     dto.customerContacts?.customerContact.map((contact) => ({
              //       contactAttemptOn: contact.contactAttemptOn,
              //       contactPersonCustomer: contact.contactPersonCustomer,
              //       agentCP: contact.agentCP,
              //       result: contact.result,
              //       remark: contact.remark,
              //     })) ?? [],
              // },
            },
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
          ExecutionOnSiteNotPossible: true,
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
        // number: dto.number,
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
        // Planned: {
        //   create: dto.planned,
        // },
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
        customerContacts: true,
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
            customerContacts: true,
            Request: true,
          },
        },
        Planned: {
          include: {
            customerContacts: true,
            Request: true,
          },
        },
        // customerContacts: true,
        NotPossible: {
          include: {
            Contact: true,
            Request: true,
          },
        },
        Postponed: {
          include: {
            Contact: true,
            Request: true,
          },
        },
        Cancelled: {
          include: {
            Contact: true,
            Request: true,
          },
        },
        Rejected: {
          include: {
            Contact: true,
            Request: true,
          },
        },
        ClosedContractPartner: true,
        Customer: true,
      },
    });
    return order;
  }

  // async orderReceived(dto: CreateCustomerOrderDTO) {
  //   const { Customer, number, remarkExternal, Received } = dto;
  //   try {
  //     const order = await this.receivedOrder(dto);
  //     return order;
  //   } catch (error) {
  //     console.error('Fehler beim Speichern:', error);
  //     throw new Error('Fehler beim Speichern der Bestellung und des Kunden');
  //   }
  // }

  // async orderReceivedWithCustomerId(dto: Received) {}

  async getOrderById(orderId: number) {
    return this.prisma.order.findFirst({
      where: { id: orderId },
      include: {
        status: true,
        Received: {
          include: {
            customerContacts: true, // include CustomerContact related to Received
            Request: true, // include Request related to Received
          },
        },
        customerContacts: {
          include: {
            ClosedContractPartner: true,
            planned: true,
            received: true,
          },
        },
        Planned: true,
        NotPossible: true,
        Postponed: true,
        Cancelled: true,
        Rejected: true,
        ExecutionOnSiteNotPossible: true,
        ClosedContractPartner: {
          include: {
            recordedSystem: {
              include: {
                property: true,
                drinkingWaterFacility: true,
              },
            },
            suppliedDocuments: true, // include Request related to ClosedContractPartner
            ReportOrderStatusRequest: true,
            services: true, // include Service related to recordedSystem
          },
        },
        Customer: true,
        drinkingWaterFacility: true,
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
        // number: dto.number,
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
        // Planned: {
        //   create: dto.planned,
        // },
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
            customerContacts: true,
            Request: true,
          },
        },
        Planned: true,
        customerContacts: true,
        NotPossible: true,
        Postponed: true,
        Cancelled: true,
        Rejected: true,
        ExecutionOnSiteNotPossible: true,
        ClosedContractPartner: true,
        Customer: true,
      },
    });

    return order;
  }

  async createCustomer(dto: CustomerDTO) {
    console.log('CustomerDTO:', dto);
    const customer = await this.prisma.customer.create({
      data: {
        companyName: dto.companyName, // hinzugefügt
        firstName: dto.firstName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber, // hinzugefügt
        street: dto.street, // hinzugefügt
        zipCode: dto.zipCode, // hinzugefügt
        place: dto.place, // hinzugefügt
        email: dto.email, // hinzugefügt
        country: dto.country, // hinzugefügt
        fax: dto.fax, // hinzugefügt
        propertyNumber: dto.propertyNumber, // hinzugefügt
      },
    });
    return customer;
  }

  async updateCustomer(customerId: number, dto: CustomerDTO) {
    const customer = await this.prisma.customer.update({
      where: { id: customerId },
      data: {
        companyName: dto.companyName,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber,
        street: dto.street,
        zipCode: dto.zipCode,
        place: dto.place,
        email: dto.email,
        country: dto.country,
        fax: dto.fax,
        propertyNumber: dto.propertyNumber,
      },
    });
    return customer;
  }

  async getCustomerById(customerId: number) {
    return this.prisma.customer.findFirst({
      where: { id: customerId },
      include: {
        orders: true,
        contactPerson: true,
      },
    });
  }

  async orderRejected(dto: RejectedDto) {
    await this.prisma.order.update({
      where: { id: dto.orderId },
      data: {
        updatedAt: new Date(),
        actualStatus: Status.REJECTED,
        remarkExternal: dto.remarkExternal,
      },
    });
    await this.prisma.rejected.create({
      data: {
        rejectionReason: dto.rejectionReason,
        rejectionReasonText: dto.rejectionReasonText,
        setOn: dto.setOn,
        statusType: dto.statusType,
        // Verbindet den Rejected-Eintrag mit einem Order-Eintrag
        Order: {
          connect: {
            id: dto.orderId,
          },
        },
      },
    });
  }

  async orderPostponed(dto: PostponedDto): Promise<Postponed | null> {
    try {
      // Aktualisieren des updatedAt Feldes der Order
      await this.prisma.order.update({
        where: { id: dto.orderId },
        data: {
          updatedAt: new Date(),
          actualStatus: Status.POSTPONED,
          remarkExternal: dto.remarkExternal,
        },
      });

      const postponedEntry = await this.prisma.postponed.create({
        data: {
          statusType: Status.POSTPONED || 'POSTPONED',
          setOn: dto.setOn || new Date(), // Set new date if empty
          nextContactAttemptOn: dto.nextContactAttemptOn,
          postponedReason: dto.postponedReason,
          Order: {
            connect: { id: dto.orderId },
          },
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
        data: {
          updatedAt: new Date(),
          actualStatus: Status.CANCELLED,
          remarkExternal: dto.remarkExternal,
        },
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
  async orderReceived(
    orderId: number,
    requestId: number | null,
    dto: received,
  ): Promise<Received | null> {
    try {
      // Update der Bestellung mit dem Status "RECEIVED"
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          updatedAt: new Date(),
          actualStatus: Status.RECEIVED,
          remarkExternal: dto.remark,
        },
      });
    } catch (error) {
      console.error('Error creating received entry:', error);
      return null;
    }
  }

  async orderPlanned(
    orderId: number,
    requestId: number | null,
    dto: PlannedDto,
  ): Promise<Planned | null> {
    try {
      const detailedScheduleTimeFrom = dto.detailedScheduleTimeFrom + ':00';
      const detailedScheduleTimeTo = dto.detailedScheduleTimeTo + ':00';
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          updatedAt: new Date(),
          actualStatus: Status.PLANNED,
          remarkExternal: dto.remarkExternal,
        },
      });

      const plannedEntry = await this.prisma.planned.create({
        data: {
          orderstatusType: Status.PLANNED,
          setOn: dto.setOn,
          detailedScheduleDate: dto.detailedScheduleDate,
          detailedScheduleTimeFrom: detailedScheduleTimeFrom,
          detailedScheduleTimeTo: detailedScheduleTimeTo,
          detailedScheduleDelayReason: dto.detailedScheduleDelayReason,
          Order: {
            // Verbindung zur Order-Entität durch die orderId
            connect: {
              id: orderId,
            },
          },
          customerContacts: {
            create: dto.customerContacts?.map((contact) => ({
              contactAttemptOn: contact.contactAttemptOn,
              contactPersonCustomer: contact.contactPersonCustomer,
              agentCP: contact.agentCP,
              result: contact.result,
              remark: contact.remark,
            })),
          },
          Request: requestId
            ? {
                connect: {
                  id: requestId,
                },
              }
            : undefined,
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
        data: {
          updatedAt: new Date(),
          actualStatus: Status.NOTPOSSIBLE,
          remarkExternal: dto.remarkExternal,
        },
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
  async orderExecutionOnSiteNotPossible(
    orderId: number,
    dto: ExecutionOnSiteNotPossibleDto,
  ): Promise<ExecutionOnSiteNotPossible | null> {
    try {
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          updatedAt: new Date(),
          actualStatus: Status.EXECUTIONONSITENOTPOSSIBLE,
          remarkExternal: dto.remarkExternal,
        },
      });

      const executionEntry =
        await this.prisma.executionOnSiteNotPossible.create({
          data: {
            orderstatusType: Status.EXECUTIONONSITENOTPOSSIBLE,
            setOn: dto.setOn,
            nonExecutionReason: dto.nonExecutionReason,
            Order: {
              connect: {
                id: orderId,
              },
            },
            customerContacts: {
              create: dto.customerContacts?.map((contact) => ({
                contactAttemptOn: contact.contactAttemptOn,
                contactPersonCustomer: contact.contactPersonCustomer,
                agentCP: contact.agentCP,
                result: contact.result,
                remark: contact.remark,
              })),
            },
          },
        });

      return executionEntry;
    } catch (error) {
      console.error(
        'Error creating execution on site not possible entry:',
        error,
      );
      return null;
    }
  }

  async orderClosedContractPartner(
    orderId: number | null,
    dto: ClosedContractPartnerDto,
  ): Promise<ClosedContractPartner | null> {
    try {
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          updatedAt: new Date(),
          actualStatus: Status.CLOSEDCONTRACTPARTNER,
        },
      });

      const closedContractPartnerEntry =
        await this.prisma.closedContractPartner.create({
          data: {
            order: {
              connect: {
                id: orderId,
              },
            },
            orderstatusType: dto?.orderstatusType || null,
            setOn: dto?.setOn || new Date(),
            deficiencyDescription: dto?.deficiencyDescription || null,
            registrationHealthAuthoritiesOn:
              dto?.registrationHealthAuthoritiesOn || new Date(),
            extraordinaryExpenditureReason:
              dto?.extraordinaryExpenditureReason || null,
            customerContacts: {
              create:
                dto.customerContacts?.map((contact) => ({
                  contactAttemptOn: contact?.contactAttemptOn || new Date(),
                  contactPersonCustomer: contact?.contactPersonCustomer || null,
                  agentCP: contact?.agentCP || null,
                  result: contact?.result || null,
                  remark: contact?.remark || null,
                })) ?? [],
            },
            recordedSystem: {
              create: dto.recordedSystem?.map((rs) => ({
                drinkingWaterFacility: {
                  create: rs.drinkingWaterFacility?.map((dwf) => ({
                    consecutiveNumber: dwf?.consecutiveNumber || null,
                    usageType: dwf?.usageType || null,
                    usageTypeOthers: dwf?.usageTypeOthers || null,
                    numberSuppliedUnits: dwf?.numberSuppliedUnits || null,
                    numberDrinkingWaterHeater:
                      dwf?.numberDrinkingWaterHeater || null,
                    totalVolumeLitres: dwf?.totalVolumeLitres || null,
                    pipingSystemType_Circulation:
                      dwf?.pipingSystemType_Circulation || null,
                    pipingSystemType_Waterbranchline:
                      dwf?.pipingSystemType_Waterbranchline || null,
                    pipingSystemType_Pipetraceheater:
                      dwf?.pipingSystemType_Pipetraceheater || null,
                    pipingVolumeGr3Litres: dwf?.pipingVolumeGr3Litres,
                    deadPipeKnown: dwf?.deadPipeKnown || null,
                    deadPipesPosition: dwf?.deadPipesPosition || null,
                    numberAscendingPipes: dwf?.numberAscendingPipes || null,
                    explanation: dwf?.explanation || null,
                    numberSuppliedPersons: dwf?.numberSuppliedPersons || null,
                    aerosolformation: dwf?.aerosolformation || null,
                    pipeworkSchematicsAvailable:
                      dwf?.pipeworkSchematicsAvailable || null,
                    numberColdWaterLegs: dwf?.numberColdWaterLegs || null,
                    numberHotWaterLegs: dwf?.numberHotWaterLegs || null,
                    temperatureCirculationDWH_A:
                      dwf?.temperatureCirculationDWH_A || null,
                    temperatureCirculationDWH_B:
                      dwf?.temperatureCirculationDWH_B || null,
                    heatExchangerSystem_central:
                      dwf?.heatExchangerSystem_central || null,
                    heatExchangerSystem_districtheating:
                      dwf?.heatExchangerSystem_districtheating || null,
                    heatExchangerSystem_continuousflowprinciple:
                      dwf?.heatExchangerSystem_continuousflowprinciple || null,
                    samplingPoints: {
                      create: dwf?.samplingPoints?.map((sp) => ({
                        consecutiveNumber: sp?.consecutiveNumber || null,
                        installationNumber: sp?.installationNumber || null,
                        numberObjectInstallationLocation:
                          sp?.numberObjectInstallationLocation || null,
                        pipingSystemType: sp?.pipingSystemType || null,
                        remoteSamplingPoint: sp?.remoteSamplingPoint || null,
                        roomType: sp?.roomType || null,
                        roomPosition: sp?.roomPosition || null,
                        positionDetail: sp?.positionDetail || null,
                      })) ?? [SamplingPointDto],
                    },
                    ascendingPipes: {
                      create: dwf?.ascendingPipes?.map((ap) => ({
                        consecutiveNumber: ap?.consecutiveNumber || null,
                        ascendingPipeTemperatureDisplayPresent:
                          ap?.ascendingPipeTemperatureDisplayPresent || null,
                        flowTemperature: ap?.flowTemperature || null,
                        circulationTemperatureDisplayPresent:
                          ap?.circulationTemperatureDisplayPresent || null,
                        circulationTemperature:
                          ap?.circulationTemperature || null,
                        pipeDiameter: ap?.pipeDiameter || null,
                        pipeMaterialtype: ap?.pipeMaterialtype || null,
                      })) ?? [AscendingPipeDto],
                    },
                    drinkingWaterHeaters: {
                      create: dwf?.drinkingWaterHeaters?.map((dwh) => ({
                        consecutiveNumber: dwh?.consecutiveNumber || null,
                        inletTemperatureDisplayPresent:
                          dwh?.inletTemperatureDisplayPresent || null,
                        inletTemperature: dwh?.inletTemperature || null,
                        outletTemperatureDisplayPresent:
                          dwh?.outletTemperatureDisplayPresent || null,
                        outletTemperature: dwh?.outletTemperature || null,
                        pipeDiameterOutlet: dwh?.pipeDiameterOutlet || null,
                        pipeMaterialtypeOutlet:
                          dwh?.pipeMaterialtypeOutlet || null,
                        volumeLitre: dwh?.volumeLitre || null,
                        roomType: dwh?.roomType || null,
                        roomPosition: dwh?.roomPosition || null,
                        positionDetail: dwh?.positionDetail || null,
                        unit: {
                          create: dwh?.unit ?? undefined,
                          // create:{
                          //   floor: dwh?.unit?.floor,
                          //   storey: dwh?.unit?.storey,
                          //   position: dwh?.unit?.position,
                          //   userName: dwh?.unit?.userName,
                          //   generalUnit: dwh?.unit?.generalUnit,
                          //   buildingId: dwh?.unit?.buildingId,
                          // },
                        },
                      })),
                    },
                  })) ?? [DrinkingWaterFacilityDto],
                },
                property: {
                  create: {
                    hotwatersupplyType_central:
                      rs?.property?.hotwatersupplyType_central || false,
                    hotwatersupplyType_decentral:
                      rs?.property?.hotwatersupplyType_decentral || false,
                  },
                },
              })) ?? [undefined],
            },
            services: {
              create:
                dto.services?.map((service) => ({
                  articleNumber_ista: service.articleNumber_ista || null,
                  quantity: service.quantity || null,
                  unit: service.unit || null,
                  extraordinaryExpenditure:
                    service.extraordinaryExpenditure || null,
                  purchasePrice_ista: service.purchasePrice_ista || null,
                  warranty: service.warranty || null,
                  serviceRenderedIn: {
                    create: {
                      street: service.serviceRenderedIn.street || null,
                      zipCode: service.serviceRenderedIn.postcode || null,
                      place: service.serviceRenderedIn.city || null,
                      country: service.serviceRenderedIn.country || null,
                    }
                      ? service.serviceRenderedIn
                      : null,
                  },
                })) ?? [],
            },
          },
        });
      return closedContractPartnerEntry;
    } catch (error) {
      console.error('Error creating closed contract partner entry:', error);
      return null;
    }
  }

  async updateOrderToReceived(orderId: number, dto: received): Promise<void> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // Update the main order status to RECEIVED
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          actualStatus: Status.RECEIVED,
          updatedAt: new Date(),
          remarkExternal: dto.remark,
        },
      });

      // Upsert the Received entry with nested writes for CustomerContacts
      await this.prisma.received.upsert({
        where: { id: dto.id || 0 },
        update: {
          orderstatusType: Status.RECEIVED,
          setOn: dto.setOn ?? new Date(),
          customerContacts: {
            create: dto.customerContacts?.map((contact) => ({
              contactAttemptOn: contact.contactAttemptOn,
              contactPersonCustomer: contact.contactPersonCustomer,
              agentCP: contact.agentCP,
              result: contact.result,
              remark: contact.remark,
            })),
          },
        },
        create: {
          orderId: orderId,
          orderstatusType: Status.RECEIVED,
          setOn: dto.setOn ?? new Date(),
          customerContacts: {
            create: dto.customerContacts?.map((contact) => ({
              contactAttemptOn: contact.contactAttemptOn,
              contactPersonCustomer: contact.contactPersonCustomer,
              agentCP: contact.agentCP,
              result: contact.result,
              remark: contact.remark,
            })),
          },
        },
      });
    } catch (error) {
      console.error('Error updating order to RECEIVED:', error);
      throw new Error('Failed to update order status');
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
          customerContacts: true,
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

  async getStatusById(statusId: number, type: string) {
    if (type === 'received') {
      return this.prisma.received.findFirst({
        where: { id: statusId },
      });
    }
    if (type === 'planned') {
      return this.prisma.planned.findFirst({
        where: { id: statusId },
      });
    }
    if (type === 'notPossible') {
      return this.prisma.notPossible.findFirst({
        where: { id: statusId },
      });
    }
    if (type === 'postponed') {
      return this.prisma.postponed.findFirst({
        where: { id: statusId },
      });
    }
    if (type === 'cancelled') {
      return this.prisma.cancelled.findFirst({
        where: { id: statusId },
      });
    }
    if (type === 'rejected') {
      return this.prisma.rejected.findFirst({
        where: { id: statusId },
      });
    }
    if (type === 'closedContractPartner') {
      return this.prisma.closedContractPartner.findFirst({
        where: { id: statusId },
      });
    }
  }

  async synchroniseWithIsta(status: any, type: string) {
    if (type === 'received') {
    }
  }
}
