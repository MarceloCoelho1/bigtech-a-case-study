import { User } from '../../core/domain/entities/User';
import { UserRepository } from '../../core/domain/repositories/UserRepository';
import { prisma } from '../datasources/PrismaClient';

export class PrismaUserRepository implements UserRepository {

  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        password_hash: user.passwordHash,
        created_at: user.createdAt,
      },
    });

    return new User(createdUser.id, createdUser.email, createdUser.name, createdUser.password_hash, createdUser.created_at);
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({ where: { email } });
    if (!foundUser) return null;
    return new User(foundUser.id, foundUser.email, foundUser.name, foundUser.password_hash, foundUser.created_at);
  }

  async findById(id: string): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({ where: { id } });
    if (!foundUser) return null;
    return new User(foundUser.id, foundUser.email, foundUser.name, foundUser.password_hash, foundUser.created_at);
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(user => new User(user.id, user.email, user.name, user.password_hash, user.created_at));
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        name: user.name,
        password_hash: user.passwordHash,
      },
    });
    return new User(updatedUser.id, updatedUser.email, updatedUser.name, updatedUser.password_hash, updatedUser.created_at);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
