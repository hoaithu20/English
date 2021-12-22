import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AllExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
}
