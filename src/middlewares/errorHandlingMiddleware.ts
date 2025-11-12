import { NextFunction, Request, Response } from "express";
import { CustomError } from "../common/errors";

export const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.generateErrorResponse() });
  }
};