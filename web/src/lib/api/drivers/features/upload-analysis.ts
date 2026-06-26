import { DriverDto } from "@/types/drivers";
import { ApiDriver } from "../types";

// ─────────────────────────────────────────────
// Tipos de resultado da análise
// ─────────────────────────────────────────────

export type AnalysisResult =
  | { type: "SINGLE_DRIVER"; driver: DriverDto }
  | { type: "FITS_IN_SELECTED"; driver: DriverDto }
  | { type: "ASK_FRAGMENT"; drivers: DriverDto[]; fileSize: number }
  | { type: "NEEDS_FRAGMENT"; plan: FragmentPlan[]; fileSize: number }
  | { type: "NO_SPACE"; totalFree: number; fileSize: number };

export interface FragmentPlan {
  driver: DriverDto;
  startByte: number;
  endByte: number;
  chunkIndex: number;
  chunkSizeBytes: number;
}

// ─────────────────────────────────────────────
// Lógica de análise de espaço
// ─────────────────────────────────────────────

/**
 * Analisa se um ficheiro cabe nos drivers selecionados e
 * decide a estratégia de upload (direto ou fragmentado).
 *
 * TODO: No futuro esta análise pode ser feita no servidor (endpoint /upload/plan)
 *       para ter informação atualizada do espaço real dos drivers.
 */
export function analyzeUpload(
  fileSize: number,
  selectedDrivers: ApiDriver[]
): AnalysisResult {
  if (selectedDrivers.length === 0) {
    return { type: "NO_SPACE", totalFree: 0, fileSize };
  }

  // Caso: 1 driver selecionado
  if (selectedDrivers.length === 1) {
    const driver = selectedDrivers[0];

    if (driver.space?.availableSpace != null && BigInt(driver.space.availableSpace) >= BigInt(fileSize)) {
      return { type: "SINGLE_DRIVER", driver };
    }
    // Só tem 1 driver e não cabe → sem espaço
    return { type: "NO_SPACE", totalFree: Number(driver.space?.availableSpace || 0), fileSize };
  }

  // Caso: múltiplos drivers selecionados
  const totalFree = selectedDrivers.reduce((sum, d) => d.space?.availableSpace != null ? sum + Number(d.space.availableSpace) : sum, 0);

  // Verifica se cabe num único driver (utilizador escolheu mais de um, mas não é necessário)
  const driverThatFits = selectedDrivers.find((d) => d.space?.availableSpace != null && BigInt(d.space.availableSpace) >= BigInt(fileSize));
  if (driverThatFits) {
    // Cabe num só → pergunta se quer fragmentar mesmo assim
    return {
      type: "ASK_FRAGMENT",
      drivers: selectedDrivers,
      fileSize,
    };
  }

  // Não cabe em nenhum individualmente → verifica total
  if (totalFree < fileSize) {
    return { type: "NO_SPACE", totalFree, fileSize };
  }

  // Cabe no total → calcula plano de fragmentação
  const plan = buildFragmentPlan(fileSize, selectedDrivers);
  return { type: "NEEDS_FRAGMENT", plan, fileSize };
}

/**
 * Calcula como dividir o ficheiro pelos drivers disponíveis.
 * Preenche cada driver até ao limite e avança para o próximo.
 */
export function buildFragmentPlan(
  fileSize: number,
  drivers: DriverDto[]
): FragmentPlan[] {
  const plan: FragmentPlan[] = [];
  let cursor = 0;
  let chunkIndex = 0;

  // Ordena por espaço disponível (maior primeiro) para minimizar chunks
  const sorted = [...drivers].sort((a, b) => Number(b.space?.availableSpace || 0) - Number(a.space?.availableSpace || 0));

  for (const driver of sorted) {
    if (cursor >= fileSize) break;
    const available = Number(driver.space?.availableSpace || 0);
    const chunkSize = Math.min(available, fileSize - cursor);
    if (chunkSize <= 0) continue;
    plan.push({
      driver,
      startByte: cursor,
      endByte: cursor + chunkSize,
      chunkIndex,
      chunkSizeBytes: chunkSize,
    });
    cursor += chunkSize;
    chunkIndex++;
  }

  return plan;
}

// ─────────────────────────────────────────────
// Utilitários de formatação
// ─────────────────────────────────────────────

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
