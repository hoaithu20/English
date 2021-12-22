import { QuestionStatus } from 'src/constants/question-status.enum';
import { AnswerRepository } from 'src/repositories/answer.repository';
import { User } from 'src/repositories/entities/user.entity';
import { PackageRepository } from 'src/repositories/package.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { CreateQuestionRequest } from 'src/requests/create-question.request';
import { PagingRequest } from 'src/requests/paging.request';
import { Connection } from 'typeorm';
export declare class QuestionsService {
    private readonly questionRepository;
    private readonly answerRepository;
    private readonly packageRepository;
    private readonly connection;
    constructor(questionRepository: QuestionRepository, answerRepository: AnswerRepository, packageRepository: PackageRepository, connection: Connection);
    getListPackageOfUser(): Promise<void>;
    getListQuestion(request: PagingRequest): Promise<(number | {
        answers: import("../repositories/entities/answer.entity").Answer[];
        id: number;
        title: string;
        status: QuestionStatus;
        level: import("../constants/level.enum").Level;
        isHidden: boolean;
        like: number;
        totalAnswer: number;
        user: User;
        correctAnswer: number;
        createdAt: Date;
        updatedAt: Date;
    }[])[]>;
    createQuestion(userId: number, request: CreateQuestionRequest): Promise<void>;
}
