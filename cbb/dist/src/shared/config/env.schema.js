"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
exports.validateEnv = validateEnv;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(5000),
    DATABASE_URL: zod_1.z.string(),
    DB_USER: zod_1.z.string().min(1),
    DB_NAME: zod_1.z.string().min(1),
    DB_PASSWORD: zod_1.z.string().min(1),
    REDIS_URL: zod_1.z.string(),
    BETTER_AUTH_URL: zod_1.z.string().url(),
    BETTER_AUTH_SECRET: zod_1.z
        .string()
        .min(32, "BETTER_AUTH_SECRET deve ter no mínimo 32 caracteres"),
    GOOGLE_CLIENT_ID: zod_1.z.string().min(1, "GOOGLE_CLIENT_ID é obrigatório"),
    GOOGLE_CLIENT_SECRET: zod_1.z.string().min(1, "GOOGLE_CLIENT_SECRET é obrigatório"),
});
function validateEnv(config) {
    const result = exports.envSchema.safeParse(config);
    if (!result.success) {
        console.error("❌ [CONFIG ERROR] Variáveis de ambiente inválidas ou em falta:");
        console.error(JSON.stringify(result.error.format(), null, 2));
        throw new Error("Falha ao validar as variáveis de ambiente.");
    }
    return result.data;
}
//# sourceMappingURL=env.schema.js.map