import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { IsarModule } from './isar/isar.module';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { AuftragModule } from './auftrag/auftrag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
