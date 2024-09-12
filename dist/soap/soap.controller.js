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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoapController = void 0;
const common_1 = require("@nestjs/common");
const soap_service_1 = require("./soap.service");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const soapReceveidDTO_1 = require("../ista/dto/soapReceveidDTO");
const decorator_1 = require("../auth/decorator");
const axios_1 = require("axios");
let SoapController = class SoapController {
    constructor(soapService) {
        this.soapService = soapService;
    }
    async polling(body, user) {
        const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ins="http://www.ista.com/DrinkingWaterSystem/InstallationService" xmlns:com="http://www.ista.com/CommonTypes">
      <soapenv:Header/>
      <soapenv:Body>
        <ins:pollInstallationOrdersRequest>
          <com:environment>Development</com:environment>
          <com:language>EN</com:language>
          <com:consumer>soapUI</com:consumer>
        </ins:pollInstallationOrdersRequest>
      </soapenv:Body>
    </soapenv:Envelope>
    `;
        const config = {
            headers: {
                'Content-Type': 'text/xml',
            },
            auth: {
                username: 'DWS_WATEC',
                password: 'V9RkJb0eq7dpvQcgP2IG8DF1yufxaEznrNoKM6ZO',
            },
        };
        try {
            const response = await axios_1.default.post('https://services-test.ista.com/DrinkingWaterSystem/InstallationService', soapBody, config);
            console.log(response.data);
        }
        catch (error) {
            console.error('Fehler beim Senden des SOAP-Requests:', error);
        }
    }
};
__decorate([
    (0, common_1.Post)('/planned'),
    (0, swagger_1.ApiConsumes)('application/json', 'application/xml', 'text/xml', 'application/soap+xml'),
    (0, swagger_1.ApiProduces)('application/json', 'application/xml', 'text/xml', 'application/soap+xml'),
    (0, swagger_1.ApiOperation)({ summary: 'Report Order Status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successful operation' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [soapReceveidDTO_1.SoapEnvelopeDto, Object]),
    __metadata("design:returntype", Promise)
], SoapController.prototype, "polling", null);
SoapController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, swagger_1.ApiTags)('SOAP API'),
    (0, common_1.Controller)('soap'),
    __metadata("design:paramtypes", [soap_service_1.SoapService])
], SoapController);
exports.SoapController = SoapController;
//# sourceMappingURL=soap.controller.js.map