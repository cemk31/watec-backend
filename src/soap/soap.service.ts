import { Inject, Injectable } from '@nestjs/common';
import { CustomerContact, Order, Prisma, Status, User } from '@prisma/client';
import axios from 'axios';
import { Client } from 'nestjs-soap';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as xml2js from 'xml2js';
import { parseStringPromise } from 'xml2js';
import {
  AddressInput,
  BuildingInput,
  ContactPersonInput,
} from './interfaces/interface';

@Injectable()
export class SoapService {
  public user!: User;

  constructor(
    @Inject('MY_SOAP_CLIENT') private readonly client: Client,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  private soapUrl =
    'http://10.49.139.248:18080/dws_webservices/InstallationServiceImpl';

  async polling(soapResponse: string) {
    try {
      const parsedData = await parseStringPromise(soapResponse, {
        explicitArray: false,
      });

      const orders =
        parsedData?.['soap:Envelope']?.['soap:Body']?.[
          'ns3:pollInstallationOrdersResponse'
        ]?.orders;

      if (!orders) {
        throw new Error('No orders found in the response');
      }

      const ordersArray = Array.isArray(orders.order)
        ? orders.order
        : [orders.order];

      for (const order of ordersArray) {
        try {
          // Überprüfe, ob die relevanten Daten vorhanden sind
          if (!order) {
            console.error('Order is undefined or null:', order);
            continue;
          }

          const customer = order?.customer;
          if (!customer) {
            console.error('Customer data is missing in order:', order);
            continue;
          }

          const contactPerson = customer?.contactPerson;
          const drinkingWaterFacility = order?.drinkingWaterFacility;
          const property = order?.property;

          console.log('Processing order number:', order?.number);
          console.log('Customer:', customer);
          console.log('Property:', property);
          console.log('DrinkingWaterFacility:', drinkingWaterFacility);

          // Bereite die Daten für Prisma vor
          const orderData: any = {
            orderNumberIsta: parseInt(customer.number, 10),
            serviceType: order?.serviceType || null,
            executionFlag: order?.executionFlag === 'true',
            releasedOn: order?.releasedOn ? new Date(order.releasedOn) : null,
          };

          // Customer-Daten hinzufügen, wenn vorhanden
          let customerId = null;
          if (customer) {
            const createdCustomer = await this.prisma.customer.create({
              data: {
                istaId: parseInt(customer.number, 10),
                name1: customer.name1 || null,
                name2: customer.name2 || null,
                street: customer.street || null,
                city: customer.city || null,
                postcode: customer.postcode || null,
                country: customer.country || null,
                telephone: customer.telephone || null,
                contactPerson: contactPerson
                  ? {
                      create: {
                        salutation: contactPerson.salutation || null,
                        name: contactPerson.name || null,
                        forename: contactPerson.forename || null,
                        telephone: contactPerson.telephone || null,
                        telephoneMobile: contactPerson.telephoneMobile || null,
                        role: contactPerson.role || null,
                      },
                    }
                  : undefined,
              },
            });
            customerId = createdCustomer.id;
          }

          // Property-Daten hinzufügen, wenn vorhanden
          let propertyId = null;
          if (property) {
            const createdProperty = await this.prisma.property.create({
              data: {
                number: parseInt(property.number, 10) || null,
                id_HealthAuthorities:
                  parseInt(property.id_HealthAuthorities, 10) || null,
                contactPerson: property.contactPerson
                  ? {
                      create: {
                        salutation: property.contactPerson.salutation || null,
                        name: property.contactPerson.name || null,
                        forename: property.contactPerson.forename || null,
                        telephone: property.contactPerson.telephone || null,
                        telephoneMobile:
                          property.contactPerson.telephoneMobile || null,
                        role: property.contactPerson.role || null,
                      },
                    }
                  : undefined,
                address: property.address
                  ? {
                      create: {
                        street: property.address.street || null,
                        streetnumber: property.address.streetnumber || null,
                        city: property.address.city || null,
                        postcode: property.address.postcode || null,
                        country: property.address.country || null,
                      },
                    }
                  : undefined,
                userAddresses: Array.isArray(property.userAddresses)
                  ? {
                      create: property.userAddresses.map((address) => ({
                        street: address.street || null,
                        streetnumber: address.streetnumber || null,
                        city: address.city || null,
                        postcode: address.postcode || null,
                        country: address.country || null,
                      })),
                    }
                  : undefined,
                building: Array.isArray(property.building?.building)
                  ? {
                      create: property.building.building.map((building) => ({
                        address: {
                          create: {
                            street: building.address?.street || null,
                            streetnumber:
                              building.address?.streetnumber || null,
                            city: building.address?.city || null,
                            postcode: building.address?.postcode || null,
                            country: building.address?.country || null,
                          },
                        },
                      })),
                    }
                  : undefined,
              },
            });
            propertyId = createdProperty.id;
          }

          // DrinkingWaterFacility-Daten hinzufügen, wenn vorhanden
          let drinkingWaterFacilityId = null;
          if (drinkingWaterFacility) {
            const createdDrinkingWaterFacility =
              await this.prisma.drinkingWaterFacility.create({
                data: {
                  consecutiveNumber:
                    parseInt(drinkingWaterFacility.consecutiveNumber, 10) ||
                    null,
                  usageType: drinkingWaterFacility.usageType || null,
                  usageTypeOthers:
                    drinkingWaterFacility.usageTypeOthers || null,
                  numberSuppliedUnits:
                    parseInt(drinkingWaterFacility.numberSuppliedUnits, 10) ||
                    null,
                  numberDrinkingWaterHeater:
                    parseInt(
                      drinkingWaterFacility.numberDrinkingWaterHeater,
                      10,
                    ) || null,
                  totalVolumeLitres:
                    parseFloat(drinkingWaterFacility.totalVolumeLitres) || null,
                  pipingSystemType_Circulation:
                    drinkingWaterFacility.pipingSystemType_Circulation ===
                    'true',
                  pipingSystemType_Waterbranchline:
                    drinkingWaterFacility.pipingSystemType_Waterbranchline ===
                    'true',
                  pipingSystemType_Pipetraceheater:
                    drinkingWaterFacility.pipingSystemType_Pipetraceheater ===
                    'true',
                  pipingVolumeGr3Litres:
                    drinkingWaterFacility.pipingVolumeGr3Litres === 'true',
                  deadPipeKnown: drinkingWaterFacility.deadPipeKnown === 'true',
                  numberAscendingPipes:
                    parseInt(drinkingWaterFacility.numberAscendingPipes, 10) ||
                    null,
                  aerosolformation:
                    drinkingWaterFacility.aerosolformation === 'true',
                  explanation: drinkingWaterFacility.explanation || null,
                  numberSuppliedPersons:
                    parseInt(drinkingWaterFacility.numberSuppliedPersons, 10) ||
                    null,
                  pipeworkSchematicsAvailable:
                    drinkingWaterFacility.pipeworkSchematicsAvailable ===
                    'true',
                  numberColdWaterLegs:
                    parseInt(drinkingWaterFacility.numberColdWaterLegs, 10) ||
                    null,
                  numberHotWaterLegs:
                    parseInt(drinkingWaterFacility.numberHotWaterLegs, 10) ||
                    null,
                  temperatureCirculationDWH_A:
                    parseFloat(
                      drinkingWaterFacility.temperatureCirculationDWH_A,
                    ) || null,
                  temperatureCirculationDWH_B:
                    parseFloat(
                      drinkingWaterFacility.temperatureCirculationDWH_B,
                    ) || null,
                  heatExchangerSystem_central:
                    drinkingWaterFacility.heatExchangerSystem_central ===
                    'true',
                  heatExchangerSystem_districtheating:
                    drinkingWaterFacility.heatExchangerSystem_districtheating ===
                    'true',
                  heatExchangerSystem_continuousflowprinciple:
                    drinkingWaterFacility.heatExchangerSystem_continuousflowprinciple ===
                    'true',
                  // Add any other required fields here...
                },
              });
            drinkingWaterFacilityId = createdDrinkingWaterFacility.id;

            // Check if the facility was created and set its ID
            if (createdDrinkingWaterFacility) {
              drinkingWaterFacilityId = createdDrinkingWaterFacility.id;
              console.log(
                'Created DrinkingWaterFacility ID:',
                drinkingWaterFacilityId,
              );
            } else {
              console.error('Failed to create DrinkingWaterFacility');
              return; // Exit if the facility creation fails
            }
          }
          // Step 2: Create DrinkingWaterHeaters if they exist
          if (drinkingWaterFacility.drinkingWaterHeaters?.drinkingWaterHeater) {
            const heatersArray = Array.isArray(
              drinkingWaterFacility.drinkingWaterHeaters.drinkingWaterHeater,
            )
              ? drinkingWaterFacility.drinkingWaterHeaters.drinkingWaterHeater
              : [
                  drinkingWaterFacility.drinkingWaterHeaters
                    .drinkingWaterHeater,
                ];

            for (const heater of heatersArray) {
              // Ensure each heater has the required data
              const createdHeater =
                await this.prisma.drinkingWaterHeater.create({
                  data: {
                    consecutiveNumber:
                      parseInt(heater.consecutiveNumber, 10) || null,
                    inletTemperatureDisplayPresent:
                      heater.inletTemperatureDisplayPresent === 'true',
                    inletTemperature: heater.inletTemperature
                      ? parseFloat(heater.inletTemperature)
                      : null,
                    outletTemperatureDisplayPresent:
                      heater.outletTemperatureDisplayPresent === 'true',
                    outletTemperature: heater.outletTemperature
                      ? parseFloat(heater.outletTemperature)
                      : null,
                    pipeDiameterOutlet: heater.pipeDiameterOutlet || null,
                    pipeMaterialtypeOutlet:
                      heater.pipeMaterialtypeOutlet || null,
                    volumeLitre: heater.volumeLitre
                      ? parseInt(heater.volumeLitre, 10)
                      : null,
                    roomType: heater.roomType || null,
                    roomPosition: heater.roomPosition
                      ? parseInt(heater.roomPosition, 10)
                      : null,
                    positionDetail: heater.positionDetail || null,
                    drinkingWaterFacilityId: drinkingWaterFacilityId,

                    // Step 3: Include Unit creation within DrinkingWaterHeater if provided
                    unit: heater.unit
                      ? {
                          create: {
                            floor: heater.unit.floor
                              ? parseInt(heater.unit.floor, 10) // Convert floor to integer
                              : null,
                            storey: heater.unit.storey || null,
                            position: heater.unit.position
                              ? parseInt(heater.unit.position, 10) // Convert position to integer
                              : null,
                            userName: heater.unit.userName || null,
                            generalUnit: heater.unit.generalUnit === 'true',
                            building: heater.unit.building
                              ? {
                                  create: {
                                    address: {
                                      create: {
                                        street:
                                          heater.unit.building.address
                                            ?.street || null,
                                        streetnumber:
                                          heater.unit.building.address
                                            ?.streetnumber || null,
                                        city:
                                          heater.unit.building.address?.city ||
                                          null,
                                        postcode:
                                          heater.unit.building.address
                                            ?.postcode || null,
                                        country:
                                          heater.unit.building.address
                                            ?.country || null,
                                      },
                                    },
                                  },
                                }
                              : undefined,
                          },
                        }
                      : undefined,
                  },
                });

              // Log the created heater for debugging
              console.log(
                'Created DrinkingWaterHeater with Unit:',
                createdHeater,
              );
            }
          }

          // Create Order
          await this.prisma.order.create({
            data: {
              orderNumberIsta: parseInt(order.number, 10),
              customerId: customerId,
              propertyId: propertyId,
              drinkingWaterFacilityId: drinkingWaterFacilityId,
            },
          });

          console.log('Successfully processed order:', order?.number);
        } catch (orderError) {
          console.error(
            `Fehler beim Verarbeiten der Bestellung ${order?.number}:`,
            orderError,
          );
        }
      }

      console.log('Alle Bestellungen erfolgreich verarbeitet.');
    } catch (error) {
      console.error('Fehler beim Verarbeiten der SOAP-Antwort:', error);
      throw new Error('Fehler beim Verarbeiten der Bestellung');
    }
  }

  // Hilfsfunktion für Address
  private createAddress(
    data: AddressInput,
  ): Prisma.AddressCreateWithoutBuildingInput {
    return {
      street: data.street,
      streetnumber: data.streetnumber,
      postcode: data.postcode,
      city: data.city,
      country: data.country,
    };
  }
  // Hilfsfunktion für Building
  private createBuilding(
    data: BuildingInput,
  ): Prisma.BuildingCreateWithoutUnitInput {
    return {
      address: {
        create: this.createAddress(data.address),
      },
    };
  }

  // Hilfsfunktion für Unit
  // private createUnit(data: UnitInput): Prisma.UnitCreateWithoutDrinkingWaterHeaterInput & Prisma.UnitCreateWithoutSamplingPointInput {
  //   return {
  //     floor: data.floor,
  //     storey: data.storey,
  //     position: data.position,
  //     generalUnit: data.generalUnit,
  //     userName: data.userName,
  //     building: {
  //       create: this.createBuilding(data.building),
  //     },
  //   };
  // }

  // Hilfsfunktion für ContactPerson
  private createContactPerson(
    data: ContactPersonInput,
  ): Prisma.ContactPersonCreateWithoutCustomerInput &
    Prisma.ContactPersonCreateWithoutPropertyInput {
    return {
      salutation: data.salutation,
      name: data.name,
      forename: data.forename,
      telephone: data.telephone,
      telephoneMobile: data.telephoneMobile,
      role: data.role,
    };
    console.log('test');
  }

  // Hilfsfunktion für DrinkingWaterHeater
  // private createDrinkingWaterHeater(data: DrinkingWaterHeaterInput): Prisma.DrinkingWaterHeaterCreateWithoutDrinkingWaterFacilityInput {
  //   return {
  //     consecutiveNumber: data.consecutiveNumber,
  //     inletTemperatureDisplayPresent: data.inletTemperatureDisplayPresent,
  //     inletTemperature: data.inletTemperature,
  //     outletTemperatureDisplayPresent: data.outletTemperatureDisplayPresent,
  //     outletTemperature: data.outletTemperature,
  //     pipeDiameterOutlet: data.pipeDiameterOutlet,
  //     pipeMaterialtypeOutlet: data.pipeMaterialtypeOutlet,
  //     volumeLitre: data.volumeLitre,
  //     roomType: data.roomType,
  //     roomPosition: data.roomPosition,
  //     unit: {
  //       create: this.createUnit(data.unit),
  //     },
  //   };
  // }

  // Hilfsfunktion für SamplingPoint
  // private createSamplingPoint(data: SamplingPointInput): Prisma.SamplingPointCreateWithoutDrinkingWaterFacilityInput {
  //   return {
  //     consecutiveNumber: data.consecutiveNumber,
  //     id_healthAuthorities: data.id_healthAuthorities,
  //     pipingSystemType: data.pipingSystemType,
  //     remoteSamplingPoint: data.remoteSamplingPoint,
  //     roomType: data.roomType,
  //     roomPosition: data.roomPosition,
  //     unit: {
  //       create: this.createUnit(data.unit),
  //     },
  //   };
  // }

  // Hilfsfunktion für AscendingPipe
  // private createAscendingPipe(data: AscendingPipeInput): Prisma.AscendingPipeCreateWithoutDrinkingWaterFacilityInput {
  //   return {
  //     // Fügen Sie hier die relevanten Felder hinzu
  //     pipeId: data.pipeId,
  //     type: data.type,
  //   };
  // }

  // Methode zum Erstellen einer DrinkingWaterFacility
  // public async createDrinkingWaterFacility(data: DrinkingWaterFacilityInput) {
  //   return await this.prisma.drinkingWaterFacility.create({
  //     data: {
  //       consecutiveNumber: data.consecutiveNumber,
  //       usageType: data.usageType,
  //       usageTypeOthers: data.usageTypeOthers,
  //       numberSuppliedUnits: data.numberSuppliedUnits,
  //       numberDrinkingWaterHeater: data.numberDrinkingWaterHeater,
  //       totalVolumeLitres: data.totalVolumeLitres,
  //       pipingSystemType_Circulation: data.pipingSystemType_Circulation,
  //       pipingSystemType_Waterbranchline: data.pipingSystemType_Waterbranchline,
  //       pipingSystemType_Pipetraceheater: data.pipingSystemType_Pipetraceheater,
  //       pipingVolumeGr3Litres: data.pipingVolumeGr3Litres,
  //       deadPipeKnown: data.deadPipeKnown,
  //       numberAscendingPipes: data.numberAscendingPipes,
  //       aerosolformation: data.aerosolformation,
  //       explanation: data.explanation,
  //       numberSuppliedPersons: data.numberSuppliedPersons,
  //       pipeworkSchematicsAvailable: data.pipeworkSchematicsAvailable,
  //       numberColdWaterLegs: data.numberColdWaterLegs,
  //       numberHotWaterLegs: data.numberHotWaterLegs,
  //       temperatureCirculationDWH_A: data.temperatureCirculationDWH_A,
  //       temperatureCirculationDWH_B: data.temperatureCirculationDWH_B,
  //       heatExchangerSystem_central: data.heatExchangerSystem_central,
  //       heatExchangerSystem_districtheating: data.heatExchangerSystem_districtheating,
  //       heatExchangerSystem_continuousflowprinciple: data.heatExchangerSystem_continuousflowprinciple,
  //       drinkingWaterHeaters: {
  //         create: data.drinkingWaterHeaters.map((heater) => this.createDrinkingWaterHeater(heater)),
  //       },
  //       samplingPoints: {
  //         create: data.samplingPoints.map((sp) => this.createSamplingPoint(sp)),
  //       },
  //       ascendingPipes: {
  //         create: data.ascendingPipes.map((pipe) => this.createAscendingPipe(pipe)),
  //       },
  //     },
  //   });
  // }

  // private async createDrinkingWaterFacility() {

  // }

  async pollingWithMockData() {
    const mockSoapResponse = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
      <pollInstallationOrdersResponse>
        <order>
          <number>40138201</number>
          <customer>
            <number>7059185</number>
            <name1>Lochnerstraße 4</name1>
          </customer>
        </order>
      </pollInstallationOrdersResponse>
    </soapenv:Body>
  </soapenv:Envelope>
`;

    try {
    } catch (error) {
      console.error('Fehler beim Verarbeiten der SOAP-Antwort:', error);
      throw new Error('Fehler beim Verarbeiten der Bestellung');
    }
  }

  // async createOrderReceived(dto: Received): Promise<any> {
  //   try {
  //     const order = await this.prisma.order.create({
  //       data: {
  //         number: dto.order.number,
  //         remarkExternal: '',
  //         actualStatus: Status.RECEIVED,
  //         Received: {
  //           create: {
  //             orderstatusType: dto.orderstatusType || '007',
  //             setOn: new Date(dto.setOn) || new Date(),
  //             customerContacts: {
  //               create: dto.customerContacts.map((contact) => ({
  //                 contactAttemptOn: new Date(contact.customerContactAttemptOn),
  //                 contactPersonCustomer: contact.contactPersonCustomer,
  //                 agentCP: contact.agentCP,
  //                 result: contact.result,
  //                 remark: contact.remark,
  //               })),
  //             },
  //           },
  //         },
  //         Customer: {
  //           create: {
  //             firstName: '',
  //             lastName: '',
  //             companyName: '',
  //             street: '',
  //             propertyNumber: 0,
  //             zipCode: '',
  //             place: '',
  //             country: '',
  //             email: '',
  //             phoneNumber: '',
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

  // async reportOrderReceived(
  //   orderNo: string,
  //   currentDateTime: string,
  // ): Promise<string> {
  //   const soapEnvelope = `
  //       <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
  //         <soapenv:Header/>
  //         <soapenv:Body>
  //           <ins:reportOrderStatusRequest>
  //             <com:environment>Development</com:environment>
  //             <com:language>DE</com:language>
  //             <com:consumer>soapUI</com:consumer>
  //             <received>
  //               <order>
  //                 <number>${orderNo}</number>
  //               </order>
  //               <orderstatusType>007</orderstatusType>
  //               <setOn>${currentDateTime}</setOn>
  //               <customerContacts>
  //                 <customerContact>
  //                   <customerContactAttemptOn>2020-09-09T16:27:05</customerContactAttemptOn>
  //                   <contactPersonCustomer>Max</contactPersonCustomer>
  //                   <agentCP>Agent a</agentCP>
  //                   <result>APNE</result>
  //                   <remark>Bemerkung von Dorothy ü ö ä ß </remark>
  //                 </customerContact>
  //                 <customerContact>
  //                   <customerContactAttemptOn>2020-09-07T07:27:05</customerContactAttemptOn>
  //                   <contactPersonCustomer>Tim</contactPersonCustomer>
  //                   <agentCP>Agent b</agentCP>
  //                   <result>KONF</result>
  //                   <remark>Bemerkung</remark>
  //                 </customerContact>
  //               </customerContacts>
  //             </received>
  //           </ins:reportOrderStatusRequest>
  //         </soapenv:Body>
  //       </soapenv:Envelope>
  //     `;

  //   const response = await axios.post(this.soapUrl, soapEnvelope, {
  //     headers: {
  //       'Content-Type': 'text/xml',
  //       SOAPAction: '',
  //     },
  //   });

  //   return response.data;
  // }

  //Planned
  async reportOrderPlanned(statusId: number, user: User) {
    try {
      const planned = await this.getPlanned(statusId);
      const customerContacts: CustomerContact[] = planned.customerContacts;
      const order = this.getOrderById(planned.orderId);
      const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
        <soapenv:Header/>
        <soapenv:Body>
          <ins:reportOrderStatusRequest>
            <com:environment>Development</com:environment>
            <com:language>DE</com:language>
            <com:consumer>soapUI</com:consumer>
            <planned>
              <order>
                <number>${(await order).number}</number>
                <remarkExternal>${(await order).remarkExternal}</remarkExternal>
              </order>
              <orderstatusType>020</orderstatusType>
              <setOn>${(await planned).setOn}</setOn>
              <customerContacts>
                ${customerContacts
                  .map(
                    (contact) => `
                <customerContact>
                  <customerContactAttemptOn>${contact.contactAttemptOn}</customerContactAttemptOn>
                  <contactPersonCustomer>${contact.contactPersonCustomer}</contactPersonCustomer>
                  <agentCP>${contact.agentCP}</agentCP>
                  <result>${contact.result}</result>
                  <remark>${contact.remark}</remark>
                </customerContact>
                `,
                  )
                  .join('')}
              </customerContacts><
            </planned>

          </ins:reportOrderStatusRequest>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
      const response = await axios.post(this.soapUrl, soapEnvelope, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });

      if (response) {
        this.prisma.sync.create({
          data: {
            Planned: {
              connect: {
                id: planned.id,
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
            statusType: Status.PLANNED,
            syncStatus:
              'erfolgreich übermittelt ' + new Date() + response.status,
          },
        });
      }
      return response.data;
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      throw new Error('Fehler beim Speichern der Bestellung und des Kunden');
    }
  }

  async getPlanned(id: number) {
    return this.prisma.planned.findFirst({
      where: {
        id: id,
      },
      include: {
        customerContacts: true,
      },
    });
  }

  async getOrderById(id: number): Promise<Order> {
    return this.prisma.order.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getCurrentUser(@GetUser() user: User) {
    return { user: user };
  }

  async xmlToJson(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
