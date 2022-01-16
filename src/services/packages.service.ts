import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerRepository } from 'src/repositories/answer.repository';
import { PackageRepository } from 'src/repositories/package.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { GetDetailPackageRequest } from 'src/requests/get-detail-package.request';
import { Connection } from 'typeorm';
import _, { identity } from 'lodash';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { DoPackageRequest } from 'src/requests/todo-package.request';
import { HistoryRepository } from 'src/repositories/history.repository';
import { PaginateResult } from 'src/responses/PaginateResult';
import { PagingRequest } from 'src/requests/paging.request';
import { ConfigService } from '@nestjs/config';
import { Week } from 'src/repositories/entities/week.entity';
import { Point } from 'src/repositories/entities/point.entity';
import { PointRepo } from 'src/repositories/point.repoitory';
import { BigNumber } from 'bignumber.js';
import { GetLeaderBoardRequest } from 'src/requests/get-leaderboard.request';
import { History, QuestionMap } from 'src/repositories/entities/history.entity';
import { QuestionStatus } from 'src/constants/question-status.enum';
import { formatDecimal } from 'src/utils/convert';
import { GetDetailHistoryRequest } from 'src/requests/get-detail-history.rquest';

@Injectable()
export class PackagesService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly packageRepository: PackageRepository,
    private readonly historyRepository: HistoryRepository,
    private readonly pointRepo: PointRepo,
    private readonly configService: ConfigService,
    private readonly connection: Connection,
  ) {}

  async getAllPackage(request: PagingRequest) {
    const page = request.pageIndex || 1;
    const pageSize = request.pageSize || 10;
    const packages = this.packageRepository
      .createQueryBuilder('p')
      .select([
        'p.id as id', 
        'p.name as name', 
        'p.level as `level`', 
        'p.total_question as total', 
        'p.time_out as timeOut',
        'u.username as username'
      ])
      .leftJoin('p.user', 'u')
      .where('p.status = :st', { st: QuestionStatus.ACTIVE })
      .orderBy('p.id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)

    return await Promise.all([packages.getRawMany(), packages.getCount()]);
  }

  async getDetailPackage(request: GetDetailPackageRequest) {
    const pageIndex = request.pageIndex || 1;
    const pageSize = request.pageSize || 10;

    const packages = await this.packageRepository
      .createQueryBuilder('p')
      .leftJoin('p.user', 'u')
      .select([
        'p.id as id',
        'p.like as `like`',
        'p.timeOut as timeOut',
        'p.status as `status`',
        'p.level as `level`',
        'p.total_question as totalQuestion',
        'p.name as name',
        'u.username as username',
        'p.questionIds as questionIds'
      ])
      .where('p.id = :id', { id: request.packageId })
      .getRawOne();
    if (!packages) {
      throw new BadRequestException({
        code: ErrorCode.NOT_FOUND_PACKAGE,
      });
    }
    const questions = await this.questionRepository
      .createQueryBuilder('q')
      .innerJoinAndSelect('q.answers', 'a')
      .where('q.id IN (:arr)', {
        arr: packages.questionIds,
      })
      .getMany();
    const questionMap = questions.map((item) => ({
      ...item,
      answers: _.shuffle(
        item.answers.map((i) => ({
          id: i.id,
          content: i.content,
          description: i.description,
          isTrue: i.isTrue,
        })),
      ),
    }));
    const packageMap = {
      ...packages,
      questions: _.shuffle(questionMap).slice(
        (pageIndex - 1) * pageSize,
        pageIndex * pageSize,
      ),
    };
    return [packageMap, packages.totalQuestion];
  }

  async createPackage(userId: number, request: CreatePackageRequest) {
    await this.connection.transaction(async (manager) => {
      const newPackage = await this.packageRepository.create({
        user: userId as any,
        totalQuestion: request.question.length,
        timeOut: request.time,
        level: request.level,
        isHidden: request.isHidden,
        questionIds: request.question,
        name: request.name,
      });
      await manager.save(newPackage);
    });
  }

  async todoPackage(userId: number, request: DoPackageRequest) {
    let countTrue = 0;
    const resultArr = [];
    const currentWeek = await this.connection.manager
      .createQueryBuilder(Week, 'w')
      .orderBy('w.id', 'DESC')
      .getOne();
    const packages = await this.packageRepository
      .createQueryBuilder()
      .select('total_question as totalQuestion')
      .where('id = :id', { id: request.packageId })
      .getRawOne();
    if (!packages) {
      throw new BadRequestException({
        code: ErrorCode.NOT_FOUND_PACKAGE,
      });
    }

    const questionIds =
      _.map(request.questions, 'questionId').length == 0
        ? null
        : _.map(request.questions, 'questionId');
    const questions = await this.questionRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.answers', 'a')
      .where('q.id IN(:arr)', { arr: questionIds })
      .getMany();

    for (const item of request.questions) {
      const question = this.findQuestionById(questions, item.questionId);
      const answerIds = _.map(question.answers, 'id');
      if (!answerIds.includes(item.answerId)) {
        throw new BadRequestException({
          code: ErrorCode.ANSWER_NOT_IN_QUESTION,
        });
      }
      if (question && question.correctAnswer == item.answerId) {
        countTrue++;
      }
      resultArr.push({
        ...question,
        check: question && question.correctAnswer === item.answerId,
        answerId: item.answerId,
      });
    }
    
    const point = String(countTrue)
    await this.connection.transaction(async (manager) => {
      await this.connection.manager
        .createQueryBuilder()
        .update(History)
        .set({ isCurrent: false })
        .where('package_id = :packageId AND is_current = true', {
          packageId: request.packageId,
        })
        .execute();
      const questionMap: QuestionMap[] = [];
      for (const i of request.questions) {
        const question: QuestionMap = {
          [i.questionId]: i.answerId,
        };
        questionMap.push(question);
      }
      console.log('yoona', questionMap);
      console.log(request.packageId);

      const newHistory = this.historyRepository.create({
        user: userId as any,
        package: request.packageId as any,
        time: request.time,
        point,
        questionMap,
      });
      const points = await this.pointRepo.findOne({
        where: {
          week: currentWeek.id,
        },
      });
      if (!points) {
        const newPoint = this.pointRepo.create({
          user: userId as any,
          point: point,
          week: currentWeek.id,
        });
        await manager.save(newPoint);
      } else {
        points.point = new BigNumber(points.point).plus(point).toFixed(2);
        await manager.save(points);
      }

      await manager.save(newHistory);
    });

    return resultArr;
  }

  async getHistory(userId: number, request: PagingRequest) {
    const page = request.pageIndex || 1;
    const pageSize = request.pageSize || 10;

    const query = this.historyRepository
      .createQueryBuilder('h')
      .select([
        'h.package_id as packageId',
        'p.name as name',
        'h.point as point',
        'h.time as time',
        'u.id as userId',
        'u.username as username',
      ])
      .leftJoin('h.package', 'p')
      .leftJoin('p.user', 'u')
      .where('h.user_id = :userId AND h.is_current = true', { userId })
      .orderBy('h.created_at', 'DESC');

    const [data, count] = await Promise.all([
      query
        .clone()
        .offset((page - 1) * pageSize)
        .limit(pageSize)
        .getRawMany(),
      (await query.getRawMany()).length,
    ]);

    return [data, count];
  }

  async getDetailPackageHistory(userId: number, packageId: number) {
    const histories = await this.historyRepository
      .createQueryBuilder('h')
      .leftJoinAndSelect('h.package', 'p')
      .where('h.user_id = :userId AND h.package_id = :packageId', {
        userId,
        packageId,
      })
      .orderBy('h.created_at', 'DESC')
      .getMany();
    const points = _.map(histories, 'point');
    const maxPoint = _.max(points);
    const sumPoint = parseInt(
      _.reduce(points, function (sum, num) {
        return sum + num;
      }),
    );

    return {
      maxPoint,
      averagePoint: sumPoint / histories.length,
      totalQuestion: histories[0].package?.totalQuestion,
      namePackage: histories[0].package.name,
      items: histories.map((item) => ({
        historyId: item.id,
        time: item.time,
        point: item.point,
        createAt: item.createdAt,
        totalDo: Object.keys(item.questionMap).length,
      })),
    };
  }

  async getDetailHistory(userId: number, request: GetDetailHistoryRequest) {
    
    const history = await this.historyRepository
      .createQueryBuilder('h')
      .where('h.user_id = :userId AND h.id = :id', {
        userId,
        id: request.historyId,
      })
      .getOne();
    if (!history) {
      throw new BadRequestException({
        code: ErrorCode.NOT_FOUND_HISTORY,
      });
    }
    const packages = await this.packageRepository
      .createQueryBuilder()
      .where('id = :id', { id: history.packageId })
      .getOne();
    if (!packages) {
      throw new BadRequestException({
        code: ErrorCode.NOT_FOUND_PACKAGE,
      });
    }
    const questions = await this.questionRepository
      .createQueryBuilder('q')
      .innerJoinAndSelect('q.answers', 'a')
      .where('q.id IN (:arr)', {
        arr: packages.questionIds,
      })
      .getMany();
    console.log(questions)
    const questionArr = [];
    console.log(history.questionMap);
    for (const item of history.questionMap) {
      const key = Object.keys(item);
      console.log(typeof key[0]);
      const question = this.findQuestionById(questions, Number(key[0]));
      console.log('question', question)
      questionArr.push({
        question: {
          id: question.id,
          level: question.level,
          title: question.title,
          correctAnswer: question.correctAnswer,
          answer: question.answers.map((a) => ({
            id: a.id,
            content: a.content,
            description: a.description,
            isTrue: a.isTrue,
          })),
        },
        answerPick: item[key[0]],
      });
    }
    console.log(questionArr);
    return {
      point: history.point,
      time: history.time,
      timePackage: packages.timeOut,
      namePackage: packages.name,
      questions: questionArr,
    };
  }

  async getLeaderBoard(request: GetLeaderBoardRequest) {
    // const page = request.pageIndex || 1;
    // const pageSize = request.pageSize || 10;

    const query = await this.pointRepo
      .createQueryBuilder('p')
      .select([
        'p.point as point',
        'u.username as username',
        'u.id as userId',
        'pp.avatar as avatar',
      ])
      .leftJoin('p.user', 'u')
      .leftJoin('u.profile', 'pp')
      .where('p.week = :week AND p.point > 0', { week: request.week })
      .orderBy('p.point', 'DESC')
      .offset(0)
      .limit(10)
      .getRawMany();
    return query.map((item) => ({
      ...item,
      point: formatDecimal(item.point),
    }));
  }

  findQuestionById(questions, id) {
    return _.find(questions, {
      id: id,
    });
  }
}
