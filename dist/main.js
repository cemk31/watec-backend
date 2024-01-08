"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const app_module_1 = require("./app.module");
const serverless = require("serverless-http");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
        const server = express();
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
        }));
        await app.init();
        const handler = serverless(server);
        module.exports.main = async (req, res) => {
            return await handler(req, res);
        };
    }
    else {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
        }));
        const port = process.env.PORT || 3000;
        const config = new swagger_1.DocumentBuilder()
            .setTitle('WATEC Backend')
            .setDescription('WATEC-Backend API Description - Documentation generated on 05-10-2023')
            .setVersion('1.0.0.')
            .addTag('WATEC', 'Endpoints related to the WATEC Backend Services')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
            .setContact('WATEC Support', 'https://yourwebsite.com', 'support@yourwebsite.com')
            .setLicense('WATEC License', 'https://yourwebsite.com/license')
            .addServer('http://localhost:3000/', 'Local Development Server')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        await app.listen(port);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map