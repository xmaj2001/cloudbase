import 'dotenv/config';
import { prisma } from './seeds/_client';
import { seedUser1 } from './seeds/user1.seed';
import { seedUser2 } from './seeds/user2.seed';
import { seedUser3 } from './seeds/user3.seed';

async function main() {
  console.log('🌱 CloudBase Seed\n');

  // ── Limpar BD ──────────────────────────────────────────────────────────────
  console.log('🗑️  A limpar a base de dados...');
  await prisma.fileChunk.deleteMany();
  await prisma.node.deleteMany();
  await prisma.storageDriver.deleteMany();
  await prisma.user.deleteMany();
  console.log('   ✅ Base de dados limpa\n');

  // ── Seed de cada utilizador ────────────────────────────────────────────────
  console.log('👥 A criar utilizadores...\n');
  await seedUser1(); // João  — GDrive + Telegram  (power user)
  await seedUser2(); // Ana   — Cloudinary + OneDrive  (criativa)
  await seedUser3(); // Carlos — VPS + MEGA  (técnico)

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
