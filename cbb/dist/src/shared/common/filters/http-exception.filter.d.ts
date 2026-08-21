import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly isDev;
    private readonly logger;
    constructor(isDev: boolean);
    catch(exception: unknown, host: ArgumentsHost): void;
    private isBetterAuthError;
}
