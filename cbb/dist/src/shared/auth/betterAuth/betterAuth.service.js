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
var BetterAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetterAuthService = void 0;
const common_1 = require("@nestjs/common");
const sign_up_use_case_1 = require("./use-cases/sign-up.use-case");
const use_cases_1 = require("./use-cases");
let BetterAuthService = BetterAuthService_1 = class BetterAuthService {
    signUpUseCase;
    signInUseCase;
    signOutUseCase;
    getSessionUseCase;
    forgotPasswordUseCase;
    resetPasswordUseCase;
    changePasswordUseCase;
    resendVerificationUseCase;
    verifyEmailUseCase;
    logger = new common_1.Logger(BetterAuthService_1.name);
    constructor(signUpUseCase, signInUseCase, signOutUseCase, getSessionUseCase, forgotPasswordUseCase, resetPasswordUseCase, changePasswordUseCase, resendVerificationUseCase, verifyEmailUseCase) {
        this.signUpUseCase = signUpUseCase;
        this.signInUseCase = signInUseCase;
        this.signOutUseCase = signOutUseCase;
        this.getSessionUseCase = getSessionUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
        this.resendVerificationUseCase = resendVerificationUseCase;
        this.verifyEmailUseCase = verifyEmailUseCase;
    }
    async signUp(input) {
        return this.signUpUseCase.execute(input);
    }
    async signIn(input) {
        return this.signInUseCase.execute(input);
    }
    async signOut(header) {
        return this.signOutUseCase.execute(header);
    }
    async getSession(header) {
        return this.getSessionUseCase.execute(header);
    }
    async changePassword(input, header) {
        return this.changePasswordUseCase.execute(input, header);
    }
    async forgotPassword(input) {
        return this.forgotPasswordUseCase.execute(input);
    }
    async resetPassword(input) {
        return this.resetPasswordUseCase.execute(input);
    }
    async resendVerification(headers) {
        return this.resendVerificationUseCase.execute(headers);
    }
    async verifyEmail(token) {
        return this.verifyEmailUseCase.execute(token);
    }
};
exports.BetterAuthService = BetterAuthService;
exports.BetterAuthService = BetterAuthService = BetterAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sign_up_use_case_1.SignUpUseCase,
        use_cases_1.SignInUseCase,
        use_cases_1.SignOutUseCase,
        use_cases_1.GetSessionUseCase,
        use_cases_1.ForgotPasswordUseCase,
        use_cases_1.ResetPasswordUseCase,
        use_cases_1.ChangePasswordUseCase,
        use_cases_1.ResendVerificationUseCase,
        use_cases_1.VerifyEmailUseCase])
], BetterAuthService);
//# sourceMappingURL=betterAuth.service.js.map