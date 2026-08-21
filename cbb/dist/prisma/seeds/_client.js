"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faker = exports.prisma = void 0;
const client_1 = require("../../src/generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const faker_1 = require("@faker-js/faker");
Object.defineProperty(exports, "faker", { enumerable: true, get: function () { return faker_1.faker; } });
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
exports.prisma = new client_1.PrismaClient({ adapter });
//# sourceMappingURL=_client.js.map