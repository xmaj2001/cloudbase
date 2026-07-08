/**
 * Converte bytes (BigInt vindo do Prisma, ou number) para GB decimal.
 * Usa GiB (1024^3) como base, consistente com a conversão usada nos
 * adaptadores de storage (ex: CloudinaryDriverAdapter).
 *
 * Aceita null/undefined pra facilitar uso direto com campos opcionais
 * do Prisma (cachedTotalSpace pode ser null antes do primeiro sync).
 *
 * ⚠️ Aqui null vira 0 — correto pra somatórios/agregações (ex: KPIs),
 * onde um driver sem cache ainda não deve contribuir. NÃO uses esta
 * versão quando precisares distinguir "0 bytes reais" de "sem limite
 * definido" (ex: Telegram) — pra isso, usa bytesToGbNullable().
 */
export function bytesToGb(bytes: bigint | number | null | undefined): number {
  if (bytes === null || bytes === undefined) {
    return 0;
  }

  const value = typeof bytes === 'bigint' ? Number(bytes) : bytes;
  return value / 1024 ** 3;
}

/**
 * Igual ao bytesToGb, mas preserva null explicitamente.
 *
 * Usa esta versão quando o "null" tem significado próprio — no nosso
 * caso, totalSpace === null significa "provedor sem limite fixo" (ex:
 * Telegram), e isso precisa chegar ao frontend como null, não como 0
 * GB (que pareceria "sem espaço nenhum", o oposto do real).
 */
export function bytesToGbNullable(
  bytes: bigint | number | null | undefined,
): number | null {
  if (bytes === null || bytes === undefined) {
    return null;
  }

  return bytesToGb(bytes);
}
