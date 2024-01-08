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
exports.OrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const CancelledDto_1 = require("./CancelledDto");
const ClosedContractPartnerDto_1 = require("./ClosedContractPartnerDto");
const CustomerContactDto_1 = require("./CustomerContactDto");
const NotPossibleDto_1 = require("./NotPossibleDto");
const OrderStatusDto_1 = require("./OrderStatusDto");
const PlannedDto_1 = require("./PlannedDto");
const PostponedDto_1 = require("./PostponedDto");
const ReceivedDto_1 = require("./ReceivedDto");
const RejectedDto_1 = require("./RejectedDto");
const dto_1 = require("../../customer/dto");
class OrderDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Remark external', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDto.prototype, "remarkExternal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-06-16' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], OrderDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [OrderStatusDto_1.OrderStatusDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [CustomerContactDto_1.CustomerContactDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "CustomerContacts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [NotPossibleDto_1.NotPossibleDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "notPossible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [PostponedDto_1.PostponedDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "postponed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [CancelledDto_1.CancelledDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "cancelled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [RejectedDto_1.RejectedDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "rejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ClosedContractPartnerDto_1.ClosedContractPartnerDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "closedContractPartner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [PlannedDto_1.PlannedDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "planned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ReceivedDto_1.ReceivedDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "received", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => dto_1.CustomerDTO }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", dto_1.CustomerDTO)
], OrderDto.prototype, "customer", void 0);
exports.OrderDto = OrderDto;
//# sourceMappingURL=ista.order.dto.js.map