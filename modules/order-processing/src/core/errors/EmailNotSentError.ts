import { CustomError } from "./customError";

export class EmailNotSent extends CustomError {
  constructor() {
    super('Email not sent', 550);
  }
}