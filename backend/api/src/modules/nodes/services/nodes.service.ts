import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateNodeDto } from '../dto/create-node.dto';
import { UpdateNodeDto } from '../dto/update-node.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Prisma, NodeType } from 'src/generated/prisma/client';

@Injectable()
export class NodesService {
  private readonly logger = new Logger(NodesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createNodeDto: CreateNodeDto) {
    this.logger.log(
      `Iniciando criação de um nó para o utilizador: ${createNodeDto.userId}`,
    );

    // 1. Verificar se o utilizador existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: createNodeDto.userId },
    });
    if (!userExists) {
      throw new NotFoundException(
        `Utilizador com ID ${createNodeDto.userId} não encontrado.`,
      );
    }

    // 2. Verificar se a pasta pai existe (se fornecida)
    if (createNodeDto.parentId) {
      const parentExists = await this.prisma.node.findUnique({
        where: { id: createNodeDto.parentId },
      });
      if (!parentExists) {
        this.logger.warn(
          `Pasta pai com ID ${createNodeDto.parentId} não encontrada para o utilizador ${createNodeDto.userId}.`,
        );
        throw new NotFoundException(
          `Pasta pai com ID ${createNodeDto.parentId} não encontrada.`,
        );
      }
    }

    let finalDriverId = createNodeDto.driverId;
    const fileSize = createNodeDto.size
      ? BigInt(createNodeDto.size)
      : BigInt(0);

    // 3. Regra de Negócio para Ficheiros: Seleção de Driver e Validação de Espaço
    if (createNodeDto.type === NodeType.FILE) {
      if (finalDriverId) {
        // Validar o driver explicitamente enviado
        const driver = await this.prisma.driver.findUnique({
          where: { id: finalDriverId },
        });

        if (!driver || !driver.isActive) {
          this.logger.warn(
            `Driver com ID ${finalDriverId} não encontrado ou inativo para o utilizador ${createNodeDto.userId}.`,
          );
          throw new BadRequestException(
            'O driver de armazenamento selecionado não existe ou está inativo.',
          );
        }

        // Se o driver tiver limite de espaço, verificar a disponibilidade
        if (
          driver.cachedAvailableSpace !== null &&
          driver.cachedAvailableSpace < fileSize
        ) {
          throw new BadRequestException(
            `Espaço insuficiente no driver selecionado. Disponível: ${driver.cachedAvailableSpace} bytes.`,
          );
        }
      } else {
        // Atribuição automática: Procurar o driver ativo com o maior espaço disponível
        this.logger.log(
          'Nenhum driver especificado. Procurando o driver com maior espaço disponível...',
        );

        const activeDrivers = await this.prisma.driver.findMany({
          where: { userId: createNodeDto.userId, isActive: true },
        });

        if (activeDrivers.length === 0) {
          this.logger.warn(
            `Nenhum driver ativo encontrado para o utilizador ${createNodeDto.userId}.`,
          );
          throw new BadRequestException(
            'O utilizador não possui nenhum driver de armazenamento ativo configurado.',
          );
        }

        // Ordena para colocar os ilimitados (null) ou com maior espaço no topo
        // Nota: Telegram costuma ser ilimitado (null)
        const bestDriver = activeDrivers.sort((a, b) => {
          if (a.cachedAvailableSpace === null) return -1;
          if (b.cachedAvailableSpace === null) return 1;
          return b.cachedAvailableSpace > a.cachedAvailableSpace ? 1 : -1;
        })[0];

        // Se o melhor driver tiver limite numérico, valida se o arquivo cabe nele
        if (
          bestDriver.cachedAvailableSpace !== null &&
          bestDriver.cachedAvailableSpace < fileSize
        ) {
          this.logger.warn(
            `Nenhum driver ativo possui espaço suficiente para o ficheiro de ${fileSize} bytes.`,
          );
          throw new BadRequestException(
            `Ficheiro muito grande. Nenhum driver ativo possui espaço suficiente. Necessário: ${fileSize} bytes.`,
          );
        }

        finalDriverId = bestDriver.id;
        this.logger.log(
          `Driver selecionado automaticamente: ${bestDriver.displayName} (${finalDriverId})`,
        );
      }
    }

    // 4. Mapear e persistir o nó na Base de Dados
    const nodeData: Prisma.NodeCreateInput = {
      name: createNodeDto.name,
      type: createNodeDto.type,
      mimeType: createNodeDto.mimeType || null,
      extension: createNodeDto.extension || null,
      size: createNodeDto.type === NodeType.FILE ? fileSize : null,
      status: createNodeDto.status || 'ACTIVE',
      tags: createNodeDto.tags || [],
      providerFileId: createNodeDto.providerFileId || null,
      providerPath: createNodeDto.providerPath || null,
      user: { connect: { id: createNodeDto.userId } },
      ...(finalDriverId &&
        createNodeDto.type === NodeType.FILE && {
          driver: { connect: { id: finalDriverId } },
        }),
      ...(createNodeDto.parentId && {
        parent: { connect: { id: createNodeDto.parentId } },
      }),
    };

    const newNode = await this.prisma.node.create({ data: nodeData });
    this.logger.log(
      `Nó do tipo ${newNode.type} criado com sucesso com o ID: ${newNode.id}`,
    );

    return newNode;
  }

  async findAll(userId?: string) {
    const where: Prisma.NodeWhereInput = userId ? { userId } : {};
    this.logger.log('Procurando todos os nós...');
    const nodes = await this.prisma.node.findMany({ where });
    this.logger.log(`Há um total de ${nodes.length} nós`);
    return nodes;
  }

  async findOneById(id: string) {
    this.logger.log(`Procurando nó com ID: ${id}`);
    const data = await this.prisma.node.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException(`Nenhum nó encontrado com ID: ${id}`);
    }
    this.logger.log(`Nó encontrado com ID: ${id}`);
    return data;
  }

  async update(id: string, updateNodeDto: UpdateNodeDto) {
    this.logger.log(`Atualizando nó com ID: ${id}`);
    // Adiciona aqui a tua lógica do Prisma para update
    return `This action updates a #${id} node`;
  }

  async remove(id: string) {
    this.logger.log(`Removendo nó com ID: ${id}`);
    return this.prisma.node.delete({ where: { id } });
  }
}
