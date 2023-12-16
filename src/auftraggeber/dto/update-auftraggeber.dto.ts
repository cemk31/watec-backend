import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsEmail } from "class-validator";

export class UpdateAuftraggeberDto {
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