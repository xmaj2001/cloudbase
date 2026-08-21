import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { ChangePasswordInput, ForgotPasswordInput, ResetPasswordInput, SignInInput, SignUpInput } from './inputs';
import { ChangePasswordUseCase, ForgotPasswordUseCase, GetSessionUseCase, ResetPasswordUseCase, ResendVerificationUseCase, SignInUseCase, SignOutUseCase, VerifyEmailUseCase } from './use-cases';
export declare class BetterAuthService {
    private readonly signUpUseCase;
    private readonly signInUseCase;
    private readonly signOutUseCase;
    private readonly getSessionUseCase;
    private readonly forgotPasswordUseCase;
    private readonly resetPasswordUseCase;
    private readonly changePasswordUseCase;
    private readonly resendVerificationUseCase;
    private readonly verifyEmailUseCase;
    private readonly logger;
    constructor(signUpUseCase: SignUpUseCase, signInUseCase: SignInUseCase, signOutUseCase: SignOutUseCase, getSessionUseCase: GetSessionUseCase, forgotPasswordUseCase: ForgotPasswordUseCase, resetPasswordUseCase: ResetPasswordUseCase, changePasswordUseCase: ChangePasswordUseCase, resendVerificationUseCase: ResendVerificationUseCase, verifyEmailUseCase: VerifyEmailUseCase);
    signUp(input: SignUpInput): Promise<{
        token: null;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
        };
    } | {
        token: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
        };
    } | {
        message: string;
    }>;
    signIn(input: SignInInput): Promise<{
        redirect: boolean;
        token: string;
        url?: string | undefined;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
        };
    }>;
    signOut(header: Headers): Promise<{
        success: boolean;
    }>;
    getSession(header: Headers): Promise<{
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined | undefined;
            userAgent?: string | null | undefined | undefined;
        };
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined | undefined;
        };
    }>;
    changePassword(input: ChangePasswordInput, header: Headers): Promise<{
        token: string | null;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        } & Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        };
    }>;
    forgotPassword(input: ForgotPasswordInput): Promise<{
        message: string;
    }>;
    resetPassword(input: ResetPasswordInput): Promise<{
        status: boolean;
    }>;
    resendVerification(headers: Headers): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
}
