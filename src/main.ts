import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import { AppModule } from "./app.module";
import * as serverless from 'serverless-http';

async function bootstrap() {
  if (process.env.IS_VERCEL) {
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
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.listen(3000);
  }
}
bootstrap();
