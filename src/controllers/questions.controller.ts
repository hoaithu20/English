import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrUser } from 'src/decoraters/user.decorator';
import { User } from 'src/repositories/entities/user.entity';
import { CreateQuestionRequest } from 'src/requests/create-question.request';
import { DoQuestionRequest } from 'src/requests/do-question.request';
import { PagingRequest } from 'src/requests/paging.request';
import { GetQuestionRequest } from 'src/requests/question.request';
import { PaginateResult } from 'src/responses/PaginateResult';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { QuestionsService } from 'src/services/questions.service';

@ApiTags('/api/question')
@Controller('/api/question')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @ApiBody({
    type: PagingRequest,
  })
  @Post('list-random-question')
  async getListQuestion(@Body() request: PagingRequest) {
    const [result, count] = await this.questionService.getListQuestion(request);
    return PaginateResult.init(result, count);
  }

  @ApiBody({
    type: CreateQuestionRequest,
  })
  @Post('create-question')
  async createQuestion(
    @CurrUser() user: User,
    @Body() request: CreateQuestionRequest,
  ) {
    return this.questionService.createQuestion(user.id, request);
  }

  @ApiBody({
    type: GetQuestionRequest,
  })
  @Post('list-question')
  async listQuestion(
    @CurrUser() user: User,
    @Body() request: GetQuestionRequest,
  ) {
    const [data, count] = await this.questionService.getQuestion(
      user.id,
      request,
    );
    return PaginateResult.init(data, count);
  }

  @ApiBody({
    type: DoQuestionRequest,
  })
  @Post('do-question')
  async doQuestion(@CurrUser() user, @Body() request: DoQuestionRequest) {
    return await this.questionService.doQuestion(user.id, request);
  }

  @Get('get-statics')
  async getStatics(@CurrUser() user) {
    return await this.questionService.getStatics(user.id);
  }
}
