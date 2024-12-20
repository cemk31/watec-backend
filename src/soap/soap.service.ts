import { Inject, Injectable } from '@nestjs/common';
import { CustomerContact, Order, Prisma, Status, User } from '@prisma/client';
import axios from 'axios';
// import { Client } from 'nestjs-soap';
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
import { SyncDto } from 'src/ista/dto';
import { SoapHelperService } from './soap.helper.service';

@Injectable()
export class SoapService {
  public user!: User;

  constructor(
    // @Inject('MY_SOAP_CLIENT') private readonly client: Client,
    private prisma: PrismaService,
    private userService: UserService,
    private soapHelperService: SoapHelperService,
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
                  numberAscendingPipes:
                    parseInt(drinkingWaterFacility.numberAscendingPipes, 10) ||
                    0,
                  temperatureCirculationDWH_A:
                    parseFloat(
                      drinkingWaterFacility.temperatureCirculationDWH_A,
                    ) || 0,
                  temperatureCirculationDWH_B:
                    parseFloat(
                      drinkingWaterFacility.temperatureCirculationDWH_B,
                    ) || 0,
                  heatExchangerSystem_central:
                    drinkingWaterFacility.heatExchangerSystem_central ===
                    'true',
                  heatExchangerSystem_districtheating:
                    drinkingWaterFacility.heatExchangerSystem_districtheating ===
                    'true',
                  heatExchangerSystem_continuousflowprinciple:
                    drinkingWaterFacility.heatExchangerSystem_continuousflowprinciple ===
                    'true',
                },
              });
            drinkingWaterFacilityId = createdDrinkingWaterFacility.id;

            console.log(
              'Created DrinkingWaterFacility ID:',
              drinkingWaterFacilityId,
            );

            if (
              drinkingWaterFacility.drinkingWaterHeaters?.drinkingWaterHeater
            ) {
              const heatersArray = Array.isArray(
                drinkingWaterFacility.drinkingWaterHeaters.drinkingWaterHeater,
              )
                ? drinkingWaterFacility.drinkingWaterHeaters.drinkingWaterHeater
                : [
                    drinkingWaterFacility.drinkingWaterHeaters
                      .drinkingWaterHeater,
                  ];

              for (const heater of heatersArray) {
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
                    drinkingWaterFacilityId: drinkingWaterFacilityId,
                    unit: heater.unit
                      ? {
                          create: {
                            floor: heater.unit.floor
                              ? parseInt(heater.unit.floor, 10)
                              : null,
                            storey: heater.unit.storey || null,
                            position: heater.unit.position
                              ? parseInt(heater.unit.position, 10)
                              : null,
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
              }
            }
          } else {
            console.log('No DrinkingWaterFacility provided for this order.');
          }

          // Create AscendingPipes if they exist
          if (drinkingWaterFacility?.ascendingPipes) {
            const ascendingPipesArray = Array.isArray(
              drinkingWaterFacility.ascendingPipes,
            )
              ? drinkingWaterFacility.ascendingPipes
              : [drinkingWaterFacility.ascendingPipes];

            for (const pipe of ascendingPipesArray) {
              // Ensure the pipe has required data
              const createdPipe = await this.prisma.ascendingPipe.create({
                data: {
                  consecutiveNumber: pipe.consecutiveNumber
                    ? parseInt(pipe.consecutiveNumber, 10)
                    : null,
                  ascendingPipeTemperatureDisplayPresent:
                    pipe.ascendingPipeTemperatureDisplayPresent === 'true',
                  flowTemperature: pipe.flowTemperature
                    ? parseFloat(pipe.flowTemperature)
                    : null,
                  circulationTemperatureDisplayPresent:
                    pipe.circulationTemperatureDisplayPresent === 'true',
                  circulationTemperature: pipe.circulationTemperature
                    ? parseFloat(pipe.circulationTemperature)
                    : null,
                  pipeDiameter: pipe.pipeDiameter || null,
                  pipeMaterialtype: pipe.pipeMaterialtype || null,
                  drinkingWaterFacilityId: drinkingWaterFacilityId, // Associate with created facility
                },
              });

              console.log('Created AscendingPipe:', createdPipe);
            }
          } else {
            console.log(
              'No AscendingPipes provided for this DrinkingWaterFacility.',
            );
          }

          // Create SamplingPoints if they exist
          if (drinkingWaterFacility?.samplingPoints?.samplingPoint) {
            const samplingPointsArray = Array.isArray(
              drinkingWaterFacility.samplingPoints.samplingPoint,
            )
              ? drinkingWaterFacility.samplingPoints.samplingPoint
              : [drinkingWaterFacility.samplingPoints.samplingPoint];

            for (const sp of samplingPointsArray) {
              const createdSamplingPoint =
                await this.prisma.samplingPoint.create({
                  data: {
                    consecutiveNumber: sp.consecutiveNumber
                      ? parseInt(sp.consecutiveNumber, 10)
                      : null,
                    pipingSystemType: sp.pipingSystemType || null,
                    remoteSamplingPoint: sp.remoteSamplingPoint === 'true',
                    roomType: sp.roomType || null,
                    roomPosition: sp.roomPosition
                      ? parseInt(sp.roomPosition, 10)
                      : null,
                    // id_healthAuthorities: sp.id_healthAuthorities
                    //   ? parseInt(sp.id_healthAuthorities, 10)
                    //   : null,
                    DrinkingWaterFacility: {
                      connect: { id: drinkingWaterFacilityId },
                    },
                    // Include Unit relation
                    unit: sp.unit
                      ? {
                          create: {
                            floor: sp.unit.floor
                              ? parseInt(sp.unit.floor, 10)
                              : null,
                            storey: sp.unit.storey || null,
                            position: sp.unit.position
                              ? parseInt(sp.unit.position, 10)
                              : null,
                            generalUnit: sp.unit.generalUnit === 'true',
                            building: sp.unit.building
                              ? {
                                  create: {
                                    address: {
                                      create: {
                                        street:
                                          sp.unit.building.address?.street ||
                                          null,
                                        streetnumber:
                                          sp.unit.building.address
                                            ?.streetnumber || null,
                                        city:
                                          sp.unit.building.address?.city ||
                                          null,
                                        postcode:
                                          sp.unit.building.address?.postcode ||
                                          null,
                                        country:
                                          sp.unit.building.address?.country ||
                                          null,
                                      },
                                    },
                                  },
                                }
                              : undefined,
                          },
                        }
                      : undefined, // Handle cases where `unit` is not provided
                  },
                });

              console.log('Created SamplingPoint:', createdSamplingPoint);
            }
          } else {
            console.log(
              'No SamplingPoints provided for this DrinkingWaterFacility.',
            );
          }

          // Create Order regardless of DrinkingWaterFacility
          await this.prisma.order.create({
            data: {
              orderNumberIsta: parseInt(order.number, 10),
              customerId: customerId,
              propertyId: propertyId,
              drinkingWaterFacilityId: drinkingWaterFacilityId, // Can be null
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

  // 18.12.2024
  async syncStatus(syncDTO: SyncDto, user: User) {
    return this.soapHelperService.processStatus(
      syncDTO.statusType,
      syncDTO.statusId,
      user,
    );
  }
}
