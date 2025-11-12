import { CustomError } from "./customError";

export class UnauthorizedError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  generateErrorResponse() {
    return [{
      status: this.statusCode,
      message: this.message,
    }];
  }
}