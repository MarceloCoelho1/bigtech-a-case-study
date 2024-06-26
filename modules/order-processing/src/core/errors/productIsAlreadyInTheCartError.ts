import { CustomError } from './customError';

export class ProductIsAlreadyInTheCart extends CustomError {
  constructor() {
    super('Product is already in the cart', 400);
  }
}