import { CustomError } from './CustomError';

export class UserNotVerified extends CustomError {
  constructor() {
    super('User not verified!', 403);
  }
}