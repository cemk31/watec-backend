import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class UnitDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    floor: number;
  
    @ApiProperty({ example: 'First Floor' })
    @IsString()
    @IsOptional()
    storey: string;
  
    @ApiProperty({ example: 2 })
    @IsOptional()
    @IsInt()
    position: number;
  
    @ApiProperty({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    userName: string;
  
    @ApiProperty({ example: true })
    @IsBoolean()
    @IsOptional()
    generalUnit: boolean;
  
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    buildingId: number;
  }