"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const packages_controller_1 = require("../controllers/packages.controller");
const answer_repository_1 = require("../repositories/answer.repository");
const history_repository_1 = require("../repositories/history.repository");
const package_repository_1 = require("../repositories/package.repository");
const question_repository_1 = require("../repositories/question.repository");
const packages_service_1 = require("../services/packages.service");
let PackagesModule = class PackagesModule {
};
PackagesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                question_repository_1.QuestionRepository,
                answer_repository_1.AnswerRepository,
                package_repository_1.PackageRepository,
                history_repository_1.HistoryRepository,
            ]),
            config_1.ConfigModule
        ],
        providers: [packages_service_1.PackagesService],
        controllers: [packages_controller_1.PackagesController],
    })
], PackagesModule);
exports.PackagesModule = PackagesModule;
//# sourceMappingURL=packages.module.js.map