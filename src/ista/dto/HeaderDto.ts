import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';
import { EnvelopeDto } from './EnvelopeDto';

export class HeaderDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ type: () => EnvelopeDto })
  envelope: EnvelopeDto;
}
