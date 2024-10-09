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
exports.PostponedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ContactDto_1 = require("./ContactDto");
class PostponedDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PostponedDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PostponedDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PostponedDto.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '020' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostponedDto.prototype, "statusType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-06-16' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PostponedDto.prototype, "setOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ContactDto_1.ContactDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => ContactDto_1.ContactDto),
    __metadata("design:type", Array)
], PostponedDto.prototype, "customerContacts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-06-17' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], PostponedDto.prototype, "nextContactAttemptOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Reason' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostponedDto.prototype, "postponedReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Remark External' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostponedDto.prototype, "remarkExternal", void 0);
exports.PostponedDto = PostponedDto;
//# sourceMappingURL=PostponedDto.js.map