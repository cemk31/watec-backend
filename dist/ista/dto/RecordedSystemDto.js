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
exports.RecordedSystemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const ClosedContractPartnerDto_1 = require("./ClosedContractPartnerDto");
const DrinkingWaterFacilityDto_1 = require("./DrinkingWaterFacilityDto");
const PropertyDto_1 = require("./PropertyDto");
const ServiceDto_1 = require("./ServiceDto");
class RecordedSystemDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RecordedSystemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [DrinkingWaterFacilityDto_1.DrinkingWaterFacilityDto] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RecordedSystemDto.prototype, "drinkingWaterFacility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PropertyDto_1.PropertyDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PropertyDto_1.PropertyDto)
], RecordedSystemDto.prototype, "property", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ServiceDto_1.ServiceDto] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RecordedSystemDto.prototype, "services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ClosedContractPartnerDto_1.ClosedContractPartnerDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ClosedContractPartnerDto_1.ClosedContractPartnerDto)
], RecordedSystemDto.prototype, "closedContractPartner", void 0);
exports.RecordedSystemDto = RecordedSystemDto;
//# sourceMappingURL=RecordedSystemDto.js.map