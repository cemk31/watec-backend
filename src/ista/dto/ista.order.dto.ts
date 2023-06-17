import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, IsDate, IsArray, IsBoolean, IsNumber, IsInt } from "class-validator";
import { CancelledDto } from "./CancelledDto";
import { ClosedContractPartnerDto } from "./ClosedContractPartnerDto";
import { CustomerContactDto } from "./CustomerContactDto";
import { NotPossibleDto } from "./NotPossibleDto";
import { OrderStatusDto } from "./OrderStatusDto";
import { PlannedDto } from "./PlannedDto";
import { PostponedDto } from "./PostponedDto";
import { ReceivedDto } from "./ReceivedDto";
import { RejectedDto } from "./RejectedDto";

export class OrderDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    id: number;
  
    @ApiProperty({ example: '12345' })
    @IsNotEmpty()
    @IsString()
    number: string;
  
    @ApiProperty({ example: 'Remark external', required: false })
    @IsOptional()
    @IsString()
    remarkExternal?: string;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    createdAt: Date;
  
    @ApiProperty({ type: () => [OrderStatusDto] })
    @IsNotEmpty()
    @IsArray()
    status: OrderStatusDto[];
  
    @ApiProperty({ type: () => [CustomerContactDto] })
    @IsNotEmpty()
    @IsArray()
    customerContacts: CustomerContactDto[];
  
    @ApiProperty({ type: () => [NotPossibleDto] })
    @IsNotEmpty()
    @IsArray()
    notPossible: NotPossibleDto[];
  
    @ApiProperty({ type: () => [PostponedDto] })
    @IsNotEmpty()
    @IsArray()
    postponed: PostponedDto[];
  
    @ApiProperty({ type: () => [CancelledDto] })
    @IsNotEmpty()
    @IsArray()
    cancelled: CancelledDto[];
  
    @ApiProperty({ type: () => [RejectedDto] })
    @IsNotEmpty()
    @IsArray()
    rejected: RejectedDto[];
  
    @ApiProperty({ type: () => [ClosedContractPartnerDto] })
    @IsNotEmpty()
    @IsArray()
    closedContractPartner: ClosedContractPartnerDto[];
  
    @ApiProperty({ type: () => [PlannedDto] })
    @IsNotEmpty()
    @IsArray()
    planned: PlannedDto[];
  
    @ApiProperty({ type: () => [ReceivedDto] })
    @IsNotEmpty()
    @IsArray()
    received: ReceivedDto[];
  }

 

  

  

  

  

  



  

  

 

  

  



  





  

  

  

  

  

  
  



  

  