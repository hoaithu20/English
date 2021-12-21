import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesController } from 'src/controllers/packages.controller';
import { AnswerRepository } from 'src/repositories/answer.repository';
import { HistoryRepository } from 'src/repositories/history.repository';
import { PackageRepository } from 'src/repositories/package.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { PackagesService } from 'src/services/packages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    QuestionRepository,
    AnswerRepository,
    PackageRepository,
    HistoryRepository,
  ]),
  ConfigModule
],
  providers: [PackagesService],
  controllers: [PackagesController],
})
export class PackagesModule {}
