import { CustomError } from './customError';

export class ReviewNotFound extends CustomError {
  constructor() {
    super('Review not found!', 404);
  }
}