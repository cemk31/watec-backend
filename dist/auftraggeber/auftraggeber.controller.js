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
exports.AuftraggeberController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const create_auftraggeber_dto_1 = require("./dto/create-auftraggeber.dto");
const auftraggeber_service_1 = require("./auftraggeber.service");
const decorator_1 = require("../auth/decorator");
const update_auftraggeber_dto_1 = require("./dto/update-auftraggeber.dto");
let AuftraggeberController = class AuftraggeberController {
    constructor(auftraggeberService) {
        this.auftraggeberService = auftraggeberService;
    }
    create(userId, dto) {
        this.auftraggeberService.createAuftraggeber(userId, dto);
    }
    getAuftraggeber(id) {
        return this.auftraggeberService.getAuftraggeber(id);
    }
    deleteAuftraggeber(id) {
        return this.auftraggeberService.deleteAuftraggeber(id);
    }
    updateAuftraggeber(id, dto) {
        return this.auftraggeberService.updateAuftraggeber(id, dto);
    }
    search(auftraggeber) {
        return this.auftraggeberService.search(auftraggeber);
    }
    getAllAuftraggeber() {
        return this.auftraggeberService.getAllAuftraggeber();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create auftraggeber' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The auftraggeber has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input.' }),
    (0, swagger_1.ApiBody)({ type: create_auftraggeber_dto_1.CreateAuftraggeberDto }),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_auftraggeber_dto_1.CreateAuftraggeberDto]),
    __metadata("design:returntype", void 0)
], AuftraggeberController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get auftraggeber' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The auftraggeber has been successfully retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuftraggeberController.prototype, "getAuftraggeber", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete auftraggeber' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The auftraggeber has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuftraggeberController.prototype, "deleteAuftraggeber", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update auftraggeber' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The auftraggeber has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found.' }),
    (0, swagger_1.ApiBody)({ type: update_auftraggeber_dto_1.UpdateAuftraggeberDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_auftraggeber_dto_1.UpdateAuftraggeberDto]),
    __metadata("design:returntype", void 0)
], AuftraggeberController.prototype, "updateAuftraggeber", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search auftraggebers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The search has been successfully executed.' }),
    __param(0, (0, common_1.Query)('auftraggeber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuftraggeberController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all auftraggebers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The auftraggebers have been successfully retrieved.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuftraggeberController.prototype, "getAllAuftraggeber", null);
AuftraggeberController = __decorate([
    (0, swagger_1.ApiTags)('auftraggeber'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('auftraggeber'),
    __metadata("design:paramtypes", [auftraggeber_service_1.AuftraggeberService])
], AuftraggeberController);
exports.AuftraggeberController = AuftraggeberController;
//# sourceMappingURL=auftraggeber.controller.js.map