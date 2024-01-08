import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsDate, IsOptional, IsString } from "class-validator";

export class ContactDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    id: number;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    contactAttemptOn: Date;

  
    @ApiProperty({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    contactPerson?: string;
  
    @ApiProperty({ example: 'Agent A' })
    @IsNotEmpty()
    @IsString()
    agentCP: string;
  
    @ApiProperty({ example: 'Result' })
    @IsNotEmpty()
    @IsString()
    result: string;
  
    @ApiProperty({ example: 'Remark' })
    @IsOptional()
    @IsString()
    remark?: string;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    notPossibleId: number;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    rejectedId: number;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    postponedId: number;
  
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    cancelledId: number;
  }