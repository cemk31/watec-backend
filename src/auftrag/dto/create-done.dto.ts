import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class DoneDto {
    @IsInt()
    orderId: number;
  
    @IsOptional()
    @IsString()
    orderstatusType?: string;
  
    @IsOptional()
    @IsString()
    executionOnSiteDoneReason?: string;
  
    @IsBoolean()
    done: boolean;
}
