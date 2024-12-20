import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as xml2js from 'xml2js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
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
    allowedHeaders: '*',
    origin: '*',
  });

  // app.enableCors({
  //   origin: [
  //     'http://localhost:4200',
  //     'https://www.watec-admin-angular-fe.vercel.app',
  //     'https://www.watec-dashboard-dev.vercel.app',
  //   ],
  //   // credentials: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('WATEC-Backend API')
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
    .addServer('http://localhost:4000', 'Local Development Server')
    .addServer('https://watec-backend.vercel.app', 'Production Server')
    .addServer('https://watec-backend-dev.vercel.app', 'Development Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');

  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
}

bootstrap();
