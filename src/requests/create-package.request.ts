import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsString } from "class-validator";
import { Level } from "src/constants/level.enum";
import { QuestionStatus } from "src/constants/question-status.enum";

export class CreatePackageRequest {
  @ApiProperty()
  @IsString()
  time: number;

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
  @IsBoolean()
  total: number;

  @ApiProperty()
  @IsArray()
  question: number[];
}