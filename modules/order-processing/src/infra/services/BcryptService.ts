import { hash, genSalt, compare } from 'bcryptjs';
import { IBcryptService } from '../../core/services/IBcryptService';

export class BcryptService implements IBcryptService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt(6);
    return hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}