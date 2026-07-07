import { Injectable, BadRequestException } from '@nestjs/common';
import { IStorageAdapter, StorageSpaceInfo } from '../adapter.interface';
import { CloudinaryCredentialsDto } from '../../dto/create-driver.dto';

@Injectable()
export class CloudinaryDriverAdapter implements IStorageAdapter {
  async fetchSpaceInfo(
    credentials: CloudinaryCredentialsDto,
  ): Promise<StorageSpaceInfo> {
    const { apiKey, apiSecret, cloudName } = credentials;

    // Basic Auth obrigatória para a API Admin/Usage
    const authHeader = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/usage`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Tenta extrair a mensagem de erro nativa da Cloudinary se existir
        const errorData = await response.json().catch(() => ({}));
        const errorMsg =
          errorData.error?.message || `Status ${response.status}`;
        throw new Error(errorMsg);
      }

      const data = await response.json();

      // ── MAPEAMENTO SEGURO CONFORME A API ──────────────────────────────
      // A Cloudinary retorna o nó "storage" diretamente na raiz do objeto
      const storageMetrics = data.storage;

      if (!storageMetrics) {
        throw new Error(
          'Métricas de armazenamento ("storage") ausentes no retorno da Cloudinary.',
        );
      }

      // Captura os bytes numéricos de uso e limite
      const usedSpace = BigInt(storageMetrics.usage || 0);
      const totalSpace = BigInt(storageMetrics.limit || 0);

      // Se for uma conta antiga ou plano de créditos dinâmicos onde o limit vem zerado,
      // assume 0n (ou lidas mais tarde como ilimitado/flexível se preferires)
      const availableSpace =
        totalSpace > usedSpace ? totalSpace - usedSpace : 0n;

      return {
        totalSpace: totalSpace > 0n ? totalSpace : null, // null se não houver limite estático definido
        usedSpace,
        availableSpace,
      };
    } catch (error) {
      throw new BadRequestException(
        `Falha ao validar credenciais ou obter espaço da Cloudinary: ${error.message}`,
      );
    }
  }
}
