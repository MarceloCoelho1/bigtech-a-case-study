import { CustomError } from './CustomError';

export class EmailNotSent extends CustomError {
  constructor() {
    super('Email not sent', 550);
  }
}