import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PagingRequest } from './paging.request';

export class GetListQuestion extends PagingRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  // @ApiProperty()
  // @IsOptional()
  // @Is
}
