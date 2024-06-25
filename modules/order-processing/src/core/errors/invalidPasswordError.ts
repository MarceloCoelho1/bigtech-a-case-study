import { CustomError } from './customError';

export class InvalidPassword extends CustomError {
  constructor() {
    super('Invalid Password', 400);
  }
}