import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { CustomerContact } from '@prisma/client';
import { CustomerContactDto } from './CustomerContactDto';

export class ExecutionOnSiteNotPossibleDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  requestId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 'statusType' })
  @IsOptional()
  @IsString()
  statusType: string;

  @ApiProperty({ example: '2023-06-16' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  setOn: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => CustomerContactDto)
  customerContacts: CustomerContact[];

  @ApiProperty({ example: 'Remark External' })
  @IsOptional()
  @IsString()
  remarkExternal?: string;

  @ApiProperty({ example: '003' })
  @IsOptional()
  @IsString()
  nonExecutionReason?: string;
}
