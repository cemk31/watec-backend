import { IsNotEmpty, IsOptional, IsString, IsISO8601, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  number: string;
}

class CustomerContactDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  customerContactAttemptOn: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contactPersonCustomer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  agentCP: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  result: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  remark: string;
}

export class ReportOrderStatusRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  environment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  consumer: string;

  @ApiProperty({ type: OrderDto })
  @ValidateNested()
  @Type(() => OrderDto)
  order: OrderDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderstatusType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  setOn: string;

  @ApiProperty({ type: [CustomerContactDto] })
  @ValidateNested({ each: true })
  @Type(() => CustomerContactDto)
  customerContacts: CustomerContactDto[];
}