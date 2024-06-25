import { CustomError } from './customError';

export class UserAlreadyExists extends CustomError {
  constructor() {
    super('User Already Exists', 409);
  }
}