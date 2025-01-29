import { ClosedContractPartnerDto } from './ClosedContractPartnerDto';
import { DrinkingWaterFacilityDto } from './DrinkingWaterFacilityDto';
import { PropertyDto } from './PropertyDto';
import { ServiceDto } from './ServiceDto';
export declare class RecordedSystemDto {
    id: number;
    drinkingWaterFacility: DrinkingWaterFacilityDto[];
    property?: PropertyDto;
    services?: ServiceDto[];
    closedContractPartner?: ClosedContractPartnerDto;
}
