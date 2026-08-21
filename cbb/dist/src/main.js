"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_scalar_config_1 = require("./shared/swagger/swagger-scalar.config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const validation_pipe_1 = require("./shared/common/pipes/validation.pipe");
const http_exception_filter_1 = require("./shared/common/filters/http-exception.filter");
const bigint_interceptor_1 = require("./shared/common/interceptors/bigint.interceptor");
const response_interceptor_1 = require("./shared/common/interceptors/response.interceptor");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new validation_pipe_1.AppValidationPipe({}, false));
    app.useGlobalInterceptors(new bigint_interceptor_1.BigIntInterceptor());
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(false));
    (0, swagger_scalar_config_1.setupSwaggerScalar)(app, "API", process.env.NODE_ENV === "production");
    const port = process.env.PORT ?? 5000;
    await app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
        console.log(`Documentation http://localhost:${port}/doc`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map