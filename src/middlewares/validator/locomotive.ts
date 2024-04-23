import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const LocomotiveSchema = Joi.object({
  locomotiveCode: Joi.string().required(),
  locomotiveName: Joi.string().required(),
  locomotiveDimension: Joi.string().required(),
  status: Joi.number().required(),
  time: Joi.date().required()
});

export const validateLocomotive = (req: Request, res: Response, next: NextFunction) => {
  res.locals.validationObjectSchema = LocomotiveSchema;
  next();
};
