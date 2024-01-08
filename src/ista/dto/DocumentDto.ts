import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ISuppliedDocuments, SuppliedDocumentsDto } from "./SuppliedDocumentsDto";

export class DocumentDto implements IDocument{
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    id: number;
  
    @ApiProperty({ example: 'Document Type' })
    @IsNotEmpty()
    @IsString()
    type: string;
  
    @ApiProperty({ example: 'Document Content' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ type: () => [SuppliedDocumentsDto] })
    suppliedDocuments?: ISuppliedDocuments[];
  }

  export interface IDocument {
    id: number;
    type: string;
    content: string;
    suppliedDocuments?: ISuppliedDocuments[];
  }