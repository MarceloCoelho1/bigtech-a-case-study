import { CustomError } from './CustomError';

export class UserNotExists extends CustomError {
  constructor() {
    super('User not exists', 404);
  }
}