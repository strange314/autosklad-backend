import { IsIn, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(150)
  name!: string;

  @IsIn(['income', 'expense'])
  type!: 'income' | 'expense';
}
