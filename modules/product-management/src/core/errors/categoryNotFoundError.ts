import { CustomError } from './customError';

export class CategoryNotFound extends CustomError {
  constructor() {
    super('Category not found', 404);
  }
}