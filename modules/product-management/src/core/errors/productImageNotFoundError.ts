import { CustomError } from './customError';

export class ProductImageNotFound extends CustomError {
  constructor() {
    super('Product image not found', 404);
  }
}