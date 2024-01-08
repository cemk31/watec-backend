import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/adresse/dto/create-address.dto';

export class CreateAuftraggeberDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    auftraggebername: string;
  
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
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
