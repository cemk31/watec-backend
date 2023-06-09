import { IsOptional, IsString } from "class-validator";

export class CreateCustomerDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  street?: string;
  
  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  place?: string;

  @IsString()
  @IsOptional()
  country?: string;
}