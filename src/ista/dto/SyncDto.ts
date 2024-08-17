import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

/**
 * Represents a synchronization data transfer object.
 */
export class SyncDto {
  @ApiProperty({})
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastSyncTime: Date;

  @ApiProperty({ example: 'RECEIVED', default: 'PLANNED' })
  @IsString()
  @Type(() => Text)
  statusType: string;

  @ApiProperty({ example: 'success', default: 'statusType' })
  @IsString()
  @IsOptional()
  @Type(() => Text)
  syncStatus: string;

  @ApiProperty({ example: 'statusType', default: 'statusType' })
  @IsString()
  @IsOptional()
  @Type(() => Text)
  syncError?: string;

  @ApiProperty({ example: 'statusType', default: 'statusType' })
  @IsString()
  @Type(() => Text)
  userEmail?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Text)
  userId: number;
}
