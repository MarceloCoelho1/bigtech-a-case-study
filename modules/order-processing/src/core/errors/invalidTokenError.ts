import { CustomError } from './customError';

export class InvalidToken extends CustomError {
  constructor() {
    super('Invalid Token', 400);
  }
}