import { CustomError } from './customError';

export class ExpiredToken extends CustomError {
  constructor() {
    super('Expired token', 401);
  }
}