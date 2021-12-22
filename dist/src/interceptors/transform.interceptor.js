"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const PaginateResult_1 = require("../responses/PaginateResult");
const base_response_1 = require("../responses/base.response");
const errorcode_constant_1 = require("../constants/errorcode.constant");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe(operators_1.map((data) => {
            const baseResponse = new base_response_1.BaseResponse();
            baseResponse.code = errorcode_constant_1.ErrorCode.SUCCESS;
            if (data instanceof PaginateResult_1.PaginateResult) {
                baseResponse.data = {
                    items: data.items,
                    meta: {
                        total_count: data.count,
                    },
                };
            }
            else {
                baseResponse.data = data;
            }
            return baseResponse;
        }));
    }
};
TransformInterceptor = __decorate([
    common_1.Injectable()
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;
//# sourceMappingURL=transform.interceptor.js.map