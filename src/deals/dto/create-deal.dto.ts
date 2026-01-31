import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateDealDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  counterparty_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  source?: string;
}
