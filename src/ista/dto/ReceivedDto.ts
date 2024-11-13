import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CustomerContactDto } from './CustomerContactDto';

export class received {
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
  @IsDate()
  @Type(() => Date)
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
  requestId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  propertyNumber: number;

  @ApiProperty({ type: [CustomerContactDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerContactDto)
  customerContacts: CustomerContactDto[];
}
