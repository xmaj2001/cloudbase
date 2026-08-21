import { z } from "zod";
export declare const envSchema: z.ZodObject<{
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE_URL: z.ZodString;
    DB_USER: z.ZodString;
    DB_NAME: z.ZodString;
    DB_PASSWORD: z.ZodString;
    REDIS_URL: z.ZodString;
    BETTER_AUTH_URL: z.ZodString;
    BETTER_AUTH_SECRET: z.ZodString;
    GOOGLE_CLIENT_ID: z.ZodString;
    GOOGLE_CLIENT_SECRET: z.ZodString;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
export declare function validateEnv(config: Record<string, unknown>): {
    PORT: number;
    DATABASE_URL: string;
    DB_USER: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    REDIS_URL: string;
    BETTER_AUTH_URL: string;
    BETTER_AUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
};
