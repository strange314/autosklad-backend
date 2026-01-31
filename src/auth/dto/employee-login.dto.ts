import { IsInt, Min } from 'class-validator';

export class EmployeeLoginDto {
  @IsInt()
  @Min(1)
  employee_id!: number;
}
