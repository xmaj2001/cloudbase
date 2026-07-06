import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repo/user.repository';
import { UserStatus } from '../../domain/enuns/user-status.enum';
import { User as PrismaUser } from '../../../../generated/prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return this.mapToEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return this.mapToEntity(user);
  }

  async save(user: UserEntity): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        passwordHash: user.passwordHash,
        whatsappNumber: user.whatsappNumber,
        reputationScore: user.reputationScore,
        totalTrades: user.totalTrades,
        completedTrades: user.completedTrades,
        tradeCompletionRate: user.tradeCompletionRate,
        deletedAt: user.deletedAt,
      },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        passwordHash: user.passwordHash,
        whatsappNumber: user.whatsappNumber,
        reputationScore: user.reputationScore,
        totalTrades: user.totalTrades,
        completedTrades: user.completedTrades,
        tradeCompletionRate: user.tradeCompletionRate,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  private mapToEntity(dbUser: PrismaUser): UserEntity {
    const status = dbUser.deletedAt ? UserStatus.DELETED : UserStatus.ACTIVE;
    return UserEntity.reconstitute(
      {
        email: dbUser.email,
        name: dbUser.name,
        avatarUrl: dbUser.avatarUrl,
        passwordHash: dbUser.passwordHash,
        whatsappNumber: dbUser.whatsappNumber,
        status,
        reputationScore: dbUser.reputationScore,
        totalTrades: dbUser.totalTrades,
        completedTrades: dbUser.completedTrades,
        tradeCompletionRate: dbUser.tradeCompletionRate,
        deletedAt: dbUser.deletedAt,
      },
      dbUser.id,
      dbUser.createdAt,
      dbUser.updatedAt,
    );
  }
}
