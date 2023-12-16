import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsDate, IsNumber, IsDecimal } from 'class-validator';

export class CreateAuftragsBestaetigungDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  auftragbestatigung?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  vwBestatigung?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  terminiertZum?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  uhrzeit?: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  aushang?: boolean;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  datumAushang?: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  agInformiert?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  bgb?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  bgbBericht?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  ssa?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  bericht?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  umb?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  ber?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  reNr?: string;

  @IsOptional()
//   @IsDecimal()
  @ApiProperty()
  reBetrag?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  reErhalten?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  reNr2?: string;

  @IsOptional()
//   @IsDecimal()
  @ApiProperty()
  reBetrag2?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  reNr2Erhalten?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  dateien?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  mahnung?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  mahnung1?: boolean;

  @IsOptional()
  @ApiProperty()
  mahnungErhalten?: boolean;
}
