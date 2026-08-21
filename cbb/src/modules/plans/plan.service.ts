// plan.service.ts
import { Injectable, BadRequestException } from "@nestjs/common";
import { ProviderServices } from "../providers/provider.service";
import {
  ChunkPlan,
  PlacedFile,
  UnplaceableFile,
  UploadPlan,
  FileInputDto,
  RequestPlanInput,
} from "./plan.inputs";
import { ProviderSnapshot } from "../providers/provider.input";

// Extensões de vídeo e áudio — candidatos a HLS
const MEDIA_EXTENSIONS = new Set([
  "mp4",
  "mov",
  "avi",
  "mkv",
  "webm",
  "flv",
  "mp3",
  "wav",
  "ogg",
  "m4a",
  "aac",
  "flac",
]);

@Injectable()
export class PlanServices {
  constructor(private readonly providers: ProviderServices) {}

  // ── Ponto de entrada principal ──────────────────────────────

  async createPlan(req: RequestPlanInput): Promise<UploadPlan> {
    // Validação básica
    if (!req.files || req.files.length === 0) {
      throw new BadRequestException("Nenhum ficheiro fornecido");
    }

    // 1. Busca os providers com espaço real
    //    Se o utilizador seleccionou providers específicos → usa só esses
    //    Se não seleccionou → usa todos
    const selectedIds = req.providers?.map((d) => d.id) ?? [];

    const providerSnapshots = await this.providers.getSnapshots(
      req.userId,
      selectedIds,
    );

    if (providerSnapshots.length === 0) {
      throw new BadRequestException("Nenhum provider disponível");
    }

    // 2. Ordena ficheiros do maior para o menor
    const sortedFiles = [...req.files].sort((a, b) =>
      b.sizeBytes > a.sizeBytes ? 1 : -1,
    );

    // 3. Cria cópias mutáveis dos providers
    //    (vamos decrementar o espaço à medida que o plano é criado)
    const pool = providerSnapshots.map((p) => ({ ...p }));

    const placed: PlacedFile[] = [];
    const unplaceable: UnplaceableFile[] = [];

    // 4. Processa cada ficheiro
    for (const file of sortedFiles) {
      // Tenta distribuição directa (cabe num único provider)
      const direct = this.tryDirect(file, pool);
      if (direct) {
        placed.push(direct);
        continue;
      }

      // Não coube num só — tenta fragmentação
      const fragmented = this.tryFragmentation(file, pool);
      if (fragmented) {
        placed.push(fragmented);
        continue;
      }

      // Impossível — não há espaço suficiente
      const totalAvailable = pool.reduce(
        (sum, p) => sum + p.availableSpace,
        0n,
      );

      const isMedia = MEDIA_EXTENSIONS.has(
        file.extension.toLowerCase().replace(".", ""),
      );

      unplaceable.push({
        fileName: file.name,
        fileSize: file.sizeBytes,
        missingBytes: file.sizeBytes - totalAvailable,
        hlsAvailable: isMedia,
        reason: isMedia
          ? `Espaço insuficiente — faltam ${this.formatBytes(file.sizeBytes - totalAvailable)}. É possível usar HLS para distribuir este ficheiro.`
          : `Espaço insuficiente — faltam ${this.formatBytes(file.sizeBytes - totalAvailable)}`,
      });
    }

    return {
      placed,
      unplaceable,
      canProceed: placed.length > 0,
      totalBytesUsed: placed.reduce((sum, f) => sum + f.fileSize, 0n),
    };
  }

  // ── Distribuição directa ────────────────────────────────────
  // Tenta colocar o ficheiro inteiro num único provider

  private tryDirect(
    file: FileInputDto,
    pool: ProviderSnapshot[],
  ): PlacedFile | null {
    // Reordena do maior para o menor
    this.sortPool(pool);

    // Procura o primeiro provider que aguente o ficheiro inteiro
    const provider = pool.find((p) => p.availableSpace >= file.sizeBytes);

    if (!provider) return null;

    // Decrementa o espaço deste provider
    provider.availableSpace -= file.sizeBytes;

    return {
      fileName: file.name,
      fileSize: file.sizeBytes,
      isFragmented: false,
      chunks: [
        {
          chunkIndex: 0,
          providerId: provider.id,
          providerName: provider.displayName,
          startByte: 0n,
          endByte: file.sizeBytes,
          sizeBytes: file.sizeBytes,
          isFragment: false,
        },
      ],
    };
  }

  // ── Fragmentação — First Fit Decreasing (FFD) ───────────────
  // Divide o ficheiro pelos providers disponíveis

  private tryFragmentation(
    file: FileInputDto,
    pool: ProviderSnapshot[],
  ): PlacedFile | null {
    // Verifica se a soma de todos os providers chega
    const totalAvailable = pool.reduce((sum, p) => sum + p.availableSpace, 0n);

    if (totalAvailable < file.sizeBytes) return null;

    const chunks: ChunkPlan[] = [];
    let remaining = file.sizeBytes;
    let offset = 0n;

    while (remaining > 0n) {
      // Reordena a cada iteração (o espaço vai mudando)
      this.sortPool(pool);

      const provider = pool[0];

      // Protecção — não deve acontecer mas garante segurança
      if (!provider || provider.availableSpace === 0n) break;

      // Pega o máximo que este provider aguenta
      const chunkSize =
        remaining < provider.availableSpace
          ? remaining
          : provider.availableSpace;

      chunks.push({
        chunkIndex: chunks.length,
        providerId: provider.id,
        providerName: provider.displayName,
        startByte: offset,
        endByte: offset + chunkSize,
        sizeBytes: chunkSize,
        isFragment: true,
      });

      // Decrementa o espaço deste provider
      provider.availableSpace -= chunkSize;

      offset += chunkSize;
      remaining -= chunkSize;
    }

    return {
      fileName: file.name,
      fileSize: file.sizeBytes,
      isFragmented: true,
      chunks,
    };
  }

  // ── Utilitários ─────────────────────────────────────────────

  // Ordena o pool do maior espaço para o menor (in-place)
  private sortPool(pool: ProviderSnapshot[]): void {
    pool.sort((a, b) =>
      b.availableSpace > a.availableSpace
        ? 1
        : b.availableSpace < a.availableSpace
          ? -1
          : 0,
    );
  }

  // Formata bytes para string legível (para mensagens de erro)
  private formatBytes(bytes: bigint): string {
    const n = Number(bytes);
    if (n < 1_024) return `${n} B`;
    if (n < 1_048_576) return `${(n / 1_024).toFixed(1)} KB`;
    if (n < 1_073_741_824) return `${(n / 1_048_576).toFixed(1)} MB`;
    return `${(n / 1_073_741_824).toFixed(1)} GB`;
  }
}
