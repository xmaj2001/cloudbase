// ─────────────────────────────────────────────────────────────────────────────
// Seed: User 3 — Carlos (utilizador técnico com VPS + MEGA + ficheiros corrompidos)
// ─────────────────────────────────────────────────────────────────────────────
import { prisma, faker } from './_client';

export async function seedUser3() {
  console.log('  👤 A criar utilizador 3 (Carlos)...');

  const user = await prisma.user.create({
    data: {
      name: 'Carlos Mendes',
      email: faker.internet.email({ firstName: 'carlos', lastName: 'mendes' }),
      avatarUrl: faker.image.avatar(),
      reputationScore: 93.4,
      totalTrades: 310,
      completedTrades: 298,
      tradeCompletionRate: 0.961,
    },
  });

  // ── Storage Drivers ──────────────────────────────────────────────────────

  const vps = await prisma.storageDriver.create({
    data: {
      userId: user.id,
      type: 'VPS',
      displayName: 'VPS Hetzner (2 TB NVMe)',
      priority: 1,
      credentials: {
        agentToken: faker.string.uuid(),
        host: `${faker.number.int({ min: 1, max: 255 })}.${faker.number.int({ min: 1, max: 255 })}.${faker.number.int({ min: 1, max: 255 })}.${faker.number.int({ min: 1, max: 255 })}`,
        port: 8443,
      },
      cachedTotalSpace: BigInt(2000 * 1024 * 1024 * 1024),  // 2 TB
      cachedUsedSpace: BigInt(430 * 1024 * 1024 * 1024),    // 430 GB
      cachedAvailableSpace: BigInt(1570 * 1024 * 1024 * 1024),
      spaceCachedAt: new Date(),
      lastSyncAt: faker.date.recent(),
    },
  });

  const mega = await prisma.storageDriver.create({
    data: {
      userId: user.id,
      type: 'MEGA',
      displayName: 'MEGA Personal (20 GB)',
      priority: 2,
      credentials: {
        sessionToken: faker.string.alphanumeric(172),
        accountEmail: user.email,
      },
      cachedTotalSpace: BigInt(20 * 1024 * 1024 * 1024),    // 20 GB
      cachedUsedSpace: BigInt(18_800 * 1024 * 1024),         // 18.8 GB — quase cheio
      cachedAvailableSpace: BigInt(1_200 * 1024 * 1024),
      spaceCachedAt: new Date(),
    },
  });

  // ── Hierarquia de Nodes ──────────────────────────────────────────────────

  // Grupo de Dev Projects
  const devGroup = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'GROUP',
      name: 'Dev Projects',
      tags: ['dev', 'código'],
    },
  });

  // Subgrupo de backups
  const backupsGroup = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'GROUP',
      name: 'Backups de Servidores',
      parentId: devGroup.id,
      tags: ['backup', 'servidores'],
    },
  });

  // Ficheiros grandes no VPS (fragmentados)
  const servers = ['prod-api', 'staging-db', 'cdn-assets'];
  for (const server of servers) {
    const chunks = faker.number.int({ min: 2, max: 6 });
    const totalSize = BigInt(faker.number.int({ min: 1_000_000_000, max: 50_000_000_000 }));
    const chunkSize = totalSize / BigInt(chunks);

    const backupNode = await prisma.node.create({
      data: {
        userId: user.id,
        type: 'FILE',
        name: `backup_${server}_${faker.date.recent().toISOString().slice(0, 10)}.tar.gz`,
        mimeType: 'application/gzip',
        extension: '.tar.gz',
        size: totalSize,
        parentId: backupsGroup.id,
        driverId: vps.id,
        providerFileId: faker.string.uuid(),
        providerPath: `CloudBase/Backups/${server}/${faker.string.alphanumeric(10)}.tar.gz`,
        providerCreatedAt: faker.date.recent(),
        providerUpdatedAt: new Date(),
        isFragmented: true,
        totalChunks: chunks,
        originalHash: faker.string.hexadecimal({ length: 64, prefix: '' }),
        tags: ['backup', server, 'servidor'],
        status: 'ACTIVE',
      },
    });

    for (let i = 0; i < chunks; i++) {
      await prisma.fileChunk.create({
        data: {
          nodeId: backupNode.id,
          driverId: vps.id,
          chunkIndex: i,
          size: chunkSize,
          byteStart: BigInt(i) * chunkSize,
          byteEnd: BigInt(i + 1) * chunkSize - BigInt(1),
          chunkHash: faker.string.hexadecimal({ length: 64, prefix: '' }),
          providerFileId: faker.string.uuid(),
          providerPath: `chunks/${backupNode.id}/chunk_${i}.bin`,
          status: 'VERIFIED',
          uploadedAt: faker.date.recent(),
          verifiedAt: new Date(),
        },
      });
    }
  }

  // Ficheiro CORRUPTED — falhou 3+ vezes no MEGA
  await prisma.node.create({
    data: {
      userId: user.id,
      type: 'FILE',
      name: 'old_database_dump.sql.gz',
      mimeType: 'application/gzip',
      extension: '.gz',
      size: BigInt(faker.number.int({ min: 200_000_000, max: 800_000_000 })),
      driverId: mega.id,
      providerFileId: faker.string.alphanumeric(43),
      providerPath: 'CloudBase/old_database_dump.sql.gz',
      providerCreatedAt: faker.date.past({ years: 2 }),
      providerUpdatedAt: faker.date.past({ years: 1 }),
      status: 'CORRUPTED',
      errorCount: 4,
      lastErrorAt: faker.date.recent(),
      lastCheckedAt: new Date(),
      tags: ['database', 'legacy'],
    },
  });

  // Ficheiro a expirar em breve
  await prisma.node.create({
    data: {
      userId: user.id,
      type: 'FILE',
      name: 'trial_license_key.txt',
      mimeType: 'text/plain',
      extension: '.txt',
      size: BigInt(512),
      driverId: vps.id,
      providerFileId: faker.string.uuid(),
      providerPath: 'CloudBase/trial_license_key.txt',
      providerCreatedAt: faker.date.past(),
      providerUpdatedAt: new Date(),
      status: 'ACTIVE',
      expiresAt: faker.date.soon({ days: 7 }),
      tags: ['licença', 'trial'],
    },
  });

  // Pasta raiz no MEGA com documentos de código
  const megaFolder = await prisma.node.create({
    data: {
      userId: user.id,
      type: 'FOLDER',
      name: 'Source Code Archives',
      driverId: mega.id,
      providerFileId: faker.string.alphanumeric(43),
      providerPath: 'CloudBase/SourceCode',
      providerCreatedAt: faker.date.past(),
      providerUpdatedAt: new Date(),
    },
  });

  await prisma.node.createMany({
    data: ['cloudbase-v1.0.zip', 'cloudbase-v1.5.zip', 'cloudbase-v2.0-beta.zip'].map((name, idx) => ({
      userId: user.id,
      type: 'FILE' as const,
      name,
      mimeType: 'application/zip',
      extension: '.zip',
      size: BigInt(faker.number.int({ min: 10_000_000, max: 200_000_000 })),
      parentId: megaFolder.id,
      driverId: mega.id,
      providerFileId: faker.string.alphanumeric(43),
      providerPath: `CloudBase/SourceCode/${name}`,
      providerCreatedAt: faker.date.past(),
      providerUpdatedAt: new Date(),
      tags: ['source', 'código', `v${idx + 1}`],
      aiClassified: true,
      aiCategory: 'Código/Arquivo',
      aiConfidence: faker.number.float({ min: 0.7, max: 0.95, fractionDigits: 2 }),
      aiSummary: `Arquivo do código fonte do CloudBase versão ${idx + 1}.0`,
      status: 'ACTIVE' as const,
    })),
  });

  console.log(`  ✅ Utilizador 3 criado: ${user.email} | ${user.id}`);
  return user;
}
