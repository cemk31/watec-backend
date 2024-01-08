import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateObjektDto {
  @IsOptional()
  @IsString()
  @ApiProperty({example: '12345'})
  liNr?: string;

  @IsOptional()
  @IsString()
  @ApiProperty( {example: 'Musterstrasse 11'})
  adresseLi?: string;

  @IsOptional()
  @IsString()
  @ApiProperty( {example: '49111'})
  plzLi?: string;

  @IsOptional()
  @IsString()
  @ApiProperty( {example: 'Musterstadt'})
  ortLi?: string;
}
