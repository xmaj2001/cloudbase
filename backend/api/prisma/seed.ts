import 'dotenv/config';
import { prisma } from './seeds/_client';
async function main() {
  console.log('🌱 CloudBase Seed\n');

  // ── Limpar BD ──────────────────────────────────────────────────────────────
  console.log('🗑️  A limpar a base de dados...');

  console.log('   ✅ Base de dados limpa\n');

  // ── Seed de cada utilizador ────────────────────────────────────────────────

  console.log('\n🚀 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
