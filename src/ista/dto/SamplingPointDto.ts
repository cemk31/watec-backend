import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsBoolean } from "class-validator";

export class SamplingPointDto {
    @ApiProperty({ example: 123 })
    @IsInt()
    consecutiveNumber: number;
  
    @ApiProperty({ example: 456 })
    @IsOptional()
    @IsInt()
    installationNumber: number;
  
    @ApiProperty({ example: 789 })
    @IsOptional()
    @IsInt()
    numberObjectInstallationLocation: number;
  
    @ApiProperty({ example: 'Waterbranchline' })
    @IsOptional()
    @IsString()
    pipingSystemType: string;
  
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    remoteSamplingPoint: boolean;
  
    @ApiProperty({ example: 'Bathroom' })
    @IsOptional()
    @IsString()
    roomType: string;
  
    @ApiProperty({ example: 5 })
    @IsOptional()
    @IsInt()
    roomPosition: number;
  
    @ApiProperty({ example: 'Near sink' })
    @IsOptional()
    @IsString()
    positionDetail: string;
  }