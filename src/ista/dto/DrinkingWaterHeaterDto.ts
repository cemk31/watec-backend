import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsBoolean, IsString } from "class-validator";
import { UnitDto } from "./UnitDto";

export class DrinkingWaterHeaterDto {
    @ApiProperty({ example: 123 })
    @IsInt()
    consecutiveNumber: number;
  
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    inletTemperatureDisplayPresent: boolean;
  
    @ApiProperty({ example: 25 })
    @IsOptional()
    @IsInt()
    inletTemperature: number;
  
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    outletTemperatureDisplayPresent: boolean;
  
    @ApiProperty({ example: 60 })
    @IsOptional()
    @IsInt()
    outletTemperature: number;
  
    @ApiProperty({ example: '100mm' })
    @IsOptional()
    @IsString()
    pipeDiameterOutlet: string;
  
    @ApiProperty({ example: 'Copper' })
    @IsOptional()
    @IsString()
    pipeMaterialtypeOutlet: string;
  
    @ApiProperty({ example: 500 })
    @IsOptional()
    @IsInt()
    volumeLitre: number;
  
    @ApiProperty({ example: 'Bathroom' })
    @IsOptional()
    @IsString()
    roomType: string;
  
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    roomPosition: number;
  
    @ApiProperty({ example: 'Near window' })
    @IsOptional()
    @IsString()
    positionDetail: string;
  
    @ApiProperty()
    unit: UnitDto;
  }