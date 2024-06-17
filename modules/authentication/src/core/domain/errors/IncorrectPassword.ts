import { CustomError } from './CustomError';

export class IncorrectPassword extends CustomError {
  constructor() {
    super('Incorrect password', 401);
  }
}