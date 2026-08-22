export declare function createBetterAuth(): import("better-auth", { with: { "resolution-mode": "import" } }).Auth<{
    database: (options: import("better-auth", { with: { "resolution-mode": "import" } }).BetterAuthOptions) => import("better-auth", { with: { "resolution-mode": "import" } }).DBAdapter<import("better-auth", { with: { "resolution-mode": "import" } }).BetterAuthOptions>;
    plugins: any[];
    session: {
        updateAge: number;
        absoluteLifetime: number;
        cookieCache: {
            enabled: boolean;
            maxAge: number;
        };
    };
    cookie: {
        name: string;
        path: string;
        domain: undefined;
        sameSite: string;
        secure: boolean;
        httpOnly: boolean;
        maxAge: number;
    };
    emailAndPassword: {
        enabled: boolean;
        revokeSessionsOnPasswordReset: boolean;
    };
    trustedOrigins: string[];
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string | undefined;
        };
    };
}>;
export declare const authServer: import("better-auth", { with: { "resolution-mode": "import" } }).Auth<{
    database: (options: import("better-auth", { with: { "resolution-mode": "import" } }).BetterAuthOptions) => import("better-auth", { with: { "resolution-mode": "import" } }).DBAdapter<import("better-auth", { with: { "resolution-mode": "import" } }).BetterAuthOptions>;
    plugins: any[];
    session: {
        updateAge: number;
        absoluteLifetime: number;
        cookieCache: {
            enabled: boolean;
            maxAge: number;
        };
    };
    cookie: {
        name: string;
        path: string;
        domain: undefined;
        sameSite: string;
        secure: boolean;
        httpOnly: boolean;
        maxAge: number;
    };
    emailAndPassword: {
        enabled: boolean;
        revokeSessionsOnPasswordReset: boolean;
    };
    trustedOrigins: string[];
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string | undefined;
        };
    };
}>;
