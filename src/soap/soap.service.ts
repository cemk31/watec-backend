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

  async reportOrderReceived(
    orderNo: string,
    currentDateTime: string,
  ): Promise<string> {
    const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
          <soapenv:Header/>
          <soapenv:Body>
            <ins:reportOrderStatusRequest>
              <com:environment>Development</com:environment>
              <com:language>DE</com:language>
              <com:consumer>soapUI</com:consumer>
              <received>
                <order>
                  <number>${orderNo}</number>
                </order>
                <orderstatusType>007</orderstatusType>
                <setOn>${currentDateTime}</setOn>
                <customerContacts>
                  <customerContact>
                    <customerContactAttemptOn>2020-09-09T16:27:05</customerContactAttemptOn>
                    <contactPersonCustomer>Max</contactPersonCustomer>
                    <agentCP>Agent a</agentCP>
                    <result>APNE</result>
                    <remark>Bemerkung von Dorothy ü ö ä ß </remark>
                  </customerContact>
                  <customerContact>
                    <customerContactAttemptOn>2020-09-07T07:27:05</customerContactAttemptOn>
                    <contactPersonCustomer>Tim</contactPersonCustomer>
                    <agentCP>Agent b</agentCP>
                    <result>KONF</result>
                    <remark>Bemerkung</remark>
                  </customerContact>
                </customerContacts>
              </received>
            </ins:reportOrderStatusRequest>
          </soapenv:Body>
        </soapenv:Envelope>
      `;

    const response = await axios.post(this.soapUrl, soapEnvelope, {
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: '',
      },
    });

    return response.data;
  }

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
