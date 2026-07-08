import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { IStorageAdapter, StorageSpaceInfo } from '../adapter.interface';
import { CloudinaryCredentialsDto } from '../../dto/create-driver.dto';

/**
 * 1 credit da Cloudinary ≈ 1 GiB (1024^3 bytes), seja em storage,
 * bandwidth ou transformações. Referência oficial:
 * https://cloudinary.com/documentation/developer_onboarding_faq_credits
 */
const BYTES_PER_GIB = 1024 ** 3;

/**
 * Tipagem mínima da resposta do endpoint GET /usage.
 * A Cloudinary pode adicionar campos novos no futuro (é o aviso deles
 * próprios na doc), por isso mantemos isto como "o que usamos", não
 * "o schema completo".
 */
interface CloudinaryUsageResponse {
  plan: string;
  last_updated: string;
  storage: {
    usage: number; // bytes, valor CUMULATIVO atual (não é "do dia")
    credits_usage?: number;
  };
  bandwidth: {
    usage: number;
    credits_usage?: number;
  };
  credits: {
    usage: number;
    limit: number; // total de credits do plano (ex: 25 no Free)
    used_percent: number;
  };
}

@Injectable()
export class CloudinaryDriverAdapter implements IStorageAdapter {
  async fetchSpaceInfo(
    credentials: CloudinaryCredentialsDto,
  ): Promise<StorageSpaceInfo> {
    const { apiKey, apiSecret, cloudName } = credentials;

    try {
      // ⚠️ Propositalmente NÃO usamos cloudinary.config() aqui.
      //
      // cloudinary.config() escreve num singleton do módulo (state
      // global do processo Node). Num backend que atende vários
      // utilizadores, cada um com a sua própria conta Cloudinary,
      // duas chamadas concorrentes a fetchSpaceInfo() podem
      // sobrescrever a config uma da outra ANTES do request sair —
      // e acabas a consultar a conta errada. É um bug de
      // concorrência, silencioso, que só aparece sob carga real.
      //
      // Passar as credenciais dentro das próprias options da chamada
      // é suportado nativamente pelo SDK e evita esse state
      // partilhado por completo.
      const usage = (await cloudinary.api.usage({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      })) as unknown as CloudinaryUsageResponse;

      const { storage, credits } = usage;

      if (!storage || !credits) {
        throw new Error(
          'Resposta da Cloudinary não trouxe os campos "storage" ou "credits".',
        );
      }

      // Storage usado é o valor real reportado em bytes — sem
      // aproximações, é direto da API.
      const usedSpace = BigInt(Math.round(storage.usage));

      // Disponível = credits que ainda não foram gastos em NENHUMA
      // categoria (storage, bandwidth, transformações), convertido
      // pra bytes. Representa o headroom REAL que sobra pro
      // storage crescer, já descontando o que bandwidth e
      // transformações consumiram do mesmo pool partilhado.
      const remainingCredits = Math.max(credits.limit - credits.usage, 0);
      const availableSpace = BigInt(
        Math.round(remainingCredits * BYTES_PER_GIB),
      );

      // totalSpace é DERIVADO, não é o limite nominal do plano.
      //
      // Por quê: a Cloudinary não reserva um teto fixo de storage —
      // o "espaço total" que resta pra storage depende de quanto
      // bandwidth/transformações já comeram do pool de credits.
      // Se usássemos credits.limit * BYTES_PER_GIB como totalSpace,
      // quebraríamos a invariante totalSpace = usedSpace +
      // availableSpace que o resto do sistema (e qualquer
      // frontend fazendo totalSpace - usedSpace) assume como
      // verdade. Ex: plano Free (25 credits), 2GB em storage,
      // 10 credits já queimados em bandwidth:
      //   - usedSpace = 2 GiB
      //   - availableSpace = (25 - 12) = 13 GiB
      //   - totalSpace nominal (25GiB) - usedSpace (2GiB) = 23GiB
      //     de "livre" ❌ — mentira, só sobram 13GiB de fato.
      //   - totalSpace derivado = 2 + 13 = 15 GiB ✅ — bate com a
      //     realidade do pool partilhado.
      //
      // Efeito colateral aceite: totalSpace passa a ser dinâmico,
      // encolhe conforme bandwidth/transformações consomem credits
      // ao longo do mês. Isso é correto — reflete o comportamento
      // real da conta, não é bug.
      const totalSpace = usedSpace + availableSpace;

      return {
        totalSpace,
        usedSpace,
        availableSpace,
      };
    } catch (error) {
      // Evita duplo-wrap se já for uma exceção do Nest
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Falha ao validar credenciais ou obter espaço da Cloudinary: ${error}`,
      );
    }
  }
}
