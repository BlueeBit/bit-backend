import { Response } from "express"
import { environment } from "./config"
import { ErrorType } from "../constants/ApiError"
import {
  AuthFailureResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
  ApiResponse,
  AccessTokenErrorResponse,
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

  public static errorResponseConstructor(err: ApiError): ApiResponse {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message, err.traceId)
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message, err.traceId)
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message, err.traceId)
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message, err.traceId)
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message, err.traceId)
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message, err.traceId)
      default: {
        let message = err.message
        // Do not send failure message in production as it may send sensitive data
        if (environment === "production") message = "Something wrong happened."
        return new InternalErrorResponse(message, err.traceId)
      }
    }
  }

  public static handle(err: ApiError, res: Response): Response {
    return this.errorResponseConstructor(err).send(res)
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

export class AccessTokenError extends ApiError {
  constructor(message = "Invalid access token") {
    super(ErrorType.ACCESS_TOKEN, message)
  }
}

export class BadTokenError extends ApiError {
  constructor(message = "Token is not valid") {
    super(ErrorType.BAD_TOKEN, message)
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message = "Token is expired") {
    super(ErrorType.TOKEN_EXPIRED, message)
  }
}
