import { User } from '../../core/domain/entities/User';
import { UserNotExists } from '../../core/domain/errors/UserNotExists';
import { UserRepository } from '../../core/domain/repositories/UserRepository';
import { CreateUserDTO } from '../../presentation/dtos/CreateUserDto';
import { UpdateUserDto } from '../../presentation/dtos/UpdateUserDto';
import { prisma } from '../datasources/PrismaClient';

export class PrismaUserRepository implements UserRepository {

  async create(user: CreateUserDTO): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password_hash: user.password,
      },
    });

    return new User(createdUser.id, createdUser.email, createdUser.name, createdUser.password_hash, createdUser.created_at, createdUser.is_verified);
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({ where: { email } });
    if (!foundUser) return null;
    return new User(foundUser.id, foundUser.email, foundUser.name, foundUser.password_hash, foundUser.created_at, foundUser.is_verified);
  }

  async findById(id: string): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({ where: { id } });
    if (!foundUser) return null;
    return new User(foundUser.id, foundUser.email, foundUser.name, foundUser.password_hash, foundUser.created_at, foundUser.is_verified);
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(user => new User(user.id, user.email, user.name, user.password_hash, user.created_at, user.is_verified));
  }

  async update(user: UpdateUserDto): Promise<User> {
    const currentUser = await this.findById(user.id)
    
    if(!currentUser) {
      throw new UserNotExists()
    }

    const updateData = {
      name: user.name !== undefined ? user.name : currentUser.name,
      password_hash: user.password !== undefined ? user.password : currentUser.passwordHash,
      is_verified: user.is_verified !== undefined ? user.is_verified : currentUser.is_verified,
    };

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return new User(updatedUser.id, updatedUser.email, updatedUser.name, updatedUser.password_hash, updatedUser.created_at, updatedUser.is_verified);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
