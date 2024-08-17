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
exports.DrinkingWaterFacilityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const AscendingPipeDto_1 = require("./AscendingPipeDto");
const DrinkingWaterHeaterDto_1 = require("./DrinkingWaterHeaterDto");
const SamplingPointDto_1 = require("./SamplingPointDto");
class DrinkingWaterFacilityDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "consecutiveNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Residential' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrinkingWaterFacilityDto.prototype, "usageType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Other usage' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrinkingWaterFacilityDto.prototype, "usageTypeOthers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "numberSuppliedUnits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "numberDrinkingWaterHeater", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "totalVolumeLitres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "pipingSystemType_Circulation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "pipingSystemType_Waterbranchline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "pipingSystemType_Pipetraceheater", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "pipingVolumeGr3Litres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "deadPipeKnown", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Position of dead pipes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrinkingWaterFacilityDto.prototype, "deadPipesPosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "numberAscendingPipes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Explanation for aerosol formation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrinkingWaterFacilityDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "numberSuppliedPersons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "aerosolformation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "pipeworkSchematicsAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "numberColdWaterLegs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "numberHotWaterLegs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "temperatureCirculationDWH_A", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DrinkingWaterFacilityDto.prototype, "temperatureCirculationDWH_B", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "heatExchangerSystem_central", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "heatExchangerSystem_districtheating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DrinkingWaterFacilityDto.prototype, "heatExchangerSystem_continuousflowprinciple", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => DrinkingWaterHeaterDto_1.DrinkingWaterHeaterDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DrinkingWaterFacilityDto.prototype, "drinkingWaterHeaters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => AscendingPipeDto_1.AscendingPipeDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DrinkingWaterFacilityDto.prototype, "ascendingPipes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => SamplingPointDto_1.SamplingPointDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DrinkingWaterFacilityDto.prototype, "samplingPoints", void 0);
exports.DrinkingWaterFacilityDto = DrinkingWaterFacilityDto;
//# sourceMappingURL=DrinkingWaterFacilityDto.js.map