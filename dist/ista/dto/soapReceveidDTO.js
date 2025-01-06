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
exports.SoapEnvelopeDto = exports.ReportOrderStatusRequestDto = exports.Received = exports.Order = exports.CustomerContact = void 0;
const swagger_1 = require("@nestjs/swagger");
class CustomerContact {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2020-09-09T16:27:05',
        description: 'Time of the contact attempt',
    }),
    __metadata("design:type", String)
], CustomerContact.prototype, "customerContactAttemptOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Max',
        description: 'Name of the contact person at the customer',
        required: false,
    }),
    __metadata("design:type", String)
], CustomerContact.prototype, "contactPersonCustomer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Agent a',
        description: 'Agent who made the contact attempt',
    }),
    __metadata("design:type", String)
], CustomerContact.prototype, "agentCP", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'APNE',
        description: 'Result of the contact attempt',
    }),
    __metadata("design:type", String)
], CustomerContact.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Bemerkung von Dorothy ü ö ä ß',
        description: 'Additional remarks',
        required: false,
    }),
    __metadata("design:type", String)
], CustomerContact.prototype, "remark", void 0);
exports.CustomerContact = CustomerContact;
class Order {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345', description: 'Order number' }),
    __metadata("design:type", String)
], Order.prototype, "number", void 0);
exports.Order = Order;
class Received {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Order, description: 'Order details' }),
    __metadata("design:type", Order)
], Received.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '007', description: 'Order status type' }),
    __metadata("design:type", String)
], Received.prototype, "orderstatusType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-01-01T00:00:00Z',
        description: 'Time when the status was set',
    }),
    __metadata("design:type", String)
], Received.prototype, "setOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [CustomerContact],
        description: 'List of customer contacts',
    }),
    __metadata("design:type", Array)
], Received.prototype, "customerContacts", void 0);
exports.Received = Received;
class ReportOrderStatusRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Development',
        description: 'Environment of the operation',
        default: 'Development',
    }),
    __metadata("design:type", String)
], ReportOrderStatusRequestDto.prototype, "environment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DE', description: 'Language used', default: 'DE' }),
    __metadata("design:type", String)
], ReportOrderStatusRequestDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'soapUI', description: 'Consumer of the service' }),
    __metadata("design:type", String)
], ReportOrderStatusRequestDto.prototype, "consumer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Received, description: 'Received data' }),
    __metadata("design:type", Received)
], ReportOrderStatusRequestDto.prototype, "received", void 0);
exports.ReportOrderStatusRequestDto = ReportOrderStatusRequestDto;
class SoapEnvelopeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Object,
        description: 'SOAP Envelope header',
        required: false,
    }),
    __metadata("design:type", Object)
], SoapEnvelopeDto.prototype, "soapenv:Header", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: ReportOrderStatusRequestDto,
        description: 'SOAP Body containing the request data',
    }),
    __metadata("design:type", Object)
], SoapEnvelopeDto.prototype, "soapenv:Body", void 0);
exports.SoapEnvelopeDto = SoapEnvelopeDto;
//# sourceMappingURL=soapReceveidDTO.js.map