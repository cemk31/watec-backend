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
exports.IstaHelperService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
let IstaHelperService = class IstaHelperService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async createService(dto, closedContractPartnerId) {
        var _a, _b, _c, _d, _e;
        const service = await this.prisma.service.create({
            data: {
                ClosedContractPartner: {
                    connect: {
                        id: closedContractPartnerId
                    }
                },
                articleNumber_ista: (dto === null || dto === void 0 ? void 0 : dto.articleNumber_ista) || null,
                quantity: (dto === null || dto === void 0 ? void 0 : dto.quantity) || null,
                unit: (dto === null || dto === void 0 ? void 0 : dto.unit) || null,
                extraordinaryExpenditure: (dto === null || dto === void 0 ? void 0 : dto.extraordinaryExpenditure) || null,
                purchasePrice_ista: (dto === null || dto === void 0 ? void 0 : dto.purchasePrice_ista) || null,
                warranty: (dto === null || dto === void 0 ? void 0 : dto.warranty) || false,
                serviceRenderedIn: {
                    create: {
                        street: ((_a = dto === null || dto === void 0 ? void 0 : dto.serviceRenderedIn) === null || _a === void 0 ? void 0 : _a.street) || null,
                        houseNumber: ((_b = dto === null || dto === void 0 ? void 0 : dto.serviceRenderedIn) === null || _b === void 0 ? void 0 : _b.streetnumber) || null,
                        postcode: ((_c = dto === null || dto === void 0 ? void 0 : dto.serviceRenderedIn) === null || _c === void 0 ? void 0 : _c.postcode) || null,
                        city: ((_d = dto === null || dto === void 0 ? void 0 : dto.serviceRenderedIn) === null || _d === void 0 ? void 0 : _d.city) || null,
                        country: ((_e = dto === null || dto === void 0 ? void 0 : dto.serviceRenderedIn) === null || _e === void 0 ? void 0 : _e.country) || null,
                    }
                }
            },
        });
        return service;
    }
    async createAddress(dto, serviceId) {
        return this.prisma.address.create({
            data: {
                street: (dto === null || dto === void 0 ? void 0 : dto.street) || null,
                houseNumber: (dto === null || dto === void 0 ? void 0 : dto.streetnumber) || null,
                postcode: (dto === null || dto === void 0 ? void 0 : dto.postcode) || null,
                city: (dto === null || dto === void 0 ? void 0 : dto.city) || null,
                country: (dto === null || dto === void 0 ? void 0 : dto.country) || null,
                Service: {
                    connect: {
                        id: serviceId
                    }
                }
            }
        });
    }
};
IstaHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], IstaHelperService);
exports.IstaHelperService = IstaHelperService;
//# sourceMappingURL=ista.helper.service.js.map