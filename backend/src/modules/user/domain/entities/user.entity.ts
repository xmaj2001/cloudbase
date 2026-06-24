import { BaseDomain } from '../../../../shared/domain/base-domain.base';
import { UserStatus } from '../enuns/user-status.enum';

interface UserProps {
  email: string;
  name: string;
  avatarUrl?: string | null;
  passwordHash?: string | null;
  whatsappNumber?: string | null;
  status: UserStatus;

  // reputação (sistema de trocas)
  reputationScore: number;
  totalTrades: number;
  completedTrades: number;
  tradeCompletionRate: number;

  deletedAt?: Date | null;
}

interface CreateUserProps {
  email: string;
  name: string;
  avatarUrl?: string;
  passwordHash?: string;
  whatsappNumber?: string;
}

export class UserEntity extends BaseDomain {
  private props: UserProps;

  private constructor(
    props: UserProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.props = props;
  }

  // ── Factory — criar novo utilizador ──────────────────
  static create(data: CreateUserProps): UserEntity {
    return new UserEntity({
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl ?? null,
      passwordHash: data.passwordHash ?? null,
      whatsappNumber: data.whatsappNumber ?? null,
      status: UserStatus.ACTIVE,
      reputationScore: 0,
      totalTrades: 0,
      completedTrades: 0,
      tradeCompletionRate: 0,
      deletedAt: null,
    });
  }

  // ── Factory — reconstituir do banco ──────────────────
  static reconstitute(
    props: UserProps,
    id: string,
    createdAt: Date,
    updatedAt: Date,
  ): UserEntity {
    return new UserEntity(props, id, createdAt, updatedAt);
  }

  // ── Getters ──────────────────────────────────────────
  get email(): string {
    return this.props.email;
  }
  get name(): string {
    return this.props.name;
  }
  get avatarUrl(): string | null {
    return this.props.avatarUrl ?? null;
  }
  get passwordHash(): string | null {
    return this.props.passwordHash ?? null;
  }
  get whatsappNumber(): string | null {
    return this.props.whatsappNumber ?? null;
  }
  get status(): UserStatus {
    return this.props.status;
  }
  get reputationScore(): number {
    return this.props.reputationScore;
  }
  get totalTrades(): number {
    return this.props.totalTrades;
  }
  get completedTrades(): number {
    return this.props.completedTrades;
  }
  get tradeCompletionRate(): number {
    return this.props.tradeCompletionRate;
  }
  get deletedAt(): Date | null {
    return this.props.deletedAt ?? null;
  }
  get isDeleted(): boolean {
    return this.props.status === UserStatus.DELETED;
  }

  // ── Métodos de negócio ───────────────────────────────
  updateProfile(data: {
    name?: string;
    avatarUrl?: string;
    whatsappNumber?: string;
  }): void {
    if (data.name) this.props.name = data.name;
    if (data.avatarUrl) this.props.avatarUrl = data.avatarUrl;
    if (data.whatsappNumber) this.props.whatsappNumber = data.whatsappNumber;
    this.touch();
  }

  updatePassword(hash: string): void {
    this.props.passwordHash = hash;
    this.touch();
  }

  softDelete(): void {
    this.props.status = UserStatus.DELETED;
    this.props.deletedAt = new Date();
    this.touch();
  }

  // chamado após uma troca ser concluída
  recordTradeCompleted(): void {
    this.props.totalTrades += 1;
    this.props.completedTrades += 1;
    this.props.tradeCompletionRate =
      (this.props.completedTrades / this.props.totalTrades) * 100;
    this.touch();
  }

  // chamado após uma troca falhar ou ser cancelada
  recordTradeFailed(): void {
    this.props.totalTrades += 1;
    this.props.tradeCompletionRate =
      (this.props.completedTrades / this.props.totalTrades) * 100;
    this.touch();
  }

  updateReputationScore(score: number): void {
    this.props.reputationScore = score;
    this.touch();
  }
}
