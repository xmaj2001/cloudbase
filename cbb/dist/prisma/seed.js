"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const _client_1 = require("./seeds/_client");
async function main() {
    console.log('🌱 CloudBase Seed\n');
    console.log('🗑️  A limpar a base de dados...');
    console.log('   ✅ Base de dados limpa\n');
    console.log('\n🚀 Seed concluído com sucesso!');
}
main()
    .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await _client_1.prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map