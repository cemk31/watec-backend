import { Module } from "@nestjs/common";
import { IsarController } from "./isar.controller";
import { IsarService } from "./isar.service";

@Module({
    controllers: [IsarController],
    providers: [IsarService],
  })
  export class IsarModule {}