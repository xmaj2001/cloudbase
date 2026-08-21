"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetterAuthModules = void 0;
const common_1 = require("@nestjs/common");
const use_cases_1 = require("./use-cases");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
const betterAuth_service_1 = require("./betterAuth.service");
const auth_controller_1 = require("./auth.controller");
const useCases = [
    use_cases_1.SignUpUseCase,
    use_cases_1.SignInUseCase,
    use_cases_1.SignOutUseCase,
    use_cases_1.GetSessionUseCase,
    use_cases_1.ForgotPasswordUseCase,
    use_cases_1.ResetPasswordUseCase,
    use_cases_1.ChangePasswordUseCase,
    use_cases_1.ResendVerificationUseCase,
    use_cases_1.VerifyEmailUseCase,
];
let BetterAuthModules = class BetterAuthModules {
};
exports.BetterAuthModules = BetterAuthModules;
exports.BetterAuthModules = BetterAuthModules = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [betterAuth_service_1.BetterAuthService, nestjs_better_auth_1.AuthService, ...useCases],
        controllers: [auth_controller_1.BetterAuthController],
        exports: [betterAuth_service_1.BetterAuthService],
    })
], BetterAuthModules);
//# sourceMappingURL=betterAuth.module.js.map