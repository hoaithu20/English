import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrUser } from 'src/decoraters/user.decorator';
import { User } from 'src/repositories/entities/user.entity';
import { CreateQuestionRequest } from 'src/requests/create-question.request';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { LocalAuthGuard } from 'src/security/local-auth.guard';
import { QuestionsService } from 'src/services/questions.service';

@ApiTags('/api/question')
@Controller('/api/question')
export class QuestionsController {
  constructor(
    private readonly questionService: QuestionsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create-question')
  async createQuestion(@CurrUser() user: User, request: CreateQuestionRequest) {
    return this.questionService.createQuestion(user.id, request);
  }
}
