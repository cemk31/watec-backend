import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
    
  @ApiProperty()
  @IsString()
  ap: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  strasse: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  plz: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ort: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tel: string;
}
