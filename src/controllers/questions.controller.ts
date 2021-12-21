import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrUser } from 'src/decoraters/user.decorator';
import { User } from 'src/repositories/entities/user.entity';
import { CreatePackageRequest } from 'src/requests/create-package.request';
import { CreateQuestionRequest } from 'src/requests/create-question.request';
import { PagingRequest } from 'src/requests/paging.request';
import { PaginateResult } from 'src/responses/PaginateResult';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { JwtStrategy } from 'src/security/jwt.strategy';
import { LocalAuthGuard } from 'src/security/local-auth.guard';
import { QuestionsService } from 'src/services/questions.service';

@ApiTags('/api/question')
@Controller('/api/question')
export class QuestionsController {
  constructor(
    private readonly questionService: QuestionsService,
  ) { }

 // @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: PagingRequest
  })
  @Get('list-random-question')
  async getListQuestion(@Body() request: PagingRequest) {
    const [result, count] = await this.questionService.getListQuestion(request);
    return PaginateResult.init(
      result, count
    )
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateQuestionRequest,
  })
  @Post('create-question')
  async createQuestion(@CurrUser() user: User, @Body() request: CreateQuestionRequest) {
    return this.questionService.createQuestion(user.id, request);
  }
}
