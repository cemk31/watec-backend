import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEmail } from 'class-validator';


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
  @IsString()
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

  @ApiProperty({ example: 'Liegenschaftsnummer' })
  @IsOptional()
  @IsString()
  propertyNumber?: string;
}