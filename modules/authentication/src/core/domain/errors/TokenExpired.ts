import { CustomError } from './CustomError';

export class TokenExpired extends CustomError {
  constructor() {
    super('Token expired', 404);
  }
}