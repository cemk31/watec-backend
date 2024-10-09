import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ContactDto } from './ContactDto';

export class CancelledDto {
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

  @ApiProperty({ example: '300' })
  @IsOptional()
  @IsString()
  statusType: string;

  @ApiProperty({ example: '2023-06-16' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  setOn: Date;

  @ApiProperty({ type: [ContactDto] })
  @IsOptional()
  @Type(() => ContactDto)
  contact: ContactDto[];

  @ApiProperty({ example: 'Cancellation Reason' })
  @IsNotEmpty()
  @IsString()
  cancellationReason: string;

  @ApiProperty({ example: 'Delay Reason' })
  @IsOptional()
  @IsString()
  remarkExternal?: string;
}
