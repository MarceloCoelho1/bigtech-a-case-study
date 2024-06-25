import { CustomError } from './customError';

export class ProductNotFound extends CustomError {
  constructor() {
    super('Product Not Found', 404);
  }
}