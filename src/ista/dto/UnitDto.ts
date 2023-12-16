import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsBoolean } from "class-validator";

export class UnitDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    floor: number;
  
    @ApiProperty({ example: 'First Floor' })
    @IsString()
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
    generalUnit: boolean;
  
    @ApiProperty({ example: 1 })
    @IsInt()
    buildingId: number;
  }