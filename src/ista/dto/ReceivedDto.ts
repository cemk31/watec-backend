import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CustomerContactDto } from './CustomerContactDto';
import { OrderDto } from './ista.order.dto';
import { Type } from 'class-transformer';

export class ReceivedDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 'Order Status', default: '007' })
  @IsOptional()
  @IsString()
  orderstatusType: string;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  setOn: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  @IsOptional()
  // @IsDate()
  contactAttemptOn: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  contactPersonCustomer?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  agentCP: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  result: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  @IsOptional()
  requestId: number;

  @ApiProperty({ type: () => [CustomerContactDto] })
  @IsOptional()
  customerContacts: CustomerContactDto[];
}
