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
exports.SuppliedDocumentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ClosedContractPartnerDto_1 = require("./ClosedContractPartnerDto");
const DocumentDto_1 = require("./DocumentDto");
class SuppliedDocumentsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SuppliedDocumentsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => DocumentDto_1.DocumentDto),
    __metadata("design:type", Object)
], SuppliedDocumentsDto.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ClosedContractPartnerDto_1.ClosedContractPartnerDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => ClosedContractPartnerDto_1.ClosedContractPartnerDto),
    __metadata("design:type", ClosedContractPartnerDto_1.ClosedContractPartnerDto)
], SuppliedDocumentsDto.prototype, "closedContractPartner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SuppliedDocumentsDto.prototype, "closedContractPartnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SuppliedDocumentsDto.prototype, "documentId", void 0);
exports.SuppliedDocumentsDto = SuppliedDocumentsDto;
//# sourceMappingURL=SuppliedDocumentsDto.js.map