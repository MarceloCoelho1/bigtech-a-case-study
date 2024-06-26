import { CustomError } from './customError';

export class CartIsEmpty extends CustomError {
  constructor() {
    super('Cart is empty', 404);
  }
}