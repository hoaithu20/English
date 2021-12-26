import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { ErrorCode } from '../constants/errorcode.constant';

export class PagingRequest {
  @ApiProperty()
  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: ErrorCode.PAGE_INDEX_NOT_INTEGER },
  )
  @Min(1, { message: ErrorCode.PAGE_INDEX_MIN_ONE })
  pageIndex: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: ErrorCode.PAGE_SIZE_NOT_INTEGER },
  )
  @Min(1, { message: ErrorCode.PAGE_SIZE_MIN_ONE })
  pageSize: number;
}
