import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as xml2js from 'xml2js';
import axios from 'axios';
import { Client } from 'nestjs-soap';
import { PrismaService } from 'src/prisma/prisma.service';
import { Received } from 'src/ista/dto/soapReceveidDTO';
import { CustomerContact, Order, Planned, Status, User } from '@prisma/client';
import { userInfo } from 'os';
import { GetUser } from 'src/auth/decorator';
import { UserService } from 'src/user/user.service';
import { parseStringPromise } from 'xml2js';

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
        parsedData['soap:Envelope']['soap:Body'][
          'ns3:pollInstallationOrdersResponse'
        ].orders;

      if (!orders) {
        throw new Error('No orders found in the response');
      }

      const ordersArray = Array.isArray(orders.order)
        ? orders.order
        : [orders.order];
      console.log('ordersArray:', ordersArray);
      for (const order of ordersArray) {
        try {
          console.log('order:', order);
          const customer = order.customer;
          const contactPerson = customer.contactPerson;

          await this.prisma.order.create({
            data: {
              orderNumberIsta: parseInt(customer.number),
              Customer: {
                create: {
                  istaId: parseInt(customer.number, 10),
                  name1: customer.name1,
                  name2: customer.name2,
                  street: customer.street,
                  city: customer.city,
                  postcode: customer.postcode,
                  country: customer.country,
                  telephone: customer.telephone,
                  contactPerson: {
                    create: {
                      salutation: contactPerson.salutation,
                      name: contactPerson.name,
                      forename: contactPerson.forename,
                      telephone: contactPerson.telephone,
                      telephoneMobile: contactPerson.telephoneMobile,
                      role: contactPerson.role,
                    },
                  },
                },
              },
              serviceType: order.serviceType,
              executionFlag: order.executionFlag === 'true',
              releasedOn: new Date(order.releasedOn),
              property: {
                create: {
                  number: parseInt(order.property.number, 10),
                  id_HealthAuthorities: parseInt(
                    order.property.id_HealthAuthorities,
                    10,
                  ),
                  contactPerson: {
                    create: {
                      salutation: order.property.contactPerson.salutation,
                      name: order.property.contactPerson.name,
                      forename: order.property.contactPerson.forename,
                      telephone: order.property.contactPerson.telephone,
                      telephoneMobile:
                        order.property.contactPerson.telephoneMobile,
                      role: order.property.contactPerson.role,
                    },
                  },
                  address: {
                    create: {
                      street: order.property.address.street,
                      streetnumber: order.property.address.streetnumber,
                      city: order.property.address.city,
                      postcode: order.property.address.postcode,
                      country: order.property.address.country,
                    },
                  },
                },
              },
            },
          });
        } catch (orderError) {
          // Fehlerbehandlung für diese Bestellung
          console.error(
            `Fehler beim Verarbeiten der Bestellung ${order.istaId}:`,
            orderError,
          );
        }
      }
      // const order = await this.prisma.order.findMany({
      //   include: {
      //     status: true,
      //     Received: {
      //       include: {
      //         customerContacts: true, // include CustomerContact related to Received
      //         Request: true, // include Request related to Received
      //       },
      //     },
      //     Planned: {
      //       include: {
      //         customerContacts: true, // include CustomerContact related to Planned
      //         Request: true, // include Request related to Planned
      //       },
      //     },
      //     // customerContacts: true,
      //     NotPossible: {
      //       include: {
      //         Contact: true, // include CustomerContact related to NotPossible
      //         Request: true, // include Request related to NotPossible
      //       },
      //     },
      //     Postponed: {
      //       include: {
      //         Contact: true, // include CustomerContact related to Postponed
      //         Request: true, // include Request related to Postponed
      //       },
      //     },
      //     Cancelled: {
      //       include: {
      //         Contact: true, // include CustomerContact related to Cancelled
      //         Request: true, // include Request related to Cancelled
      //       },
      //     },
      //     Rejected: {
      //       include: {
      //         Contact: true, // include CustomerContact related to Rejected
      //         Request: true, // include Request related to Rejected
      //       },
      //     },
      //     ClosedContractPartner: true,
      //     Customer: true,
      //   },
      // });
      // return order;

      console.log('Alle Bestellungen erfolgreich verarbeitet.');
    } catch (error) {
      console.error('Fehler beim Verarbeiten der SOAP-Antwort:', error);
      throw new Error('Fehler beim Verarbeiten der Bestellung');
    }
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
