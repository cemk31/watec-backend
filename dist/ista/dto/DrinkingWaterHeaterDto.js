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
exports.DrinkingWaterHeaterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const UnitDto_1 = require("./UnitDto");
class DrinkingWaterHeaterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterHeaterDto.prototype, "consecutiveNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterHeaterDto.prototype, "inletTemperatureDisplayPresent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterHeaterDto.prototype, "inletTemperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterHeaterDto.prototype, "outletTemperatureDisplayPresent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterHeaterDto.prototype, "outletTemperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '100mm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrinkingWaterHeaterDto.prototype, "pipeDiameterOutlet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copper' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrinkingWaterHeaterDto.prototype, "pipeMaterialtypeOutlet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterHeaterDto.prototype, "volumeLitre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bathroom' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrinkingWaterHeaterDto.prototype, "roomType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterHeaterDto.prototype, "roomPosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Near window' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrinkingWaterHeaterDto.prototype, "positionDetail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UnitDto_1.UnitDto)
], DrinkingWaterHeaterDto.prototype, "unit", void 0);
exports.DrinkingWaterHeaterDto = DrinkingWaterHeaterDto;
//# sourceMappingURL=DrinkingWaterHeaterDto.js.map