import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsOptional } from "class-validator";
import { ClosedContractPartnerDto } from "./ClosedContractPartnerDto";
import { DrinkingWaterFacilityDto } from "./DrinkingWaterFacilityDto";
import { PropertyDto } from "./PropertyDto";
import { ServiceDto } from "./ServiceDto";

export class RecordedSystemDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id: number;
  
    @ApiProperty({ type: () => DrinkingWaterFacilityDto })
    @IsOptional()
    drinkingWaterFacility: DrinkingWaterFacilityDto;
  
    @ApiProperty({ type: () => PropertyDto })
    @IsOptional()
    property?: PropertyDto;
  
    @ApiProperty({ type: () => [ServiceDto] })
    @IsOptional()
    services: ServiceDto[];
  
    @ApiProperty({ type: () => ClosedContractPartnerDto })
    @IsOptional()
    closedContractPartner?: ClosedContractPartnerDto;
  }