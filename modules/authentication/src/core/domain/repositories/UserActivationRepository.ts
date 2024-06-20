import { CreateUserActivationDto } from '../../../presentation/dtos/CreateUserActivationDto';
import { UserActivation } from '../entities/UserActivation';

export interface UserActivationRepository {
  create(userActivation: CreateUserActivationDto): Promise<UserActivation>;
  findByToken(token: string): Promise<UserActivation | null>;
  delete(id: string): Promise<void>
}