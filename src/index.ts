import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "@/middlewares/errors";
import logMiddleware from "@/middlewares/log";
import locomotiveRouter from "@/routes/locomotive";
import { consumeMessage } from "@/libs/kafka";
import { connectToDatabase } from "@/libs/db";
import Logger from "@/libs/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logMiddleware);

app.use(express.json());

app.use("/api/v1/locomotive", locomotiveRouter);

app.use(errorHandler);

const init = async () => {
  try {
    await connectToDatabase();
    consumeMessage();
    app.listen(port, () => {
      Logger.info(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
