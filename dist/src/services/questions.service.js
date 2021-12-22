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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const errorcode_constant_1 = require("../constants/errorcode.constant");
const question_status_enum_1 = require("../constants/question-status.enum");
const answer_repository_1 = require("../repositories/answer.repository");
const user_entity_1 = require("../repositories/entities/user.entity");
const package_repository_1 = require("../repositories/package.repository");
const question_repository_1 = require("../repositories/question.repository");
const create_package_request_1 = require("../requests/create-package.request");
const create_question_request_1 = require("../requests/create-question.request");
const paging_request_1 = require("../requests/paging.request");
const typeorm_1 = require("typeorm");
const lodash_1 = __importDefault(require("lodash"));
const get_detail_package_request_1 = require("../requests/get-detail-package.request");
let QuestionsService = class QuestionsService {
    constructor(questionRepository, answerRepository, packageRepository, connection) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.packageRepository = packageRepository;
        this.connection = connection;
    }
    async getListPackageOfUser() {
    }
    async getListQuestion(request) {
        const pageSize = request.pageSize || 1;
        const pageIndex = request.pageIndex || 10;
        const [questions, count] = await this.questionRepository
            .createQueryBuilder('q')
            .skip((pageIndex - 1) * pageSize)
            .take(pageSize)
            .innerJoinAndSelect('q.answers', 'a')
            .where('q.status = :status', { status: question_status_enum_1.QuestionStatus.PUBLIC })
            .getManyAndCount();
        const questionMap = questions.map((item) => (Object.assign(Object.assign({}, item), { answers: lodash_1.default.shuffle(item.answers) })));
        return [questionMap, count];
    }
    async createQuestion(userId, request) {
        const { title, level, status, isHidden, answers } = request;
        try {
            await this.connection.transaction(async (manager) => {
                const newQuestion = this.questionRepository.create({
                    title,
                    level,
                    status,
                    isHidden,
                    totalAnswer: request.answers.length,
                    user: userId,
                });
                await manager.save(newQuestion);
                let correctAnswer;
                for (const answer of answers) {
                    const newAnswer = this.answerRepository.create({
                        content: answer.content,
                        isTrue: answer.isCorrect,
                        question: newQuestion,
                    });
                    await manager.save(newAnswer);
                    if (newAnswer.isTrue = true) {
                        correctAnswer = newAnswer.id;
                    }
                }
                newQuestion.correctAnswer = correctAnswer;
                await manager.save(newQuestion);
            });
        }
        catch (err) {
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.UNSUCCESS,
            });
        }
    }
};
QuestionsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [question_repository_1.QuestionRepository,
        answer_repository_1.AnswerRepository,
        package_repository_1.PackageRepository,
        typeorm_1.Connection])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map