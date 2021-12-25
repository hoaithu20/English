import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { QuestionStatus } from 'src/constants/question-status.enum';
import { AnswerRepository } from 'src/repositories/answer.repository';
import { User } from 'src/repositories/entities/user.entity';
import { PackageRepository } from 'src/repositories/package.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { CreateQuestionRequest } from 'src/requests/create-question.request';
import { PagingRequest } from 'src/requests/paging.request';
import { Connection } from 'typeorm';
import _ from 'lodash';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
import { UserRole } from 'src/constants/user-role.enum';
import { GetQuestionRequest } from 'src/requests/question.request';
import { GetQuestionType } from 'src/constants/get-question-type.enum';
import { DoQuestionRequest } from 'src/requests/do-question.request';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly packageRepository: PackageRepository,
    private readonly connection: Connection,
  ) { }

  // async getListPackageOfUser() {}

  async getListQuestion(request: PagingRequest) {
    const pageSize = request.pageSize || 10;
    const pageIndex = request.pageIndex || 1;

    const [questions, count] = await this.questionRepository
      .createQueryBuilder('q')
      .skip((pageIndex - 1) * pageSize)
      .take(pageSize)
      .innerJoinAndSelect('q.answers', 'a')
      .where('q.status = :status', { status: QuestionStatus.ACTIVE })
      .getManyAndCount();
    const questionMap = questions.map((item) => ({
      ...item,
      answers: _.shuffle(item.answers),
    }));

    return [_.shuffle(questionMap), count];
  }

  async createQuestion(userId: number, request: CreateQuestionRequest) {
    const { title, level, answers } = request;
    const admin = await this.connection.manager
      .createQueryBuilder(User, 'u')
      .select('u.id as id')
      .where('u.role = :role', { role: UserRole.ADMIN })
      .getRawOne();
    const status = admin.id === userId ? QuestionStatus.ACTIVE : QuestionStatus.INACTIVE;

    try {
      await this.connection.transaction(async (manager) => {
        const newQuestion = this.questionRepository.create({
          title,
          level,
          status,
          totalAnswer: request.answers.length,
          user: userId as any,
        });

        await manager.save(newQuestion);
        let correctAnswer;
        for (const answer of answers) {
          const newAnswer = this.answerRepository.create({
            content: answer.content,
            isTrue: answer.isCorrect,
            question: newQuestion,
            description: answer.explain,
          });
          await manager.save(newAnswer);
          if ((newAnswer.isTrue = true)) {
            correctAnswer = newAnswer.id;
          }
        }
        newQuestion.correctAnswer = correctAnswer;
        await manager.save(newQuestion);
      });
    } catch (err) {
      throw new BadRequestException({
        code: ErrorCode.UNSUCCESS,
      });
    }
  }

  async doQuestion(userId: number, request: DoQuestionRequest) {
    
  }





  async getQuestion(userId: number, request: GetQuestionRequest) {
    const pageSize = request.pageSize || 10;
    const pageIndex = request.pageIndex || 1;

    const query = this.questionRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.answers', 'a')
      .orderBy('q.created_at', 'DESC')
      .offset((pageIndex-1)*pageSize)
      .limit(pageSize)
    if (request.type == GetQuestionType.ACTIVE) {
      query.where('q.status = :status', { status: QuestionStatus.ACTIVE})
    } else if (request.type == GetQuestionType.INACTIVE) {
      query.where('q.status = :status', { status: QuestionStatus.INACTIVE})
    } else {
      query.where('q.user_id = :userId', { userId })
    }

    if(request.level) {
      query.andWhere('q.level = :level', { level: request.level})
    }
    if(request.search) {
      query.andWhere('q.title LIKE :search', { search: '%' + request.search + '%', })
    }
    
    const [data, count] = await Promise.all([query.getMany(), query.getCount()]);
    return [data, count];   
  }
}
