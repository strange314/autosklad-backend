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
exports.DealsController = void 0;
const common_1 = require("@nestjs/common");
const deals_service_1 = require("./deals.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const create_deal_dto_1 = require("./dto/create-deal.dto");
const add_deal_item_dto_1 = require("./dto/add-deal-item.dto");
const list_deals_query_1 = require("./dto/list-deals.query");
let DealsController = class DealsController {
    constructor(deals) {
        this.deals = deals;
    }
    create(req, dto) {
        return this.deals.create(req.user.company_id, req.user.employee_id, dto);
    }
    list(req, query) {
        return this.deals.list(req.user.company_id, query);
    }
    getById(req, id) {
        return this.deals.getById(req.user.company_id, Number(id));
    }
    addItem(req, id, dto) {
        return this.deals.addItem(req.user.company_id, Number(id), dto);
    }
    closeManager(req, id) {
        return this.deals.closeManager(req.user.company_id, Number(id));
    }
    closeAccountant(req, id) {
        return this.deals.closeAccountant(req.user.company_id, Number(id));
    }
    closeDirector(req, id) {
        return this.deals.closeDirector(req.user.company_id, Number(id));
    }
};
exports.DealsController = DealsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('deals.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_deal_dto_1.CreateDealDto]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('deals.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_deals_query_1.ListDealsQueryDto]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('deals.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "getById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('deals.manage'),
    (0, common_1.Post)(':id/items'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, add_deal_item_dto_1.AddDealItemDto]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "addItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('deals.manager_close'),
    (0, common_1.Post)(':id/close/manager'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "closeManager", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('deals.accountant_close'),
    (0, common_1.Post)(':id/close/accountant'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "closeAccountant", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)('deals.director_close'),
    (0, common_1.Post)(':id/close/director'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "closeDirector", null);
exports.DealsController = DealsController = __decorate([
    (0, common_1.Controller)('deals'),
    __metadata("design:paramtypes", [deals_service_1.DealsService])
], DealsController);
//# sourceMappingURL=deals.controller.js.map