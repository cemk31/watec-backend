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
let SoapService = class SoapService {
    constructor(client, prisma, userService) {
        this.client = client;
        this.prisma = prisma;
        this.userService = userService;
        this.soapUrl = 'http://10.49.139.248:18080/dws_webservices/InstallationServiceImpl';
    }
    async reportOrderReceived(orderNo, currentDateTime) {
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
        const response = await axios_1.default.post(this.soapUrl, soapEnvelope, {
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: '',
            },
        });
        return response.data;
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