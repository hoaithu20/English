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

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly packageRepository: PackageRepository,
    private readonly connection: Connection
  ) { }

  async getListQuestion(request:  PagingRequest) {
    const pageSize = request.pageSize || 1;
    const pageIndex = request.pageIndex || 10;
   
    const [questions, count] = await this.questionRepository
      .createQueryBuilder('q')
      .innerJoinAndSelect('q.answers', 'a')
      .where('q.status = :status', { status: QuestionStatus.PUBLIC })
      .offset((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .getManyAndCount();

    const a = [1,2,3]
    console.log(_.shuffle(a))
    

    // const questionMap = questions.map((item) => ({
    //   ...item,
    //   answers: _.sampleSize(item.answers, 5)
    // }));
    // console.log( _.sampleSize(questionMap, count))
    // return [ _.sampleSize(questionMap, count), count ]
    return [{},0]

  }

  async createQuestion(userId: number, request: CreateQuestionRequest) {
    const a = [1,2,3]
    console.log(_.shuffle(a))
    console.log(request);
    const { title, level, status, isHidden, answers } = request;
    try {
      await this.connection.transaction(async (manager) => {
        const newQuestion = this.questionRepository.create({
          title,
          level,
          status,
          isHidden,
          totalAnswer: request.answers.length,
          user: userId as any,
        });

        await manager.save(newQuestion);
        for (const answer of answers) {
          const newAnswer = this.answerRepository.create({
            content: answer.content,
            isTrue: answer.isCorrect,
            question: newQuestion,
          });
          await manager.save(newAnswer);
        }
      });
    } catch (err) {
      throw new BadRequestException({
        code: ErrorCode.UNSUCCESS,
      });
    }
  }

  async createPackage(userId: number, request: CreatePackageRequest) {
    await this.connection.transaction(async (manager) => {
      const newPackage = await this.packageRepository.create({
        user: userId as any,
        totalQuestion: request.total,
        timeOut: request.time,
        level: request.level,
        isHidden: request.isHidden,
        questionIds: request.question
      });
      await manager.save(newPackage)
    })
  }
}
