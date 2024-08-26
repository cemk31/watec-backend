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
exports.SoapController = void 0;
const common_1 = require("@nestjs/common");
const soap_service_1 = require("./soap.service");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
let SoapController = class SoapController {
    constructor(soapService) {
        this.soapService = soapService;
    }
};
SoapController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, swagger_1.ApiTags)('SOAP'),
    (0, common_1.Controller)('soap'),
    __metadata("design:paramtypes", [soap_service_1.SoapService])
], SoapController);
exports.SoapController = SoapController;
//# sourceMappingURL=soap.controller.js.map