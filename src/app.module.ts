import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { IsarModule } from './isar/isar.module';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { AuftragModule } from './auftrag/auftrag.module';
import { existsSync } from 'fs';
import { join } from 'path';
import { CustomerModule } from './customer/customer.module';
import { AuftraggeberModule } from './auftraggeber/auftraggeber.module';
import { AdresseModule } from './adresse/adresse.module';
import { IstaModule } from './ista/ista.module';
import { HttpModule } from '@nestjs/axios';
import { XmlToJsonMiddleware } from './middleware/xml-to-json.middleware';
import { SoapM } from './soap/soap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigService available across the whole project
      envFilePath: getEnvFilePath(), // we'll define this function below
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    IsarModule,
    AuftragModule,
    CustomerModule,
    AuftraggeberModule,
    AdresseModule,
    IstaModule,
    HttpModule,
    SoapM,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XmlToJsonMiddleware).forRoutes({
      path: 'soap/reportOrderStatus',
      method: RequestMethod.POST,
    });
  }
}

// This function checks if the environment-specific .env file exists.
// If it does, it returns the path to that file. If it doesn't, it returns the path to the default .env file.
function getEnvFilePath() {
  const envFilePath = join(process.cwd(), `.env.${process.env.NODE_ENV}`);
  return existsSync(envFilePath) ? envFilePath : '.env';
}
