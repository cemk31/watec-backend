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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoapHelperService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const axios_1 = require("axios");
let SoapHelperService = class SoapHelperService {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async processStatus(statusType, statusId, user) {
        const statusData = await this.getStatus(statusType, statusId);
        const orderData = await this.prisma.order.findUnique({
            where: { id: statusData.orderId },
        });
        if (!statusData) {
            throw new Error(`No data found for statusType: ${statusType} and statusId: ${statusId}`);
        }
        const orderNumberIsta = orderData.orderNumberIsta;
        const payload = this.createPayload(statusType, statusData, orderNumberIsta);
        const cleanPayload = payload.replace(/\n/g, '').trim();
        return await this.sendSoapRequest(cleanPayload, statusType, user);
    }
    async getStatus(statusType, statusId) {
        const statusModelMap = {
            RECEIVED: this.prisma.received,
            PLANNED: this.prisma.planned,
            DONE: this.prisma.done,
            CANCELLED: this.prisma.cancelled,
            NOTPOSSIBLE: this.prisma.notPossible,
            POSTPONED: this.prisma.postponed,
            REJECTED: this.prisma.rejected,
            EXECUTIONONSITENOTPOSSIBLE: this.prisma.executionOnSiteNotPossible,
        };
        const model = statusModelMap[statusType];
        if (!model) {
            throw new Error(`Invalid status type: ${statusType}`);
        }
        return model.findUnique({
            where: { id: statusId },
        });
    }
    createPayload(statusType, statusData, orderNumberIsta) {
        const formatDate = (date) => {
            if (!date)
                return '';
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        };
        const templates = {
            RECEIVED: (data) => `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
           <soapenv:Header/>
           <soapenv:Body>
              <ins:reportOrderStatusRequest>
                 <com:environment>Development</com:environment>
                 <com:language>DE</com:language>
                 <com:consumer>soapUI</com:consumer>
                 <received>
                    <order>
                       <number>${orderNumberIsta}</number>
                    </order>
                    <orderstatusType>007</orderstatusType>
                    <setOn>${formatDate(data.setOn)}</setOn>
                 </received>
              </ins:reportOrderStatusRequest>
           </soapenv:Body>
        </soapenv:Envelope>
      `,
            PLANNED: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <planned>
                  <order>
                     <number>${orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${data.remarkExternal || ''}</remarkExternal>
                  </order>
                  <orderstatusType>020</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${data.customerContacts && data.customerContacts.length > 0
                ? data.customerContacts
                    .map((contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${contact.customerContactAttemptOn}</customerContactAttemptOn>
                        <contactPersonCustomer>${contact.contactPersonCustomer}</contactPersonCustomer>
                        <agentCP>${contact.agentCP}</agentCP>
                        <result>${contact.result}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `)
                    .join('')
                : ''}
                  </customerContacts>
                  <detailedScheduleDate>
                  ${formatDate(data.detailedScheduleDate)}</detailedScheduleDate>
                  <detailedScheduleTimeFrom>${data.detailedScheduleTimeFrom || ''}</detailedScheduleTimeFrom>
                  <detailedScheduleTimeTo>${data.detailedScheduleTimeTo || ''}</detailedScheduleTimeTo>
                  <detailedScheduleDelayReason>KAPA</detailedScheduleDelayReason>
               </planned>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
        };
        const templateFn = templates[statusType];
        if (!templateFn) {
            throw new Error(`No template defined for status type: ${statusType}`);
        }
        return templateFn(statusData);
    }
    async sendSoapRequest(payload, statusType, user) {
        const config = {
            headers: {
                'Content-Type': 'text/xml',
            },
            auth: {
                username: process.env.SOAP_USERNAME,
                password: process.env.SOAP_PASSWORD,
            },
        };
        try {
            console.log(payload);
            const response = await axios_1.default.post('https://services-test.ista.com/DrinkingWaterSystem/InstallationService', payload, config);
            console.log(payload);
            console.log(response.data);
            return this.handleResponse(statusType, response.data, user);
        }
        catch (error) {
            console.error('Fehler beim Senden des SOAP-Requests:', error);
            return this.handleResponse(statusType, error, user);
        }
    }
    async updateStatusWithSyncId(statusType, statusId, syncId) {
        const statusModelMap = {
            RECEIVED: this.prisma.received,
            PLANNED: this.prisma.planned,
            DONE: this.prisma.done,
            CANCELLED: this.prisma.cancelled,
            NOTPOSSIBLE: this.prisma.notPossible,
            POSTPONED: this.prisma.postponed,
            REJECTED: this.prisma.rejected,
            EXECUTIONONSITENOTPOSSIBLE: this.prisma.executionOnSiteNotPossible,
        };
        const model = statusModelMap[statusType];
        if (!model) {
            throw new Error(`Invalid status type: ${statusType}`);
        }
        await model.update({
            where: { id: statusId },
            data: { syncDataId: syncId },
        });
    }
    async handleResponse(statusType, response, user) {
        const sync = await this.prisma.sync.create({
            data: {
                statusType: statusType.toString(),
                syncStatus: JSON.stringify(response),
                syncError: (response === null || response === void 0 ? void 0 : response.errorMessage) || 'Unbekannter Fehler',
                userId: user.id,
            },
        });
        if (!response || !response.success) {
            return sync;
        }
        await this.updateStatusWithSyncId(statusType, response.statusId, sync.id);
        return sync;
    }
};
SoapHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], SoapHelperService);
exports.SoapHelperService = SoapHelperService;
//# sourceMappingURL=soap.helper.service.js.map