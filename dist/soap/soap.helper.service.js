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
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                  </order>
                  <orderstatusType>007</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${data.customerContacts && data.customerContacts.length > 0
                ? data.customerContacts
                    .map((contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${contact.customerContactAttemptOn || ''}</customerContactAttemptOn>
                        <contactPersonCustomer>${contact.contactPersonCustomer || ''}</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `)
                    .join('')
                : ''}
                  </customerContacts>
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
            POSTPONED: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <postponed>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${data.remarkExternal || ''}</remarkExternal>
                  </order>
                  <orderstatusType>013</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${data.customerContacts && data.customerContacts.length > 0
                ? data.customerContacts
                    .map((contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${contact.customerContactAttemptOn || ''}</customerContactAttemptOn>
                        <contactPersonCustomer>${contact.contactPersonCustomer || ''}</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `)
                    .join('')
                : ''}
                  </customerContacts>
                  <postponedReason>${data.postponedReason || ''}</postponedReason>
               </postponed>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
            EXECUTION_ON_SITE_DONE: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <executionOnSiteDone>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${data.remarkExternal || ''}</remarkExternal>
                  </order>
                  <orderstatusType>030</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${data.customerContacts && data.customerContacts.length > 0
                ? data.customerContacts
                    .map((contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${contact.customerContactAttemptOn || ''}</customerContactAttemptOn>
                        <contactPersonCustomer>${contact.contactPersonCustomer || ''}</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `)
                    .join('')
                : ''}
                  </customerContacts>
               </executionOnSiteDone>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
            REJECTED: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <rejected>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${data.remarkExternal || ''}</remarkExternal>
                  </order>
                  <orderstatusType>200</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${data.customerContacts && data.customerContacts.length > 0
                ? data.customerContacts
                    .map((contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${contact.customerContactAttemptOn || ''}</customerContactAttemptOn>
                        <contactPersonCustomer>${contact.contactPersonCustomer || ''}</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `)
                    .join('')
                : ''}
                  </customerContacts>
                  <rejectionReason>${data.rejectionReason || ''}</rejectionReason>
                  <rejectionReasonText>${data.rejectionReasonText || ''}</rejectionReasonText>
               </rejected>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
            CUSTOMER_CONTACT_NOT_POSSIBLE: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <customerContactNotPossible>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${data.remarkExternal || ''}</remarkExternal>
                  </order>
                  <orderstatusType>011</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${data.customerContacts && data.customerContacts.length > 0
                ? data.customerContacts
                    .map((contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${contact.customerContactAttemptOn || ''}</customerContactAttemptOn>
                        <contactPersonCustomer>${contact.contactPersonCustomer || ''}</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `)
                    .join('')
                : ''}
                  </customerContacts>
               </customerContactNotPossible>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
            CANCELLED: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <cancelled>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${data.remarkExternal || ''}</remarkExternal>
                  </order>
                  <orderstatusType>300</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${data.customerContacts && data.customerContacts.length > 0
                ? data.customerContacts
                    .map((contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${contact.customerContactAttemptOn || ''}</customerContactAttemptOn>
                        <contactPersonCustomer>${contact.contactPersonCustomer || ''}</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `)
                    .join('')
                : ''}
                  </customerContacts>
                  <cancellationReason>${data.cancellationReason || ''}</cancellationReason>
               </cancelled>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
            EXECUTION_ON_SITE_NOT_POSSIBLE: (data) => `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.CommonTypes">
         <soapenv:Header/>
         <soapenv:Body>
            <ins:reportOrderStatusRequest>
               <com:environment>Development</com:environment>
               <com:language>DE</com:language>
               <com:consumer>soapUI</com:consumer>
               <executionOnSiteNotPossible>
                  <order>
                     <number>${data.orderNumberIsta || 'UNDEFINED'}</number>
                     <remarkExternal>${data.remarkExternal || ''}</remarkExternal>
                  </order>
                  <orderstatusType>031</orderstatusType>
                  <setOn>${formatDate(data.setOn)}</setOn>
                  <customerContacts>
                    ${data.customerContacts && data.customerContacts.length > 0
                ? data.customerContacts
                    .map((contact) => `
                      <customerContact>
                        <customerContactAttemptOn>${contact.customerContactAttemptOn || ''}</customerContactAttemptOn>
                        <contactPersonCustomer>${contact.contactPersonCustomer || ''}</contactPersonCustomer>
                        <agentCP>${contact.agentCP || ''}</agentCP>
                        <result>${contact.result || ''}</result>
                        <remark>${contact.remark || ''}</remark>
                      </customerContact>
                      `)
                    .join('')
                : ''}
                  </customerContacts>
                  <nonExecutionReason>${data.nonExecutionReason || ''}</nonExecutionReason>
               </executionOnSiteNotPossible>
            </ins:reportOrderStatusRequest>
         </soapenv:Body>
      </soapenv:Envelope>
    `,
            REPORT_ORDER_STATUS_REQUEST: (data) => {
                var _a, _b, _c, _d, _e, _f;
                return `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
   <soapenv:Header/>
   <soapenv:Body>
      <ins:reportOrderStatusRequest>
         <com:environment>${data.environment || 'Development'}</com:environment>
         <com:language>${data.language || 'DE'}</com:language>
         <com:consumer>${data.consumer || 'soapUI'}</com:consumer>
         <closedContractPartner>
            <order>
               <number>${data.order.number || ''}</number>
               <remarkExternal>${data.order.remarkExternal || ''}</remarkExternal>
            </order>
            <orderstatusType>${data.orderstatusType || ''}</orderstatusType>
            <setOn>${data.setOn || ''}</setOn>
            <customerContacts>
               ${((_a = data.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => `
                  <customerContact>
                     <customerContactAttemptOn>${contact.customerContactAttemptOn || ''}</customerContactAttemptOn>
                     <contactPersonCustomer>${contact.contactPersonCustomer || ''}</contactPersonCustomer>
                     <agentCP>${contact.agentCP || ''}</agentCP>
                     <result>${contact.result || ''}</result>
                     <remark>${contact.remark || ''}</remark>
                  </customerContact>
               `).join('')) || ''}
            </customerContacts>
            <deficiencyDescription>${data.deficiencyDescription || ''}</deficiencyDescription>
            <extraordinaryExpenditureReason>${data.extraordinaryExpenditureReason || ''}</extraordinaryExpenditureReason>
            <suppliedDocuments>
               ${((_b = data.suppliedDocuments) === null || _b === void 0 ? void 0 : _b.map((doc) => `
                  <document>
                     <type>${doc.type || ''}</type>
                     <content>${doc.content || ''}</content>
                  </document>
               `).join('')) || ''}
            </suppliedDocuments>
            <recordedSystem>
               ${((_c = data.recordedSystem) === null || _c === void 0 ? void 0 : _c.map((system) => {
                    var _a, _b, _c;
                    return `
                  <drinkingWaterFacility>
                     <consecutiveNumber>${system.consecutiveNumber || ''}</consecutiveNumber>
                     <usageType>${system.usageType || ''}</usageType>
                     <usageTypeOthers>${system.usageTypeOthers || ''}</usageTypeOthers>
                     <numberSuppliedUnits>${system.numberSuppliedUnits || ''}</numberSuppliedUnits>
                     <numberDrinkingWaterHeater>${system.numberDrinkingWaterHeater || ''}</numberDrinkingWaterHeater>
                     <totalVolumeLitres>${system.totalVolumeLitres || ''}</totalVolumeLitres>
                     <pipingSystemType_Circulation>${system.pipingSystemType_Circulation || ''}</pipingSystemType_Circulation>
                     <pipingSystemType_Waterbranchline>${system.pipingSystemType_Waterbranchline || ''}</pipingSystemType_Waterbranchline>
                     <pipingSystemType_Pipetraceheater>${system.pipingSystemType_Pipetraceheater || ''}</pipingSystemType_Pipetraceheater>
                     <pipingVolumeGr3Litres>${system.pipingVolumeGr3Litres || ''}</pipingVolumeGr3Litres>
                     <deadPipeKnown>${system.deadPipeKnown || ''}</deadPipeKnown>
                     <deadPipesPosition>${system.deadPipesPosition || ''}</deadPipesPosition>
                     <numberAscendingPipes>${system.numberAscendingPipes || ''}</numberAscendingPipes>
                     <aerosolformation>${system.aerosolformation || ''}</aerosolformation>
                     <explanation>${system.explanation || ''}</explanation>
                     <numberSuppliedPersons>${system.numberSuppliedPersons || ''}</numberSuppliedPersons>
                     <pipeworkSchematicsAvailable>${system.pipeworkSchematicsAvailable || ''}</pipeworkSchematicsAvailable>
                     <numberColdWaterLegs>${system.numberColdWaterLegs || ''}</numberColdWaterLegs>
                     <numberHotWaterLegs>${system.numberHotWaterLegs || ''}</numberHotWaterLegs>
                     <temperatureCirculationDWH_A>${system.temperatureCirculationDWH_A || ''}</temperatureCirculationDWH_A>
                     <temperatureCirculationDWH_B>${system.temperatureCirculationDWH_B || ''}</temperatureCirculationDWH_B>
                     <heatExchangerSystem_central>${system.heatExchangerSystem_central || ''}</heatExchangerSystem_central>
                     <heatExchangerSystem_districtheating>${system.heatExchangerSystem_districtheating || ''}</heatExchangerSystem_districtheating>
                     <heatExchangerSystem_continuousflowprinciple>${system.heatExchangerSystem_continuousflowprinciple || ''}</heatExchangerSystem_continuousflowprinciple>
                     <drinkingWaterHeaters>
                        ${((_a = system.drinkingWaterHeaters) === null || _a === void 0 ? void 0 : _a.map((heater) => `
                           <drinkingWaterHeater>
                              <consecutiveNumber>${heater.consecutiveNumber || ''}</consecutiveNumber>
                              <inletTemperatureDisplayPresent>${heater.inletTemperatureDisplayPresent || ''}</inletTemperatureDisplayPresent>
                              <inletTemperature>${heater.inletTemperature || ''}</inletTemperature>
                              <outletTemperatureDisplayPresent>${heater.outletTemperatureDisplayPresent || ''}</outletTemperatureDisplayPresent>
                              <outletTemperature>${heater.outletTemperature || ''}</outletTemperature>
                              <pipeDiameterOutlet>${heater.pipeDiameterOutlet || ''}</pipeDiameterOutlet>
                              <pipeMaterialtypeOutlet>${heater.pipeMaterialtypeOutlet || ''}</pipeMaterialtypeOutlet>
                              <volumeLitre>${heater.volumeLitre || ''}</volumeLitre>
                              <roomType>${heater.roomType || ''}</roomType>
                              <roomPosition>${heater.roomPosition || ''}</roomPosition>
                              <positionDetail>${heater.positionDetail || ''}</positionDetail>
                              <unit>
                                 <floor>${heater.unit.floor || ''}</floor>
                                 <storey>${heater.unit.storey || ''}</storey>
                                 <positon>${heater.unit.positon || ''}</positon>
                                 <userName>${heater.unit.userName || ''}</userName>
                                 <generalUnit>${heater.unit.generalUnit || ''}</generalUnit>
                                 <building>
                                    <address>
                                       <street>${heater.unit.building.address.street ||
                        ''}</street>
                                       <streetnumber>${heater.unit.building.address
                        .streetnumber || ''}</streetnumber>
                                       <postcode>${heater.unit.building.address
                        .postcode || ''}</postcode>
                                       <city>${heater.unit.building.address.city || ''}</city>
                                       <country>${heater.unit.building.address.country ||
                        ''}</country>
                                    </address>
                                 </building>
                              </unit>
                           </drinkingWaterHeater>
                        `).join('')) || ''}
                     </drinkingWaterHeaters>
                     <ascendingPipes>
                        ${((_b = system.ascendingPipes) === null || _b === void 0 ? void 0 : _b.map((pipe) => `
                           <ascendingPipe>
                              <consecutiveNumber>${pipe.consecutiveNumber || ''}</consecutiveNumber>
                              <ascendingPipeTemperatureDisplayPresent>${pipe.ascendingPipeTemperatureDisplayPresent ||
                        ''}</ascendingPipeTemperatureDisplayPresent>
                              <flowTemperature>${pipe.flowTemperature || ''}</flowTemperature>
                              <circulationTemperatureDisplayPresent>${pipe.circulationTemperatureDisplayPresent || ''}</circulationTemperatureDisplayPresent>
                              <circulationTemperature>${pipe.circulationTemperature || ''}</circulationTemperature>
                              <pipeDiameter>${pipe.pipeDiameter || ''}</pipeDiameter>
                              <pipeMaterialtype>${pipe.pipeMaterialtype || ''}</pipeMaterialtype>
                           </ascendingPipe>
                        `).join('')) || ''}
                     </ascendingPipes>
                     <samplingPoints>
                        ${((_c = system.samplingPoints) === null || _c === void 0 ? void 0 : _c.map((point) => `
                           <samplingPoint>
                              <consecutiveNumber>${point.consecutiveNumber || ''}</consecutiveNumber>
                              <installationNumber>${point.installationNumber || ''}</installationNumber>
                              <numberObjectInstallationLocation>${point.numberObjectInstallationLocation || ''}</numberObjectInstallationLocation>
                              <pipingSystemType>${point.pipingSystemType || ''}</pipingSystemType>
                              <remoteSamplingPoint>${point.remoteSamplingPoint || ''}</remoteSamplingPoint>
                              <roomType>${point.roomType || ''}</roomType>
                              <roomPosition>${point.roomPosition || ''}</roomPosition>
                              <positionDetail>${point.positionDetail || ''}</positionDetail>
                              <unit>
                                 <floor>${point.unit.floor || ''}</floor>
                                 <storey>${point.unit.storey || ''}</storey>
                                 <positon>${point.unit.positon || ''}</positon>
                                 <userName>${point.unit.userName || ''}</userName>
                                 <generalUnit>${point.unit.generalUnit || ''}</generalUnit>
                                 <building>
                                    <address>
                                       <street>${point.unit.building.address.street ||
                        ''}</street>
                                       <streetnumber>${point.unit.building.address
                        .streetnumber || ''}</streetnumber>
                                       <postcode>${point.unit.building.address.postcode ||
                        ''}</postcode>
                                       <city>${point.unit.building.address.city || ''}</city>
                                       <country>${point.unit.building.address.country ||
                        ''}</country>
                                    </address>
                                 </building>
                              </unit>
                           </samplingPoint>
                        `).join('')) || ''}
                     </samplingPoints>
                  </drinkingWaterFacility>
               `;
                }).join('')) || ''}
            </recordedSystem>
            <property>
               <hotwatersupplyType_central>${((_d = data.property) === null || _d === void 0 ? void 0 : _d.hotwatersupplyType_central) || ''}</hotwatersupplyType_central>
               <hotwatersupplyType_decentral>${((_e = data.property) === null || _e === void 0 ? void 0 : _e.hotwatersupplyType_decentral) || ''}</hotwatersupplyType_decentral>
            </property>
            <services>
               ${((_f = data.services) === null || _f === void 0 ? void 0 : _f.map((service) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    return `
                  <service>
                     <articleNumber_ista>${service.articleNumber_ista || ''}</articleNumber_ista>
                     <quantity>${service.quantity || ''}</quantity>
                     <unit>${service.unit || ''}</unit>
                     <extraordinaryExpenditure>${service.extraordinaryExpenditure || ''}</extraordinaryExpenditure>
                     <purchasePrice_ista>${service.purchasePrice_ista || ''}</purchasePrice_ista>
                     <warranty>${service.warranty || ''}</warranty>
                     <serviceRenderedIn>
                        <address>
                           <street>${((_b = (_a = service.serviceRenderedIn) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.street) || ''}</street>
                           <streetnumber>${((_d = (_c = service.serviceRenderedIn) === null || _c === void 0 ? void 0 : _c.address) === null || _d === void 0 ? void 0 : _d.streetnumber) ||
                        ''}</streetnumber>
                           <postcode>${((_f = (_e = service.serviceRenderedIn) === null || _e === void 0 ? void 0 : _e.address) === null || _f === void 0 ? void 0 : _f.postcode) || ''}</postcode>
                           <city>${((_h = (_g = service.serviceRenderedIn) === null || _g === void 0 ? void 0 : _g.address) === null || _h === void 0 ? void 0 : _h.city) || ''}</city>
                           <country>${((_k = (_j = service.serviceRenderedIn) === null || _j === void 0 ? void 0 : _j.address) === null || _k === void 0 ? void 0 : _k.country) || ''}</country>
                        </address>
                     </serviceRenderedIn>
                  </service>
               `;
                }).join('')) || ''}
            </services>
         </closedContractPartner>
      </ins:reportOrderStatusRequest>
   </soapenv:Body>
</soapenv:Envelope> 
`;
            },
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