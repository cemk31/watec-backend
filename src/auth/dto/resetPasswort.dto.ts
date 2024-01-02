import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ResetPasswordDto {
@IsEmail()
@IsNotEmpty()
@ApiProperty()
    email: string;

@IsString()
@IsOptional()
@ApiProperty()
export class ResetPasswordDto {
    email: string;
    newPassword: string;
  }