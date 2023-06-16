import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsNotEmpty, IsArray } from "class-validator";

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

  export class OrderDto {
    @ApiProperty()
    @IsString()
    number: string;
  
    @ApiProperty({ required: false })
    @IsString()
    remarkExternal?: string;
  }

  export class OrderReceivedDto {
    @ApiProperty()
    @IsNotEmpty()
    order: OrderDto;
  
    @ApiProperty()
    @IsString()
    orderstatusType: string;
  
    @ApiProperty()
    @IsDate()
    setOn: Date;
  
    @ApiProperty({ type: [CustomerContactDto] })
    @IsArray()
    customerContacts: CustomerContactDto[];
  }
  
  export class OrderPlannedDto {
    @ApiProperty()
    @IsNotEmpty()
    order: OrderDto;
  
    @ApiProperty()
    @IsString()
    orderstatusType: string;
  
    @ApiProperty()
    @IsDate()
    setOn: Date;
  
    @ApiProperty({ type: [CustomerContactDto] })
    @IsArray()
    customerContacts: CustomerContactDto[];
  
    @ApiProperty()
    @IsDate()
    detailedScheduleDate: Date;
  
    @ApiProperty({ required: false })
    @IsDate()
    detailedScheduleTimeFrom?: Date;
  
    @ApiProperty({ required: false })
    @IsDate()
    detailedScheduleTimeTo?: Date;
  
    @ApiProperty({ required: false })
    @IsString()
    detailedScheduleDelayReason?: string;
  }