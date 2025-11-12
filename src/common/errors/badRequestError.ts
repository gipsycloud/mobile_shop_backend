import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  generateErrorResponse() {
    return [{
      status: this.statusCode,
      message: this.message,
    }];
  }
}