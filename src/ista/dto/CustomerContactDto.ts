import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class CustomerContactDto {
    @ApiProperty()
    @IsDate()
    customerContactAttemptOn: Date;
  
    @ApiProperty({ required: false })
    @IsString()
    contactPersonCustomer?: string;

  
    @ApiProperty()
    @IsString()
    agentCP: string;
  
    @ApiProperty()
    @IsString()
    result: string;
  
    @ApiProperty({ required: false })
    @IsString()
    remark?: string;
  }