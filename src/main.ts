import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://watec-admin-angular-fe.vercel.app',
        'https://watec-dashboard-dev.vercel.app',
        'http://localhost:4200',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
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
