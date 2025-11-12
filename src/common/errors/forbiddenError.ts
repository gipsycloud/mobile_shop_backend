import { CustomError } from "./customError";

export class ForbiddenError extends CustomError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  generateErrorResponse() {
    return [{
      status: this.statusCode,
      message: this.message,
    }];
  }
}