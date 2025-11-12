import { CustomError } from "./customError";

export class ServerError extends CustomError {
  statusCode = 500;

  constructor(public message: string = 'Internal Server Error') {
    super(message);

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  generateErrorResponse() {
    return [{
      status: this.statusCode,
      message: this.message
    }];
  }
}