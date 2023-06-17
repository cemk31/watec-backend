import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsOptional } from "class-validator";
import { EnvelopeDto } from "./EnvelopeDto";

export class BodyDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsInt()
    id: number;
  
    @ApiProperty({ type: () => EnvelopeDto })
    @IsOptional()
    envelope?: EnvelopeDto;
  }