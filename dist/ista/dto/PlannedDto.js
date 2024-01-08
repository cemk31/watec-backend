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
exports.PlannedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const CustomerContactDto_1 = require("./CustomerContactDto");
const class_transformer_1 = require("class-transformer");
class PlannedDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PlannedDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlannedDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Order Status' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannedDto.prototype, "orderstatusType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date value: ${value}`);
        }
        return date;
    }),
    __metadata("design:type", Date)
], PlannedDto.prototype, "setOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [CustomerContactDto_1.CustomerContactDto] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PlannedDto.prototype, "customerContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date value: ${value}`);
        }
        return date;
    }),
    __metadata("design:type", Date)
], PlannedDto.prototype, "detailedScheduleDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date value: ${value}`);
        }
        return date;
    }),
    __metadata("design:type", Date)
], PlannedDto.prototype, "detailedScheduleTimeFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date value: ${value}`);
        }
        return date;
    }),
    __metadata("design:type", Date)
], PlannedDto.prototype, "detailedScheduleTimeTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Delay Reason' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlannedDto.prototype, "detailedScheduleDelayReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlannedDto.prototype, "requestId", void 0);
exports.PlannedDto = PlannedDto;
//# sourceMappingURL=PlannedDto.js.map