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
exports.RequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const BodyDto_1 = require("./BodyDto");
const CancelledDto_1 = require("./CancelledDto");
const NotPossibleDto_1 = require("./NotPossibleDto");
const PlannedDto_1 = require("./PlannedDto");
const PostponedDto_1 = require("./PostponedDto");
const ReceivedDto_1 = require("./ReceivedDto");
const RejectedDto_1 = require("./RejectedDto");
class RequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RequestDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => BodyDto_1.BodyDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", BodyDto_1.BodyDto)
], RequestDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Development' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestDto.prototype, "environment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DE' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'soapUI' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestDto.prototype, "consumer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => RejectedDto_1.RejectedDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", RejectedDto_1.RejectedDto)
], RequestDto.prototype, "rejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => NotPossibleDto_1.NotPossibleDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", NotPossibleDto_1.NotPossibleDto)
], RequestDto.prototype, "notPossible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PostponedDto_1.PostponedDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PostponedDto_1.PostponedDto)
], RequestDto.prototype, "postponed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => CancelledDto_1.CancelledDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CancelledDto_1.CancelledDto)
], RequestDto.prototype, "cancelled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PlannedDto_1.PlannedDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PlannedDto_1.PlannedDto)
], RequestDto.prototype, "planned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ReceivedDto_1.received }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ReceivedDto_1.received)
], RequestDto.prototype, "received", void 0);
exports.RequestDto = RequestDto;
//# sourceMappingURL=RequestDto.js.map