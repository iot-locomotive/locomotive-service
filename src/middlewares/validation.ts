import ErrorConstructor from "@/errors/ErrorConstructor";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const objectSchema: ObjectSchema = res.locals.validationObjectSchema;
  const { error, value } = objectSchema.validate(req.body);
  if (!error) {
    return next();
  }

  const customError = new ErrorConstructor({ code: 400, message: error.message, logging: true });
  next(customError);
};
