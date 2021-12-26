import { Injectable } from '@nestjs/common';
import { Question } from 'src/repositories/entities/question.entity';
import { ApproveQuestionRequest } from 'src/requests/approve-question.request';
import { Connection } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(private readonly connection: Connection) { }

  async approveQuestion(request: ApproveQuestionRequest) {
    await this.connection.manager
      .createQueryBuilder()
      .update(Question)
      .set({ status: request.status })
      .where('id IN(:id)', {
        id: request.questions,
      })
      .execute();
  }
}
