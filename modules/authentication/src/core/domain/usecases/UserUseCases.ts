import { IBcryptService } from '../adapters/bcrypt.interface';
import { IJwtService } from '../adapters/jwt.interface';
import { User } from '../entities/User';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExists';
import { UserRepository } from '../repositories/UserRepository';

export class UserUseCases {
  constructor(
    private userRepository: UserRepository,
    private bcryptService: IBcryptService,
    private jwtService: IJwtService
  ) {}

  async createUser(user: User): Promise<{ user: User, token: string }> {
    const userExist = await this.getUserByEmail(user.email);

    if (userExist) {
      throw new UserAlreadyExistsError(); 
    }
    user.passwordHash = await this.bcryptService.hash(user.passwordHash);

    const createdUser = await this.userRepository.create(user);
    const token = this.jwtService.sign({ userId: createdUser.id });

    return { user: createdUser, token };
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
