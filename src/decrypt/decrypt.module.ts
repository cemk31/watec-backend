import { Module } from "@nestjs/common";
import { decryptController } from "./decrypt.controller";
import { DecryptService } from "./decrypt.service";
import { Cipher } from "crypto";

@Module({
    controllers: [decryptController],
    providers: [DecryptService,],
  })
export class DecryptModule {}