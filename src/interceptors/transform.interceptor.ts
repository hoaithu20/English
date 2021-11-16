import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/responses/base.response';
import { map } from 'rxjs/operators';
import { ErrorCode } from 'src/constants/errorcode.constant';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<BaseResponse<T>> | Promise<Observable<BaseResponse<T>>> {
    return next.handle().pipe(
      map((data) => {
        const baseResponse = new BaseResponse<T>();
        baseResponse.code = ErrorCode.SUCCESS;
        baseResponse.data = data;

        return baseResponse;
      }),
    );
  }
}
