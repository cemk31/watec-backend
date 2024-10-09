"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const bookmark_module_1 = require("./bookmark/bookmark.module");
const prisma_module_1 = require("./prisma/prisma.module");
const isar_module_1 = require("./isar/isar.module");
const auftrag_module_1 = require("./auftrag/auftrag.module");
const fs_1 = require("fs");
const path_1 = require("path");
const customer_module_1 = require("./customer/customer.module");
const auftraggeber_module_1 = require("./auftraggeber/auftraggeber.module");
const adresse_module_1 = require("./adresse/adresse.module");
const ista_module_1 = require("./ista/ista.module");
const axios_1 = require("@nestjs/axios");
const xml_to_json_middleware_1 = require("./middleware/xml-to-json.middleware");
const soap_module_1 = require("./soap/soap.module");
const support_module_1 = require("./support/support.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(xml_to_json_middleware_1.XmlToJsonMiddleware).forRoutes({
            path: 'soap/reportOrderStatus',
            method: common_1.RequestMethod.POST,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: getEnvFilePath(),
            }),
            support_module_1.SupportModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            bookmark_module_1.BookmarkModule,
            prisma_module_1.PrismaModule,
            isar_module_1.IsarModule,
            auftrag_module_1.AuftragModule,
            customer_module_1.CustomerModule,
            auftraggeber_module_1.AuftraggeberModule,
            adresse_module_1.AdresseModule,
            ista_module_1.IstaModule,
            axios_1.HttpModule,
            soap_module_1.SoapM,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
function getEnvFilePath() {
    const envFilePath = (0, path_1.join)(process.cwd(), `.env.${process.env.NODE_ENV}`);
    return (0, fs_1.existsSync)(envFilePath) ? envFilePath : '.env';
}
//# sourceMappingURL=app.module.js.map