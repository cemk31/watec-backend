import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsDate, IsOptional, IsNumber } from "class-validator";
import { CustomerContactDto } from "./CustomerContactDto";
import { OrderDto } from "./ista.order.dto";
import { Transform, TransformFnParams } from 'class-transformer';

export class PlannedDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id: number;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    orderId: number;
  
    @ApiProperty({ example: 'Order Status' })
    @IsOptional()
    @IsString()
    orderstatusType: string;
  
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    @Transform(({ value }: TransformFnParams) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date value: ${value}`);
      }
      return date;
    })
    setOn: Date;
  
    @ApiProperty({ type: () => [CustomerContactDto] })
    @IsOptional()
    customerContact: CustomerContactDto[];
  
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    @Transform(({ value }: TransformFnParams) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date value: ${value}`);
      }
      return date;
    })
    detailedScheduleDate: Date;
  
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    @Transform(({ value }: TransformFnParams) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date value: ${value}`);
      }
      return date;
    })
    detailedScheduleTimeFrom?: Date;
  
    
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    @Transform(({ value }: TransformFnParams) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date value: ${value}`);
      }
      return date;
    })
    detailedScheduleTimeTo?: Date;
  
    @ApiProperty({ example: 'Delay Reason' })
    @IsOptional()
    @IsString()
    detailedScheduleDelayReason?: string;
  
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    requestId: number;
  }