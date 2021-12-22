import { ValidationError } from 'class-validator';
import { BaseResponse } from '../responses/base.response';
export declare const normalError: (errors: ValidationError[]) => BaseResponse<null>;
