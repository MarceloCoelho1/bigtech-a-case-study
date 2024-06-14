import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.update(user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async getUserByEmail(email: string): Promise <User | null> {
    return this.userRepository.findByEmail(email);
  }
}
