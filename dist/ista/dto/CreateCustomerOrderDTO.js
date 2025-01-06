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
exports.CreateCustomerOrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const CustomerDTO_1 = require("./CustomerDTO");
const ReceivedDto_1 = require("./ReceivedDto");
class CreateCustomerOrderDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerOrderDTO.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Remark external', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerOrderDTO.prototype, "remarkExternal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ReceivedDto_1.received] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCustomerOrderDTO.prototype, "Received", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => CustomerDTO_1.CustomerDTO }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CustomerDTO_1.CustomerDTO)
], CreateCustomerOrderDTO.prototype, "Customer", void 0);
exports.CreateCustomerOrderDTO = CreateCustomerOrderDTO;
//# sourceMappingURL=CreateCustomerOrderDTO.js.map