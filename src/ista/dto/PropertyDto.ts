import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsBoolean } from "class-validator";
import { RecordedSystemDto } from "./RecordedSystemDto";

export class PropertyDto {
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    hotwatersupplyType_central: boolean;
  
    @ApiProperty({ example: false })
    @IsOptional()
    @IsBoolean()
    hotwatersupplyType_decentral: boolean;
  
    @ApiProperty({ type: [RecordedSystemDto] })
    @IsOptional()
    recordedSystems: RecordedSystemDto[];
  }