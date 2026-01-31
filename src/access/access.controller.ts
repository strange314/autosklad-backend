import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AccessService } from './access.service';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { ConfirmPinDto } from './dto/confirm-pin.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { SetRolePermissionsDto } from './dto/set-role-permissions.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('access')
export class AccessController {
  constructor(private readonly access: AccessService) {}

  @Post('register-company')
  registerCompany(@Body() dto: RegisterCompanyDto) {
    return this.access.registerCompany(dto);
  }

  @Post('pin/confirm')
  confirmPin(@Body() dto: ConfirmPinDto) {
    return this.access.confirmPin(dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('roles.manage')
  @Post('roles')
  createRole(@Req() req: any, @Body() dto: CreateRoleDto) {
    return this.access.createRole(req.user.company_id, dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('roles.manage')
  @Get('roles')
  listRoles(@Req() req: any) {
    return this.access.listRoles(req.user.company_id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('roles.manage')
  @Post('roles/:id/permissions')
  setRolePermissions(@Req() req: any, @Param('id') id: string, @Body() dto: SetRolePermissionsDto) {
    return this.access.setRolePermissions(req.user.company_id, Number(id), dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('employees.manage')
  @Post('employees')
  createEmployee(@Req() req: any, @Body() dto: CreateEmployeeDto) {
    return this.access.createEmployee(req.user.company_id, dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('employees.manage')
  @Post('employees/:id/roles')
  assignRoles(@Req() req: any, @Param('id') id: string, @Body() dto: AssignRolesDto) {
    return this.access.assignRoles(req.user.company_id, Number(id), dto);
  }
}
