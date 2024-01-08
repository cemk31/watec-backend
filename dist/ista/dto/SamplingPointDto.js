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
exports.SamplingPointDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SamplingPointDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SamplingPointDto.prototype, "consecutiveNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 456 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SamplingPointDto.prototype, "installationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 789 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SamplingPointDto.prototype, "numberObjectInstallationLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Waterbranchline' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SamplingPointDto.prototype, "pipingSystemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SamplingPointDto.prototype, "remoteSamplingPoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bathroom' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SamplingPointDto.prototype, "roomType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SamplingPointDto.prototype, "roomPosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Near sink' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SamplingPointDto.prototype, "positionDetail", void 0);
exports.SamplingPointDto = SamplingPointDto;
//# sourceMappingURL=SamplingPointDto.js.map