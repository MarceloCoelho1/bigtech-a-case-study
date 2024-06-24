import { CustomError } from './customError';

export class DeleteImageError extends CustomError {
  constructor() {
    super('An Error occured during the deletion operation', 500);
  }
}