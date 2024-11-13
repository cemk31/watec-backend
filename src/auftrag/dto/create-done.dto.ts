import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class DoneDto {
  @IsInt()
  orderId: number;

  @IsOptional()
  @IsString()
  orderstatusType?: string;

  @IsOptional()
  @IsBoolean()
  isChecked: boolean;

  @IsBoolean()
  @IsOptional()
  done: boolean;
}
