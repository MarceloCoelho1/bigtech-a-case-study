import { CustomError } from './customError';

export class ProductOutOfStock extends CustomError {
  constructor() {
    super('Product out of stock', 404);
  }
}