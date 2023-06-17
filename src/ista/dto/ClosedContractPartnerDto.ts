import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsDate, IsOptional, IsString } from "class-validator";
import { ContactDto } from "./ContactDto";
import { RecordedSystemDto } from "./RecordedSystemDto";
import { ReportOrderStatusRequestDto } from "./ReportOrderStatusRequestDto";
import { SuppliedDocumentsDto } from "./SuppliedDocumentsDto";

export class ClosedContractPartnerDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    id: number;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    orderId: number;
  
    @ApiProperty({ example: 20 })
    @IsNotEmpty()
    @IsNumber()
    orderstatusType: number;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    setOn: Date;
  
    @ApiProperty({ type: [ContactDto] })
    @IsNotEmpty()
    @Type(() => ContactDto)
    customerContact: ContactDto[];
  
    @ApiProperty({ example: 'Deficiency Description' })
    @IsOptional()
    @IsString()
    deficiencyDescription?: string;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    registrationHealthAuthoritiesOn?: Date;
  
    @ApiProperty({ example: 'Expenditure Reason' })
    @IsOptional()
    @IsString()
    extraordinaryExpenditureReason?: string;
  
    @ApiProperty({ })
    @IsNotEmpty()
    @Type(() => SuppliedDocumentsDto)
    suppliedDocuments: SuppliedDocumentsDto[];
  
    @ApiProperty({ })
    @IsNotEmpty()
    @Type(() => RecordedSystemDto)
    recordedSystem: RecordedSystemDto[];
  
    @ApiProperty({ })
    @IsNotEmpty()
    @Type(() => ReportOrderStatusRequestDto)
    reportOrderStatusRequest: ReportOrderStatusRequestDto[];
  }