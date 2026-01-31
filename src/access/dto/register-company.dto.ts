import { ArrayUnique, IsArray, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class RegisterCompanyDto {
  @IsString()
  @MaxLength(200)
  company_name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  legal_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  specialization?: string;

  @IsString()
  @MaxLength(200)
  owner_full_name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  owner_phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  owner_email?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  permissions?: string[];
}
