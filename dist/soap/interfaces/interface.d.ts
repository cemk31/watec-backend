export interface AddressInput {
    street: string;
    streetnumber: string;
    postcode: string;
    city: string;
    country: string;
}
export interface BuildingInput {
    address: AddressInput;
}
export interface UnitInput {
    floor: number;
    storey: string;
    position: number;
    generalUnit: boolean;
    userName?: string;
    building: BuildingInput;
}
export interface ContactPersonInput {
    salutation: string;
    name: string;
    forename: string;
    telephone: string;
    telephoneMobile: string;
    role: string;
}
export interface DrinkingWaterHeaterInput {
    consecutiveNumber: number;
    inletTemperatureDisplayPresent: boolean;
    inletTemperature: number;
    outletTemperatureDisplayPresent: boolean;
    outletTemperature: number;
    pipeDiameterOutlet: string;
    pipeMaterialtypeOutlet: string;
    volumeLitre: number;
    roomType: string;
    roomPosition: number;
    unit: UnitInput;
}
export interface SamplingPointInput {
    consecutiveNumber: number;
    id_healthAuthorities: number;
    pipingSystemType: string;
    remoteSamplingPoint: boolean;
    roomType: string;
    roomPosition: number;
    unit: UnitInput;
}
export interface DrinkingWaterFacilityInput {
    consecutiveNumber: number;
    usageType: string;
    usageTypeOthers: string;
    numberSuppliedUnits: number;
    numberDrinkingWaterHeater: number;
    totalVolumeLitres: number;
    pipingSystemType_Circulation: boolean;
    pipingSystemType_Waterbranchline: boolean;
    pipingSystemType_Pipetraceheater: boolean;
    pipingVolumeGr3Litres: boolean;
    deadPipeKnown: boolean;
    numberAscendingPipes: number;
    aerosolformation: boolean;
    explanation: string;
    numberSuppliedPersons: number;
    pipeworkSchematicsAvailable: boolean;
    numberColdWaterLegs: number;
    numberHotWaterLegs: number;
    temperatureCirculationDWH_A: number;
    temperatureCirculationDWH_B: number;
    heatExchangerSystem_central: boolean;
    heatExchangerSystem_districtheating: boolean;
    heatExchangerSystem_continuousflowprinciple: boolean;
    drinkingWaterHeaters: DrinkingWaterHeaterInput[];
    ascendingPipes: any[];
    samplingPoints: SamplingPointInput[];
}
