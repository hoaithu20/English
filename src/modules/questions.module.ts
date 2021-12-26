import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from 'src/controllers/questions.controller';
import { AnswerRepository } from 'src/repositories/answer.repository';
import { HistoryRepository } from 'src/repositories/history.repository';
import { PackageRepository } from 'src/repositories/package.repository';
import { QuestionRepository } from 'src/repositories/question.repository';
import { JwtStrategy } from 'src/security/jwt.strategy';
import { LocalStrategy } from 'src/security/local.strategy';
import { QuestionsService } from 'src/services/questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionRepository,
      AnswerRepository,
      PackageRepository,
      HistoryRepository,
    ]),
    // JwtModule.register({
    //   secret: 'yoona',
    //   signOptions: { expiresIn: '60s' },
    // }),
    // PassportModule
  ],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
