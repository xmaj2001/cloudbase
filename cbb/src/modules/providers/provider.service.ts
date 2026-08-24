import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateDriverDto, ProviderSnapshot } from "./provider.input";
import {
  DriverCredentials,
  ProviderType,
  validateCredentialsForType,
} from "./helper/credentials";

export const bytes = {
  MB: (n: number) => BigInt(n * 1024 * 1024),
  GB: (n: number) => BigInt(n * 1024 * 1024 * 1024),
};

export interface SupportedProviderInfo {
  type: ProviderType;
  label: string;
  category: "CLOUD" | "SOCIAL" | "MEDIA" | "SELF_HOSTED";
}

@Injectable()
export class ProviderServices {
  constructor(private readonly prisma: PrismaService) {}

  // Cria um novo provider com credenciais validadas
  async create(userId: string, dto: CreateDriverDto) {
    // 1. Valida se a estrutura das credenciais é compatível com o ProviderType
    const isValidCreds = validateCredentialsForType(dto.type, {
      type: dto.type,
      ...dto.credentials,
    });

    if (!isValidCreds) {
      throw new BadRequestException(
        `Credenciais inválidas para o tipo de provedor: ${dto.type}`,
      );
    }

    // 2. Cria o provider no banco de dados
    return this.prisma.provider.create({
      data: {
        userId,
        type: dto.type,
        displayName: dto.displayName,
        priority: dto.priority ?? 0,
        credentials: dto.credentials as unknown as object,
        // Valores em BYTES (Exemplo: 20 GB total, 15 GB disponível, 5 GB usado)
        totalSpace: bytes.GB(10), // ~20 GB
        availableSpace: bytes.GB(5), // ~15 GB
        usedSpace: bytes.GB(5), // ~5 GB
      },
    });
  }

  // Lista todos os providers de um utilizador
  async list(userId: string) {
    return this.prisma.provider.findMany({
      where: { userId, isActive: true },
      orderBy: { availableSpace: "desc" },
    });
  }

  // Busca um provider específico
  async findById(userId: string, providerId: string) {
    const provider = await this.prisma.provider.findFirst({
      where: { id: providerId, userId, isActive: true },
    });

    if (!provider) {
      throw new NotFoundException("Provider não encontrado ou inativo");
    }

    return provider;
  }

  // Busca as credenciais de um provider específico pertencente ao utilizador
  async getCredentials(
    userId: string,
    providerId: string,
  ): Promise<DriverCredentials> {
    const provider = await this.prisma.provider.findFirst({
      where: { id: providerId, userId, isActive: true },
      select: { credentials: true },
    });

    if (!provider) {
      throw new NotFoundException("Provider não encontrado ou inativo");
    }

    return provider.credentials as unknown as DriverCredentials;
  }

  // Snapshots para o algoritmo de cálculo de planos
  async getSnapshots(
    userId: string,
    selectedIds: string[] = [],
  ): Promise<ProviderSnapshot[]> {
    const providers = await this.prisma.provider.findMany({
      where: {
        userId,
        isActive: true,
        ...(selectedIds.length > 0 && {
          id: { in: selectedIds },
        }),
      },
      orderBy: { availableSpace: "desc" },
    });

    return providers.map((p) => ({
      id: p.id,
      displayName: p.displayName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      availableSpace: p.availableSpace ?? 0n,
    }));
  }

  // Retorna os tipos de providers suportados pela aplicação
  getSupportedProviders(): SupportedProviderInfo[] {
    return [
      {
        type: ProviderType.GOOGLE_DRIVE,
        label: "Google Drive",
        category: "CLOUD",
      },
      {
        type: ProviderType.ONEDRIVE,
        label: "Microsoft OneDrive",
        category: "CLOUD",
      },
      { type: ProviderType.DROPBOX, label: "Dropbox", category: "CLOUD" },
      { type: ProviderType.MEGA, label: "MEGA", category: "CLOUD" },
      { type: ProviderType.BOX, label: "Box", category: "CLOUD" },
      { type: ProviderType.PCLOUD, label: "pCloud", category: "CLOUD" },
      { type: ProviderType.YANDEX, label: "Yandex Disk", category: "CLOUD" },
      { type: ProviderType.TELEGRAM, label: "Telegram", category: "SOCIAL" },
      { type: ProviderType.CLOUDINARY, label: "Cloudinary", category: "MEDIA" },
      { type: ProviderType.VPS, label: "VPS Remota", category: "SELF_HOSTED" },
      {
        type: ProviderType.LOCAL_MACHINE,
        label: "Máquina Local",
        category: "SELF_HOSTED",
      },
    ];
  }
}
