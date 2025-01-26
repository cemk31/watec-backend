"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const xml2js = require("xml2js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text({ type: 'text/xml' }));
    app.use(bodyParser.text({ type: 'application/soap+xml' }));
    app.use(bodyParser.text({ type: 'application/xml' }));
    app.use((req, res, next) => {
        if (req.headers['content-type'] === 'application/xml') {
            xml2js.parseString(req.body, (err, result) => {
                if (err) {
                    return res.status(400).send('Invalid XML');
                }
                req.body = result;
            });
        }
        next();
    });
    app.enableCors({
        origin: [
            'https://www.watec-admin-angular-fe.vercel.app',
            'https://www.watec-dashboard-dev.vercel.app',
            'http://localhost:4200',
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
        ],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('WATEC-Backend API')
        .setDescription('WATEC-Backend API Documentation')
        .setVersion('1.0.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .setContact('WATEC Support', 'https://spootech.com', 'cem@spootech.com')
        .addServer('http://localhost:3000', 'Local Development Server')
        .addServer('https://watec-backend.vercel.app', 'Production Server')
        .addServer('https://watec-backend-dev.vercel.app', 'Development Server')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
}
bootstrap();
//# sourceMappingURL=main.js.map