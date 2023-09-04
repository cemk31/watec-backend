import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsDate, IsOptional, IsNumber } from "class-validator";
import { CustomerContactDto } from "./CustomerContactDto";
import { OrderDto } from "./ista.order.dto";

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
    setOn: Date;
  
    @ApiProperty({ type: () => [CustomerContactDto] })
    @IsOptional()
    customerContact: CustomerContactDto[];
  
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    detailedScheduleDate: Date;
  
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    detailedScheduleTimeFrom?: Date;
  
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
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