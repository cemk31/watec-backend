"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'https://watec-admin-angular-fe.vercel.app',
                'https://watec-dashboard-dev.vercel.app',
                'http://localhost:4200',
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
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
        .setContact('WATEC Support', 'https://spootech.com', 'cem@spootech.com')
        .setLicense('WATEC License', 'https://yourwebsite.com/license')
        .addServer('http://localhost:3000', 'Local Development Server')
        .addServer('https://watec-backend.vercel.app', 'Production Server')
        .addServer('https://watec-backend-dev.vercel.app', 'Development Server')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map