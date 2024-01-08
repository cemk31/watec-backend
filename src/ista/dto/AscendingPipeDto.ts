import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsBoolean, IsString } from "class-validator";

export class AscendingPipeDto {
    @ApiProperty({ example: 123 })
    @IsInt()
    consecutiveNumber: number;
  
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    ascendingPipeTemperatureDisplayPresent: boolean;
  
    @ApiProperty({ example: 25 })
    @IsOptional()
    @IsInt()
    flowTemperature: number;
  
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    circulationTemperatureDisplayPresent: boolean;
  
    @ApiProperty({ example: 60 })
    @IsOptional()
    @IsInt()
    circulationTemperature: number;
  
    @ApiProperty({ example: '100mm' })
    @IsOptional()
    @IsString()
    pipeDiameter: string;
  
    @ApiProperty({ example: 'Copper' })
    @IsOptional()
    @IsString()
    pipeMaterialtype: string;
  }
