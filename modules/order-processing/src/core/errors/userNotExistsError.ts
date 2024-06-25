import { CustomError } from './customError';

export class UserNotExists extends CustomError {
  constructor() {
    super('User Not Exists', 404);
  }
}