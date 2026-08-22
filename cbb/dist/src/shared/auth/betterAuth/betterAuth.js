"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServer = void 0;
exports.createBetterAuth = createBetterAuth;
const adapter_pg_1 = require("@prisma/adapter-pg");
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const plugins_1 = require("better-auth/plugins");
const client_1 = require("../../../generated/prisma/client");
const plugins = [(0, plugins_1.bearer)(), (0, plugins_1.oneTap)()];
const prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
function createAuthConfig() {
    return {
        database: (0, prisma_1.prismaAdapter)(prisma, { provider: "postgresql" }),
        plugins,
        session: {
            updateAge: 60 * 60 * 24,
            absoluteLifetime: 60 * 60 * 24 * 30,
            cookieCache: {
                enabled: true,
                maxAge: 5 * 60,
            },
        },
        cookie: {
            name: "better-auth.session_token",
            path: "/",
            domain: undefined,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
        },
        emailAndPassword: {
            enabled: true,
            revokeSessionsOnPasswordReset: true,
        },
        trustedOrigins: [
            "http://localhost:3000",
            "http://localhost:5000",
        ],
        socialProviders: {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
        },
    };
}
function createBetterAuth() {
    return (0, better_auth_1.betterAuth)(createAuthConfig());
}
exports.authServer = (0, better_auth_1.betterAuth)(createAuthConfig());
//# sourceMappingURL=betterAuth.js.map