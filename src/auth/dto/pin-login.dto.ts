import { IsInt, IsString, Matches, Min } from 'class-validator';

export class PinLoginDto {
  @IsInt()
  @Min(1)
  employee_id!: number;

  @IsString()
  @Matches(/^\d{4}$/, { message: 'PIN должен быть 4 цифры' })
  pin!: string;
}
