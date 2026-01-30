import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListPartsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  perPage?: number = 20;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  condition?: string;

  @IsOptional()
  @IsString()
  liquidity_color?: string;

  @IsOptional()
  @IsString()
  liquidity?: string;

  @IsOptional()
  @IsInt()
  minDays?: number;

  @IsOptional()
  @IsInt()
  maxDays?: number;

  @IsOptional()
  @IsIn(['created_at', 'name', 'current_price', 'storage_days'])
  sort?: 'created_at' | 'name' | 'current_price' | 'storage_days' = 'created_at';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
