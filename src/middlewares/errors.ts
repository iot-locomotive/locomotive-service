import { NextFunction, Request, Response } from "express";
import { CustomError } from "@/errors/CustomError";
import Logger from "@/libs/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    const { statusCode, errors, logging, stack, message } = err;
    if (logging) {
      Logger.error(
        JSON.stringify(
          {
            code: statusCode,
            errors,
            stack: stack
          },
          null,
          2
        )
      );
    }

    return res.status(statusCode).json({
      status: "Error",
      error: errors
    });
  }

  Logger.error(JSON.stringify(err, null, 2));
  return res.status(500).json({
    status: "Error",
    error: [
      {
        message: err.message,
        context: {}
      }
    ]
  });
};
