import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsArray, IsBoolean, IsEnum, IsString } from "class-validator";
import { Level } from "src/constants/level.enum";
import { QuestionStatus } from "src/constants/question-status.enum";

export class CreatePackage {
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
  @IsArray()
  question: number[];
}