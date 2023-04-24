import { IsDefined, IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateAddressDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  strasse: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  hausnummer: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  ort: string;

//   @IsOptional()
//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(2)
//   land?: string;
}