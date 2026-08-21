import { SignUpInput } from '../inputs';
import { AuthService } from '@thallesp/nestjs-better-auth';
export declare class SignUpUseCase {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    execute(input: SignUpInput): Promise<{
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
}
