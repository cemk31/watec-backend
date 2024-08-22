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
exports.ExecutionOnSiteNotPossibleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const CustomerContactDto_1 = require("./CustomerContactDto");
class ExecutionOnSiteNotPossibleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExecutionOnSiteNotPossibleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExecutionOnSiteNotPossibleDto.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExecutionOnSiteNotPossibleDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'statusType' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecutionOnSiteNotPossibleDto.prototype, "statusType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-06-16' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], ExecutionOnSiteNotPossibleDto.prototype, "setOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => CustomerContactDto_1.CustomerContactDto),
    __metadata("design:type", Array)
], ExecutionOnSiteNotPossibleDto.prototype, "customerContacts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Remark External' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecutionOnSiteNotPossibleDto.prototype, "remarkExternal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '003' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExecutionOnSiteNotPossibleDto.prototype, "nonExecutionReason", void 0);
exports.ExecutionOnSiteNotPossibleDto = ExecutionOnSiteNotPossibleDto;
//# sourceMappingURL=ExecutionOnSiteNotPossibleDto.js.map