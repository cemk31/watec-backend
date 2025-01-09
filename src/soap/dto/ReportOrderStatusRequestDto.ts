import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class ReportOrderStatusRequestDto {
  @ApiProperty({ example: 'Development' })
  @IsString()
  environment: string;

  @ApiProperty({ example: 'English' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'Customer' })
  @IsString()
  consumer: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  closedContractPartnerId: number;
}
