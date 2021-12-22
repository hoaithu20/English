"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const questions_controller_1 = require("../controllers/questions.controller");
const answer_repository_1 = require("../repositories/answer.repository");
const package_repository_1 = require("../repositories/package.repository");
const question_repository_1 = require("../repositories/question.repository");
const jwt_strategy_1 = require("../security/jwt.strategy");
const local_strategy_1 = require("../security/local.strategy");
const questions_service_1 = require("../services/questions.service");
let QuestionsModule = class QuestionsModule {
};
QuestionsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                question_repository_1.QuestionRepository,
                answer_repository_1.AnswerRepository,
                package_repository_1.PackageRepository,
            ]),
        ],
        providers: [questions_service_1.QuestionsService],
        controllers: [questions_controller_1.QuestionsController],
    })
], QuestionsModule);
exports.QuestionsModule = QuestionsModule;
//# sourceMappingURL=questions.module.js.map