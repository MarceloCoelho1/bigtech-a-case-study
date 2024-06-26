import { CustomError } from './customError';

export class InvalidDiscountCode extends CustomError {
  constructor() {
    super('Invalid Discount code', 400);
  }
}