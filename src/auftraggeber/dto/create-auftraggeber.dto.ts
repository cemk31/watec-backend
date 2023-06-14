import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/adresse/dto/create-address.dto';

export class CreateAuftraggeberDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly auftraggeber: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly ap: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly strasse: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly plz: number;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly ort: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly tel: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
