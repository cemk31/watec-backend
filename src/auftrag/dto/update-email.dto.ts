import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateEmailDto {
  @IsOptional()
  @IsString()
  emailBetreff?: string;

  @IsOptional()
  @IsString()
  emailAnhang?: string;

  @IsOptional()
  @IsBoolean()
  bestatigungVersendet?: boolean;

  @IsOptional()
  @IsString()
  anfrageThema?: string;

  @IsOptional()
  @IsBoolean()
  anfrageBestatigt?: boolean;

  @IsOptional()
  @IsBoolean()
  angebotErstellt?: boolean;

  @IsOptional()
  @IsString()
  angebotsnummer?: string;

  @IsOptional()
  @IsString()
  angebot?: string;
}
