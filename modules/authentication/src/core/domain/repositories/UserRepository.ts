import { CreateUserDTO } from '../../../presentation/dtos/CreateUserDto';
import { UpdateUserDto } from '../../../presentation/dtos/UpdateUserDto';
import { User } from '../entities/User';

export interface UserRepository {
  create(user: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}