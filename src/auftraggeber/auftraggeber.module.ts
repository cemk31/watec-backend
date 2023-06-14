import { Module } from '@nestjs/common';
import { AuftraggeberController } from './auftraggeber.controller';
import { AuftraggeberService } from './auftraggeber.service';

@Module({
    controllers: [AuftraggeberController],
    providers: [AuftraggeberService]
})
export class AuftraggeberModule {}
