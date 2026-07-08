import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Prisma, Driver } from 'src/generated/prisma/client';
import { DriverCredentials } from '../helper/driver-credentials';
import { DriverAdapterRegistry } from '../helper/adapters/adapter.registry';
import { DriverListItemDto } from '../dto/driver-list-item.dto';
import { deriveDriverStatus } from 'src/shared/utils/driver-status.util';
import { bytesToGb, bytesToGbNullable } from 'src/shared/utils/bytes.util';
import { DriverSummaryDto } from '../dto/driver-summary.dto';

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

  /**
   * Lista os drivers do utilizador já no formato que o frontend
   * consome: espaço em GB (não bytes crus), com `totalGb: null`
   * explícito pra drivers sem limite fixo (ex: Telegram), em vez de
   * o cliente ter que adivinhar isso com heurísticas tipo "totalGb <
   * 9000 é ilimitado".
   *
   * Usado tanto pela tabela de drivers quanto pelo card
   * "Distribuição" do StorageBar — os dois só precisam de uma
   * slice/filter em cima disto, sem lógica de negócio adicional.
   */
  async list(userId: string): Promise<DriverListItemDto[]> {
    const drivers = await this.findAll(userId);
    return drivers.map((d) => this.toListItemDto(d));
  }

  private toListItemDto(driver: Driver): DriverListItemDto {
    return {
      id: driver.id,
      type: driver.type,
      displayName: driver.displayName,
      status: deriveDriverStatus(driver),
      space: {
        totalGb: bytesToGbNullable(driver.cachedTotalSpace),
        usedGb: bytesToGb(driver.cachedUsedSpace),
      },
    };
  }

  /**
   * Agrega os KPIs... digo, o resumo consolidado de todos os drivers
   * do utilizador, no formato exato consumido pelo componente
   * <DriversKpis />.
   *
   * Cálculo feito DIRETO NA DB (Prisma aggregate + count), não em JS.
   * Antes disto, a versão anterior trazia todas as linhas do driver
   * pra memória da aplicação só pra somar com .reduce() — desperdício
   * de I/O e CPU que cresce com o número de drivers. Postgres já sabe
   * somar/contar nativamente; SUM(cached_total_space) na DB é muito
   * mais barato que buscar N linhas e somar bigint em JS.
   *
   * Lê só o cache — não bate nos provedores externos. Se o cache
   * estiver desatualizado, quem resolve isso é o sync() (ou um cron a
   * chamá-lo periodicamente), não este endpoint.
   */
  async getSummary(userId: string): Promise<DriverSummaryDto> {
    this.logger.log(
      `Calculando resumo consolidado para o usuário ${userId}...`,
    );

    // $transaction aqui não é sobre atomicidade de escrita — é pra
    // garantir que as duas queries leem o mesmo snapshot consistente
    // da DB, evitando que um driver criado/removido entre as duas
    // chamadas deixe driversCount e activeCount inconsistentes entre
    // si.
    const [totals, activeCount] = await this.prisma.$transaction([
      this.prisma.driver.aggregate({
        where: { userId },
        _sum: {
          cachedTotalSpace: true,
          cachedUsedSpace: true,
        },
        _count: { _all: true },
      }),
      // "Ativo" pro resumo = ACTIVE ou SYNCING, ou seja: qualquer
      // driver que NÃO tenha erro de sync (ver deriveDriverStatus).
      // Isso dá pra expressar como filtro direto na DB, sem precisar
      // trazer as linhas pra derivar o status em JS.
      this.prisma.driver.count({
        where: { userId, syncError: null },
      }),
    ]);

    return {
      totalGb: bytesToGb(totals._sum.cachedTotalSpace),
      usedGb: bytesToGb(totals._sum.cachedUsedSpace),
      driversCount: totals._count._all,
      activeCount,
    };
  }

  async findById(id: string) {
    const driver = await this.prisma.driver.findUnique({ where: { id } });

    if (!driver) {
      this.logger.warn(`Driver com id ${id} não encontrado`);
      throw new NotFoundException(`Driver com id ${id} não encontrado`);
    }

    return driver;
  }

  /**
   * Busca o driver e garante que pertence ao userId informado.
   * Propositalmente lança NotFoundException (e não ForbiddenException)
   * quando o dono não bate — assim não confirmamos pra um atacante que
   * o ID existe mas pertence a outra pessoa (evita leak de existência).
   */
  private async findOwnedDriver(userId: string, id: string): Promise<Driver> {
    const driver = await this.findById(id);

    if (driver.userId !== userId) {
      this.logger.warn(`Acesso negado ao driver com id ${id}`);
      throw new NotFoundException(`Driver com id ${id} não encontrado`);
    }

    return driver;
  }

  private parseCredentials(driver: Driver): DriverCredentials {
    return JSON.parse(driver.credentials as string) as DriverCredentials;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.findById(id);
    // TODO: Implementar lógica de atualização
    return `This action updates a #${id} driver`;
  }

  /**
   * Revalida a conexão com o provedor externo e atualiza o cache de
   * espaço (cachedTotalSpace / cachedUsedSpace / cachedAvailableSpace).
   *
   * Usa as credenciais já guardadas no driver — não recebe credenciais
   * novas no body, porque isso é responsabilidade do `update()`. O
   * sync serve só pra "ir lá e ver o estado atual", tipo um refresh.
   */
  async sync(userId: string, id: string) {
    const driver = await this.findOwnedDriver(userId, id);

    this.logger.log(`Sincronizando espaço do driver ${id} (${driver.type})...`);

    const credentials = this.parseCredentials(driver);
    const adapter = this.adapter.getAdapter(driver.type);

    // Se as credenciais tiverem expirado ou sido revogadas do lado do
    // provedor, o adapter já lança BadRequestException — deixamos
    // propagar tal e qual, sem mascarar o erro real.
    const spaceInfo = await adapter.fetchSpaceInfo(credentials);

    const updated = await this.prisma.driver.update({
      where: { id },
      data: {
        cachedTotalSpace: spaceInfo.totalSpace,
        cachedUsedSpace: spaceInfo.usedSpace,
        cachedAvailableSpace: spaceInfo.availableSpace,
        spaceCachedAt: new Date(),
      },
    });

    this.logger.log(`Driver ${id} sincronizado com sucesso.`);
    return updated;
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
    const driver = await this.findOwnedDriver(userId, id);
    return this.parseCredentials(driver);
  }
}
