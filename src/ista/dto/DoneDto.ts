import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsDate,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { CustomerContactDto } from './CustomerContactDto';
import { OrderDto } from './ista.order.dto';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import * as moment from 'moment';

export class DoneDto {
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

  @ApiProperty({ type: () => [CustomerContactDto] })
  @IsOptional()
  customerContacts: CustomerContactDto[];

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isChecked: boolean;

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
}
