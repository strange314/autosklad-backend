import { IsInt, IsOptional, IsString, MaxLength, Min, IsNumber } from 'class-validator';

export class CreatePartDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  auto_donor_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  oem_number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  internal_sku?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  condition?: string;

  @IsOptional()
  @IsNumber()
  current_price?: number;

  @IsOptional()
  @IsNumber()
  temp_price?: number;

  @IsOptional()
  @IsNumber()
  allocated_cost?: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  liquidity_color?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  storage_days?: number;
}
