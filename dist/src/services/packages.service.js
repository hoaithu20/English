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
exports.PackagesService = void 0;
const common_1 = require("@nestjs/common");
const answer_repository_1 = require("../repositories/answer.repository");
const package_repository_1 = require("../repositories/package.repository");
const question_repository_1 = require("../repositories/question.repository");
const create_package_request_1 = require("../requests/create-package.request");
const get_detail_package_request_1 = require("../requests/get-detail-package.request");
const typeorm_1 = require("typeorm");
const lodash_1 = __importDefault(require("lodash"));
const errorcode_constant_1 = require("../constants/errorcode.constant");
const todo_package_request_1 = require("../requests/todo-package.request");
const history_repository_1 = require("../repositories/history.repository");
const PaginateResult_1 = require("../responses/PaginateResult");
const paging_request_1 = require("../requests/paging.request");
const config_1 = require("@nestjs/config");
let PackagesService = class PackagesService {
    constructor(questionRepository, answerRepository, packageRepository, historyRepository, configService, connection) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.packageRepository = packageRepository;
        this.historyRepository = historyRepository;
        this.configService = configService;
        this.connection = connection;
    }
    async getDetailPackage(request) {
        const pageIndex = request.pageIndex || 1;
        const pageSize = request.pageSize || 10;
        const packages = await this.packageRepository
            .createQueryBuilder()
            .where('id = :id', { id: request.packageId })
            .getOne();
        if (!packages) {
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.NOT_FOUND_PACKAGE
            });
        }
        const questions = await this.questionRepository
            .createQueryBuilder('q')
            .innerJoinAndSelect('q.answers', 'a')
            .where('id IN (:arr)', {
            arr: packages.questionIds
        })
            .getMany();
        const questionMap = questions.map((item) => (Object.assign(Object.assign({}, item), { answers: lodash_1.default.shuffle(item.answers) })));
        const packageMap = Object.assign(Object.assign({}, packages), { questions: (lodash_1.default.shuffle(questionMap)).slice((pageIndex - 1) * pageSize, pageIndex * pageSize) });
        return [packageMap, packages.totalQuestion];
    }
    async createPackage(userId, request) {
        await this.connection.transaction(async (manager) => {
            const newPackage = await this.packageRepository.create({
                user: userId,
                totalQuestion: request.total,
                timeOut: request.time,
                level: request.level,
                isHidden: request.isHidden,
                questionIds: request.question
            });
            await manager.save(newPackage);
        });
    }
    async todoPackage(userId, request) {
        let countTrue = 0;
        let resultArr = [];
        const questionIds = lodash_1.default.map(request.questions, 'questionId');
        const questions = await this.questionRepository
            .createQueryBuilder('q')
            .leftJoinAndSelect('q.answers', 'a')
            .where('q.id IN(:arr)', { arr: questionIds })
            .getMany();
        for (const item of request.questions) {
            const question = this.findQuestionById(questions, item.questionId);
            if (question && question.correctAnswer == item.answerId) {
                countTrue++;
            }
            resultArr.push(Object.assign(Object.assign({}, question), { check: question && question.correctAnswer === item.answerId, answerId: item.answerId }));
        }
        const maxPoint = this.configService.get('questionConfig').maxPoint;
        const point = (countTrue * maxPoint / request.questions.length).toFixed(2);
        const newHistory = this.historyRepository.create({
            user: userId,
            packageId: request.packageId,
            time: request.time,
            point,
        });
        await newHistory.save();
        return resultArr;
    }
    async getHistory(userId, request) {
        const page = request.pageIndex || 1;
        const pageSize = request.pageSize || 10;
        const query = this.historyRepository
            .createQueryBuilder('h')
            .select([
            'DISTINCT h.package_id as packageId',
            'p.name as name',
        ])
            .leftJoin('h.package', 'p')
            .where('h.user_id = :userId', { userId });
        const [data, count] = await Promise.all([
            query
                .clone()
                .offset((page - 1) * pageSize)
                .limit(pageSize)
                .getRawMany(),
            (await query.getRawMany()).length
        ]);
        return [data, count];
    }
    async getDetailPackageHistory(userId, packageId) {
        const histories = await this.historyRepository
            .createQueryBuilder('h')
            .leftJoinAndSelect('h.package', 'p')
            .where('h.user_id = :userId AND h.package_id = :packageId', { userId, packageId })
            .orderBy('h.created_at', 'DESC')
            .getMany();
        console.log(histories);
        const points = lodash_1.default.map(histories, 'point');
        const maxPoint = lodash_1.default.max(points);
        const sumPoint = parseInt(lodash_1.default.reduce(points, function (sum, num) {
            return sum + num;
        }));
        return {
            totalDo: histories.length,
            maxPoint,
            averagePoint: sumPoint / histories.length,
            items: histories.map((item) => ({
                time: item.time,
                point: item.point,
                createAt: item.createdAt,
                namePackage: item.package.name,
            }))
        };
    }
    findQuestionById(questions, id) {
        return lodash_1.default.find(questions, {
            id: id
        });
    }
};
PackagesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [question_repository_1.QuestionRepository,
        answer_repository_1.AnswerRepository,
        package_repository_1.PackageRepository,
        history_repository_1.HistoryRepository,
        config_1.ConfigService,
        typeorm_1.Connection])
], PackagesService);
exports.PackagesService = PackagesService;
//# sourceMappingURL=packages.service.js.map