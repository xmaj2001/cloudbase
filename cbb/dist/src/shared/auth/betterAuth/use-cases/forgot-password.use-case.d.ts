import { ForgotPasswordInput } from '../inputs';
import { AuthService } from '@thallesp/nestjs-better-auth';
export declare class ForgotPasswordUseCase {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    execute(input: ForgotPasswordInput): Promise<{
        message: string;
    }>;
}
