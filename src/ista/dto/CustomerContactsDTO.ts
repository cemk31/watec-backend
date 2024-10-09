import { ApiProperty } from '@nestjs/swagger';
import { CustomerContactDto } from './CustomerContactDto';
import { IsOptional } from 'class-validator';

export class CustomerContactsDTO {
  @ApiProperty({ type: () => [CustomerContactDto] })
  @IsOptional()
  customerContact: CustomerContactDto[];
}
