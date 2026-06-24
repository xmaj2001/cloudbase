// ─────────────────────────────────────────────────────────────────────────────
// Seed: User 2 — Ana (utilizadora criativa com Cloudinary + OneDrive)
// ─────────────────────────────────────────────────────────────────────────────
import { prisma, faker } from './_client';

export async function seedUser2() {
  console.log('  👤 A criar utilizador 2 (Ana)...');

  const user = await prisma.user.create({
    data: {
      name: 'Ana Costa',
      email: faker.internet.email({ firstName: 'ana', lastName: 'costa' }),
      avatarUrl: faker.image.avatar(),
      reputationScore: 72.0,
      totalTrades: 55,
      completedTrades: 40,
      tradeCompletionRate: 0.727,
    },
  });

  // ── Storage Drivers ──────────────────────────────────────────────────────

  const cloudinary = await prisma.storageDriver.create({
    data: {
      userId: user.id,
      type: 'CLOUDINARY',
      displayName: 'Cloudinary (Media Store)',
      priority: 1,
      credentials: {
        apiKey: faker.string.numeric(15),
        apiSecret: faker.string.alphanumeric(27),
        cloudName: `ana-cloud-${faker.string.alphanumeric(6)}`,
      },
      cachedTotalSpace: BigInt(25 * 1024 * 1024 * 1024),    // 25 GB (plano pago)
      cachedUsedSpace: BigInt(8_500 * 1024 * 1024),          // 8.5 GB
      cachedAvailableSpace: BigInt(16_500 * 1024 * 1024),
      spaceCachedAt: new Date(),
    },
  });

  const oneDrive = await prisma.storageDriver.create({
    data: {
      userId: user.id,
      type: 'ONEDRIVE',
      displayName: 'OneDrive Profissional (1 TB)',
      priority: 2,
      credentials: {
        accessToken: faker.string.alphanumeric(40),
        refreshToken: faker.string.alphanumeric(40),
        expiresAt: faker.date.future(),
        accountEmail: user.email,
        accountId: faker.string.alphanumeric(30),
      },
      cachedTotalSpace: BigInt(1024 * 1024 * 1024 * 1024),  // 1 TB
      cachedUsedSpace: BigInt(120 * 1024 * 1024 * 1024),    // 120 GB
      cachedAvailableSpace: BigInt(904 * 1024 * 1024 * 1024),
      spaceCachedAt: new Date(),
      rootFolderId: faker.string.alphanumeric(40),
      rootFolderPath: 'CloudBase/',
    },
  });

  // ── Hierarquia de Nodes ──────────────────────────────────────────────────

  // Grupo de Design
  const designGroup = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'GROUP',
      name: 'Design & Portfolio',
      tags: ['design', 'portfolio'],
    },
  });

  // Pasta de imagens no Cloudinary
  const fotosFolder = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'FOLDER',
      name: 'Fotos Produto 2026',
      parentId: designGroup.id,
      driverId: cloudinary.id,
      providerFileId: faker.string.alphanumeric(28),
      providerPath: 'CloudBase/FotosProduto2026',
      providerCreatedAt: faker.date.past(),
      providerUpdatedAt: new Date(),
    },
  });

  // Imagens no Cloudinary com IA classificada
  const imageFiles = [
    { name: 'produto_hero_01.jpg', summary: 'Imagem principal do produto em fundo branco, ângulo frontal.' },
    { name: 'produto_lifestyle_02.jpg', summary: 'Produto em contexto de uso real num ambiente moderno.' },
    { name: 'produto_detalhe_03.jpg', summary: 'Close-up com detalhe de textura e materiais.' },
    { name: 'produto_pack_04.jpg', summary: 'Packaging completo com todos os acessórios incluídos.' },
  ];

  for (const file of imageFiles) {
    await prisma.node.create({
      data: {
        userId: user.id,
        type: 'FILE',
        name: file.name,
        mimeType: 'image/jpeg',
        extension: '.jpg',
        size: BigInt(faker.number.int({ min: 500_000, max: 8_000_000 })),
        parentId: fotosFolder.id,
        driverId: cloudinary.id,
        providerFileId: faker.string.alphanumeric(28),
        providerPath: `CloudBase/FotosProduto2026/${file.name}`,
        providerCreatedAt: faker.date.past(),
        providerUpdatedAt: new Date(),
        tags: ['imagem', 'produto', 'marketing'],
        thumbnailUrl: faker.image.url({ width: 300, height: 300 }),
        aiClassified: true,
        aiCategory: 'Imagens/Produto',
        aiConfidence: faker.number.float({ min: 0.82, max: 0.99, fractionDigits: 2 }),
        aiSummary: file.summary,
        status: 'ACTIVE',
      },
    });
  }

  // Documentos no OneDrive
  const docsGroup = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'GROUP',
      name: 'Documentos Pessoais',
      tags: ['documentos', 'pessoal'],
    },
  });

  await prisma.node.createMany({
    data: [
      {
        userId: user.id,
        type: 'FILE',
        name: 'curriculo_2026.pdf',
        mimeType: 'application/pdf',
        extension: '.pdf',
        size: BigInt(faker.number.int({ min: 100_000, max: 500_000 })),
        parentId: docsGroup.id,
        driverId: oneDrive.id,
        providerFileId: faker.string.alphanumeric(40),
        providerPath: 'CloudBase/curriculo_2026.pdf',
        providerCreatedAt: faker.date.past(),
        providerUpdatedAt: new Date(),
        tags: ['cv', 'pessoal'],
        aiClassified: true,
        aiCategory: 'Documentos/Pessoal',
        aiConfidence: 0.91,
        aiSummary: 'Currículo profissional com experiência em design gráfico e UX.',
        status: 'ACTIVE',
      },
      {
        userId: user.id,
        type: 'FILE',
        name: 'contrato_freelance_abc.pdf',
        mimeType: 'application/pdf',
        extension: '.pdf',
        size: BigInt(faker.number.int({ min: 80_000, max: 300_000 })),
        parentId: docsGroup.id,
        driverId: oneDrive.id,
        providerFileId: faker.string.alphanumeric(40),
        providerPath: 'CloudBase/contrato_freelance_abc.pdf',
        providerCreatedAt: faker.date.past(),
        providerUpdatedAt: new Date(),
        tags: ['contrato', 'freelance', 'legal'],
        expiresAt: faker.date.soon({ days: 45 }),
        aiClassified: true,
        aiCategory: 'Documentos/Legal',
        aiConfidence: 0.88,
        aiSummary: 'Contrato de prestação de serviços de design com data de renovação em breve.',
        status: 'ACTIVE',
      },
    ],
  });

  // Ficheiro com erro de acesso (UNREACHABLE)
  await prisma.node.create({
    data: {
      userId: user.id,
      type: 'FILE',
      name: 'backup_antigo.zip',
      mimeType: 'application/zip',
      extension: '.zip',
      size: BigInt(faker.number.int({ min: 100_000_000, max: 400_000_000 })),
      driverId: oneDrive.id,
      providerFileId: faker.string.alphanumeric(40),
      providerPath: 'CloudBase/backup_antigo.zip',
      providerCreatedAt: faker.date.past({ years: 2 }),
      providerUpdatedAt: faker.date.past({ years: 1 }),
      status: 'UNREACHABLE',
      errorCount: 2,
      lastErrorAt: faker.date.recent(),
      lastCheckedAt: faker.date.recent(),
    },
  });

  console.log(`  ✅ Utilizador 2 criado: ${user.email} | ${user.id}`);
  return user;
}
