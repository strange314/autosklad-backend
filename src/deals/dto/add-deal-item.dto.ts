import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class AddDealItemDto {
  @IsInt()
  @Min(1)
  part_id!: number;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}
