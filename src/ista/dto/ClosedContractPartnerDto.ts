import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { ContactDto } from './ContactDto';
import { RecordedSystemDto } from './RecordedSystemDto';
import { ReportOrderStatusRequestDto } from './ReportOrderStatusRequestDto';
import { SuppliedDocumentsDto } from './SuppliedDocumentsDto';
import { CustomerContactDto } from './CustomerContactDto';
import { ServiceDto } from './ServiceDto';

export class ClosedContractPartnerDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 40 })
  @IsOptional()
  @IsNumber()
  orderstatusType: number;

  @ApiProperty({ example: '2023-06-16' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  setOn: Date = new Date();

  @ApiProperty({ type: () => [CustomerContactDto] })
  @IsOptional()
  @IsArray()
  customerContacts: CustomerContactDto[];

  @ApiProperty({ example: 'Deficiency Description' })
  @IsOptional()
  @IsString()
  deficiencyDescription?: string;

  @ApiProperty({ example: 'Expenditure Reason' })
  @IsOptional()
  @IsString()
  extraordinaryExpenditureReason?: string;

  @ApiProperty({})
  @IsOptional()
  @Type(() => SuppliedDocumentsDto)
  suppliedDocuments: SuppliedDocumentsDto[];

  @ApiProperty({ example: '2023-06-16' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  registrationHealthAuthoritiesOn: Date;

  @ApiProperty({ type: () => [RecordedSystemDto] })
  @IsOptional()
  recordedSystem: RecordedSystemDto[];

  @ApiProperty({ type: () => [ReportOrderStatusRequestDto] })
  @IsOptional()
  reportOrderStatusRequest: ReportOrderStatusRequestDto[];

  @ApiProperty({ type: [ContactDto] })
  @IsOptional()
  contact: ContactDto[];

  @ApiProperty({ type: () => [ServiceDto] })
  @IsOptional()
  services?: ServiceDto[];
}
