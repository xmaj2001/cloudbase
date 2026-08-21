import { ChangePasswordInput, ForgotPasswordInput, ResetPasswordInput, SignInInput, SignUpInput } from "./inputs";
import type { Request } from "express";
import { VerifyEmailInput } from "./inputs/verify-email.input";
import { BetterAuthService } from "./betterAuth.service";
export declare class BetterAuthController {
    private readonly service;
    constructor(service: BetterAuthService);
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
    signOut(req: Request): Promise<{
        success: boolean;
    }>;
    me(req: Request): Promise<{
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
    forgotPassword(input: ForgotPasswordInput): Promise<{
        message: string;
    }>;
    resetPassword(input: ResetPasswordInput): Promise<{
        status: boolean;
    }>;
    changePassword(input: ChangePasswordInput, req: Request): Promise<{
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
    resendVerification(req: Request): Promise<{
        message: string;
    }>;
    verifyEmail(input: VerifyEmailInput): Promise<{
        message: string;
    }>;
}
