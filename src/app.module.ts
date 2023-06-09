import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
    AuftragModule
  ],
})
export class AppModule {
}

// This function checks if the environment-specific .env file exists. 
// If it does, it returns the path to that file. If it doesn't, it returns the path to the default .env file.
function getEnvFilePath() {
  const envFilePath = join(process.cwd(), `.env.${process.env.NODE_ENV}`);
  return existsSync(envFilePath) ? envFilePath : '.env';
}
