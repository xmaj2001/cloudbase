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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalErrorResponse = exports.RateLimitResponse = exports.ConflictResponse = exports.ValidationErrorResponse = exports.NotFoundResponse = exports.ForbiddenResponse = exports.UnauthorizedResponse = exports.BadRequestResponse = exports.ErrorResponse = exports.ErrorDetailDto = void 0;
exports.SuccessResponse = SuccessResponse;
exports.SuccessArrayResponse = SuccessArrayResponse;
exports.PaginatedResponse = PaginatedResponse;
exports.CursorPaginatedResponse = CursorPaginatedResponse;
const swagger_1 = require("@nestjs/swagger");
function SuccessResponse(DataClass) {
    class SuccessEnvelope {
        success;
        data;
        ts;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: true }),
        __metadata("design:type", Boolean)
    ], SuccessEnvelope.prototype, "success", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ type: () => DataClass }),
        __metadata("design:type", Object)
    ], SuccessEnvelope.prototype, "data", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '2026-03-17T10:00:00.000Z' }),
        __metadata("design:type", String)
    ], SuccessEnvelope.prototype, "ts", void 0);
    Object.defineProperty(SuccessEnvelope, 'name', {
        value: `${DataClass.name}Response`,
    });
    return SuccessEnvelope;
}
function SuccessArrayResponse(DataClass) {
    class SuccessArrayEnvelope {
        success;
        items;
        ts;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: true }),
        __metadata("design:type", Boolean)
    ], SuccessArrayEnvelope.prototype, "success", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ type: () => [DataClass] }),
        __metadata("design:type", Array)
    ], SuccessArrayEnvelope.prototype, "items", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '2026-03-17T10:00:00.000Z' }),
        __metadata("design:type", String)
    ], SuccessArrayEnvelope.prototype, "ts", void 0);
    Object.defineProperty(SuccessArrayEnvelope, 'name', {
        value: `${DataClass.name}ArrayResponse`,
    });
    return SuccessArrayEnvelope;
}
function PaginatedResponse(DataClass) {
    class PaginatedEnvelope {
        success;
        items;
        meta;
        ts;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: true }),
        __metadata("design:type", Boolean)
    ], PaginatedEnvelope.prototype, "success", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ type: () => [DataClass] }),
        __metadata("design:type", Array)
    ], PaginatedEnvelope.prototype, "items", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: { total: 100, page: 1, limit: 10, totalPages: 10 },
        }),
        __metadata("design:type", Object)
    ], PaginatedEnvelope.prototype, "meta", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '2026-03-17T10:00:00.000Z' }),
        __metadata("design:type", String)
    ], PaginatedEnvelope.prototype, "ts", void 0);
    Object.defineProperty(PaginatedEnvelope, 'name', {
        value: `${DataClass.name}PaginatedResponse`,
    });
    return PaginatedEnvelope;
}
function CursorPaginatedResponse(DataClass) {
    class CursorPaginatedEnvelope {
        success;
        items;
        nextCursor;
        ts;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: true }),
        __metadata("design:type", Boolean)
    ], CursorPaginatedEnvelope.prototype, "success", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ type: () => [DataClass] }),
        __metadata("design:type", Array)
    ], CursorPaginatedEnvelope.prototype, "items", void 0);
    __decorate([
        (0, swagger_1.ApiPropertyOptional)({ example: 'cm0x1...' }),
        __metadata("design:type", String)
    ], CursorPaginatedEnvelope.prototype, "nextCursor", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '2026-03-17T10:00:00.000Z' }),
        __metadata("design:type", String)
    ], CursorPaginatedEnvelope.prototype, "ts", void 0);
    Object.defineProperty(CursorPaginatedEnvelope, 'name', {
        value: `${DataClass.name}CursorPaginatedResponse`,
    });
    return CursorPaginatedEnvelope;
}
class ErrorDetailDto {
    code;
    message;
    detail;
}
exports.ErrorDetailDto = ErrorDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 422 }),
    __metadata("design:type", Number)
], ErrorDetailDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Erro de validação' }),
    __metadata("design:type", String)
], ErrorDetailDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Email inválido', 'Senha fraca', 'Telefone inválido'],
    }),
    __metadata("design:type", Array)
], ErrorDetailDto.prototype, "detail", void 0);
class ErrorResponse {
    success;
    data;
    ts;
    path;
}
exports.ErrorResponse = ErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], ErrorResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ErrorDetailDto }),
    __metadata("design:type", ErrorDetailDto)
], ErrorResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-03-17T10:00:00.000Z' }),
    __metadata("design:type", String)
], ErrorResponse.prototype, "ts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/auth/sign-up' }),
    __metadata("design:type", String)
], ErrorResponse.prototype, "path", void 0);
class BadRequestResponse extends ErrorResponse {
}
exports.BadRequestResponse = BadRequestResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { code: 400, message: 'Pedido inválido' },
        type: () => ErrorDetailDto,
    }),
    __metadata("design:type", ErrorDetailDto)
], BadRequestResponse.prototype, "data", void 0);
class UnauthorizedResponse extends ErrorResponse {
}
exports.UnauthorizedResponse = UnauthorizedResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { code: 401, message: 'Não autorizado' },
        type: () => ErrorDetailDto,
    }),
    __metadata("design:type", ErrorDetailDto)
], UnauthorizedResponse.prototype, "data", void 0);
class ForbiddenResponse extends ErrorResponse {
}
exports.ForbiddenResponse = ForbiddenResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { code: 403, message: 'Sem permissão para esta ação' },
        type: () => ErrorDetailDto,
    }),
    __metadata("design:type", ErrorDetailDto)
], ForbiddenResponse.prototype, "data", void 0);
class NotFoundResponse extends ErrorResponse {
}
exports.NotFoundResponse = NotFoundResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { code: 404, message: 'Recurso não encontrado' },
        type: () => ErrorDetailDto,
    }),
    __metadata("design:type", ErrorDetailDto)
], NotFoundResponse.prototype, "data", void 0);
class ValidationErrorResponse extends ErrorResponse {
}
exports.ValidationErrorResponse = ValidationErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            code: 422,
            message: 'Erro de validação',
        },
        type: () => ErrorDetailDto,
    }),
    __metadata("design:type", ErrorDetailDto)
], ValidationErrorResponse.prototype, "data", void 0);
class ConflictResponse extends ErrorResponse {
}
exports.ConflictResponse = ConflictResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { code: 409, message: 'Recurso já existe' },
        type: () => ErrorDetailDto,
    }),
    __metadata("design:type", ErrorDetailDto)
], ConflictResponse.prototype, "data", void 0);
class RateLimitResponse extends ErrorResponse {
}
exports.RateLimitResponse = RateLimitResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            code: 429,
            message: 'Demasiadas tentativas, tenta novamente mais tarde',
        },
        type: () => ErrorDetailDto,
    }),
    __metadata("design:type", ErrorDetailDto)
], RateLimitResponse.prototype, "data", void 0);
class InternalErrorResponse extends ErrorResponse {
}
exports.InternalErrorResponse = InternalErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { code: 500, message: 'Erro interno do servidor' },
        type: () => ErrorDetailDto,
    }),
    __metadata("design:type", ErrorDetailDto)
], InternalErrorResponse.prototype, "data", void 0);
//# sourceMappingURL=envelope.response.js.map