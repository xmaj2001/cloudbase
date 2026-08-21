"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwaggerScalar = void 0;
const nestjs_api_reference_1 = require("@scalar/nestjs-api-reference");
const swagger_1 = require("@nestjs/swagger");
const setupSwaggerScalar = (app, name, isProd) => {
    if (!isProd) {
        const swaggerCfg = new swagger_1.DocumentBuilder()
            .setTitle(name)
            .setDescription('Backend API')
            .setVersion('1.0.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Insere o teu JWT token aqui',
            name: 'Authorization',
            in: 'header',
        }, 'Authorization')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerCfg);
        app.use('/doc', (0, nestjs_api_reference_1.apiReference)({
            content: document,
            theme: 'deepSpace',
        }));
    }
};
exports.setupSwaggerScalar = setupSwaggerScalar;
//# sourceMappingURL=swagger-scalar.config.js.map