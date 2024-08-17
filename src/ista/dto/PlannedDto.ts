import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { CustomerContactDto } from './CustomerContactDto';
import { OrderDto } from './ista.order.dto';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import * as moment from 'moment';

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
  customerContacts: CustomerContactDto[];

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

  @ApiProperty({ example: '12:00:00' })
  @IsOptional()
  @IsString()
  detailedScheduleTimeFrom?: string;

  @ApiProperty({ example: '13:00:00' })
  @IsOptional()
  @IsString()
  detailedScheduleTimeTo?: string;

  @ApiProperty({ example: 'Delay Reason' })
  @IsOptional()
  @IsString()
  detailedScheduleDelayReason?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  requestId: number;

  @ApiProperty({ example: 'Delay Reason' })
  @IsOptional()
  @IsString()
  remarkExternal?: string;
}
