export interface DriverCapacity {
  id: string;
  availableBytes: number;
  maxFileSize: number;
}

export interface ChunkPlan {
  index: number;
  driverId: string;
  size: number;
  offsetStart: number;
  offsetEnd: number;
}

type PlanMode = 'auto' | 'forced';

export function planFragmentation(
  fileSize: number,
  drivers: DriverCapacity[],
  mode: PlanMode = 'auto',
): ChunkPlan[] {
  const totalAvailable = drivers.reduce((s, d) => s + d.availableBytes, 0);
  if (fileSize > totalAvailable) {
    throw new Error('Espaço total insuficiente nos drivers selecionados');
  }

  return mode === 'forced'
    ? planProportional(fileSize, drivers)
    : planGreedy(fileSize, drivers);
}

// modo AUTO: enche driver a driver até acabar — minimiza nº de chunks
function planGreedy(fileSize: number, drivers: DriverCapacity[]): ChunkPlan[] {
  const plan: ChunkPlan[] = [];
  let remaining = fileSize;
  let offset = 0;
  let index = 0;

  for (const driver of drivers) {
    if (remaining <= 0) break;
    let allocatable = Math.min(driver.availableBytes, remaining);

    while (allocatable > 0) {
      const size = Math.min(allocatable, driver.maxFileSize);
      plan.push({
        index,
        driverId: driver.id,
        size,
        offsetStart: offset,
        offsetEnd: offset + size,
      });
      offset += size;
      remaining -= size;
      allocatable -= size;
      index++;
    }
  }
  return plan;
}

// modo FORCED: user escolheu >1 driver de propósito — distribui proporcional
// ao espaço disponível de cada um, garantindo que todos participam
function planProportional(
  fileSize: number,
  drivers: DriverCapacity[],
): ChunkPlan[] {
  const totalAvailable = drivers.reduce((s, d) => s + d.availableBytes, 0);
  const plan: ChunkPlan[] = [];
  let offset = 0;
  let index = 0;
  let assigned = 0;

  drivers.forEach((driver, i) => {
    const isLast = i === drivers.length - 1;
    // último driver leva o resto exato, evita erro de arredondamento
    const share = isLast
      ? fileSize - assigned
      : Math.floor(fileSize * (driver.availableBytes / totalAvailable));

    let allocatable = Math.min(share, driver.availableBytes);
    while (allocatable > 0) {
      const size = Math.min(allocatable, driver.maxFileSize);
      plan.push({
        index,
        driverId: driver.id,
        size,
        offsetStart: offset,
        offsetEnd: offset + size,
      });
      offset += size;
      allocatable -= size;
      assigned += size;
      index++;
    }
  });

  return plan;
}
