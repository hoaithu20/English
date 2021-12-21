import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerRepository } from 'src/repositories/answer.repository';
import { PackageRepository } from 'src/repositories/package.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
import { Connection } from 'typeorm';
import _ from 'lodash';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { doPackageRequest } from 'src/requests/todo-package.request';

@Injectable()
export class PackagesService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly packageRepository: PackageRepository,
    private readonly connection: Connection
  ) { }

  async getDetailPackage(request: GetDetailPackageRequest) {
    const pageIndex = request.pageIndex || 1;
    const pageSize = request.pageSize || 10;

    const packages = await this.packageRepository
      .createQueryBuilder()
      .where('id = :id', { id: request.packageId })
      .getOne();
    if(!packages) {
      throw new BadRequestException({
        code: ErrorCode.NOT_FOUND_PACKAGE
      })
    }
    const questions = await this.questionRepository
      .createQueryBuilder('q')
      .innerJoinAndSelect('q.answers', 'a')
      .where('id IN (:arr)', {
        arr: packages.questionIds
      })
      .getMany();
    const questionMap = questions.map((item) => ({
      ...item,
      answers: _.shuffle(item.answers)
    }));
    const packageMap = {
      ...packages,
      questions: (_.shuffle(questionMap)).slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    }
    return [ packageMap, packages.totalQuestion];
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

  async todoPackage(userId: number, request: doPackageRequest) {
    
  }

}
