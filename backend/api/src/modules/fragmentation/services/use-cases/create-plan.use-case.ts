import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreatePlanDto } from '../../dtos/create-plan.dto';
import { getDriverMaxFileSize } from '../../helpers/limits';
import { planFragmentation } from '../../helpers/planner';
import { randomUUID } from 'node:crypto';
import { Driver, Node } from 'src/generated/prisma/client';

@Injectable()
export class CreatePlanUseCase {
  private logger: Logger = new Logger(CreatePlanUseCase.name);

  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string, dto: CreatePlanDto) {
    this.logger.log(
      `Iniciando plano de fragmentação para o utilizador [${userId}].`,
    );

    const hasSelectedDrivers = dto.driverIds && dto.driverIds.length > 0;
    let drivers: Driver[];

    // 1. Procura os drivers (específicos ou todos os ativos)
    if (hasSelectedDrivers) {
      this.logger.debug(
        `Utilizador selecionou drivers específicos: ${dto.driverIds?.join(', ')}`,
      );
      drivers = await this.prisma.driver.findMany({
        where: { id: { in: dto.driverIds }, userId, isActive: true },
      });

      if (drivers.length !== dto.driverIds?.length) {
        this.logger.warn(
          `Aviso: Solicitados ${dto.driverIds?.length} drivers, mas apenas ${drivers.length} estão ativos/existem.`,
        );
        throw new BadRequestException(
          'Um ou mais drivers não encontrados ou inativos',
        );
      }
    } else {
      this.logger.debug(
        'Nenhum driver selecionado. Carregando todos os drivers ativos por prioridade...',
      );
      drivers = await this.prisma.driver.findMany({
        where: { userId, isActive: true },
        orderBy: [{ priority: 'desc' }, { cachedAvailableSpace: 'desc' }],
      });

      if (drivers.length === 0) {
        this.logger.error(
          `Falha: O utilizador [${userId}] não tem nenhum driver ativo.`,
        );
        throw new BadRequestException(
          'Nenhum driver ativo encontrado para este utilizador',
        );
      }
    }

    // 2. Mapeia as capacidades mantendo o padrão Number do teu código original
    const capacities = drivers.map((d) => ({
      id: d.id,
      availableBytes: Number(d.cachedAvailableSpace ?? 0),
      maxFileSize: Number(
        d.maxFileSizeOverride ?? getDriverMaxFileSize(d.type) ?? Infinity,
      ),
    }));

    this.logger.debug(
      `Pool de drivers prontos: ${capacities.map((c) => c.id).join(', ')}`,
    );

    const createdNodes: Node[] = [];
    const totalFiles = dto.files.length;

    // 3. Executa o loop de ficheiros dentro de uma transação
    return this.prisma.$transaction(async (tx) => {
      let fileIndex = 1;

      for (const file of dto.files) {
        this.logger.log(
          `[${fileIndex}/${totalFiles}] Planeando ficheiro: "${file.fileName}" (${file.fileSize} bytes)`,
        );

        // Define o modo: se o utilizador escolheu mais que 1 driver e o ficheiro não cabe no primeiro, força distribuição
        let mode: 'auto' | 'forced' = 'auto';
        if (hasSelectedDrivers && dto.driverIds && dto.driverIds.length > 1) {
          const firstDriver = capacities[0];
          if (
            file.fileSize > firstDriver.availableBytes ||
            file.fileSize > firstDriver.maxFileSize
          ) {
            mode = 'forced';
          }
        }

        this.logger.debug(`Executando motor de planeamento no modo: [${mode}]`);

        // Corre o teu algoritmo original (passando as variáveis como Number)
        const plan = planFragmentation(file.fileSize, capacities, mode);

        // ⚠️ ATUALIZA O ESPAÇO EM MEMÓRIA PARA O PRÓXIMO FICHEIRO DO LOTE
        plan.forEach((chunk) => {
          const targetDriver = capacities.find((c) => c.id === chunk.driverId);
          if (targetDriver) {
            targetDriver.availableBytes -= chunk.size;
            this.logger.debug(
              ` -> Fragmento alocado no driver [${targetDriver.id}]. Espaço restante simulado: ${targetDriver.availableBytes} bytes`,
            );
          }
        });

        // Grava o Node e Chunks (aplicando o BigInt apenas na persistência, como tinhas antes)
        const node = await tx.node.create({
          data: {
            userId,
            type: 'FILE',
            name: file.fileName,
            mimeType: file.mimeType,
            size: BigInt(file.fileSize),
            isFragmented: plan.length > 1,
            totalChunks: plan.length,
            status: 'FRAGMENTING',
            chunks: {
              create: plan.map((c) => ({
                driverId: c.driverId,
                chunkIndex: c.index,
                size: BigInt(c.size),
                byteStart: BigInt(c.offsetStart),
                byteEnd: BigInt(c.offsetEnd),
                chunkHash: '',
                providerFileId: '',
                providerPath: `CloudBase/_fragments/${randomUUID()}/chunk-${c.index}`,
                status: 'PENDING',
              })),
            },
          },
          include: { chunks: true },
        });

        createdNodes.push(node);
        fileIndex++;
      }

      this.logger.log(
        `Plano para o lote finalizado. ${createdNodes.length} ficheiros preparados.`,
      );
      return createdNodes;
    });
  }
}
