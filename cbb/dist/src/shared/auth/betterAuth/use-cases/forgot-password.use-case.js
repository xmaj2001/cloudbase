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
var ForgotPasswordUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordUseCase = void 0;
const common_1 = require("@nestjs/common");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
let ForgotPasswordUseCase = ForgotPasswordUseCase_1 = class ForgotPasswordUseCase {
    authService;
    logger = new common_1.Logger(ForgotPasswordUseCase_1.name);
    constructor(authService) {
        this.authService = authService;
    }
    async execute(input) {
        await this.authService.api.requestPasswordReset({
            body: {
                email: input.email,
                redirectTo: `${process.env.BETTER_AUTH_URL}/auth/reset-password`,
            },
        });
        return { message: 'Se o email existir, receberás instruções em breve' };
    }
};
exports.ForgotPasswordUseCase = ForgotPasswordUseCase;
exports.ForgotPasswordUseCase = ForgotPasswordUseCase = ForgotPasswordUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_better_auth_1.AuthService])
], ForgotPasswordUseCase);
//# sourceMappingURL=forgot-password.use-case.js.map