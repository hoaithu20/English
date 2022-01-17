import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStoryRequest {
  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  storyId: number;
}
