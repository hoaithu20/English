import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Sex } from 'src/constants/sex.enum';

export class UpdateProfileRequest {
  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sex: string;
}
