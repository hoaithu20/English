import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';
import { QuestionStatus } from 'src/constants/question-status.enum';

export class ApproveQuestionRequest {
  @ApiProperty()
  @IsArray()
  questions: number[];

  @ApiProperty()
  @IsEnum(QuestionStatus)
  status: number;
}
