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
var ResendVerificationUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendVerificationUseCase = void 0;
const common_1 = require("@nestjs/common");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
let ResendVerificationUseCase = ResendVerificationUseCase_1 = class ResendVerificationUseCase {
    authService;
    logger = new common_1.Logger(ResendVerificationUseCase_1.name);
    constructor(authService) {
        this.authService = authService;
    }
    async execute(headers) {
        const session = await this.authService.api.getSession({ headers });
        if (!session?.user?.email) {
            throw new common_1.ConflictException('Sessão inválida');
        }
        await this.authService.api.sendVerificationEmail({
            body: { email: session.user.email },
        });
        return { message: 'Email de verificação reenviado' };
    }
};
exports.ResendVerificationUseCase = ResendVerificationUseCase;
exports.ResendVerificationUseCase = ResendVerificationUseCase = ResendVerificationUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_better_auth_1.AuthService])
], ResendVerificationUseCase);
//# sourceMappingURL=resend-verification.use-case.js.map