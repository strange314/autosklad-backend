import { IsDateString, IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class ListMovementsQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsIn(['income', 'expense'])
  type?: 'income' | 'expense';

  @IsOptional()
  @IsInt()
  @Min(1)
  category_id?: number;
}
