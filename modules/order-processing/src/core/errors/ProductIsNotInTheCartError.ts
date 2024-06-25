import { CustomError } from './customError';

export class ProductIsNotInTheCart extends CustomError {
  constructor() {
    super('The Product Is Not In The Cart', 404);
  }
}