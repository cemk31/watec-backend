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
exports.IstaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const DrinkingWaterFacilityDto_1 = require("./dto/DrinkingWaterFacilityDto");
const AscendingPipeDto_1 = require("./dto/AscendingPipeDto");
const SamplingPointDto_1 = require("./dto/SamplingPointDto");
let IstaService = class IstaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async receivedOrderWithCustomerId(customerId, dto) {
        console.log('customerId:', customerId);
        console.log('receivedDto:', dto);
        try {
            const order = await this.prisma.order.create({
                data: {
                    actualStatus: client_1.Status.RECEIVED,
                    propertyNumber: dto.propertyNumber,
                    Customer: {
                        connect: {
                            id: customerId,
                        },
                    },
                    Received: {
                        create: {
                            orderstatusType: dto.orderstatusType || '007',
                            setOn: dto.setOn,
                        },
                    },
                },
                include: {
                    status: true,
                    Received: true,
                    Planned: true,
                    Done: true,
                    customerContacts: true,
                    NotPossible: true,
                    Postponed: true,
                    Cancelled: true,
                    Rejected: true,
                    ExecutionOnSiteNotPossible: true,
                    ClosedContractPartner: true,
                    Customer: true,
                },
            });
            return order;
        }
        catch (error) {
            console.error('Fehler beim Speichern:', error);
            throw new Error('Fehler beim Speichern der Bestellung und des Kunden');
        }
    }
    async createOrder(dto) {
        var _a, _b, _c, _d;
        const order = await this.prisma.order.create({
            data: {
                remarkExternal: dto.remarkExternal,
                createdAt: dto.createdAt,
                status: {
                    create: dto.status,
                },
                NotPossible: {
                    create: (_a = dto.notPossible) === null || _a === void 0 ? void 0 : _a.map((notPossible) => (Object.assign(Object.assign({}, notPossible), { customerContacts: {
                            create: notPossible.customerContacts,
                        } }))),
                },
                Postponed: {
                    create: (_b = dto.postponed) === null || _b === void 0 ? void 0 : _b.map((postponed) => (Object.assign(Object.assign({}, postponed), { customerContacts: {
                            create: postponed.customerContacts,
                        } }))),
                },
                Cancelled: {
                    create: (_c = dto.cancelled) === null || _c === void 0 ? void 0 : _c.map((cancelled) => (Object.assign(Object.assign({}, cancelled), { customerContacts: {
                            create: cancelled.customerContacts,
                        } }))),
                },
                Rejected: {
                    create: (_d = dto.rejected) === null || _d === void 0 ? void 0 : _d.map((rejected) => (Object.assign(Object.assign({}, rejected), { customerContacts: {
                            create: rejected.customerContacts,
                        } }))),
                },
                Customer: {
                    create: {
                        firstName: dto.customer.firstName,
                        lastName: dto.customer.lastName,
                        street: dto.customer.street,
                        zipCode: dto.customer.zipCode,
                        place: dto.customer.place,
                        country: dto.customer.country,
                        email: dto.customer.email,
                        phoneNumber: dto.customer.phoneNumber,
                    },
                },
            },
            include: {
                status: true,
                Received: true,
                Planned: true,
                Done: true,
                customerContacts: true,
                NotPossible: true,
                Postponed: true,
                Cancelled: true,
                Rejected: true,
                ClosedContractPartner: true,
                Customer: true,
            },
        });
        return order;
    }
    async getAllOrders() {
        const order = await this.prisma.order.findMany({
            include: {
                status: true,
                Received: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Planned: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Done: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                NotPossible: {
                    include: {
                        customerContacts: true,
                        Contact: true,
                        Request: true,
                    },
                },
                Postponed: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Cancelled: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Rejected: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Customer: {
                    include: {
                        contactPerson: {
                            include: {
                                Property: true,
                            },
                        },
                    },
                },
                property: true,
            },
        });
        return order;
    }
    async getOrderById(orderId) {
        return this.prisma.order.findFirst({
            where: { id: orderId },
            include: {
                status: true,
                Received: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                customerContacts: {
                    include: {
                        ClosedContractPartner: true,
                        planned: true,
                        received: true,
                    },
                },
                Planned: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Done: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                NotPossible: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Postponed: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Cancelled: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Rejected: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                property: {
                    include: {
                        building: {
                            include: {
                                address: true,
                            },
                        },
                    },
                },
                ExecutionOnSiteNotPossible: true,
                ClosedContractPartner: {
                    include: {
                        recordedSystem: {
                            include: {
                                property: true,
                                drinkingWaterFacility: true,
                            },
                        },
                        suppliedDocuments: true,
                        ReportOrderStatusRequest: true,
                        services: true,
                    },
                },
                drinkingWaterFacility: {
                    include: {
                        samplingPoints: {
                            include: {
                                unit: {
                                    include: {
                                        building: true,
                                    },
                                },
                            },
                        },
                        ascendingPipes: true,
                        drinkingWaterHeaters: {
                            include: {
                                unit: {
                                    include: {
                                        building: true,
                                    },
                                },
                            },
                        },
                    },
                },
                Customer: {
                    include: {
                        orders: true,
                        contactPerson: {
                            include: {
                                Property: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async updateOrder(orderId, dto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (!orderId) {
            throw new Error('orderId is required.');
        }
        if (!dto) {
            throw new Error('dto is required.');
        }
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                remarkExternal: dto.remarkExternal,
                createdAt: dto.createdAt,
                status: {
                    create: dto.status,
                },
                NotPossible: {
                    create: (_a = dto.notPossible) === null || _a === void 0 ? void 0 : _a.map((notPossible) => (Object.assign(Object.assign({}, notPossible), { customerContacts: {
                            create: notPossible.customerContacts.map((contact) => (Object.assign(Object.assign({}, contact), { notPossibleId: notPossible.id }))),
                        } }))),
                },
                Postponed: {
                    create: (_b = dto.postponed) === null || _b === void 0 ? void 0 : _b.map((postponed) => (Object.assign(Object.assign({}, postponed), { customerContacts: {
                            create: postponed.customerContacts.map((contact) => (Object.assign(Object.assign({}, contact), { postponedId: postponed.id }))),
                        } }))),
                },
                Cancelled: {
                    create: (_c = dto.cancelled) === null || _c === void 0 ? void 0 : _c.map((cancelled) => (Object.assign(Object.assign({}, cancelled), { customerContacts: {
                            create: cancelled.customerContacts.map((contact) => (Object.assign(Object.assign({}, contact), { cancelledId: cancelled.id }))),
                        } }))),
                },
                Rejected: {
                    create: (_d = dto.rejected) === null || _d === void 0 ? void 0 : _d.map((rejected) => (Object.assign(Object.assign({}, rejected), { customerContacts: {
                            create: rejected.customerContacts.map((contact) => (Object.assign(Object.assign({}, contact), { rejectedId: rejected.id }))),
                        } }))),
                },
                Customer: {
                    create: {
                        firstName: (_e = dto.customer) === null || _e === void 0 ? void 0 : _e.firstName,
                        lastName: (_f = dto.customer) === null || _f === void 0 ? void 0 : _f.lastName,
                        companyName: (_g = dto.customer) === null || _g === void 0 ? void 0 : _g.name,
                        street: (_h = dto.customer) === null || _h === void 0 ? void 0 : _h.street,
                        zipCode: (_j = dto.customer) === null || _j === void 0 ? void 0 : _j.zipCode,
                        place: (_k = dto.customer) === null || _k === void 0 ? void 0 : _k.place,
                        country: (_l = dto.customer) === null || _l === void 0 ? void 0 : _l.country,
                        email: (_m = dto.customer) === null || _m === void 0 ? void 0 : _m.email,
                        phoneNumber: (_o = dto.customer) === null || _o === void 0 ? void 0 : _o.phoneNumber,
                    },
                },
            },
            include: {
                status: true,
                Received: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Planned: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Done: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                customerContacts: true,
                NotPossible: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Postponed: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Cancelled: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                Rejected: {
                    include: {
                        customerContacts: true,
                        Request: true,
                    },
                },
                ExecutionOnSiteNotPossible: {
                    include: {
                        customerContacts: true,
                    },
                },
                ClosedContractPartner: true,
                Customer: true,
            },
        });
        return order;
    }
    async createCustomer(dto) {
        console.log('CustomerDTO:', dto);
        const customer = await this.prisma.customer.create({
            data: {
                companyName: dto.companyName,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneNumber: dto.phoneNumber,
                street: dto.street,
                zipCode: dto.zipCode,
                place: dto.place,
                email: dto.email,
                country: dto.country,
                fax: dto.fax,
                propertyNumber: dto.propertyNumber,
            },
        });
        return customer;
    }
    async updateCustomer(customerId, dto) {
        const customer = await this.prisma.customer.update({
            where: { id: customerId },
            data: {
                companyName: dto.companyName,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneNumber: dto.phoneNumber,
                street: dto.street,
                zipCode: dto.zipCode,
                place: dto.place,
                email: dto.email,
                country: dto.country,
                fax: dto.fax,
                propertyNumber: dto.propertyNumber,
            },
        });
        return customer;
    }
    async getCustomerById(customerId) {
        return this.prisma.customer.findFirst({
            where: { id: customerId },
            include: {
                orders: true,
                contactPerson: {
                    include: {
                        Property: true,
                    },
                },
            },
        });
    }
    async orderRejected(dto) {
        var _a;
        try {
            await this.prisma.order.update({
                where: { id: dto.orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.REJECTED,
                    remarkExternal: dto.remarkExternal,
                },
            });
            await this.prisma.rejected.create({
                data: {
                    rejectionReason: dto.rejectionReason,
                    rejectionReasonText: dto.rejectionReasonText,
                    setOn: dto.setOn,
                    statusType: dto.statusType,
                    Order: {
                        connect: {
                            id: dto.orderId,
                        },
                    },
                    customerContacts: {
                        create: (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                },
            });
        }
        catch (error) {
            console.error('Error creating rejected entry:', error);
        }
    }
    async orderPostponed(dto) {
        var _a;
        try {
            await this.prisma.order.update({
                where: { id: dto.orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.POSTPONED,
                    remarkExternal: dto.remarkExternal,
                },
            });
            const postponedEntry = await this.prisma.postponed.create({
                data: {
                    statusType: client_1.Status.POSTPONED || 'POSTPONED',
                    setOn: dto.setOn || new Date(),
                    nextContactAttemptOn: dto.nextContactAttemptOn,
                    postponedReason: dto.postponedReason,
                    Order: {
                        connect: { id: dto.orderId },
                    },
                    customerContacts: {
                        create: (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                },
            });
            return postponedEntry;
        }
        catch (error) {
            console.error('Error creating postponed entry:', error);
            return null;
        }
    }
    async orderCancelled(orderId, requestId, dto) {
        var _a;
        try {
            console.log('orderCancelled: ', dto);
            console.log('orderID: ', orderId);
            console.log('requestID: ', requestId);
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.CANCELLED,
                    remarkExternal: dto.remarkExternal,
                },
            });
            const cancelledEntry = await this.prisma.cancelled.create({
                data: {
                    statusType: dto.statusType,
                    setOn: dto.setOn,
                    cancellationReason: dto.cancellationReason,
                    Order: {
                        connect: {
                            id: orderId,
                        },
                    },
                    Request: requestId
                        ? {
                            connect: {
                                id: requestId,
                            },
                        }
                        : undefined,
                    customerContacts: {
                        create: (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                },
            });
            return cancelledEntry;
        }
        catch (error) {
            console.error('Error creating cancelled entry:', error);
            return null;
        }
    }
    async orderReceived(orderId, requestId, dto) {
        var _a;
        try {
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.RECEIVED,
                    remarkExternal: dto.remark,
                },
            });
            const receivedEntry = await this.prisma.received.create({
                data: {
                    orderstatusType: client_1.Status.RECEIVED,
                    setOn: dto.setOn,
                    Order: {
                        connect: {
                            id: orderId,
                        },
                    },
                    customerContacts: {
                        create: (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                    Request: requestId
                        ? {
                            connect: {
                                id: requestId,
                            },
                        }
                        : undefined,
                },
            });
            return receivedEntry;
        }
        catch (error) {
            console.error('Error creating received entry:', error);
            return null;
        }
    }
    async orderPlanned(orderId, requestId, dto) {
        var _a;
        try {
            const detailedScheduleTimeFrom = dto.detailedScheduleTimeFrom + ':00';
            const detailedScheduleTimeTo = dto.detailedScheduleTimeTo + ':00';
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.PLANNED,
                    remarkExternal: dto.remarkExternal,
                },
            });
            const plannedEntry = await this.prisma.planned.create({
                data: {
                    orderstatusType: client_1.Status.PLANNED,
                    setOn: dto.setOn,
                    detailedScheduleDate: dto.detailedScheduleDate,
                    detailedScheduleTimeFrom: detailedScheduleTimeFrom,
                    detailedScheduleTimeTo: detailedScheduleTimeTo,
                    detailedScheduleDelayReason: dto.detailedScheduleDelayReason,
                    Order: {
                        connect: {
                            id: orderId,
                        },
                    },
                    customerContacts: {
                        create: (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                    Request: requestId
                        ? {
                            connect: {
                                id: requestId,
                            },
                        }
                        : undefined,
                },
            });
            return plannedEntry;
        }
        catch (error) {
            console.error('Error creating planned entry:', error);
            return null;
        }
    }
    async orderNotPossible(orderId, requestId, dto) {
        var _a;
        try {
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.NOTPOSSIBLE,
                    remarkExternal: dto.remarkExternal,
                },
            });
            const notPossibleEntry = await this.prisma.notPossible.create({
                data: {
                    statusType: dto.statusType,
                    setOn: dto.setOn,
                    customerContacts: {
                        create: (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                    Order: {
                        connect: {
                            id: orderId,
                        },
                    },
                    Request: requestId
                        ? {
                            connect: {
                                id: requestId,
                            },
                        }
                        : undefined,
                },
            });
            return notPossibleEntry;
        }
        catch (error) {
            console.error('Error creating not possible entry:', error);
            return null;
        }
    }
    async orderExecutionOnSiteNotPossible(orderId, dto) {
        var _a;
        try {
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.EXECUTIONONSITENOTPOSSIBLE,
                    remarkExternal: dto.remarkExternal,
                },
            });
            const executionEntry = await this.prisma.executionOnSiteNotPossible.create({
                data: {
                    orderstatusType: client_1.Status.EXECUTIONONSITENOTPOSSIBLE,
                    setOn: dto.setOn,
                    nonExecutionReason: dto.nonExecutionReason,
                    customerContacts: {
                        create: (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                    Order: {
                        connect: {
                            id: orderId,
                        },
                    },
                },
            });
            return executionEntry;
        }
        catch (error) {
            console.error('Error creating execution on site not possible entry:', error);
            return null;
        }
    }
    async orderClosedContractPartner(orderId, dto) {
        var _a, _b, _c, _d, _e, _f;
        try {
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.CLOSEDCONTRACTPARTNER,
                },
            });
            const closedContractPartnerEntry = await this.prisma.closedContractPartner.create({
                data: {
                    order: {
                        connect: {
                            id: orderId,
                        },
                    },
                    orderstatusType: (dto === null || dto === void 0 ? void 0 : dto.orderstatusType) || null,
                    setOn: (dto === null || dto === void 0 ? void 0 : dto.setOn) || new Date(),
                    deficiencyDescription: (dto === null || dto === void 0 ? void 0 : dto.deficiencyDescription) || null,
                    registrationHealthAuthoritiesOn: (dto === null || dto === void 0 ? void 0 : dto.registrationHealthAuthoritiesOn) || new Date(),
                    extraordinaryExpenditureReason: (dto === null || dto === void 0 ? void 0 : dto.extraordinaryExpenditureReason) || null,
                    customerContacts: {
                        create: (_b = (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                            contactAttemptOn: (contact === null || contact === void 0 ? void 0 : contact.contactAttemptOn) || new Date(),
                            contactPersonCustomer: (contact === null || contact === void 0 ? void 0 : contact.contactPersonCustomer) || null,
                            agentCP: (contact === null || contact === void 0 ? void 0 : contact.agentCP) || null,
                            result: (contact === null || contact === void 0 ? void 0 : contact.result) || null,
                            remark: (contact === null || contact === void 0 ? void 0 : contact.remark) || null,
                        }))) !== null && _b !== void 0 ? _b : [],
                    },
                    recordedSystem: {
                        create: (_d = (_c = dto.recordedSystem) === null || _c === void 0 ? void 0 : _c.map((rs) => {
                            var _a, _b, _c, _d;
                            return ({
                                drinkingWaterFacility: {
                                    create: (_b = (_a = rs.drinkingWaterFacility) === null || _a === void 0 ? void 0 : _a.map((dwf) => {
                                        var _a, _b, _c, _d, _e;
                                        return ({
                                            consecutiveNumber: (dwf === null || dwf === void 0 ? void 0 : dwf.consecutiveNumber) || null,
                                            usageType: (dwf === null || dwf === void 0 ? void 0 : dwf.usageType) || null,
                                            usageTypeOthers: (dwf === null || dwf === void 0 ? void 0 : dwf.usageTypeOthers) || null,
                                            numberSuppliedUnits: (dwf === null || dwf === void 0 ? void 0 : dwf.numberSuppliedUnits) || null,
                                            numberDrinkingWaterHeater: (dwf === null || dwf === void 0 ? void 0 : dwf.numberDrinkingWaterHeater) || null,
                                            totalVolumeLitres: (dwf === null || dwf === void 0 ? void 0 : dwf.totalVolumeLitres) || null,
                                            pipingSystemType_Circulation: (dwf === null || dwf === void 0 ? void 0 : dwf.pipingSystemType_Circulation) || null,
                                            pipingSystemType_Waterbranchline: (dwf === null || dwf === void 0 ? void 0 : dwf.pipingSystemType_Waterbranchline) || null,
                                            pipingSystemType_Pipetraceheater: (dwf === null || dwf === void 0 ? void 0 : dwf.pipingSystemType_Pipetraceheater) || null,
                                            pipingVolumeGr3Litres: dwf === null || dwf === void 0 ? void 0 : dwf.pipingVolumeGr3Litres,
                                            deadPipeKnown: (dwf === null || dwf === void 0 ? void 0 : dwf.deadPipeKnown) || null,
                                            deadPipesPosition: (dwf === null || dwf === void 0 ? void 0 : dwf.deadPipesPosition) || null,
                                            numberAscendingPipes: (dwf === null || dwf === void 0 ? void 0 : dwf.numberAscendingPipes) || null,
                                            explanation: (dwf === null || dwf === void 0 ? void 0 : dwf.explanation) || null,
                                            numberSuppliedPersons: (dwf === null || dwf === void 0 ? void 0 : dwf.numberSuppliedPersons) || null,
                                            aerosolformation: (dwf === null || dwf === void 0 ? void 0 : dwf.aerosolformation) || null,
                                            pipeworkSchematicsAvailable: (dwf === null || dwf === void 0 ? void 0 : dwf.pipeworkSchematicsAvailable) || null,
                                            numberColdWaterLegs: (dwf === null || dwf === void 0 ? void 0 : dwf.numberColdWaterLegs) || null,
                                            numberHotWaterLegs: (dwf === null || dwf === void 0 ? void 0 : dwf.numberHotWaterLegs) || null,
                                            temperatureCirculationDWH_A: (dwf === null || dwf === void 0 ? void 0 : dwf.temperatureCirculationDWH_A) || null,
                                            temperatureCirculationDWH_B: (dwf === null || dwf === void 0 ? void 0 : dwf.temperatureCirculationDWH_B) || null,
                                            heatExchangerSystem_central: (dwf === null || dwf === void 0 ? void 0 : dwf.heatExchangerSystem_central) || null,
                                            heatExchangerSystem_districtheating: (dwf === null || dwf === void 0 ? void 0 : dwf.heatExchangerSystem_districtheating) || null,
                                            heatExchangerSystem_continuousflowprinciple: (dwf === null || dwf === void 0 ? void 0 : dwf.heatExchangerSystem_continuousflowprinciple) || null,
                                            samplingPoints: {
                                                create: (_b = (_a = dwf === null || dwf === void 0 ? void 0 : dwf.samplingPoints) === null || _a === void 0 ? void 0 : _a.map((sp) => ({
                                                    consecutiveNumber: (sp === null || sp === void 0 ? void 0 : sp.consecutiveNumber) || null,
                                                    installationNumber: (sp === null || sp === void 0 ? void 0 : sp.installationNumber) || null,
                                                    numberObjectInstallationLocation: (sp === null || sp === void 0 ? void 0 : sp.numberObjectInstallationLocation) || null,
                                                    pipingSystemType: (sp === null || sp === void 0 ? void 0 : sp.pipingSystemType) || null,
                                                    remoteSamplingPoint: (sp === null || sp === void 0 ? void 0 : sp.remoteSamplingPoint) || null,
                                                    roomType: (sp === null || sp === void 0 ? void 0 : sp.roomType) || null,
                                                    roomPosition: (sp === null || sp === void 0 ? void 0 : sp.roomPosition) || null,
                                                    positionDetail: (sp === null || sp === void 0 ? void 0 : sp.positionDetail) || null,
                                                }))) !== null && _b !== void 0 ? _b : [SamplingPointDto_1.SamplingPointDto],
                                            },
                                            ascendingPipes: {
                                                create: (_d = (_c = dwf === null || dwf === void 0 ? void 0 : dwf.ascendingPipes) === null || _c === void 0 ? void 0 : _c.map((ap) => ({
                                                    consecutiveNumber: (ap === null || ap === void 0 ? void 0 : ap.consecutiveNumber) || null,
                                                    ascendingPipeTemperatureDisplayPresent: (ap === null || ap === void 0 ? void 0 : ap.ascendingPipeTemperatureDisplayPresent) || null,
                                                    flowTemperature: (ap === null || ap === void 0 ? void 0 : ap.flowTemperature) || null,
                                                    circulationTemperatureDisplayPresent: (ap === null || ap === void 0 ? void 0 : ap.circulationTemperatureDisplayPresent) || null,
                                                    circulationTemperature: (ap === null || ap === void 0 ? void 0 : ap.circulationTemperature) || null,
                                                    pipeDiameter: (ap === null || ap === void 0 ? void 0 : ap.pipeDiameter) || null,
                                                    pipeMaterialtype: (ap === null || ap === void 0 ? void 0 : ap.pipeMaterialtype) || null,
                                                }))) !== null && _d !== void 0 ? _d : [AscendingPipeDto_1.AscendingPipeDto],
                                            },
                                            drinkingWaterHeaters: {
                                                create: (_e = dwf === null || dwf === void 0 ? void 0 : dwf.drinkingWaterHeaters) === null || _e === void 0 ? void 0 : _e.map((dwh) => {
                                                    var _a;
                                                    return ({
                                                        consecutiveNumber: (dwh === null || dwh === void 0 ? void 0 : dwh.consecutiveNumber) || null,
                                                        inletTemperatureDisplayPresent: (dwh === null || dwh === void 0 ? void 0 : dwh.inletTemperatureDisplayPresent) || null,
                                                        inletTemperature: (dwh === null || dwh === void 0 ? void 0 : dwh.inletTemperature) || null,
                                                        outletTemperatureDisplayPresent: (dwh === null || dwh === void 0 ? void 0 : dwh.outletTemperatureDisplayPresent) || null,
                                                        outletTemperature: (dwh === null || dwh === void 0 ? void 0 : dwh.outletTemperature) || null,
                                                        pipeDiameterOutlet: (dwh === null || dwh === void 0 ? void 0 : dwh.pipeDiameterOutlet) || null,
                                                        pipeMaterialtypeOutlet: (dwh === null || dwh === void 0 ? void 0 : dwh.pipeMaterialtypeOutlet) || null,
                                                        volumeLitre: (dwh === null || dwh === void 0 ? void 0 : dwh.volumeLitre) || null,
                                                        roomType: (dwh === null || dwh === void 0 ? void 0 : dwh.roomType) || null,
                                                        roomPosition: (dwh === null || dwh === void 0 ? void 0 : dwh.roomPosition) || null,
                                                        positionDetail: (dwh === null || dwh === void 0 ? void 0 : dwh.positionDetail) || null,
                                                        unit: {
                                                            create: (_a = dwh === null || dwh === void 0 ? void 0 : dwh.unit) !== null && _a !== void 0 ? _a : undefined,
                                                        },
                                                    });
                                                }),
                                            },
                                        });
                                    })) !== null && _b !== void 0 ? _b : [DrinkingWaterFacilityDto_1.DrinkingWaterFacilityDto],
                                },
                                property: {
                                    create: {
                                        hotwatersupplyType_central: ((_c = rs === null || rs === void 0 ? void 0 : rs.property) === null || _c === void 0 ? void 0 : _c.hotwatersupplyType_central) || false,
                                        hotwatersupplyType_decentral: ((_d = rs === null || rs === void 0 ? void 0 : rs.property) === null || _d === void 0 ? void 0 : _d.hotwatersupplyType_decentral) || false,
                                    },
                                },
                            });
                        })) !== null && _d !== void 0 ? _d : [undefined],
                    },
                    services: {
                        create: (_f = (_e = dto.services) === null || _e === void 0 ? void 0 : _e.map((service) => ({
                            articleNumber_ista: service.articleNumber_ista || null,
                            quantity: service.quantity || null,
                            unit: service.unit || null,
                            extraordinaryExpenditure: service.extraordinaryExpenditure || null,
                            purchasePrice_ista: service.purchasePrice_ista || null,
                            warranty: service.warranty || null,
                            serviceRenderedIn: {
                                create: {
                                    street: service.serviceRenderedIn.street || null,
                                    zipCode: service.serviceRenderedIn.postcode || null,
                                    place: service.serviceRenderedIn.city || null,
                                    country: service.serviceRenderedIn.country || null,
                                }
                                    ? service.serviceRenderedIn
                                    : null,
                            },
                        }))) !== null && _f !== void 0 ? _f : [],
                    },
                },
            });
            return closedContractPartnerEntry;
        }
        catch (error) {
            console.error('Error creating closed contract partner entry:', error);
            return null;
        }
    }
    async updateOrderToReceived(orderId, dto) {
        var _a, _b, _c, _d;
        try {
            const order = await this.prisma.order.findUnique({
                where: { id: orderId },
            });
            if (!order) {
                throw new Error('Order not found');
            }
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    actualStatus: client_1.Status.RECEIVED,
                    updatedAt: new Date(),
                    remarkExternal: dto.remark,
                },
            });
            await this.prisma.received.upsert({
                where: { id: dto.id || 0 },
                update: {
                    orderstatusType: client_1.Status.RECEIVED,
                    setOn: (_a = dto.setOn) !== null && _a !== void 0 ? _a : new Date(),
                    customerContacts: {
                        create: (_b = dto.customerContacts) === null || _b === void 0 ? void 0 : _b.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                },
                create: {
                    orderId: orderId,
                    orderstatusType: client_1.Status.RECEIVED,
                    setOn: (_c = dto.setOn) !== null && _c !== void 0 ? _c : new Date(),
                    customerContacts: {
                        create: (_d = dto.customerContacts) === null || _d === void 0 ? void 0 : _d.map((contact) => ({
                            contactAttemptOn: contact.contactAttemptOn,
                            contactPersonCustomer: contact.contactPersonCustomer,
                            agentCP: contact.agentCP,
                            result: contact.result,
                            remark: contact.remark,
                        })),
                    },
                },
            });
        }
        catch (error) {
            console.error('Error updating order to RECEIVED:', error);
            throw new Error('Failed to update order status');
        }
    }
    async deleteOrder(orderId) {
        console.log('Deleting order with id:', orderId);
        try {
            await this.prisma.cancelled.deleteMany({ where: { orderId } });
            await this.prisma.closedContractPartner.deleteMany({
                where: { orderId },
            });
            await this.prisma.notPossible.deleteMany({ where: { orderId } });
            await this.prisma.planned.deleteMany({ where: { orderId } });
            await this.prisma.done.deleteMany({ where: { orderId } });
            await this.prisma.postponed.deleteMany({ where: { orderId } });
            await this.prisma.received.deleteMany({ where: { orderId } });
            await this.prisma.rejected.deleteMany({ where: { orderId } });
            await this.prisma.orderStatus.deleteMany({ where: { orderId } });
            await this.prisma.customerContact.deleteMany({ where: { orderId } });
            const deletedOrder = await this.prisma.order.delete({
                where: { id: orderId },
            });
            console.log('Deleted order:', deletedOrder);
            return deletedOrder;
        }
        catch (error) {
            console.error('Error deleting order:', error);
            throw new Error('Order could not be deleted. Please check for related data.');
        }
    }
    async orderDone(orderId, dto) {
        var _a;
        try {
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    updatedAt: new Date(),
                    actualStatus: client_1.Status.DONE,
                },
            });
            const customerContacts = (_a = dto.customerContacts) === null || _a === void 0 ? void 0 : _a.map((contact) => ({
                contactAttemptOn: contact.contactAttemptOn,
                contactPersonCustomer: contact.contactPersonCustomer,
                agentCP: contact.agentCP,
                result: contact.result,
                remark: contact.remark,
            }));
            const doneEntry = await this.prisma.done.create({
                data: {
                    orderstatusType: client_1.Status.DONE,
                    setOn: dto.setOn,
                    isChecked: dto.isChecked,
                    Order: {
                        connect: {
                            id: orderId,
                        },
                    },
                    customerContacts: {
                        create: customerContacts,
                    },
                },
            });
            return doneEntry;
        }
        catch (error) {
            console.error('Error creating `done` entry:', error);
            return null;
        }
    }
    async getStatusById(statusId, type) {
        if (type === 'received') {
            return this.prisma.received.findFirst({
                where: { id: statusId },
            });
        }
        if (type === 'planned') {
            return this.prisma.planned.findFirst({
                where: { id: statusId },
            });
        }
        if (type === 'Done') {
            return this.prisma.done.findFirst({
                where: { id: statusId },
            });
        }
        if (type === 'notPossible') {
            return this.prisma.notPossible.findFirst({
                where: { id: statusId },
            });
        }
        if (type === 'postponed') {
            return this.prisma.postponed.findFirst({
                where: { id: statusId },
            });
        }
        if (type === 'cancelled') {
            return this.prisma.cancelled.findFirst({
                where: { id: statusId },
            });
        }
        if (type === 'rejected') {
            return this.prisma.rejected.findFirst({
                where: { id: statusId },
            });
        }
        if (type === 'closedContractPartner') {
            return this.prisma.closedContractPartner.findFirst({
                where: { id: statusId },
            });
        }
    }
    async synchroniseWithIsta(status, type) {
        if (type === 'received') {
        }
    }
};
IstaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IstaService);
exports.IstaService = IstaService;
//# sourceMappingURL=ista.service.js.map