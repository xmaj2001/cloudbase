import { AuthService } from '@thallesp/nestjs-better-auth';
export declare class VerifyEmailUseCase {
    private readonly authService;
    constructor(authService: AuthService);
    execute(token: string): Promise<{
        message: string;
    }>;
}
