import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional } from "class-validator";
import { ContactDto } from "./ContactDto";
import { RequestDto } from "./RequestDto";

export class PostponedDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    id: number;
  
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    requestId: number;
  
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    orderId: number;
  
    @ApiProperty({ example: '020' })
    @IsOptional()
    @IsString()
    statusType: string;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    setOn: Date;
  
    @ApiProperty({ type: [ContactDto] })
    @IsOptional()
    @Type(() => ContactDto)
    contact: ContactDto[];
  
    @ApiProperty({ example: '2023-06-17' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    nextContactAttemptOn: Date;
  
    @ApiProperty({ example: 'Reason' })
    @IsOptional()
    @IsString()
    postponedReason: string;

  }