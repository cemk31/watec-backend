import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsBoolean, IsOptional, IsNumber } from "class-validator";
import { AddressDto } from "./AddressDto";
import { isFloat32Array, isFloat64Array } from "util/types";

export class ServiceDto {
    @ApiProperty({ example: 123 })
    @IsInt()
    @IsOptional()
    @IsNumber()
    articleNumber_ista: number;
  
    @ApiProperty({ example: 5 })
    @IsInt()
    @IsOptional()
    @IsNumber()
    quantity: number;
  
    @ApiProperty({ example: 'kg' })
    @IsString()
    @IsOptional()
    unit: string;
  
    @ApiProperty({ example: true })
    @IsBoolean()
    @IsOptional()
    extraordinaryExpenditure: boolean;
  
    @ApiProperty({ example: 23.5 })
    @IsOptional()
    purchasePrice_ista: number;
  
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    warranty: boolean;
  
    @ApiProperty()
    @IsOptional()
    serviceRenderedIn: AddressDto;
  }