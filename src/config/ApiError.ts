import { Response } from "express"
import { environment } from "./config"
import { ErrorType } from "../constants/ApiError"
import {
  AuthFailureResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
} from "./ApiResponse"
import { v4 as uuid } from "uuid"

export abstract class ApiError extends Error {
  public traceId: string
  constructor(
    public type: ErrorType,
    public override message: string = "error"
  ) {
    super(type)
    this.traceId = uuid()
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message, err.traceId).send(res)
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message, err.traceId).send(res)
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message, err.traceId).send(res)
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message, err.traceId).send(res)
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message, err.traceId).send(res)
      default: {
        let message = err.message
        // Do not send failure message in production as it may send sensitive data
        if (environment === "production") message = "Something wrong happened."
        return new InternalErrorResponse(message, err.traceId).send(res)
      }
    }
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials") {
    super(ErrorType.UNAUTHORIZED, message)
  }
}

export class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(ErrorType.INTERNAL, message)
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(ErrorType.BAD_REQUEST, message)
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Permission denied") {
    super(ErrorType.FORBIDDEN, message)
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message)
  }
}

export class NoDataError extends ApiError {
  constructor(message = "No data available") {
    super(ErrorType.NO_DATA, message)
  }
}
