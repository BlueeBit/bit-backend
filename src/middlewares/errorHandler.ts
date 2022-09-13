import { NextFunction, Request, Response } from "express"
import logger from "../log/logger"
import { ApiError, InternalError } from "../config/ApiError"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  logger.error("", err)
  if (err instanceof ApiError) {
    ApiError.handle(err, res)
  } else {
    ApiError.handle(new InternalError(), res)
  }
}
