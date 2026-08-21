export declare function createBetterAuth(): import("better-auth", { with: { "resolution-mode": "import" } }).Auth<{
    basePath: string;
    database: (options: import("better-auth", { with: { "resolution-mode": "import" } }).BetterAuthOptions) => import("better-auth", { with: { "resolution-mode": "import" } }).DBAdapter<import("better-auth", { with: { "resolution-mode": "import" } }).BetterAuthOptions>;
    plugins: any[];
    emailAndPassword: {
        enabled: true;
        revokeSessionsOnPasswordReset: true;
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
    basePath: string;
    database: (options: import("better-auth", { with: { "resolution-mode": "import" } }).BetterAuthOptions) => import("better-auth", { with: { "resolution-mode": "import" } }).DBAdapter<import("better-auth", { with: { "resolution-mode": "import" } }).BetterAuthOptions>;
    plugins: any[];
    emailAndPassword: {
        enabled: true;
        revokeSessionsOnPasswordReset: true;
    };
    trustedOrigins: string[];
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string | undefined;
        };
    };
}>;
