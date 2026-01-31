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
exports.DonorsController = void 0;
const common_1 = require("@nestjs/common");
const donors_service_1 = require("./donors.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let DonorsController = class DonorsController {
    constructor(donors) {
        this.donors = donors;
    }
    recalcForDonor(req, id) {
        return this.donors.recalcCostForDonor(req.user.company_id, Number(id));
    }
    recalcForCompany(req) {
        return this.donors.recalcCostForCompany(req.user.company_id);
    }
};
exports.DonorsController = DonorsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('parts.write'),
    (0, common_1.Post)(':id/recalc-cost'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DonorsController.prototype, "recalcForDonor", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('parts.write'),
    (0, common_1.Post)('recalc-cost'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DonorsController.prototype, "recalcForCompany", null);
exports.DonorsController = DonorsController = __decorate([
    (0, common_1.Controller)('donors'),
    __metadata("design:paramtypes", [donors_service_1.DonorsService])
], DonorsController);
//# sourceMappingURL=donors.controller.js.map