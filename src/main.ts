import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // JSON Body Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'text/xml' }));
  app.use(bodyParser.text({ type: 'application/soap+xml' }));
  // XML Body Parser
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
    console.log(`Request received: ${req.method} ${req.url}`);
    0;
    next();
  });

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://www.watec-admin-angular-fe.vercel.app',
      'https://www.watec-dashboard-dev.vercel.app',
    ],
    // credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('WATEC Backend')
    .setDescription(
      'WATEC-Backend API Description - Documentation generated on 05-10-2023',
    )
    .setVersion('1.0.0.')
    .addTag('WATEC', 'Endpoints related to the WATEC Backend Services')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .setContact('WATEC Support', 'https://spootech.com', 'cem@spootech.com')
    .setLicense('WATEC License', 'https://yourwebsite.com/license')
    .addServer('http://localhost:3000', 'Local Development Server')
    .addServer('https://watec-backend.vercel.app', 'Production Server')
    .addServer('https://watec-backend-dev.vercel.app', 'Development Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap();
