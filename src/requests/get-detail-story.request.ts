import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetDetailStory {
  @ApiProperty()
  @IsNumber()
  storyId: number;
}
