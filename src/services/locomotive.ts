import { NextFunction, Request, Response } from "express";
import { produceMessage } from "@/libs/kafka";

const produceLocomotive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = JSON.stringify(req.body);
    await produceMessage(message);

    res.status(200).json({
      data: null,
      message: "Success sending locomotive data to kafka"
    });
  } catch (error) {
    next(error);
  }
};

export { produceLocomotive };
