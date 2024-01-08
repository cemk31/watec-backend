import { IsOptional, IsString } from 'class-validator';

export class UpdateVwDto {
  @IsOptional()
  @IsString()
  vwBuro?: string;

  @IsOptional()
  @IsString()
  vwMa?: string;

  @IsOptional()
  @IsString()
  mailadresseVw?: string;

  @IsOptional()
  @IsString()
  telVw?: string;
}
