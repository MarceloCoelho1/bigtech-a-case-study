import { CustomError } from './customError';

export class ProductNotFound extends CustomError {
  constructor() {
    super('Product not found', 404);
  }
}