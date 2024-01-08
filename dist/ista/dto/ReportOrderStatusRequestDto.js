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
exports.ReportOrderStatusRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ReportOrderStatusRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Development' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReportOrderStatusRequestDto.prototype, "environment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'English' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReportOrderStatusRequestDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Customer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReportOrderStatusRequestDto.prototype, "consumer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ReportOrderStatusRequestDto.prototype, "closedContractPartnerId", void 0);
exports.ReportOrderStatusRequestDto = ReportOrderStatusRequestDto;
//# sourceMappingURL=ReportOrderStatusRequestDto.js.map