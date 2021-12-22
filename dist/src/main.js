"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logging_config_1 = require("./configs/logging.config");
const swagger_config_1 = __importDefault(require("./configs/swagger.config"));
const exception_filter_1 = require("./exceptions/exception.filter");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const exception_util_1 = require("./utils/exception.util");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logging_config_1.LoggingConfig(),
    });
    swagger_config_1.default(app);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            if (errors.length > 0) {
                throw new common_1.BadRequestException(exception_util_1.normalError(errors));
            }
        },
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new exception_filter_1.AllExceptionFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map