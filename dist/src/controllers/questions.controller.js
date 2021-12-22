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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../decoraters/user.decorator");
const user_entity_1 = require("../repositories/entities/user.entity");
const create_package_request_1 = require("../requests/create-package.request");
const create_question_request_1 = require("../requests/create-question.request");
const paging_request_1 = require("../requests/paging.request");
const PaginateResult_1 = require("../responses/PaginateResult");
const jwt_auth_guard_1 = require("../security/jwt-auth.guard");
const jwt_strategy_1 = require("../security/jwt.strategy");
const local_auth_guard_1 = require("../security/local-auth.guard");
const questions_service_1 = require("../services/questions.service");
let QuestionsController = class QuestionsController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async getListQuestion(request) {
        const [result, count] = await this.questionService.getListQuestion(request);
        return PaginateResult_1.PaginateResult.init(result, count);
    }
    async createQuestion(user, request) {
        return this.questionService.createQuestion(user.id, request);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiBody({
        type: paging_request_1.PagingRequest
    }),
    common_1.Get('list-random-question'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paging_request_1.PagingRequest]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getListQuestion", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiBody({
        type: create_question_request_1.CreateQuestionRequest,
    }),
    common_1.Post('create-question'),
    __param(0, user_decorator_1.CurrUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_question_request_1.CreateQuestionRequest]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "createQuestion", null);
QuestionsController = __decorate([
    swagger_1.ApiTags('/api/question'),
    common_1.Controller('/api/question'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
exports.QuestionsController = QuestionsController;
//# sourceMappingURL=questions.controller.js.map