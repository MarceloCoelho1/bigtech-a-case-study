import { CustomError } from './CustomError';

export class ExpiredToken extends CustomError {
  constructor() {
    super('Token expired', 404);
  }
}