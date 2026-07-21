import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ConfirmChunkUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    chunkId: string,
    dto: { chunkHash: string; providerFileId: string },
  ) {
    const chunk = await this.prisma.fileChunk.update({
      where: { id: chunkId },
      data: { ...dto, status: 'UPLOADED', uploadedAt: new Date() },
    });

    // se todos os chunks desse node estão UPLOADED, marca o Node como ACTIVE
    const pending = await this.prisma.fileChunk.count({
      where: { nodeId: chunk.nodeId, status: { not: 'UPLOADED' } },
    });
    if (pending === 0) {
      await this.prisma.node.update({
        where: { id: chunk.nodeId },
        data: { status: 'ACTIVE' },
      });
    }

    return chunk;
  }
}
