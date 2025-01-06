import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { IsBigInt } from 'class-validator-extended';
import { CreateObjektDto } from 'src/auftrag/dto/create-objekt.dto';

export class CustomerDTO {
  @ApiProperty({ example: 'firstName' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'lastName' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '0176 1234567' })
  @IsOptional()
  @IsString()
  phoneNumber?: string; // Umbenannt von phone

  @ApiProperty({ example: 'Musterstrasse 11' })
  @IsOptional()
  @IsString()
  street?: string; // Hinzugefügt

  @ApiProperty({ example: '49082' })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ example: 'Musterstadt' })
  @IsOptional()
  @IsString()
  place?: string; // Umbenannt von city

  @ApiProperty({ example: 'info@muster-firma.de' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'DE' })
  @IsOptional()
  @IsString()
  country?: string; // Hinzugefügt

  @ApiProperty({ example: '01520 1234567' })
  @IsOptional()
  @IsString()
  fax?: string;

  @ApiProperty({ example: 'Musterfirma' })
  @IsOptional()
  @IsString()
  companyName?: string; // Hinzugefügt, ersetzt company

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  propertyNumber?: number;

  @ApiProperty({ type: () => [CreateObjektDto] })
  @IsOptional()
  @IsArray()
  @IsOptional()
  objekt?: CreateObjektDto[];
}
