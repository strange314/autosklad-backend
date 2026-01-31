import { IsInt, IsOptional, Min } from 'class-validator';

export class ListDealsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  perPage?: number = 20;
}
