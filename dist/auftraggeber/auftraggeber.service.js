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
exports.AuftraggeberService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuftraggeberService = class AuftraggeberService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAuftraggeber(userId, dto) {
        const auftraggeber = await this.prisma.auftraggeber.create({
            data: Object.assign(Object.assign({}, dto), { user: {
                    connect: {
                        id: userId,
                    },
                } }),
        });
        return auftraggeber;
    }
    async getAuftraggeber(id) {
        const auftraggeber = await this.prisma.auftraggeber.findUnique({
            where: { id: id },
        });
        if (!auftraggeber) {
            throw new common_1.NotFoundException(`Auftraggeber with ID ${id} not found`);
        }
        return auftraggeber;
    }
    async deleteAuftraggeber(id) {
        const auftraggeber = await this.prisma.auftraggeber.findUnique({
            where: { id: id },
        });
        if (!auftraggeber) {
            throw new common_1.NotFoundException(`Auftraggeber with ID ${id} not found`);
        }
        await this.prisma.auftraggeber.delete({
            where: { id: id },
        });
    }
    async updateAuftraggeber(id, updateAuftraggeberDto) {
        const auftraggeber = await this.prisma.auftraggeber.findUnique({
            where: { id: id },
        });
        if (!auftraggeber) {
            throw new common_1.NotFoundException(`Auftraggeber with ID ${id} not found`);
        }
        return this.prisma.auftraggeber.update({
            where: { id: id },
            data: updateAuftraggeberDto,
        });
    }
    async search(auftraggebername) {
        return this.prisma.auftraggeber.findMany({
            where: {
                auftraggebername: {
                    contains: auftraggebername,
                },
            },
        });
    }
    async getAllAuftraggeber() {
        return this.prisma.auftraggeber.findMany();
    }
};
AuftraggeberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuftraggeberService);
exports.AuftraggeberService = AuftraggeberService;
//# sourceMappingURL=auftraggeber.service.js.map