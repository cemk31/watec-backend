import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { SamplingPointDto } from "./SamplingPointDto";

export class SamplingPointsDto {
    @ApiProperty()
    @IsArray()
    samplingPoint: SamplingPointDto[];
  }