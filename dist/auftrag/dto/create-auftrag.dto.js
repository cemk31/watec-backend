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
exports.CreateAuftragDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_auftraggeber_dto_1 = require("./create-auftraggeber.dto");
const class_transformer_1 = require("class-transformer");
const create_auftragsbestatigung_dto_1 = require("./create-auftragsbestatigung.dto");
const create_objekt_dto_1 = require("./create-objekt.dto");
const create_vw_dto_1 = require("./create-vw.dto");
const create_email_dto_1 = require("./create-email.dto");
class CreateAuftragDTO {
    constructor() {
        this.done = false;
    }
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateAuftragDTO.prototype, "done", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreateAuftragDTO.prototype, "emailEingang", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuftragDTO.prototype, "bemerkung", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAuftragDTO.prototype, "vorgemerkt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: () => create_email_dto_1.CreateEmailDto }),
    __metadata("design:type", create_email_dto_1.CreateEmailDto)
], CreateAuftragDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateAuftragDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => create_objekt_dto_1.CreateObjektDto),
    __metadata("design:type", create_objekt_dto_1.CreateObjektDto)
], CreateAuftragDTO.prototype, "objekt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: () => create_auftragsbestatigung_dto_1.CreateAuftragsBestaetigungDto }),
    __metadata("design:type", create_auftragsbestatigung_dto_1.CreateAuftragsBestaetigungDto)
], CreateAuftragDTO.prototype, "auftragsbestaetigung", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: () => create_vw_dto_1.CreateVwDto }),
    __metadata("design:type", create_vw_dto_1.CreateVwDto)
], CreateAuftragDTO.prototype, "vwStatisch", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: () => create_vw_dto_1.CreateVwDto }),
    __metadata("design:type", create_vw_dto_1.CreateVwDto)
], CreateAuftragDTO.prototype, "vwDynamisch", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: () => create_auftraggeber_dto_1.CreateAuftraggeberDto }),
    __metadata("design:type", create_auftraggeber_dto_1.CreateAuftraggeberDto)
], CreateAuftragDTO.prototype, "auftraggeber", void 0);
exports.CreateAuftragDTO = CreateAuftragDTO;
//# sourceMappingURL=create-auftrag.dto.js.map