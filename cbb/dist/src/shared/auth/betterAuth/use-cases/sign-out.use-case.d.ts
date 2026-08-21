import { AuthService } from '@thallesp/nestjs-better-auth';
export declare class SignOutUseCase {
    private readonly authService;
    constructor(authService: AuthService);
    private readonly logger;
    execute(headers: Headers): Promise<{
        success: boolean;
    }>;
}
