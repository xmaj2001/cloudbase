import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateNodeWithChunksDto } from "./node.inputs";
import { NodeType } from "src/generated/prisma/enums";

@Injectable()
export class NodeService {
  constructor(private readonly prisma: PrismaService) {}

  // Regista o ficheiro/pasta e os seus chunks (se existirem) de forma atómica
  async create(userId: string, dto: CreateNodeWithChunksDto) {
    // Validar se o parentId (pasta) existe e pertence ao utilizador
    if (dto.parentId) {
      const parentNode = await this.prisma.node.findFirst({
        where: { id: dto.parentId, userId, type: NodeType.FOLDER },
      });
      if (!parentNode) {
        throw new NotFoundException("Pasta pai não encontrada");
      }
    }

    // Executa tudo dentro de uma transação do Prisma
    return this.prisma.$transaction(async (tx) => {
      const node = await tx.node.create({
        data: {
          userId,
          name: dto.name,
          type: dto.type,
          mimeType: dto.mimeType,
          extension: dto.extension,
          size: dto.size ? BigInt(dto.size) : null,
          isFragmented: dto.isFragmented ?? false,
          totalChunks: dto.totalChunks ?? 1,
          originalHash: dto.originalHash,
          providerId: dto.providerId,
          providerFileId: dto.providerFileId,
          providerPath: dto.providerPath ?? "CloudBase/",
          parentId: dto.parentId,
        },
      });

      // Se for um ficheiro fragmentado e contiver chunks no DTO, guarda na tabela file_chunks
      if (dto.isFragmented && dto.chunks && dto.chunks.length > 0) {
        await tx.fileChunk.createMany({
          data: dto.chunks.map((chunk) => ({
            nodeId: node.id,
            chunkIndex: chunk.chunkIndex,
            size: BigInt(chunk.size),
            startByte: BigInt(chunk.startByte),
            endByte: BigInt(chunk.endByte),
            chunkHash: chunk.chunkHash,
            providerId: chunk.providerId,
            providerFileId: chunk.providerFileId,
            providerPath: chunk.providerPath ?? "CloudBase/_fragments/",
          })),
        });
      }

      return node;
    });
  }

  // Lista o conteúdo de um diretório (se parentId for nulo, devolve a raiz)
  async listChildren(userId: string, parentId?: string) {
    return this.prisma.node.findMany({
      where: {
        userId,
        parentId: parentId ?? null,
        trashedAt: null,
      },
      orderBy: [
        { type: "asc" }, // Pastas primeiro, ficheiros depois
        { name: "asc" },
      ],
      include: {
        _count: {
          select: { children: true, fileChunks: true },
        },
      },
    });
  }

  // Obtém os detalhes completos de um Node incluindo Chunks e Provedor associado
  async findOne(userId: string, id: string) {
    const node = await this.prisma.node.findFirst({
      where: { id, userId, trashedAt: null },
      include: {
        Provider: {
          select: {
            id: true,
            displayName: true,
            type: true,
          },
        },
        fileChunks: {
          orderBy: { chunkIndex: "asc" },
          include: {
            Provider: {
              select: {
                id: true,
                displayName: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (!node) {
      throw new NotFoundException("Ficheiro ou pasta não encontrada");
    }

    return node;
  }

  // Envia um ficheiro/pasta para a reciclagem
  async moveToTrash(userId: string, id: string) {
    const node = await this.prisma.node.findFirst({
      where: { id, userId },
    });

    if (!node) {
      throw new NotFoundException("Node não encontrado");
    }

    return this.prisma.node.update({
      where: { id },
      data: { trashedAt: new Date() },
    });
  }
}
