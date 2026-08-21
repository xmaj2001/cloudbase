import { AuthService } from '@thallesp/nestjs-better-auth';
export declare class ResendVerificationUseCase {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    execute(headers: Headers): Promise<{
        message: string;
    }>;
}
