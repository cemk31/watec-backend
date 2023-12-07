import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import { AppModule } from "./app.module";
import * as serverless from 'serverless-http';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    const handler = serverless(server); // Pass the Express server instance here
    module.exports.main = async (req, res) => {
      return await handler(req, res);
    };
  } else {  // Assuming 'development'
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    // Use process.env.PORT if it's available, otherwise default to 3000
    const port = process.env.PORT || 3000;

    const config = new DocumentBuilder()
    .setTitle('WATEC Backend')
    .setDescription('WATEC-Backend API Description - Documentation generated on 05-10-2023')
    .setVersion('1.0.0.')
    .addTag('WATEC', 'Endpoints related to the WATEC Backend Services')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .setContact(
      'WATEC Support',
      'https://yourwebsite.com',
      'support@yourwebsite.com'
    )
    .setLicense('WATEC License', 'https://yourwebsite.com/license')
    // .addServer('http://localhost:3000/', 'Local Development Server')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
  }
}
bootstrap();
