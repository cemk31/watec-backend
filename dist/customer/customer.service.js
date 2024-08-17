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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomerService = class CustomerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCustomer(userId, dto) {
        const customer = await this.prisma.customer.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                street: dto.street,
                zipCode: dto.zipCode,
                place: dto.place,
                country: dto.country,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
                objekt: {
                    create: dto.objekt,
                },
            },
        });
        return customer;
    }
    async getCustomers() {
        return this.prisma.customer.findMany({
            include: {
                orders: true,
            },
        });
    }
    async updateCustomer(userId, dto) {
        const customer = await this.prisma.customer.update({
            where: {
                id: userId,
            },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                street: dto.street,
                zipCode: dto.zipCode,
                place: dto.place,
                country: dto.country,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
            },
        });
        return customer;
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map