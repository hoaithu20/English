"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const errorcode_constant_1 = require("../constants/errorcode.constant");
let AllExceptionFilter = AllExceptionFilter_1 = class AllExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof Error) {
            this.logger.error({
                message: exception.message,
                exception: exception.stack,
            });
        }
        else {
            this.logger.error({
                exception: exception,
            });
            console.log('Exception: ', exception);
        }
        if (exception instanceof common_1.BadRequestException) {
            const errorResponse = exception.getResponse();
            response.status(common_1.HttpStatus.BAD_REQUEST).json(errorResponse);
        }
        else if (exception instanceof common_1.UnauthorizedException) {
            const errorResponse = exception.getResponse();
            response.status(common_1.HttpStatus.UNAUTHORIZED).json(errorResponse);
        }
        else if (exception instanceof common_1.ForbiddenException) {
            const errorResponse = exception.getResponse();
            response.status(common_1.HttpStatus.FORBIDDEN).json(errorResponse);
        }
        else if (exception instanceof common_1.HttpException) {
            const errorResponse = exception.getResponse();
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
        }
        else {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: errorcode_constant_1.ErrorCode.GENERAL_ERROR,
            });
        }
    }
};
AllExceptionFilter = AllExceptionFilter_1 = __decorate([
    common_1.Catch()
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=exception.filter.js.map