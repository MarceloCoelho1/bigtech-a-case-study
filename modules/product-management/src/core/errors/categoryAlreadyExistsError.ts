import { CustomError } from './customError';

export class CategoryAlreadyExists extends CustomError {
  constructor() {
    super('Category already exists', 403);
  }
}