import { Module } from '@nestjs/common';
import { UserController } from './presentation/http/user.controller';
import { UserClientService } from './app/services/user-client.service';
import { UserRepository } from './domain/repo/user.repository';
import { PrismaUserRepository } from './infra/repo/prisma-user.repository';
import { CreateUserUseCase } from './app/use-cases/create-user.use-case';
import { GetUserByIdUseCase } from './app/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from './app/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './app/use-cases/delete-user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    UserClientService,
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserClientService],
})
export class UserModule { }
