/* src/middlewares/errorHandler.ts */

import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    body: req.body,
  });

  return res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
}
