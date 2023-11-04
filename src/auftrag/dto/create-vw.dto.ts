import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateVwDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  vwBuro?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  vwMa?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  mailadresseVw?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  telVw?: string;
}
