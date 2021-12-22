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
exports.PackagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../decoraters/user.decorator");
const user_entity_1 = require("../repositories/entities/user.entity");
const create_package_request_1 = require("../requests/create-package.request");
const get_detail_package_request_1 = require("../requests/get-detail-package.request");
const paging_request_1 = require("../requests/paging.request");
const todo_package_request_1 = require("../requests/todo-package.request");
const PaginateResult_1 = require("../responses/PaginateResult");
const jwt_auth_guard_1 = require("../security/jwt-auth.guard");
const packages_service_1 = require("../services/packages.service");
let PackagesController = class PackagesController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    async getDetailPackage(request) {
        const [data, count] = await this.packageService.getDetailPackage(request);
        return PaginateResult_1.PaginateResult.init(data, count);
    }
    async createPackage(user, request) {
        return this.packageService.createPackage(user.id, request);
    }
    async doPackage(user, request) {
        return await this.packageService.todoPackage(user.id, request);
    }
    async getHistory(user, request) {
        const [data, count] = await this.packageService.getHistory(user.id, request);
        return PaginateResult_1.PaginateResult.init(data, count);
    }
    async getDetail(user, request) {
        return await this.packageService.getDetailPackageHistory(user.id, request.packageId);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiBody({
        type: get_detail_package_request_1.GetDetailPackageRequest,
    }),
    common_1.Get('get-detail-package'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_detail_package_request_1.GetDetailPackageRequest]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "getDetailPackage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiBody({
        type: create_package_request_1.CreatePackageRequest
    }),
    common_1.Post('create-package'),
    __param(0, user_decorator_1.CurrUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_package_request_1.CreatePackageRequest]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "createPackage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiBody({
        type: todo_package_request_1.DoPackageRequest,
    }),
    common_1.Post('do-package'),
    __param(0, user_decorator_1.CurrUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, todo_package_request_1.DoPackageRequest]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "doPackage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('get-history'),
    __param(0, user_decorator_1.CurrUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, paging_request_1.PagingRequest]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "getHistory", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('get-detail-package-history'),
    __param(0, user_decorator_1.CurrUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "getDetail", null);
PackagesController = __decorate([
    common_1.Controller('packages'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], PackagesController);
exports.PackagesController = PackagesController;
//# sourceMappingURL=packages.controller.js.map