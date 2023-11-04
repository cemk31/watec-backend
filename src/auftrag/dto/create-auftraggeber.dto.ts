import { IsInt, IsOptional, IsString, IsDate, IsEmail, IsArray } from 'class-validator';

export class CreateAuftraggeberDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsString()
  ap?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  ort?: string;

  @IsOptional()
  @IsInt()
  plz?: number;

  @IsOptional()
  @IsString()
  strasse?: string;

  @IsOptional()
  @IsString()
  tel?: string;

  @IsOptional()
  @IsString()
  auftraggebername?: string;

  @IsOptional()
  @IsArray()
  auftraege?: any[]; // Typisieren Sie diese entsprechend Ihrer Auftrag-DTO-Klasse
}
