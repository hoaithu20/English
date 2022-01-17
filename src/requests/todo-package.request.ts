import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber } from 'class-validator';

class Questions {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsBoolean()
  answerId: number;
}

export class DoPackageRequest {
  @ApiProperty()
  @IsNumber()
  packageId: number;

  @ApiProperty()
  @IsNumber()
  time: number;

  @ApiProperty()
  @IsArray()
  questions: Questions[];
}
