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
exports.AscendingPipeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AscendingPipeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AscendingPipeDto.prototype, "consecutiveNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AscendingPipeDto.prototype, "ascendingPipeTemperatureDisplayPresent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AscendingPipeDto.prototype, "flowTemperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AscendingPipeDto.prototype, "circulationTemperatureDisplayPresent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AscendingPipeDto.prototype, "circulationTemperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '100mm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AscendingPipeDto.prototype, "pipeDiameter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Copper' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AscendingPipeDto.prototype, "pipeMaterialtype", void 0);
exports.AscendingPipeDto = AscendingPipeDto;
//# sourceMappingURL=AscendingPipeDto.js.map