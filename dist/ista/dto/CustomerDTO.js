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
exports.CustomerDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_objekt_dto_1 = require("../../auftrag/dto/create-objekt.dto");
class CustomerDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'firstName' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'lastName' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0176 1234567' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Musterstrasse 11' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '49082' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Musterstadt' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "place", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'info@muster-firma.de' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '01520 1234567' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "fax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Musterfirma' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Liegenschaftsnummer' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CustomerDTO.prototype, "propertyNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [create_objekt_dto_1.CreateObjektDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CustomerDTO.prototype, "objekt", void 0);
exports.CustomerDTO = CustomerDTO;
//# sourceMappingURL=CustomerDTO.js.map