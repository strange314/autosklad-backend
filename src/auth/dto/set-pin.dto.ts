import { IsString, Matches } from 'class-validator';

export class SetPinDto {
  @IsString()
  @Matches(/^\d{4}$/, { message: 'PIN должен быть 4 цифры' })
  pin!: string;
}
