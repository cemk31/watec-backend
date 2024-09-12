import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { BodyDto } from './BodyDto';
import { CancelledDto } from './CancelledDto';
import { NotPossibleDto } from './NotPossibleDto';
import { PlannedDto } from './PlannedDto';
import { PostponedDto } from './PostponedDto';
import { received } from './ReceivedDto';
import { RejectedDto } from './RejectedDto';

export class RequestDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ type: () => BodyDto })
  @IsOptional()
  body?: BodyDto;

  @ApiProperty({ example: 'Development' })
  @IsNotEmpty()
  @IsString()
  environment: string;

  @ApiProperty({ example: 'DE' })
  @IsNotEmpty()
  @IsString()
  language: string;

  @ApiProperty({ example: 'soapUI' })
  @IsNotEmpty()
  @IsString()
  consumer: string;

  @ApiProperty({ type: () => RejectedDto })
  @IsOptional()
  rejected?: RejectedDto;

  @ApiProperty({ type: () => NotPossibleDto })
  @IsOptional()
  notPossible?: NotPossibleDto;

  @ApiProperty({ type: () => PostponedDto })
  @IsOptional()
  postponed?: PostponedDto;

  @ApiProperty({ type: () => CancelledDto })
  @IsOptional()
  cancelled?: CancelledDto;

  @ApiProperty({ type: () => PlannedDto })
  @IsOptional()
  planned?: PlannedDto;

  @ApiProperty({ type: () => received })
  @IsOptional()
  received?: received;
}
