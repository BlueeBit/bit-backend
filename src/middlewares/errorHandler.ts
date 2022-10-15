import { NextFunction, Request, Response } from "express"
import logger from "../log/logger"
import { ApiError, InternalError } from "../config/ApiError"

export const errorHandler = (
  err: Error,
  _res: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error("", err)
  const error: ApiError = err instanceof ApiError ? err : new InternalError()

  ApiError.handle(error, res)
}
