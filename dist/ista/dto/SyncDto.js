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
exports.SyncDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SyncDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], SyncDto.prototype, "lastSyncTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'StatusID of the status to be synchronized',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SyncDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'RECEIVED',
        default: 'PLANNED',
        description: 'StatusType of the status to be synchronized',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => Text),
    __metadata("design:type", String)
], SyncDto.prototype, "statusType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'success', default: 'statusType' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Text),
    __metadata("design:type", String)
], SyncDto.prototype, "syncStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'statusType', default: 'statusType' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Text),
    __metadata("design:type", String)
], SyncDto.prototype, "syncError", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'statusType', default: 'statusType' }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Type)(() => Text),
    __metadata("design:type", String)
], SyncDto.prototype, "userEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Text),
    __metadata("design:type", Number)
], SyncDto.prototype, "userId", void 0);
exports.SyncDto = SyncDto;
//# sourceMappingURL=SyncDto.js.map