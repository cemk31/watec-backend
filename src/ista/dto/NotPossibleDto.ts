import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional } from "class-validator";
import { ContactDto } from "./ContactDto";

export class NotPossibleDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    id: number;
  
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    requestId: number;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    orderId: number;
  
    @ApiProperty({ example: 'statusType' })
    @IsOptional()
    @IsString()
    statusType: string;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    setOn: Date;
  
    @ApiProperty()
    @IsOptional()
    @Type(() => ContactDto)
    contact: ContactDto[];
  }