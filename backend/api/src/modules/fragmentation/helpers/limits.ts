import { ProviderType } from 'src/generated/prisma/enums';

export const DRIVER_MAX_FILE_SIZE: Partial<Record<ProviderType, bigint>> = {
  GOOGLE_DRIVE: 5_000_000_000_000n,
  ONEDRIVE: 250_000_000_000n,
  TELEGRAM: 2_000_000_000n,
  // DROPBOX, MEGA, etc. sem entrada = sem teto conhecido
};

export function getDriverMaxFileSize(type: ProviderType): bigint | null {
  return DRIVER_MAX_FILE_SIZE[type] ?? null;
}
