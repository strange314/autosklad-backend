import { IsInt, IsOptional, IsPhoneNumber, IsString, Matches, Min, ValidateIf } from 'class-validator';

export class PinLoginDto {
  @IsOptional()
  @ValidateIf((o) => o.phone == null)
  @IsInt()
  @Min(1)
  employee_id?: number;

  @IsOptional()
  @ValidateIf((o) => o.employee_id == null)
  @IsPhoneNumber('RU')
  phone?: string;

  @IsString()
  @Matches(/^\d{4}$/, { message: 'PIN должен быть 4 цифры' })
  pin!: string;
}
