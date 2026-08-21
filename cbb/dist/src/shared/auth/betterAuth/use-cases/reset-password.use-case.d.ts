import { ResetPasswordInput } from '../inputs';
import { AuthService } from '@thallesp/nestjs-better-auth';
export declare class ResetPasswordUseCase {
    private readonly authService;
    constructor(authService: AuthService);
    private readonly logger;
    execute(input: ResetPasswordInput): Promise<{
        status: boolean;
    }>;
}
