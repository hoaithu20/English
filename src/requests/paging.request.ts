import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';
import { ErrorCode } from '../constants/errorcode.constant';

export class PagingRequest {
  @ApiProperty({ name: 'page_index' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: ErrorCode.PAGE_INDEX_NOT_INTEGER },
  )
  @Min(1, { message: ErrorCode.PAGE_INDEX_MIN_ONE })
  @Expose({ name: 'page_index' })
  pageIndex: number;

  @ApiProperty({ name: 'page_size' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: ErrorCode.PAGE_SIZE_NOT_INTEGER },
  )
  @Min(1, { message: ErrorCode.PAGE_SIZE_MIN_ONE })
  @Expose({ name: 'page_size' })
  pageSize: number;
}
