"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessController = void 0;
const common_1 = require("@nestjs/common");
const access_service_1 = require("./access.service");
const register_company_dto_1 = require("./dto/register-company.dto");
const confirm_pin_dto_1 = require("./dto/confirm-pin.dto");
const create_role_dto_1 = require("./dto/create-role.dto");
const set_role_permissions_dto_1 = require("./dto/set-role-permissions.dto");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const assign_roles_dto_1 = require("./dto/assign-roles.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let AccessController = class AccessController {
    constructor(access) {
        this.access = access;
    }
    registerCompany(dto) {
        return this.access.registerCompany(dto);
    }
    confirmPin(dto) {
        return this.access.confirmPin(dto);
    }
    createRole(req, dto) {
        return this.access.createRole(req.user.company_id, dto);
    }
    listRoles(req) {
        return this.access.listRoles(req.user.company_id);
    }
    setRolePermissions(req, id, dto) {
        return this.access.setRolePermissions(req.user.company_id, Number(id), dto);
    }
    createEmployee(req, dto) {
        return this.access.createEmployee(req.user.company_id, dto);
    }
    assignRoles(req, id, dto) {
        return this.access.assignRoles(req.user.company_id, Number(id), dto);
    }
};
exports.AccessController = AccessController;
__decorate([
    (0, common_1.Post)('register-company'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_company_dto_1.RegisterCompanyDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "registerCompany", null);
__decorate([
    (0, common_1.Post)('pin/confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_pin_dto_1.ConfirmPinDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "confirmPin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('roles.manage'),
    (0, common_1.Post)('roles'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "createRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('roles.manage'),
    (0, common_1.Get)('roles'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "listRoles", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('roles.manage'),
    (0, common_1.Post)('roles/:id/permissions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, set_role_permissions_dto_1.SetRolePermissionsDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "setRolePermissions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('employees.manage'),
    (0, common_1.Post)('employees'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('employees.manage'),
    (0, common_1.Post)('employees/:id/roles'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, assign_roles_dto_1.AssignRolesDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "assignRoles", null);
exports.AccessController = AccessController = __decorate([
    (0, common_1.Controller)('access'),
    __metadata("design:paramtypes", [access_service_1.AccessService])
], AccessController);
//# sourceMappingURL=access.controller.js.map