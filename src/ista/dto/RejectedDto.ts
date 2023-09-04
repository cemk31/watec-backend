import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsDate, IsString, IsOptional } from "class-validator";
import { ContactDto } from "./ContactDto";

export class RejectedDto {
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
  
    @ApiProperty({ example: 20 })
    @IsOptional()
    @IsNumber()
    statusType: number;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    setOn: Date;
  
    @ApiProperty({ type: [ContactDto] })
    @IsOptional()
    @Type(() => ContactDto)
    contact: ContactDto[];
  
    @ApiProperty({ example: 'Rejection Reason' })
    @IsNotEmpty()
    @IsString()
    reason: string;
  
    @ApiProperty({ example: 'Rejection Reason Text' })
    @IsOptional()
    @IsString()
    reasonText?: string;
  }