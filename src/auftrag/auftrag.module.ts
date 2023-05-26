import { Module } from '@nestjs/common';
import { AuftragController } from './auftrag.controller';
import { AuftragService } from './auftrag.service';

@Module({
    controllers: [AuftragController],
    providers: [AuftragService]
  })
export class AuftragModule {}
