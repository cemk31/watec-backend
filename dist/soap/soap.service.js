"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoapService = void 0;
const common_1 = require("@nestjs/common");
const xml2js = require("xml2js");
const axios_1 = require("axios");
const nestjs_soap_1 = require("nestjs-soap");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const decorator_1 = require("../auth/decorator");
const user_service_1 = require("../user/user.service");
const xml2js_1 = require("xml2js");
let SoapService = class SoapService {
    constructor(client, prisma, userService) {
        this.client = client;
        this.prisma = prisma;
        this.userService = userService;
        this.soapUrl = 'http://10.49.139.248:18080/dws_webservices/InstallationServiceImpl';
    }
    async polling(soapResponse) {
        try {
            const parsedData = await (0, xml2js_1.parseStringPromise)(soapResponse, {
                explicitArray: false,
            });
            const orders = parsedData['soap:Envelope']['soap:Body']['ns3:pollInstallationOrdersResponse'].orders;
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
                                    id_HealthAuthorities: parseInt(order.property.id_HealthAuthorities, 10),
                                    contactPerson: {
                                        create: {
                                            salutation: order.property.contactPerson.salutation,
                                            name: order.property.contactPerson.name,
                                            forename: order.property.contactPerson.forename,
                                            telephone: order.property.contactPerson.telephone,
                                            telephoneMobile: order.property.contactPerson.telephoneMobile,
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
                }
                catch (orderError) {
                    console.error(`Fehler beim Verarbeiten der Bestellung ${order.istaId}:`, orderError);
                }
            }
            console.log('Alle Bestellungen erfolgreich verarbeitet.');
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Fehler beim Verarbeiten der SOAP-Antwort:', error);
            throw new Error('Fehler beim Verarbeiten der Bestellung');
        }
    }
    async reportOrderPlanned(statusId, user) {
        try {
            const planned = await this.getPlanned(statusId);
            const customerContacts = planned.customerContacts;
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
                .map((contact) => `
                <customerContact>
                  <customerContactAttemptOn>${contact.contactAttemptOn}</customerContactAttemptOn>
                  <contactPersonCustomer>${contact.contactPersonCustomer}</contactPersonCustomer>
                  <agentCP>${contact.agentCP}</agentCP>
                  <result>${contact.result}</result>
                  <remark>${contact.remark}</remark>
                </customerContact>
                `)
                .join('')}
              </customerContacts><
            </planned>

          </ins:reportOrderStatusRequest>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
            const response = await axios_1.default.post(this.soapUrl, soapEnvelope, {
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
                        statusType: client_1.Status.PLANNED,
                        syncStatus: 'erfolgreich übermittelt ' + new Date() + response.status,
                    },
                });
            }
            return response.data;
        }
        catch (error) {
            console.error('Fehler beim Speichern:', error);
            throw new Error('Fehler beim Speichern der Bestellung und des Kunden');
        }
    }
    async getPlanned(id) {
        return this.prisma.planned.findFirst({
            where: {
                id: id,
            },
            include: {
                customerContacts: true,
            },
        });
    }
    async getOrderById(id) {
        return this.prisma.order.findUnique({
            where: {
                id: id,
            },
        });
    }
    async getCurrentUser(user) {
        return { user: user };
    }
    async xmlToJson(xml) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
};
__decorate([
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SoapService.prototype, "getCurrentUser", null);
SoapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MY_SOAP_CLIENT')),
    __metadata("design:paramtypes", [nestjs_soap_1.Client,
        prisma_service_1.PrismaService,
        user_service_1.UserService])
], SoapService);
exports.SoapService = SoapService;
//# sourceMappingURL=soap.service.js.map