import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { DriverCredentials } from '../helper/driver-credentials';
import { DriverAdapterRegistry } from '../helper/adapters/adapter.registry';

@Injectable()
export class DriversService {
  private readonly logger = new Logger(DriversService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly adapter: DriverAdapterRegistry,
  ) {}

  async create(userId: string, input: CreateDriverDto) {
    this.logger.log(`Criando um novo driver do tipo ${input.type}...`);

    const exitUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!exitUser) {
      this.logger.warn(`Usuário com id ${userId} não encontrado`);
      throw new NotFoundException(`Usuário com id ${userId} não encontrado`);
    }

    // ── OBTENÇÃO DINÂMICA DE ESPAÇO VIA ADAPTADOR ──────────────────────────
    this.logger.log(`Consultando espaço em disco no provedor externo...`);
    const adapter = this.adapter.getAdapter(input.type);

    // Executa a validação e colheita de quota em tempo real
    const spaceInfo = await adapter.fetchSpaceInfo(input.credentials);

    this.logger.log(
      `Conexão bem sucedida. Registando driver com cache de espaço...`,
    );

    const driver = await this.prisma.driver.create({
      data: {
        type: input.type,
        displayName: input.displayName,
        userId: userId,
        credentials: JSON.stringify(input.credentials),
        priority: input.priority || 0,

        // Alimenta os campos mapeados do teu Schema Prisma
        cachedTotalSpace: spaceInfo.totalSpace,
        cachedUsedSpace: spaceInfo.usedSpace,
        cachedAvailableSpace: spaceInfo.availableSpace,
        spaceCachedAt: new Date(),
      },
    });

    this.logger.log('Driver criado e sincronizado com sucesso.');
    return driver;
  }

  async findAll(userId?: string) {
    const where: Prisma.DriverWhereInput = userId ? { userId } : {};
    if (!userId) {
      this.logger.warn(
        'Nenhum userId foi informado, retornando todos os drivers',
      );
    }
    this.logger.log('Procurando todos os drivers...');
    const drivers = await this.prisma.driver.findMany({ where });
    this.logger.log(`A um total de ${drivers.length} drivers`);
    return drivers;
  }

  async findById(id: string) {
    const driver = await this.prisma.driver.findUnique({ where: { id } });
    if (!driver) {
      this.logger.warn(`Driver com id ${id} não encontrado`);
      throw new NotFoundException(`Driver com id ${id} não encontrado`);
    }
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.findById(id);
    // TODO: Implementar lógica de atualização
    return `This action updates a #${id} driver`;
  }

  async remove(id: string) {
    const driver = await this.findById(id);
    if (!driver) {
      this.logger.warn(`Driver com id ${id} não encontrado`);
      throw new NotFoundException(`Driver com id ${id} não encontrado`);
    }
    await this.prisma.driver.delete({ where: { id } });
    this.logger.log(`Driver com id ${id} removido com sucesso`);
    return { message: `Driver com id ${id} removido com sucesso` };
  }

  async findCredentialsById(userId: string, id: string) {
    const driver = await this.findById(id);
    if (driver.userId !== userId) {
      this.logger.warn(`Acesso negado ao driver com id ${id}`);
      throw new NotFoundException(`Driver com id ${id} não encontrado`);
    }
    return JSON.parse(driver.credentials as string) as DriverCredentials;
  }
}
