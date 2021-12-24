import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { PaginateResult } from '../responses/PaginateResult';
import { BaseResponse } from 'src/responses/base.response';
import { ErrorCode } from 'src/constants/errorcode.constant';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(context: ExecutionContext, next: CallHandler<T>) {
    return next.handle().pipe(
      map((data) => {
        const baseResponse = new BaseResponse<any>();
        baseResponse.code = ErrorCode.SUCCESS;
        if (data instanceof PaginateResult) {
          baseResponse.data = {
            items: data.items,
            meta: {
              count: data.count,
            },
          };
        } else {
          baseResponse.data = data;
        }
        return baseResponse;
      }),
    );
  }
}
