import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsDate, IsString, IsOptional } from "class-validator";
import { ContactDto } from "./ContactDto";

export class RejectedDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    id: number;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    requestId: number;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    orderId: number;
  
    @ApiProperty({ example: 20 })
    @IsNotEmpty()
    @IsNumber()
    statusType: number;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    setOn: Date;
  
    @ApiProperty({ type: [ContactDto] })
    @IsNotEmpty()
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