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
import { CustomerDTO } from "src/customer/dto";

export class OrderDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    id: number;
  
    @ApiProperty({ example: '12345' })
    @IsOptional()
    @IsString()
    number: string;
  
    @ApiProperty({ example: 'Remark external', required: false })
    @IsOptional()
    @IsString()
    remarkExternal?: string;
  
    @ApiProperty({ example: '2023-06-16' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt: Date;
  
    @ApiProperty({ type: () => [OrderStatusDto] })
    @IsOptional()
    @IsArray()
    status: OrderStatusDto[];
  
    @ApiProperty({ type: () => [CustomerContactDto] })
    @IsOptional()
    @IsArray()
    CustomerContacts: CustomerContactDto[];
  
    @ApiProperty({ type: () => [NotPossibleDto] })
    @IsOptional()
    @IsArray()
    notPossible: NotPossibleDto[];
  
    @ApiProperty({ type: () => [PostponedDto] })
    @IsOptional()
    @IsArray()
    postponed: PostponedDto[];
  
    @ApiProperty({ type: () => [CancelledDto] })
    @IsOptional()
    @IsArray()
    cancelled: CancelledDto[];
  
    @ApiProperty({ type: () => [RejectedDto] })
    @IsOptional()
    @IsArray()
    rejected: RejectedDto[];
  
    @ApiProperty({ type: () => [ClosedContractPartnerDto] })
    @IsOptional()
    @IsArray()
    closedContractPartner: ClosedContractPartnerDto[];
  
    @ApiProperty({ type: () => [PlannedDto] })
    @IsOptional()
    @IsArray()
    planned: PlannedDto[];
  
    @ApiProperty({ type: () => [ReceivedDto] })
    @IsOptional()
    @IsArray()
    received: ReceivedDto[];

    @ApiProperty({ type: () => [] })
    @IsOptional()
    @IsArray()
    customer: CustomerDTO[];
  }

 

  

  

  

  

  



  

  

 

  

  



  





  

  

  

  

  

  
  



  

  