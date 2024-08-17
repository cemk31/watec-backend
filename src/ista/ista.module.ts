import { Module } from "@nestjs/common";
import { IstaService } from "./ista.service";
import { IstaController } from "./ista.controller";
import { IstaHelperService } from "./ista.helper.service";

@Module({
    controllers: [IstaController],
    providers: [IstaService, IstaHelperService],
  })
  export class IstaModule {}