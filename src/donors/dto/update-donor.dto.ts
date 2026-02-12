import { IsNumber, IsOptional } from 'class-validator';

export class UpdateDonorDto {
  @IsOptional()
  @IsNumber()
  purchase_price?: number;
}
