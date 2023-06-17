import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional } from "class-validator";
import { ContactDto } from "./ContactDto";

export class CancelledDto {
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
  
    @ApiProperty({ example: '020' })
    @IsNotEmpty()
    @IsString()
    statusType: string;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    setOn: Date;
  
    @ApiProperty({ type: [ContactDto] })
    @IsNotEmpty()
    @Type(() => ContactDto)
    contact: ContactDto[];
  
    @ApiProperty({ example: 'Cancellation Reason' })
    @IsOptional()
    @IsString()
    cancellationReason?: string;
  }