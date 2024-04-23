import express from "express";
import { produceLocomotive } from "@/services/locomotive";
import { validate } from "@/middlewares/validation";
import { validateLocomotive } from "@/middlewares/validator/locomotive";

const router = express.Router();

router.post("/produce", validateLocomotive, validate, produceLocomotive);

export default router;
