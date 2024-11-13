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
const client_1 = require("@prisma/client");
const axios_1 = require("axios");
const nestjs_soap_1 = require("nestjs-soap");
const decorator_1 = require("../auth/decorator");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const xml2js = require("xml2js");
const xml2js_1 = require("xml2js");
let SoapService = class SoapService {
    constructor(client, prisma, userService) {
        this.client = client;
        this.prisma = prisma;
        this.userService = userService;
        this.soapUrl = 'http://10.49.139.248:18080/dws_webservices/InstallationServiceImpl';
    }
    async polling(soapResponse) {
        var _a, _b, _c, _d, _e, _f;
        try {
            const parsedData = await (0, xml2js_1.parseStringPromise)(soapResponse, {
                explicitArray: false,
            });
            const orders = (_c = (_b = (_a = parsedData === null || parsedData === void 0 ? void 0 : parsedData['soap:Envelope']) === null || _a === void 0 ? void 0 : _a['soap:Body']) === null || _b === void 0 ? void 0 : _b['ns3:pollInstallationOrdersResponse']) === null || _c === void 0 ? void 0 : _c.orders;
            if (!orders) {
                throw new Error('No orders found in the response');
            }
            const ordersArray = Array.isArray(orders.order)
                ? orders.order
                : [orders.order];
            for (const order of ordersArray) {
                try {
                    if (!order) {
                        console.error('Order is undefined or null:', order);
                        continue;
                    }
                    const customer = order === null || order === void 0 ? void 0 : order.customer;
                    if (!customer) {
                        console.error('Customer data is missing in order:', order);
                        continue;
                    }
                    const contactPerson = customer === null || customer === void 0 ? void 0 : customer.contactPerson;
                    const drinkingWaterFacility = order === null || order === void 0 ? void 0 : order.drinkingWaterFacility;
                    const property = order === null || order === void 0 ? void 0 : order.property;
                    console.log('Processing order number:', order === null || order === void 0 ? void 0 : order.number);
                    console.log('Customer:', customer);
                    console.log('Property:', property);
                    console.log('DrinkingWaterFacility:', drinkingWaterFacility);
                    const orderData = {
                        orderNumberIsta: parseInt(customer.number, 10),
                        serviceType: (order === null || order === void 0 ? void 0 : order.serviceType) || null,
                        executionFlag: (order === null || order === void 0 ? void 0 : order.executionFlag) === 'true',
                        releasedOn: (order === null || order === void 0 ? void 0 : order.releasedOn) ? new Date(order.releasedOn) : null,
                    };
                    if (customer) {
                        orderData.Customer = {
                            create: Object.assign({ istaId: parseInt(customer.number, 10), name1: customer.name1 || null, name2: customer.name2 || null, street: customer.street || null, city: customer.city || null, postcode: customer.postcode || null, country: customer.country || null, telephone: customer.telephone || null }, (contactPerson && {
                                contactPerson: {
                                    create: {
                                        salutation: contactPerson.salutation || null,
                                        name: contactPerson.name || null,
                                        forename: contactPerson.forename || null,
                                        telephone: contactPerson.telephone || null,
                                        telephoneMobile: contactPerson.telephoneMobile || null,
                                        role: contactPerson.role || null,
                                    },
                                },
                            })),
                        };
                    }
                    if (property) {
                        orderData.property = {
                            create: Object.assign(Object.assign(Object.assign({ number: parseInt(property.number, 10) || null, id_HealthAuthorities: parseInt(property.id_HealthAuthorities, 10) || null }, (property.contactPerson && {
                                contactPerson: {
                                    create: {
                                        salutation: property.contactPerson.salutation || null,
                                        name: property.contactPerson.name || null,
                                        forename: property.contactPerson.forename || null,
                                        telephone: property.contactPerson.telephone || null,
                                        telephoneMobile: property.contactPerson.telephoneMobile || null,
                                        role: property.contactPerson.role || null,
                                    },
                                },
                            })), (property.address && {
                                address: {
                                    create: {
                                        street: property.address.street || null,
                                        streetnumber: property.address.streetnumber || null,
                                        city: property.address.city || null,
                                        postcode: property.address.postcode || null,
                                        country: property.address.country || null,
                                    },
                                },
                            })), { userAddresses: {
                                    create: Array.isArray(property.userAddresses)
                                        ? property.userAddresses.map((address) => ({
                                            street: address.street || null,
                                            streetnumber: address.streetnumber || null,
                                            city: address.city || null,
                                            postcode: address.postcode || null,
                                            country: address.country || null,
                                        }))
                                        : [],
                                }, building: {
                                    create: Array.isArray((_d = property === null || property === void 0 ? void 0 : property.building) === null || _d === void 0 ? void 0 : _d.building)
                                        ? property.building.building.map((building) => {
                                            var _a, _b, _c, _d, _e;
                                            return ({
                                                address: {
                                                    create: {
                                                        street: ((_a = building.address) === null || _a === void 0 ? void 0 : _a.street) || null,
                                                        streetnumber: ((_b = building.address) === null || _b === void 0 ? void 0 : _b.streetnumber) || null,
                                                        city: ((_c = building.address) === null || _c === void 0 ? void 0 : _c.city) || null,
                                                        postcode: ((_d = building.address) === null || _d === void 0 ? void 0 : _d.postcode) || null,
                                                        country: ((_e = building.address) === null || _e === void 0 ? void 0 : _e.country) || null,
                                                    },
                                                },
                                            });
                                        })
                                        : [],
                                } }),
                        };
                    }
                    if (drinkingWaterFacility) {
                        orderData.drinkingWaterFacility = {
                            create: {
                                consecutiveNumber: parseInt(drinkingWaterFacility.consecutiveNumber, 10) || null,
                                usageType: drinkingWaterFacility.usageType || null,
                                usageTypeOthers: drinkingWaterFacility.usageTypeOthers || null,
                                numberSuppliedUnits: parseInt(drinkingWaterFacility.numberSuppliedUnits, 10) ||
                                    null,
                                numberDrinkingWaterHeater: parseInt(drinkingWaterFacility.numberDrinkingWaterHeater, 10) || null,
                                totalVolumeLitres: parseFloat(drinkingWaterFacility.totalVolumeLitres) || null,
                                pipingSystemType_Circulation: drinkingWaterFacility.pipingSystemType_Circulation === 'true',
                                pipingSystemType_Waterbranchline: drinkingWaterFacility.pipingSystemType_Waterbranchline ===
                                    'true',
                                pipingSystemType_Pipetraceheater: drinkingWaterFacility.pipingSystemType_Pipetraceheater ===
                                    'true',
                                pipingVolumeGr3Litres: drinkingWaterFacility.pipingVolumeGr3Litres === 'true',
                                deadPipeKnown: drinkingWaterFacility.deadPipeKnown === 'true',
                                numberAscendingPipes: parseInt(drinkingWaterFacility.numberAscendingPipes, 10) ||
                                    null,
                                aerosolformation: drinkingWaterFacility.aerosolformation === 'true',
                                explanation: drinkingWaterFacility.explanation || null,
                                numberSuppliedPersons: parseInt(drinkingWaterFacility.numberSuppliedPersons, 10) ||
                                    null,
                                pipeworkSchematicsAvailable: drinkingWaterFacility.pipeworkSchematicsAvailable === 'true',
                                numberColdWaterLegs: parseInt(drinkingWaterFacility.numberColdWaterLegs, 10) ||
                                    null,
                                numberHotWaterLegs: parseInt(drinkingWaterFacility.numberHotWaterLegs, 10) ||
                                    null,
                                temperatureCirculationDWH_A: parseFloat(drinkingWaterFacility.temperatureCirculationDWH_A) || null,
                                temperatureCirculationDWH_B: parseFloat(drinkingWaterFacility.temperatureCirculationDWH_B) || null,
                                heatExchangerSystem_central: drinkingWaterFacility.heatExchangerSystem_central === 'true',
                                heatExchangerSystem_districtheating: drinkingWaterFacility.heatExchangerSystem_districtheating ===
                                    'true',
                                heatExchangerSystem_continuousflowprinciple: drinkingWaterFacility.heatExchangerSystem_continuousflowprinciple ===
                                    'true',
                                drinkingWaterHeaters: {
                                    create: Array.isArray((_e = drinkingWaterFacility.drinkingWaterHeaters) === null || _e === void 0 ? void 0 : _e.drinkingWaterHeater)
                                        ? drinkingWaterFacility.drinkingWaterHeaters.drinkingWaterHeater.map((heater) => {
                                            var _a, _b, _c, _d, _e;
                                            return ({
                                                consecutiveNumber: parseInt(heater.consecutiveNumber, 10) || null,
                                                inletTemperatureDisplayPresent: heater.inletTemperatureDisplayPresent === 'true',
                                                inletTemperature: parseFloat(heater.inletTemperature) || null,
                                                outletTemperatureDisplayPresent: heater.outletTemperatureDisplayPresent === 'true',
                                                outletTemperature: parseFloat(heater.outletTemperature) || null,
                                                pipeDiameterOutlet: heater.pipeDiameterOutlet || null,
                                                pipeMaterialtypeOutlet: heater.pipeMaterialtypeOutlet || null,
                                                volumeLitre: parseFloat(heater.volumeLitre) || null,
                                                roomType: heater.roomType || null,
                                                roomPosition: heater.roomPosition || null,
                                                unit: heater.unit
                                                    ? {
                                                        create: {
                                                            floor: heater.unit.floor || null,
                                                            storey: heater.unit.storey || null,
                                                            position: heater.unit.position || null,
                                                            generalUnit: heater.unit.generalUnit === 'true',
                                                            userName: heater.unit.userName || null,
                                                            building: heater.unit.building
                                                                ? {
                                                                    create: {
                                                                        address: {
                                                                            create: {
                                                                                street: ((_a = heater.unit.building.address) === null || _a === void 0 ? void 0 : _a.street) || null,
                                                                                streetnumber: ((_b = heater.unit.building.address) === null || _b === void 0 ? void 0 : _b.streetnumber) || null,
                                                                                city: ((_c = heater.unit.building.address) === null || _c === void 0 ? void 0 : _c.city) || null,
                                                                                postcode: ((_d = heater.unit.building.address) === null || _d === void 0 ? void 0 : _d.postcode) || null,
                                                                                country: ((_e = heater.unit.building.address) === null || _e === void 0 ? void 0 : _e.country) || null,
                                                                            },
                                                                        },
                                                                    },
                                                                }
                                                                : null,
                                                        },
                                                    }
                                                    : null,
                                            });
                                        })
                                        : [],
                                },
                                samplingPoints: {
                                    create: Array.isArray((_f = drinkingWaterFacility.samplingPoints) === null || _f === void 0 ? void 0 : _f.samplingPoint)
                                        ? drinkingWaterFacility.samplingPoints.samplingPoint.map((sp) => {
                                            var _a, _b, _c, _d, _e;
                                            return ({
                                                consecutiveNumber: parseInt(sp.consecutiveNumber, 10) || null,
                                                id_healthAuthorities: parseInt(sp.id_healthAuthorities, 10) || null,
                                                pipingSystemType: sp.pipingSystemType || null,
                                                remoteSamplingPoint: sp.remoteSamplingPoint === 'true',
                                                roomType: sp.roomType || null,
                                                roomPosition: sp.roomPosition || null,
                                                unit: sp.unit
                                                    ? {
                                                        create: {
                                                            floor: sp.unit.floor || null,
                                                            storey: sp.unit.storey || null,
                                                            position: sp.unit.position || null,
                                                            generalUnit: sp.unit.generalUnit === 'true',
                                                            userName: sp.unit.userName || null,
                                                            building: sp.unit.building
                                                                ? {
                                                                    create: {
                                                                        address: {
                                                                            create: {
                                                                                street: ((_a = sp.unit.building.address) === null || _a === void 0 ? void 0 : _a.street) || null,
                                                                                streetnumber: ((_b = sp.unit.building.address) === null || _b === void 0 ? void 0 : _b.streetnumber) || null,
                                                                                city: ((_c = sp.unit.building.address) === null || _c === void 0 ? void 0 : _c.city) || null,
                                                                                postcode: ((_d = sp.unit.building.address) === null || _d === void 0 ? void 0 : _d.postcode) || null,
                                                                                country: ((_e = sp.unit.building.address) === null || _e === void 0 ? void 0 : _e.country) || null,
                                                                            },
                                                                        },
                                                                    },
                                                                }
                                                                : null,
                                                        },
                                                    }
                                                    : null,
                                            });
                                        })
                                        : [],
                                },
                            },
                        };
                    }
                    await this.prisma.order.create({ data: orderData });
                    console.log('Successfully processed order:', order === null || order === void 0 ? void 0 : order.number);
                }
                catch (orderError) {
                    console.error(`Fehler beim Verarbeiten der Bestellung ${order === null || order === void 0 ? void 0 : order.number}:`, orderError);
                }
            }
            console.log('Alle Bestellungen erfolgreich verarbeitet.');
        }
        catch (error) {
            console.error('Fehler beim Verarbeiten der SOAP-Antwort:', error);
            throw new Error('Fehler beim Verarbeiten der Bestellung');
        }
    }
    createAddress(data) {
        return {
            street: data.street,
            streetnumber: data.streetnumber,
            postcode: data.postcode,
            city: data.city,
            country: data.country,
        };
    }
    createBuilding(data) {
        return {
            address: {
                create: this.createAddress(data.address),
            },
        };
    }
    createContactPerson(data) {
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