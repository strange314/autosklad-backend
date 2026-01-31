import { ArrayUnique, IsArray, IsInt, Min } from 'class-validator';

export class AssignRolesDto {
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  role_ids!: number[];
}
