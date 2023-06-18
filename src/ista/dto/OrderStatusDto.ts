import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean, IsOptional } from "class-validator";

export class OrderStatusDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    id: number;
  
    @ApiProperty({ example: 'type' })
    @IsOptional()
    @IsString()
    type: string;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    setOn: Date;
  
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    executionOnSiteDone: boolean;
  
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    orderId: number;
  }