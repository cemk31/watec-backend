  import { ApiProperty } from "@nestjs/swagger";
  import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

  export class CustomerContactDto {
    
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    @IsNotEmpty()
    @IsDate()
    contactAttemptOn: Date;

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
