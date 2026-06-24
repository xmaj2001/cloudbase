// ─────────────────────────────────────────────────────────────────────────────
// Seed: User 1 — João (power user com GDrive + Telegram + muitos ficheiros)
// ─────────────────────────────────────────────────────────────────────────────
import { prisma, faker } from './_client';

export async function seedUser1() {
  console.log('  👤 A criar utilizador 1 (João)...');

  const user = await prisma.user.create({
    data: {
      name: 'João Ferreira',
      email: faker.internet.email({ firstName: 'joao', lastName: 'ferreira' }),
      avatarUrl: faker.image.avatar(),
      reputationScore: 87.5,
      totalTrades: 120,
      completedTrades: 105,
      tradeCompletionRate: 0.875,
    },
  });

  // ── Storage Drivers ──────────────────────────────────────────────────────

  const googleDrive = await prisma.storageDriver.create({
    data: {
      userId: user.id,
      type: 'GOOGLE_DRIVE',
      displayName: 'Google Drive Pessoal (15 GB)',
      priority: 1,
      credentials: {
        accessToken: faker.string.alphanumeric(40),
        refreshToken: faker.string.alphanumeric(40),
        expiresAt: faker.date.future(),
        accountEmail: user.email,
        accountId: faker.string.numeric(20),
      },
      cachedTotalSpace: BigInt(15 * 1024 * 1024 * 1024),    // 15 GB
      cachedUsedSpace: BigInt(4_200 * 1024 * 1024),          // 4.2 GB
      cachedAvailableSpace: BigInt(10_800 * 1024 * 1024),
      spaceCachedAt: new Date(),
      rootFolderId: faker.string.alphanumeric(28),
      rootFolderPath: 'CloudBase/',
      fragmentFolderId: faker.string.alphanumeric(28),
      fragmentFolderPath: 'CloudBase/_fragments/',
    },
  });

  const telegram = await prisma.storageDriver.create({
    data: {
      userId: user.id,
      type: 'TELEGRAM',
      displayName: 'Telegram Cloud (Ilimitado)',
      priority: 2,
      credentials: {
        botToken: `${faker.number.int({ min: 1000000, max: 9999999 })}:${faker.string.alphanumeric(35)}`,
        chatId: `-${faker.number.int({ min: 1000000000000, max: 9999999999999 })}`,
      },
      // Sem cachedSpace — Telegram é ilimitado
    },
  });

  // ── Hierarquia de Nodes ──────────────────────────────────────────────────

  // Grupo raiz "Trabalho"
  const trabalhoGroup = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'GROUP',
      name: 'Trabalho',
      tags: ['trabalho'],
    },
  });

  // Pasta real no GDrive, filha do grupo
  const relatoriosFolder = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'FOLDER',
      name: 'Relatórios 2026',
      parentId: trabalhoGroup.id,
      driverId: googleDrive.id,
      providerFileId: faker.string.alphanumeric(28),
      providerPath: 'CloudBase/Relatórios 2026',
      providerCreatedAt: faker.date.past(),
      providerUpdatedAt: new Date(),
    },
  });

  // Ficheiros dentro da pasta
  await prisma.node.createMany({
    data: [
      {
        userId: user.id,
        type: 'FILE',
        name: 'relatorio_q1_2026.pdf',
        mimeType: 'application/pdf',
        extension: '.pdf',
        size: BigInt(faker.number.int({ min: 200_000, max: 4_000_000 })),
        parentId: relatoriosFolder.id,
        driverId: googleDrive.id,
        providerFileId: faker.string.alphanumeric(28),
        providerPath: 'CloudBase/Relatórios 2026/relatorio_q1_2026.pdf',
        providerCreatedAt: faker.date.past(),
        providerUpdatedAt: new Date(),
        tags: ['finanças', 'q1', 'pdf'],
        aiClassified: true,
        aiCategory: 'Documentos/Financeiro',
        aiConfidence: 0.97,
        aiSummary: 'Relatório financeiro do Q1 2026 com análise de receitas e despesas operacionais.',
        status: 'ACTIVE',
      },
      {
        userId: user.id,
        type: 'FILE',
        name: 'relatorio_q2_2026.pdf',
        mimeType: 'application/pdf',
        extension: '.pdf',
        size: BigInt(faker.number.int({ min: 200_000, max: 4_000_000 })),
        parentId: relatoriosFolder.id,
        driverId: googleDrive.id,
        providerFileId: faker.string.alphanumeric(28),
        providerPath: 'CloudBase/Relatórios 2026/relatorio_q2_2026.pdf',
        providerCreatedAt: faker.date.recent(),
        providerUpdatedAt: new Date(),
        tags: ['finanças', 'q2', 'pdf'],
        aiClassified: false,
        status: 'ACTIVE',
      },
      {
        userId: user.id,
        type: 'FILE',
        name: 'apresentacao_anual.pptx',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        extension: '.pptx',
        size: BigInt(faker.number.int({ min: 2_000_000, max: 25_000_000 })),
        parentId: trabalhoGroup.id,
        driverId: googleDrive.id,
        providerFileId: faker.string.alphanumeric(28),
        providerPath: 'CloudBase/apresentacao_anual.pptx',
        providerCreatedAt: faker.date.past(),
        providerUpdatedAt: new Date(),
        tags: ['apresentação', 'trabalho'],
        status: 'ACTIVE',
      },
    ],
  });

  // Grupo pessoal
  const pessoalGroup = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'GROUP',
      name: 'Pessoal',
      tags: ['pessoal'],
    },
  });

  // Ficheiro de vídeo fragmentado no Telegram (grande demais para o GDrive)
  const videoNode = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'FILE',
      name: 'ferias_algarve_2026.mp4',
      mimeType: 'video/mp4',
      extension: '.mp4',
      size: BigInt(faker.number.int({ min: 500_000_000, max: 2_000_000_000 })), // 500 MB – 2 GB
      parentId: pessoalGroup.id,
      driverId: telegram.id,
      isFragmented: true,
      totalChunks: 4,
      originalHash: faker.string.hexadecimal({ length: 64, prefix: '' }),
      tags: ['video', 'férias'],
      thumbnailUrl: faker.image.url({ width: 640, height: 360 }),
      status: 'ACTIVE',
    },
  });

  // Chunks do vídeo
  const chunkSize = videoNode.size! / BigInt(4);
  for (let i = 0; i < 4; i++) {
    await prisma.fileChunk.create({
      data: {
        nodeId: videoNode.id,
        driverId: telegram.id,
        chunkIndex: i,
        size: chunkSize,
        byteStart: BigInt(i) * chunkSize,
        byteEnd: BigInt(i + 1) * chunkSize - BigInt(1),
        chunkHash: faker.string.hexadecimal({ length: 64, prefix: '' }),
        providerFileId: `${faker.number.int({ min: 100000, max: 999999 })}`,
        providerPath: `ferias_algarve_2026_chunk${i}.mp4`,
        status: 'VERIFIED',
        uploadedAt: faker.date.recent(),
        verifiedAt: new Date(),
      },
    });
  }

  // Ficheiro na lixeira
  await prisma.node.create({
    data: {
      userId: user.id,
      type: 'FILE',
      name: 'rascunho_ignorar.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: '.docx',
      size: BigInt(50_000),
      status: 'TRASHED',
      trashedAt: faker.date.recent(),
      permanentDeleteAt: faker.date.soon({ days: 25 }),
    },
  });

  console.log(`  ✅ Utilizador 1 criado: ${user.email} | ${user.id}`);
  return user;
}
