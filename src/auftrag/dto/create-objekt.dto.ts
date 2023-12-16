import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateObjektDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  liNr?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  adresseLi?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  plzLi?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  ortLi?: string;
}
