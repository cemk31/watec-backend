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

  @ApiProperty({
    example: 1,
    description: 'StatusID of the status to be synchronized',
  })
  @IsInt()
  @Type(() => Number)
  statusId: number;

  @ApiProperty({
    example: 'RECEIVED',
    default: 'PLANNED',
    description: 'StatusType of the status to be synchronized',
  })
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
