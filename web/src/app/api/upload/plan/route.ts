import { NextRequest, NextResponse } from "next/server";
import {
  UploadPlanRequest,
  UploadPlanResponse,
  FilePlan,
  UploadPlanChunk,
} from "@/lib/api/upload/types";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface DriverSpace {
  id: string;
  displayName: string;
  type: string;
  availableBytes: number;
}

/**
 * Obtém os drivers do utilizador a partir do backend real.
 * Converte BigInt-as-string para number.
 */
async function fetchDriverSpaces(
  userId: string,
  filterIds?: string[]
): Promise<DriverSpace[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/storage-drivers?userId=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Backend respondeu com ${res.status}`);

    // O backend devolve { data: [...] } via ApiEnvelope
    const json = await res.json();
    const drivers: any[] = json?.data ?? [];

    const result: DriverSpace[] = drivers
      .filter((d) => (filterIds ? filterIds.includes(d.id) : true))
      .map((d) => ({
        id: d.id,
        displayName: d.displayName,
        type: d.type,
        // availableSpace vem como BigInt em string
        availableBytes: d.space?.availableSpace
          ? Number(d.space.availableSpace)
          : 0,
      }))
      .filter((d) => d.availableBytes > 0);

    return result;
  } catch {
    // Fallback: dados simulados para desenvolvimento quando o backend não está disponível
    return [
      {
        id: "mock-driver-1",
        displayName: "Google Drive (Simulado)",
        type: "GOOGLE_DRIVE",
        availableBytes: 15 * 1024 * 1024 * 1024, // 15 GB
      },
      {
        id: "mock-driver-2",
        displayName: "OneDrive (Simulado)",
        type: "ONEDRIVE",
        availableBytes: 5 * 1024 * 1024 * 1024, // 5 GB
      },
      {
        id: "mock-driver-3",
        displayName: "Telegram (Simulado)",
        type: "TELEGRAM",
        availableBytes: 10 * 1024 * 1024 * 1024, // 10 GB
      },
    ].filter((d) => (filterIds ? filterIds.includes(d.id) : true));
  }
}

/**
 * Algoritmo de distribuição inteligente:
 *
 * 1. Para cada ficheiro, tenta encontrar um driver com espaço suficiente (sem fragmentação).
 * 2. Se não encontrar, fragmenta o ficheiro pelos drivers disponíveis (maior espaço primeiro).
 * 3. Actualiza o espaço restante de cada driver após cada alocação.
 */
function computePlan(
  files: { name: string; size: number; extension: string }[],
  drivers: DriverSpace[]
): UploadPlanResponse {
  // Cópia mutável do espaço disponível de cada driver
  const driverPool = drivers.map((d) => ({ ...d }));

  const filePlans: FilePlan[] = [];

  for (const file of files) {
    const { name: fileName, size: fileSize } = file;

    // ── Tentativa de distribuição sem fragmentação ─────────────────────────
    const singleDriver = driverPool.find((d) => d.availableBytes >= fileSize);

    if (singleDriver) {
      // O ficheiro cabe inteiro num único driver
      const chunk: UploadPlanChunk = {
        driverId: singleDriver.id,
        driverName: singleDriver.displayName,
        driverType: singleDriver.type,
        startByte: 0,
        endByte: fileSize,
        chunkIndex: 0,
        chunkSizeBytes: fileSize,
        isFragment: false,
      };

      singleDriver.availableBytes -= fileSize;

      filePlans.push({
        fileName,
        fileSize,
        isFragmented: false,
        chunks: [chunk],
      });
      continue;
    }

    // ── Fragmentação: dividir o ficheiro pelos drivers disponíveis ─────────
    // Ordena por espaço disponível (maior primeiro)
    const sortedPool = [...driverPool].sort(
      (a, b) => b.availableBytes - a.availableBytes
    );

    const totalAvailable = sortedPool.reduce(
      (sum, d) => sum + d.availableBytes,
      0
    );

    if (totalAvailable < fileSize) {
      // Espaço insuficiente mesmo em todos os drivers juntos
      return {
        plan: [],
        error: `Espaço insuficiente para o ficheiro "${fileName}" (${fileSize} bytes necessários, ${totalAvailable} bytes disponíveis no total).`,
      };
    }

    const chunks: UploadPlanChunk[] = [];
    let cursor = 0;
    let chunkIndex = 0;

    for (const driver of sortedPool) {
      if (cursor >= fileSize) break;
      if (driver.availableBytes <= 0) continue;

      const chunkSize = Math.min(driver.availableBytes, fileSize - cursor);
      if (chunkSize <= 0) continue;

      chunks.push({
        driverId: driver.id,
        driverName: driver.displayName,
        driverType: driver.type,
        startByte: cursor,
        endByte: cursor + chunkSize,
        chunkIndex,
        chunkSizeBytes: chunkSize,
        isFragment: true,
      });

      // Actualiza o pool global (encontra o driver original e desconta)
      const poolDriver = driverPool.find((d) => d.id === driver.id);
      if (poolDriver) poolDriver.availableBytes -= chunkSize;

      cursor += chunkSize;
      chunkIndex++;
    }

    filePlans.push({
      fileName,
      fileSize,
      isFragmented: true,
      chunks,
    });
  }

  return { plan: filePlans };
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: UploadPlanRequest = await req.json();

    const { userId, files, selectedDriverIds } = body;

    if (!userId || !files || files.length === 0) {
      return NextResponse.json(
        { error: "Pedido inválido: userId e files são obrigatórios." },
        { status: 400 }
      );
    }

    // Obtém os drivers disponíveis (filtrados se selectedDriverIds foi enviado)
    const drivers = await fetchDriverSpaces(userId, selectedDriverIds);

    if (drivers.length === 0) {
      return NextResponse.json(
        { error: "Nenhum driver disponível com espaço livre." },
        { status: 422 }
      );
    }

    const result = computePlan(files, drivers);

    if (result.error) {
      return NextResponse.json(result, { status: 422 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[BFF /api/upload/plan] Erro:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
