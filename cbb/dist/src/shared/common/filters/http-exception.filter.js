"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const message_error_1 = require("./message-error");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    isDev;
    logger = new common_1.Logger(HttpExceptionFilter_1.name);
    constructor(isDev) {
        this.isDev = isDev;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = message_error_1.ERROR_MESSAGES.INTERNAL_ERROR;
        let details;
        let fields;
        let stack;
        if (this.isBetterAuthError(exception)) {
            status = exception.statusCode ?? common_1.HttpStatus.BAD_REQUEST;
            message =
                exception.body?.message ?? message_error_1.ERROR_MESSAGES.AUTHENTICATION;
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const raw = exception.getResponse();
            if (typeof raw === 'string') {
                message = raw;
            }
            else {
                message = raw.message ?? message;
                if (raw.fields)
                    fields = raw.fields;
                if (raw.details)
                    details = raw.details;
            }
        }
        else if (exception instanceof Error) {
            this.logger.error(`Unhandled: ${exception.message}`, exception.stack);
            if (this.isDev) {
                message = exception.message;
                stack = exception.stack;
            }
        }
        if (status >= 500) {
            this.logger.error(`[${req.method}] ${req.url} → ${status}`, exception instanceof Error ? exception.stack : String(exception));
        }
        else {
            this.logger.warn(`[${req.method}] ${req.url} → ${status} — ${message}`);
        }
        const extra = {};
        if (fields)
            extra.fields = fields;
        if (details)
            extra.details = details;
        if (!this.isDev && stack)
            extra.stack = stack;
        res.status(status).json({
            success: false,
            data: { code: status, message, ...extra },
            ts: new Date().toISOString(),
            path: req.url,
        });
    }
    isBetterAuthError(exception) {
        return (typeof exception === 'object' &&
            exception !== null &&
            'statusCode' in exception &&
            'body' in exception &&
            typeof exception.body?.message === 'string');
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [Boolean])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map