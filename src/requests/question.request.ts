import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GetQuestionType } from 'src/constants/get-question-type.enum';
import { Level } from 'src/constants/level.enum';
import { PagingRequest } from './paging.request';

export class GetQuestionRequest extends PagingRequest {
  @ApiProperty()
  @IsEnum(Level)
  @IsOptional()
  level: Level;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsEnum(GetQuestionType)
  type: number;
}
