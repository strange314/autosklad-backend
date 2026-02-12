import { IsEmail, IsIn, IsOptional, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class RegisterCompanyDto {
  @IsString()
  company_name!: string;

  @IsOptional()
  @IsString()
  legal_name?: string;

  @IsPhoneNumber('RU')
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsIn(['used_only', 'new_only', 'mixed'])
  specialization!: 'used_only' | 'new_only' | 'mixed';

  @IsString()
  owner_full_name!: string;

  @Matches(/^\d{4}$/, { message: 'PIN должен быть 4 цифры' })
  pin!: string;

  @IsIn(['econom', 'standard', 'premium'])
  tariff_code!: 'econom' | 'standard' | 'premium';
}
