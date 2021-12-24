import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Level } from "src/constants/level.enum";
import { QuestionStatus } from "src/constants/question-status.enum";

export class CreatePackageRequest {
  @ApiProperty()
  @IsNumber()
  time: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(Level)
  level: Level;

  @ApiProperty()
  @IsOptional()
  @IsEnum(QuestionStatus)
  status: QuestionStatus;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isHidden: boolean;

  @ApiProperty()
  @IsArray()
  question: number[];
}