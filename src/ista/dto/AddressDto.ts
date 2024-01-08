import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class AddressDto {
    @ApiProperty({ example: 'Main St.' })
    @IsString()
    street: string;
  
    @ApiProperty({ example: '123A' })
    @IsOptional()
    @IsString()
    streetnumber: string;
  
    @ApiProperty({ example: '90210' })
    @IsString()
    postcode: string;
  
    @ApiProperty({ example: 'Los Angeles' })
    @IsString()
    city: string;
  
    @ApiProperty({ example: 'USA' })
    @IsOptional()
    @IsString()
    country: string;
  }