import { SignInInput } from '../inputs';
import { AuthService } from '@thallesp/nestjs-better-auth';
export declare class SignInUseCase {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    execute(input: SignInInput): Promise<{
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
}
