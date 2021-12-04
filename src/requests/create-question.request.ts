import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Level } from "src/constants/level.enum";
import { QuestionStatus } from "src/constants/question-status.enum";

class Answer {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  explain: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionRequest {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsEnum(Level)
  level: Level;

  @ApiProperty()
  @IsEnum(QuestionStatus)
  status: QuestionStatus;

  @ApiProperty()
  @IsBoolean()
  isHidden: boolean;

  @ApiProperty()
  @IsNumber()
  totalAnswer: number;

  @ApiProperty()
  @IsArray()
  @Type(() => Answer)
  answers: Answer[];

}