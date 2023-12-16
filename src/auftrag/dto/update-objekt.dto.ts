import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateObjektDto {
  @IsOptional()
  @IsString()
  liNr?: string;

  @IsOptional()
  @IsString()
  adresseLi?: string;

  @IsOptional()
  @IsString()
  plzLi?: string;

  @IsOptional()
  @IsString()
  ortLi?: string;
}
