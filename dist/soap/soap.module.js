"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoapM = void 0;
const common_1 = require("@nestjs/common");
const soap_controller_1 = require("./soap.controller");
const soap_service_1 = require("./soap.service");
const nestjs_soap_1 = require("nestjs-soap");
const user_service_1 = require("../user/user.service");
const soap_helper_service_1 = require("./soap.helper.service");
let SoapM = class SoapM {
};
SoapM = __decorate([
    (0, common_1.Module)({
        controllers: [soap_controller_1.SoapController],
        providers: [soap_service_1.SoapService, user_service_1.UserService, soap_helper_service_1.SoapHelperService],
        imports: [
            nestjs_soap_1.SoapModule.register({
                clientName: 'MY_SOAP_CLIENT',
                uri: 'http://10.49.139.248:18080/dws_webservices/InstallationServiceImpl?wsdl',
            }),
        ],
    })
], SoapM);
exports.SoapM = SoapM;
//# sourceMappingURL=soap.module.js.map