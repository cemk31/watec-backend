import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsDate, IsNumber } from "class-validator";
import { CustomerContactDto } from "./CustomerContactDto";
import { OrderDto } from "./ista.order.dto";

export class ReceivedDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsInt()
    id: number;
  
    @ApiProperty({ type: () => OrderDto })
    @IsNotEmpty()
    order: OrderDto;
  
    @ApiProperty({ example: 'Order Status' })
    @IsNotEmpty()
    @IsString()
    orderstatusType: string;
  
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsNotEmpty()
    @IsDate()
    setOn: Date;
  
    @ApiProperty({ type: () => [CustomerContactDto] })
    @IsNotEmpty()
    customerContact: CustomerContactDto[];
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    requestId: number;
  }