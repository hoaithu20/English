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

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly packageRepository: PackageRepository,
    private readonly connection: Connection
  ) { }

  async getListPackageOfUser() {

  }

  async getListQuestion(request: PagingRequest) {
    const pageSize = request.pageSize || 1;
    const pageIndex = request.pageIndex || 10;

    const [questions, count] = await this.questionRepository
      .createQueryBuilder('q')
      .skip((pageIndex - 1) * pageSize)
      .take(pageSize)
      .innerJoinAndSelect('q.answers', 'a')
      .where('q.status = :status', { status: QuestionStatus.ACTIVE })
      .getManyAndCount();
    const questionMap = questions.map((item) => ({
      ...item,
      answers: _.shuffle(item.answers)
    }));

    return [questionMap, count]

  }

  async createQuestion(userId: number, request: CreateQuestionRequest) {
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
    } catch (err) {
      throw new BadRequestException({
        code: ErrorCode.UNSUCCESS,
      });
    }
  }

  async doQuestion() {
    
  }
}
