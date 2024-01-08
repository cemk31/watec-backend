import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt } from "class-validator";
import { BodyDto } from "./BodyDto";
import { HeaderDto } from "./HeaderDto";

export class EnvelopeDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsInt()
    id: number;
  
    @ApiProperty({ type: () => HeaderDto })
    @IsNotEmpty()
    header: HeaderDto;
  
    @ApiProperty({ type: () => BodyDto })
    @IsNotEmpty()
    body: BodyDto;
  }