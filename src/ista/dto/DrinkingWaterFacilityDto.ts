import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';
import { AscendingPipeDto } from './AscendingPipeDto';
import { DrinkingWaterHeaterDto } from './DrinkingWaterHeaterDto';
import { RecordedSystemDto } from './RecordedSystemDto';
import { SamplingPointDto } from './SamplingPointDto';

export class DrinkingWaterFacilityDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty({ example: 101 })
  @IsNotEmpty()
  @IsInt()
  consecutiveNumber: number;

  @ApiProperty({ example: 'Residential' })
  @IsOptional()
  @IsString()
  usageType: string;

  @ApiProperty({ example: 'Other usage' })
  @IsOptional()
  @IsString()
  usageTypeOthers: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsInt()
  numberSuppliedUnits: number;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsInt()
  numberDrinkingWaterHeater: number;

  @ApiProperty({ example: 500 })
  @IsOptional()
  @IsInt()
  totalVolumeLitres: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  pipingSystemType_Circulation: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  pipingSystemType_Waterbranchline: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  pipingSystemType_Pipetraceheater: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  pipingVolumeGr3Litres: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  deadPipeKnown: boolean;

  //Enumeration left or right
  @ApiProperty({ example: 'Position of dead pipes' })
  @IsOptional()
  @IsString()
  deadPipesPosition: string;

  @ApiProperty({ example: 22 })
  @IsOptional()
  @IsInt()
  numberAscendingPipes: number;

  @ApiProperty({ example: 'Explanation for aerosol formation' })
  @IsOptional()
  @IsString()
  explanation: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsInt()
  numberSuppliedPersons: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  aerosolformation: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  pipeworkSchematicsAvailable: boolean;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsInt()
  numberColdWaterLegs: number;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsInt()
  numberHotWaterLegs: number;

  @ApiProperty({ example: 60 })
  @IsOptional()
  @IsInt()
  temperatureCirculationDWH_A: number;

  @ApiProperty({ example: 60 })
  @IsOptional()
  @IsInt()
  temperatureCirculationDWH_B: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  heatExchangerSystem_central: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  heatExchangerSystem_districtheating: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  heatExchangerSystem_continuousflowprinciple: boolean;

  @ApiProperty({ type: () => DrinkingWaterHeaterDto })
  @IsOptional()
  drinkingWaterHeaters: DrinkingWaterHeaterDto[];

  @ApiProperty({ type: () => AscendingPipeDto })
  @IsOptional()
  ascendingPipes: AscendingPipeDto[];

  @ApiProperty({ type: () => SamplingPointDto })
  @IsOptional()
  samplingPoints: SamplingPointDto[];

  // @ApiProperty({ type: [RecordedSystemDto] })
  // @IsOptional()
  // recordedSystems: RecordedSystemDto[];
}
