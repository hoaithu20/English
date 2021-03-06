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
import { HistoryRepository } from 'src/repositories/history.repository';
import { PointRepo } from 'src/repositories/point.repoitory';
import BigNumber from 'bignumber.js';
import { formatDecimal } from 'src/utils/convert';
import { IsEmpty } from 'class-validator';
import lineByLine from 'n-readlines';
import { Dictionary } from 'src/repositories/entities/dictionary.entity';
import { DictionaryRequest } from 'src/requests/dictionary.request';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly packageRepository: PackageRepository,
    private readonly historyRepo: HistoryRepository,
    private readonly pointRepo: PointRepo,
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
    console.log('admin', admin);
    const status =
      admin.id === userId ? QuestionStatus.ACTIVE : QuestionStatus.INACTIVE;

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
          if (newAnswer.isTrue === true) {
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
    const history = await this.historyRepo
      .createQueryBuilder()
      .where('user_id = :userId AND package_id is NULL', { userId })
      .getOne();
    if (!history) {
      const newHistory = this.historyRepo.create({
        user: userId as any,
        questions: request.question,
      });
      newHistory.save();
    } else {
      const questionIds = _.union(
        _.concat(history.questions, request.question),
      );
      history.questions = questionIds;
      history.save();
    }
  }

  async getQuestion(userId: number, request: GetQuestionRequest) {
    console.log(request);
    const pageSize = request.pageSize || 10;
    const pageIndex = request.pageIndex || 1;
    let questionIds = [];
    const history = await this.historyRepo
      .createQueryBuilder()
      .where('user_id = :userId AND package_id is NULL', { userId })
      .getOne();
    console.log(history);
    if (history) {
      questionIds = history.questions;
    }
    questionIds = _.isEmpty(questionIds) ? null : questionIds;

    const query = this.questionRepository
      .createQueryBuilder('q')
      .skip((pageIndex - 1) * pageSize)
      .take(pageSize)
      .leftJoinAndSelect('q.answers', 'a')
      .orderBy('q.createdAt', 'DESC');
    if (request.type == GetQuestionType.ACTIVE) {
      query.where('q.status = :status', { status: QuestionStatus.ACTIVE });
    } else if (request.type == GetQuestionType.INACTIVE) {
      query.where('q.status = :status', { status: QuestionStatus.INACTIVE });
    } else if (request.type == GetQuestionType.DONE) {
      query.where('q.id IN(:arr)', { arr: questionIds });
    } else if (request.type == GetQuestionType.NOT_DONE) {
      query.where('q.id NOT IN(:arr)', { arr: questionIds });
    } else {
      query.where('q.user_id = :userId', { userId });
    }

    if (request.level) {
      console.log('level', request.level);
      query.andWhere('q.level = :level', { level: request.level });
    }
    if (request.search) {
      query.andWhere('q.title LIKE :search', {
        search: '%' + request.search + '%',
      });
    }

    const [data, count] = await Promise.all([
      query.getMany(),
      query.getCount(),
    ]);
    return [data, count];
  }

  async getStatics(userId: number) {
    const points = await this.pointRepo
      .createQueryBuilder()
      .select(['point'])
      .where('user_id = :userId', { userId })
      .getRawMany();
    let totalPoint = new BigNumber(0);
    for (const i of points) {
      totalPoint = totalPoint.plus(i.point);
    }
    const query = this.historyRepo
      .createQueryBuilder()
      .where('user_id = :userId', { userId });

    const [question, pakcages] = await Promise.all([
      query
        .clone()
        .select('questions')
        .andWhere('package_id IS NULL')
        .getRawOne(),
      query
        .select('package_id as packageId')
        .andWhere('package_id IS NOT NULL')
        .getRawMany(),
    ]);

    const allQuestion = this.questionRepository
      .createQueryBuilder()
      .where('status = :st', { st: QuestionStatus.ACTIVE })
    const [allQuestionNum, questionMineNum] = await Promise.all([
      allQuestion.clone().getCount(),
      allQuestion.andWhere('user_id = :userId', {userId}).getCount()
    ])
    const allPackage = this.packageRepository
      .createQueryBuilder()
    const [allPackageNum, packageMineNum] = await Promise.all([
      allPackage.clone().getCount(),
      allPackage.where('user_id = :userId', {userId}).getCount()
    ])
    return {
      totalPoint: formatDecimal(totalPoint),
      questionDo: question ? question.questions.length : 0,
      packagesDo: _.union(_.map(pakcages, 'packageId')).length,
      questionMine: questionMineNum,
      packageMine: packageMineNum,
      totalQuestion: allQuestionNum,
      totalPackage: allPackageNum,
    };
  }

  async insertData() {
    console.log('Start....');

    const liner = new lineByLine('./eng-viet.txt');
    let line;
    let eng = '';
    let vietnamese: string[] = [];
    let type = '';
    let pronunciation = '';
    while (line = liner.next()) {
      const text = line.toString() as string;
      if(text.charAt(0) == '@') {
        if(eng != '') {
          this.connection.manager.insert(Dictionary, {
            english: eng,
            vietnamese: vietnamese,
            pronunciation: pronunciation,
            type: type
          });
          vietnamese = [];
          eng = '';
          pronunciation = '';
        }
        const arr = text.split('/');
        eng = arr[0].substring(1, arr[0].length-1);
        pronunciation = '/'+ `${arr[1]}` +'/'; 
      } else if(text.charAt(0) == '*') { 
        type = text.substring(2);
      } else if(text.charAt(0) == '-') {
        vietnamese.push(text.substring(2, text.length));
      }

    }

    console.log('end of line reached');
  }

  async dictionary(request: DictionaryRequest) {
    const query = await this.connection.createQueryBuilder(Dictionary, 'd')
    .where('d.english = :key', {key: request.search})
    .getOne();
    if(!query) {
      return 't??? b???n c???n t??m ch??a c?? trong h??? th???ng'
    }
    return query;
  }

  async suggestString(request: DictionaryRequest) {
    console.log(request.search)
    const query = await this.connection.createQueryBuilder(Dictionary, 'd')
    .where('d.english LIKE :key', {key: request.search + '%'})
    .offset(0)
    .limit(20)
    .getMany();
    if(!query) {
      return 't??? b???n c???n t??m ch??a c?? trong h??? th???ng'
    }
    return query.map((i) => ({
      english: i.english
    }));
  }
}
