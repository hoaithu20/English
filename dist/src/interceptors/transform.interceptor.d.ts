import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { BaseResponse } from 'src/responses/base.response';
export declare class TransformInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): import("rxjs").Observable<BaseResponse<any>>;
}
