import { CustomError } from './CustomError';

export class UserAlreadyExistsError extends CustomError {
  constructor() {
    super('User already exists', 400);
  }
}