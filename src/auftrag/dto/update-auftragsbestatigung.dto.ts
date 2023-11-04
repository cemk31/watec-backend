import { IsBoolean, IsOptional, IsString, IsDate, IsNumber, IsDecimal } from 'class-validator';

export class UpdateAuftragsBestaetigungDto {
  @IsOptional()
  @IsBoolean()
  auftragbestatigung?: boolean;

  @IsOptional()
  @IsString()
  vwBestatigung?: string;

  @IsOptional()
  @IsDate()
  terminiertZum?: Date;

  @IsOptional()
  @IsDate()
  uhrzeit?: Date;

  @IsOptional()
  @IsBoolean()
  aushang?: boolean;

  @IsOptional()
  @IsDate()
  datumAushang?: Date;

  @IsOptional()
  @IsBoolean()
  agInformiert?: boolean;

  @IsOptional()
  @IsBoolean()
  bgb?: boolean;

  @IsOptional()
  @IsBoolean()
  bgbBericht?: boolean;

  @IsOptional()
  @IsBoolean()
  ssa?: boolean;

  @IsOptional()
  @IsBoolean()
  bericht?: boolean;

  @IsOptional()
  @IsBoolean()
  umb?: boolean;

  @IsOptional()
  @IsBoolean()
  ber?: boolean;

  @IsOptional()
  @IsString()
  reNr?: string;

  @IsOptional()
  @IsDecimal()
  reBetrag?: number;

  @IsOptional()
  @IsBoolean()
  reErhalten?: boolean;

  @IsOptional()
  @IsString()
  reNr2?: string;

  @IsOptional()
  @IsDecimal()
  reBetrag2?: number;

  @IsOptional()
  @IsBoolean()
  reNr2Erhalten?: boolean;

  @IsOptional()
  @IsString()
  dateien?: string;

  @IsOptional()
  @IsBoolean()
  mahnung?: boolean;

  @IsOptional()
  @IsBoolean()
  mahnung1?: boolean;

  @IsOptional()
  @IsBoolean()
  mahnungErhalten?: boolean;
}
