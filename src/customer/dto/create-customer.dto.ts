import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";
import { CreateObjektDto } from "src/auftrag/dto/create-objekt.dto";

export class CustomerDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'email' })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '+4912345678' })
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'lastname' })
  lastName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'firstname' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'street' })
  street?: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'zipCode' })
  zipCode?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'place' })
  place?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'country' })
  country?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: () => [CreateObjektDto] })
  objekt?: CreateObjektDto[];
}