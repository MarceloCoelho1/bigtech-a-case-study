import { CustomError } from './customError';

export class ReviewInvalidRatingRange extends CustomError {
  constructor() {
    super('Review invalid rating range!', 400);
  }
}