import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ClosedContractPartnerDto } from "./ClosedContractPartnerDto";
import { DocumentDto, IDocument } from "./DocumentDto";

export class SuppliedDocumentsDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    id: number;
  
    @ApiProperty({ })
    @IsOptional()
    @Type(() => DocumentDto)
    document?: IDocument;
  
    @ApiProperty({ type: ClosedContractPartnerDto })
    @IsOptional()
    @Type(() => ClosedContractPartnerDto)
    closedContractPartner?: ClosedContractPartnerDto;
  
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    closedContractPartnerId?: number;
  
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    documentId?: number;
  }

  export interface ISuppliedDocuments {
    id: number;
    document?: IDocument;
  }