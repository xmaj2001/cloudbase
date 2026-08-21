import { ChangePasswordInput } from '../inputs';
import { AuthService } from '@thallesp/nestjs-better-auth';
export declare class ChangePasswordUseCase {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    execute(input: ChangePasswordInput, headers: Headers): Promise<{
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
}
