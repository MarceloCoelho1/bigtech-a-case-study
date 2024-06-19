import { CustomError } from './CustomError';

export class InvalidToken extends CustomError {
  constructor() {
    super('Invalid Token', 404);
  }
}