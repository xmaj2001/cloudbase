import { Driver } from 'src/generated/prisma/client';

export type DerivedDriverStatus = 'ACTIVE' | 'SYNCING' | 'ERROR';

/**
 * O schema do Driver NÃO tem uma coluna `status`. O status visível
 * pro utilizador é derivado de três campos reais:
 *
 *   - syncError:    preenchido  → algo falhou no último sync → ERROR
 *   - spaceCachedAt: null       → ainda nunca sincronizou     → SYNCING
 *   - caso contrário                                          → ACTIVE
 *
 * ⚠️ Assunção de negócio: isto assume que "SYNCING" só acontece uma
 * vez, logo após o driver ser criado e antes do primeiro sync
 * completar. Não há hoje um campo que marque "sync em progresso"
 * pra um driver que já tem cache mas está a re-sincronizar agora
 * mesmo (ex: alguém clicou em "sync" e o request ainda não voltou).
 * Se precisares distinguir esse caso, vai precisar de um campo novo
 * no schema (ex: `syncInProgress: Boolean`).
 */
export function deriveDriverStatus(driver: Driver): DerivedDriverStatus {
  if (driver.syncError) {
    return 'ERROR';
  }

  if (!driver.spaceCachedAt) {
    return 'SYNCING';
  }

  return 'ACTIVE';
}
