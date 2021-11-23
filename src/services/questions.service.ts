import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { AnswerRepository } from 'src/repositories/answer.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { CreateQuestionRequest } from 'src/requests/create-question.request';
import { Connection } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly connection: Connection
  ) {}

  async getListQuestion()

  async createQuestion(userId: number, request: CreateQuestionRequest) {
    const {title, level, status, isHidden, answers } = request;
    try {
      await this.connection.transaction(async (manager) => {
        const newQuestion = this.questionRepository.create({
          title,
          level,
          status,
          isHidden,
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
    } catch(err) {
      throw new BadRequestException({
        code: ErrorCode.UNSUCCESS,
      });
    }
  }

  async createPackage(userId: number,) {

  }
}
