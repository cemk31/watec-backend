import { Module } from "@nestjs/common";
import { IstaService } from "./ista.service";
import { IstaController } from "./ista.controller";

@Module({
    controllers: [IstaController],
    providers: [IstaService],
  })
  export class IstaModule {}