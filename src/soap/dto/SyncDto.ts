import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Represents a synchronization data transfer object.
 */
export class SyncDto {
  @ApiProperty({})
  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date value: ${value}`);
    }
    return date;
  })
  lastSyncTime: Date;

  @ApiProperty({ example: 'RECEIVED', default: 'PLANNED' })
  @IsString()
  @IsOptional()
  @Type(() => String)
  statusType: string;

  @ApiProperty({ example: 'success', default: 'statusType' })
  @IsString()
  @IsOptional()
  @Type(() => String)
  syncStatus: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  statusId: number;

  @ApiProperty({ example: 'statusType', default: 'statusType' })
  @IsString()
  @IsOptional()
  @Type(() => String)
  syncError?: string;

  @ApiProperty({ example: 'statusType', default: 'statusType' })
  @IsString()
  @IsOptional()
  @Type(() => String)
  userEmail?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  userId: number;
}
