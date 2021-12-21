import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerRepository } from 'src/repositories/answer.repository';
import { PackageRepository } from 'src/repositories/package.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
import { Connection } from 'typeorm';
import _ from 'lodash';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { DoPackageRequest } from 'src/requests/todo-package.request';
import { HistoryRepository } from 'src/repositories/history.repository';
import { PaginateResult } from 'src/responses/PaginateResult';
import { PagingRequest } from 'src/requests/paging.request';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PackagesService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly packageRepository: PackageRepository,
    private readonly historyRepository: HistoryRepository,
    private readonly configService: ConfigService,
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

  async todoPackage(userId: number, request: DoPackageRequest) {
    let countTrue = 0;
    let resultArr = [];
    const questionIds = _.map(request.questions, 'questionId');
    const questions = await this.questionRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.answers', 'a')
      .where('q.id IN(:arr)', { arr: questionIds})
      .getMany();

    for (const item of request.questions) {
      const question = this.findQuestionById(questions, item.questionId);
      if(question && question.correctAnswer == item.answerId) {
        countTrue ++;
      }
      resultArr.push({
        ...question,
        check: question && question.correctAnswer === item.answerId,
        answerId: item.answerId
      })
    }
    const maxPoint = this.configService.get('questionConfig').maxPoint as number;
    const point = (countTrue*maxPoint/request.questions.length).toFixed(2);
    const newHistory = this.historyRepository.create({
      user: userId as any,
      packageId: request.packageId,
      time: request.time,
      point,
    })
    await newHistory.save();
    return resultArr;
  }

  async getHistory(userId: number, request: PagingRequest) {
    const page = request.pageIndex || 1;
    const pageSize = request.pageSize || 10;

    const query = this.historyRepository
     .createQueryBuilder('h')
     .select([
       'DISTINCT h.package_id as packageId',
       'p.name as name',
      ])
     .leftJoin('h.package', 'p')
     .where('h.user_id = :userId', { userId })
     
    const [data, count] = await Promise.all([
      query
      .clone()
      .offset((page - 1)*pageSize)
      .limit(pageSize)
      .getRawMany(), 
      (await query.getRawMany()).length]);

    return [data, count];
 }

 async getDetailPackageHistory(userId: number, packageId: number) {
   const histories = await this.historyRepository
    .createQueryBuilder('h')
    .leftJoinAndSelect('h.package', 'p')
    .where('h.user_id = :userId AND h.package_id = :packageId', { userId, packageId })
    .orderBy('h.created_at', 'DESC')
    .getMany();
  console.log(histories)
  const points = _.map(histories, 'point');
  const maxPoint = _.max(points);
  const sumPoint = parseInt(_.reduce(points, function(sum, num) {
    return sum + num;
  }));

  return {
    totalDo: histories.length,
    maxPoint,
    averagePoint: sumPoint/histories.length,
    items: histories.map((item) => ({
      time: item.time,
      point: item.point,
      createAt: item.createdAt,
      namePackage: item.package.name,
    }))
  }
 }

  findQuestionById(questions, id) {
    return _.find(questions, {
      id: id
    })
  }

}
