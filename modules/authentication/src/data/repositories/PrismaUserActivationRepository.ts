import { UserActivation } from '../../core/domain/entities/UserActivation';
import { UserActivationRepository } from '../../core/domain/repositories/UserActivationRepository';
import { CreateUserActivationDto } from '../../presentation/dtos/CreateUserActivationDto';
import { prisma } from '../datasources/PrismaClient';

export class PrismaUserActivationRepository implements UserActivationRepository {

  async create(userActivation: CreateUserActivationDto): Promise<UserActivation> {
    const createdUserActivation = await prisma.userActivation.create({
      data: {
        token: userActivation.token,
        user_id: userActivation.user_id,
        expiration_date: userActivation.expiration_date,
      },
    });

    return new UserActivation(
        createdUserActivation.id,
        createdUserActivation.token,
        createdUserActivation.user_id,
        createdUserActivation.expiration_date
    );
  }


  async findByToken(token: string): Promise<UserActivation | null> {
    const foundUserActivation = await prisma.userActivation.findUnique({
      where: { token },
    });
    if (!foundUserActivation) return null;
    return new UserActivation(
      foundUserActivation.id,
      foundUserActivation.token,
      foundUserActivation.user_id,
      foundUserActivation.expiration_date,
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.userActivation.delete({ where: { id } });
  }
}
