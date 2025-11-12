import { CustomError } from "./customError";

interface ValidationErrorDetail {
  message: string;
  field: string;
}

export class validationError extends CustomError {
  statusCode: number;

  constructor(public details: ValidationErrorDetail[]) {
    super("Validation Error");
    this.statusCode = 422;
    Object.setPrototypeOf(this, validationError.prototype);
  }

  generateErrorResponse() {
    return this.details.map(detail => ({
      status: this.statusCode,
      message: detail.message,
      field: detail.field,
    }));
  }
}