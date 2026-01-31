import { IsDateString, IsIn, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateMovementDto {
  @IsIn(['income', 'expense'])
  type!: 'income' | 'expense';

  @IsOptional()
  @IsInt()
  @Min(1)
  category_id?: number;

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsDateString()
  operation_date?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  related_deal_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;
}
