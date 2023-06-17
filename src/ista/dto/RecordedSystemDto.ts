import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsOptional } from "class-validator";
import { ClosedContractPartnerDto } from "./ClosedContractPartnerDto";
import { DrinkingWaterFacilityDto } from "./DrinkingWaterFacilityDto";
import { PropertyDto } from "./PropertyDto";
import { ServiceDto } from "./ServiceDto";

export class RecordedSystemDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsInt()
    id: number;
  
    @ApiProperty({ type: () => DrinkingWaterFacilityDto })
    @IsNotEmpty()
    drinkingWaterFacility: DrinkingWaterFacilityDto;
  
    @ApiProperty({ type: () => PropertyDto })
    @IsOptional()
    property?: PropertyDto;
  
    @ApiProperty({ type: () => [ServiceDto] })
    @IsNotEmpty()
    services: ServiceDto[];
  
    @ApiProperty({ type: () => ClosedContractPartnerDto })
    @IsOptional()
    closedContractPartner?: ClosedContractPartnerDto;
  }