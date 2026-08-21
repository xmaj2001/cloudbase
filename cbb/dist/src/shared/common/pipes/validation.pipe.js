"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppValidationPipe = void 0;
const common_1 = require("@nestjs/common");
function flattenErrors(errors, parentField = '') {
    const result = [];
    for (const error of errors) {
        const field = parentField
            ? `${parentField}.${error.property}`
            : error.property;
        if (error.constraints) {
            result.push({
                field,
                messages: Object.values(error.constraints),
            });
        }
        if (error.children?.length) {
            result.push(...flattenErrors(error.children, field));
        }
    }
    return result;
}
class AppValidationPipe extends common_1.ValidationPipe {
    constructor(options = {}, isProd = false) {
        super({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            errorHttpStatusCode: 422,
            exceptionFactory: (errors) => {
                const flat = flattenErrors(errors);
                return new common_1.UnprocessableEntityException({
                    message: 'Erro de validação',
                    ...(!isProd
                        ? { fields: flat }
                        : { details: flat.map((f) => f.messages).flat() }),
                });
            },
            ...options,
        });
    }
}
exports.AppValidationPipe = AppValidationPipe;
//# sourceMappingURL=validation.pipe.js.map