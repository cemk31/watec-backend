import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'; // Importiere HttpCode und HttpStatus
import { ApiTags } from '@nestjs/swagger'; // Swagger-Dekorator
import { JwtGuard } from 'src/auth/guard'; // JWT-Guard für Authentifizierung
import { SupportDTO } from './dto/supportDTO';
import { SupportService } from './support.service';

@UseGuards(JwtGuard) // Schützt die Route mit JWT
@ApiTags('Support API') // Fügt den Endpunkt in Swagger unter "Support API" hinzu
@Controller('support') // Endpunkt unter /support
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Stellt sicher, dass ein 201-Status zurückgegeben wird
  async sendSupport(@Body() dto: SupportDTO) {
    await this.supportService.sendSupportEmail(dto); // E-Mail senden
    return { message: 'Supportanfrage erfolgreich gesendet!' }; // Rückgabe einer Bestätigungsnachricht
  }
}
