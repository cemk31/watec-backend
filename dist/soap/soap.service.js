"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoapService = void 0;
const common_1 = require("@nestjs/common");
const xml2js = require("xml2js");
const axios_1 = require("axios");
let SoapService = class SoapService {
    constructor() {
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
SoapService = __decorate([
    (0, common_1.Injectable)()
], SoapService);
exports.SoapService = SoapService;
//# sourceMappingURL=soap.service.js.map