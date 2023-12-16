import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsArray, IsString } from "class-validator";
import { CustomerDTO } from "./CustomerDTO";
import { ReceivedDto } from "./ReceivedDto";

export class CreateCustomerOrderDTO {
  
    @ApiProperty({ example: '12345' })
    @IsOptional()
    @IsString()
    number: string;
  
    @ApiProperty({ example: 'Remark external', required: false })
    @IsOptional()
    @IsString()
    remarkExternal?: string;
    
    @ApiProperty({ type: () => [ReceivedDto] })
    @IsOptional()  // Fügt eine Überprüfung hinzu, dass das Array nicht leer sein sollte
    @IsArray()
    Received: ReceivedDto[];

    @ApiProperty({ type: () => CustomerDTO })
    @IsOptional()  // Fügt eine Überprüfung hinzu, dass das Objekt nicht leer sein sollte
    Customer: CustomerDTO;
}
