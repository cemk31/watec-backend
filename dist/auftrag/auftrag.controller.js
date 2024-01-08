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
exports.AuftragController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const auftrag_service_1 = require("./auftrag.service");
const create_auftrag_dto_1 = require("./dto/create-auftrag.dto");
const swagger_1 = require("@nestjs/swagger");
let AuftragController = class AuftragController {
    constructor(auftragService) {
        this.auftragService = auftragService;
    }
    create(createAuftragDto) {
        return this.auftragService.createAuftrag(createAuftragDto);
    }
    findAll() {
        return this.auftragService.getAllAuftraege();
    }
    findOne(id) {
        return this.auftragService.getSingleAuftrag(+id);
    }
    remove(id) {
        return this.auftragService.deleteAuftrag(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Auftrag' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auftrag_dto_1.CreateAuftragDTO]),
    __metadata("design:returntype", void 0)
], AuftragController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all Auftraege' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuftragController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a single Auftrag by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuftragController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an Auftrag' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuftragController.prototype, "remove", null);
AuftragController = __decorate([
    (0, swagger_1.ApiTags)('Auftrag'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('auftrag'),
    __metadata("design:paramtypes", [auftrag_service_1.AuftragService])
], AuftragController);
exports.AuftragController = AuftragController;
//# sourceMappingURL=auftrag.controller.js.map