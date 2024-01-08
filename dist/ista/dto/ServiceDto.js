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
exports.ServiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const AddressDto_1 = require("./AddressDto");
class ServiceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ServiceDto.prototype, "articleNumber_ista", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ServiceDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'kg' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ServiceDto.prototype, "extraordinaryExpenditure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23.5 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ServiceDto.prototype, "purchasePrice_ista", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ServiceDto.prototype, "warranty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AddressDto_1.AddressDto)
], ServiceDto.prototype, "serviceRenderedIn", void 0);
exports.ServiceDto = ServiceDto;
//# sourceMappingURL=ServiceDto.js.map