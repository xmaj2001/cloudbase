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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderController = void 0;
const common_1 = require("@nestjs/common");
const provider_service_1 = require("./provider.service");
const swagger_1 = require("@nestjs/swagger");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
const provider_input_1 = require("./provider.input");
let ProviderController = class ProviderController {
    service;
    constructor(service) {
        this.service = service;
    }
    getSupportedProviders() {
        return this.service.getSupportedProviders();
    }
    create(session, dto) {
        return this.service.create(session.user.id, dto);
    }
    findAll(session) {
        return this.service.list(session.user.id);
    }
    getCredentials(session, id) {
        return this.service.getCredentials(session.user.id, id);
    }
};
exports.ProviderController = ProviderController;
__decorate([
    (0, common_1.Get)("supported"),
    (0, swagger_1.ApiOperation)({
        summary: "Listar Providers Suportados",
        description: "Retorna a lista de todos os tipos de provedores de armazenamento suportados pela plataforma CloudBase.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Lista de provedores suportados retornada com sucesso.",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "getSupportedProviders", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Criar Provider",
        description: "Regista um novo provedor de armazenamento para o utilizador.",
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Provider criado com sucesso." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Credenciais inválidas." }),
    __param(0, (0, nestjs_better_auth_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, provider_input_1.CreateDriverDto]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Listar Providers",
        description: "Lista todos os storage Providers ativos do utilizador.",
    }),
    __param(0, (0, nestjs_better_auth_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id/credentials"),
    (0, swagger_1.ApiOperation)({
        summary: "Obter Credenciais",
        description: "Retorna as credenciais registradas de um provider específico.",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Credenciais retornadas." }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Provider não encontrado." }),
    __param(0, (0, nestjs_better_auth_1.Session)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "getCredentials", null);
exports.ProviderController = ProviderController = __decorate([
    (0, swagger_1.ApiTags)("Providers"),
    (0, swagger_1.ApiBearerAuth)("session-token"),
    (0, common_1.Controller)({
        path: "providers",
        version: "1",
    }),
    __metadata("design:paramtypes", [provider_service_1.ProviderServices])
], ProviderController);
//# sourceMappingURL=provider.controller.js.map