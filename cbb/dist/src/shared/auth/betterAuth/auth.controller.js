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
exports.BetterAuthController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
const node_1 = require("better-auth/node");
const inputs_1 = require("./inputs");
const verify_email_input_1 = require("./inputs/verify-email.input");
const betterAuth_service_1 = require("./betterAuth.service");
let BetterAuthController = class BetterAuthController {
    service;
    constructor(service) {
        this.service = service;
    }
    async signUp(input) {
        return this.service.signUp(input);
    }
    async signIn(input) {
        return this.service.signIn(input);
    }
    async signOut(req) {
        return this.service.signOut((0, node_1.fromNodeHeaders)(req.headers));
    }
    async me(req) {
        return this.service.getSession((0, node_1.fromNodeHeaders)(req.headers));
    }
    async forgotPassword(input) {
        return this.service.forgotPassword(input);
    }
    async resetPassword(input) {
        return this.service.resetPassword(input);
    }
    async changePassword(input, req) {
        return this.service.changePassword(input, (0, node_1.fromNodeHeaders)(req.headers));
    }
    async resendVerification(req) {
        return this.service.resendVerification((0, node_1.fromNodeHeaders)(req.headers));
    }
    async verifyEmail(input) {
        return this.service.verifyEmail(input.token);
    }
};
exports.BetterAuthController = BetterAuthController;
__decorate([
    (0, common_2.Post)("sign-up"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: "Registar novo utilizador",
        description: "Regista um novo utilizador com email e senha. O email deve ser verificado após o registo.",
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Utilizador criado com sucesso" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Dados inválidos" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "Email já existe" }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.SignUpInput]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "signUp", null);
__decorate([
    (0, common_2.Post)("sign-in"),
    (0, nestjs_better_auth_1.AllowAnonymous)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Entrar na conta",
        description: "Entra na conta do utilizador fornecendo email e senha. Retorna o token da sessão se as credenciais forem válidas.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Login bem-sucedido, retorna token",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Credenciais inválidas" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Email não verificado" }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.SignInInput]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "signIn", null);
__decorate([
    (0, common_2.Post)("sign-out"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)("session-token"),
    (0, swagger_1.ApiOperation)({
        summary: "Terminar sessão",
        description: "Termina a sessão atual do utilizador autenticado. Deve ser chamada com o token da sessão no header.",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Sessão terminada com sucesso" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "signOut", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, swagger_1.ApiBearerAuth)("session-token"),
    (0, swagger_1.ApiOperation)({
        summary: "Obter sessão",
        description: "Obtém a sessão atual do utilizador autenticado. Deve ser chamada com o token da sessão no header.",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Dados da sessão atual" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Não autenticado" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "me", null);
__decorate([
    (0, common_2.Post)("forgot-password"),
    (0, nestjs_better_auth_1.AllowAnonymous)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Esqueci-me da senha",
        description: "Envia um email com um link para redefinir a senha para o email fornecido.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Email de reset enviado (se existir)",
    }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.ForgotPasswordInput]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_2.Post)("reset-password"),
    (0, nestjs_better_auth_1.AllowAnonymous)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Redefinir senha",
        description: "Redefine a senha do utilizador usando o token enviado via email (link de redefinição de senha).",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Senha redefinida com sucesso" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Token inválido ou expirado" }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.ResetPasswordInput]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_2.Post)("change-password"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)("session-token"),
    (0, swagger_1.ApiOperation)({
        summary: "Alterar senha",
        description: "Altera a senha do utilizador autenticado. O utilizador deve estar autenticado.",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Senha alterada com sucesso" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Senha atual incorreta" }),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.ChangePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "changePassword", null);
__decorate([
    (0, common_2.Post)("verify-email/resend"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)("session-token"),
    (0, swagger_1.ApiOperation)({
        summary: "Reenviar verificação de email",
        description: "Token do email enviado via email (link de verificação) para reenviar email de verificação",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Email reenviado" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "resendVerification", null);
__decorate([
    (0, common_1.Get)("verify-email"),
    (0, nestjs_better_auth_1.AllowAnonymous)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Verificar email",
        description: "Token do email enviado via email (link de verificação)",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Email verificado com sucesso" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Token inválido ou expirado" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_input_1.VerifyEmailInput]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "verifyEmail", null);
exports.BetterAuthController = BetterAuthController = __decorate([
    (0, nestjs_better_auth_1.AllowAnonymous)(),
    (0, common_1.Controller)({
        path: "auth",
        version: "1",
    }),
    __metadata("design:paramtypes", [betterAuth_service_1.BetterAuthService])
], BetterAuthController);
//# sourceMappingURL=auth.controller.js.map