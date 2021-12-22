import { AnswerRepository } from 'src/repositories/answer.repository';
import { PackageRepository } from 'src/repositories/package.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
import { Connection } from 'typeorm';
import { DoPackageRequest } from 'src/requests/todo-package.request';
import { HistoryRepository } from 'src/repositories/history.repository';
import { PagingRequest } from 'src/requests/paging.request';
import { ConfigService } from '@nestjs/config';
export declare class PackagesService {
    private readonly questionRepository;
    private readonly answerRepository;
    private readonly packageRepository;
    private readonly historyRepository;
    private readonly configService;
    private readonly connection;
    constructor(questionRepository: QuestionRepository, answerRepository: AnswerRepository, packageRepository: PackageRepository, historyRepository: HistoryRepository, configService: ConfigService, connection: Connection);
    getDetailPackage(request: GetDetailPackageRequest): Promise<(number | {
        questions: {
            answers: import("../repositories/entities/answer.entity").Answer[];
            id: number;
            title: string;
            status: import("../constants/question-status.enum").QuestionStatus;
            level: import("../constants/level.enum").Level;
            isHidden: boolean;
            like: number;
            totalAnswer: number;
            user: import("../repositories/entities/user.entity").User;
            correctAnswer: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        id: number;
        user: import("../repositories/entities/user.entity").User;
        histories: import("../repositories/entities/history.entity").History[];
        status: import("../constants/question-status.enum").QuestionStatus;
        totalQuestion: number;
        level: import("../constants/level.enum").Level;
        isHidden: boolean;
        timeOut: number;
        like: number;
        name: string;
        questionIds: number[];
    })[]>;
    createPackage(userId: number, request: CreatePackageRequest): Promise<void>;
    todoPackage(userId: number, request: DoPackageRequest): Promise<any[]>;
    getHistory(userId: number, request: PagingRequest): Promise<(number | any[])[]>;
    getDetailPackageHistory(userId: number, packageId: number): Promise<{
        totalDo: number;
        maxPoint: string;
        averagePoint: number;
        items: {
            time: number;
            point: string;
            createAt: Date;
            namePackage: string;
        }[];
    }>;
    findQuestionById(questions: any, id: any): any;
}
