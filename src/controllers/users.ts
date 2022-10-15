import jwt from "jsonwebtoken"
import UsersDAO from "../dao/usersDAO"
import {
  setTokenCookies,
  generateAccessToken,
  generateRefreshToken,
} from "../lib/jwt"
import { UserRegister } from "../types/users"
import { injectEmailId } from "../lib/general"
import { ErrorType } from "../constants/ApiError"
import { REFRESH_TOKEN_SECRET } from "../constants/jwt"
import { NextFunction, Request, Response } from "express"
import { SuccessMsgResponse } from "../config/ApiResponse"
import { loginSchema, registerSchema } from "..//constants/users/users"
import {
  NoEntryError,
  BadTokenError,
  InternalError,
  BadRequestError,
  TokenExpiredError,
} from "../config/ApiError"

export default class UsersController {
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    req.body.tenantId = injectEmailId(req.body.email)

    try {
      await registerSchema.validate(req.body)
    } catch (error) {
      return next(new BadRequestError())
    }

    try {
      req.body.createdAt = new Date()
      await UsersDAO.register(req.body)
    } catch (error) {
      return next(error)
    }

    return new SuccessMsgResponse("User is registered Successfully").send(res)
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      await loginSchema.validate(req.body)
    } catch (error) {
      return next(new BadRequestError())
    }

    let user: UserRegister | null
    try {
      user = await UsersDAO.findUser(req.body.email)
    } catch (error) {
      return next(error)
    }

    if (user === null) {
      return next(
        new NoEntryError(`Couldn't find user with email: ${req.body.email}`)
      )
    }

    if (req.body.password !== user.password) {
      return next(new BadRequestError("Wrong password entered"))
    }

    try {
      const tenantId: string = injectEmailId(user.email)
      const accessToken = generateAccessToken({ email: user.email, tenantId })
      const refreshToken = generateRefreshToken({ email: user.email, tenantId })
      setTokenCookies("accessToken", accessToken, res)
      setTokenCookies("refreshToken", refreshToken, res)
    } catch (error) {
      return next(
        new InternalError("Couldn't generate the tokens from cookies")
      )
    }

    return new SuccessMsgResponse("Logged in Successfully").send(res)
  }

  public static async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const refreshToken: string = req.cookies.refreshToken
    try {
      req.body.user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    } catch (error: any) {
      if (error.name === ErrorType.TOKEN_EXPIRED) {
        return next(new TokenExpiredError("The refresh token is expired"))
      }
      return next(new BadTokenError("The refresh token is invalid"))
    }

    try {
      const accessToken = generateAccessToken(req.body.user)
      setTokenCookies("accessToken", accessToken, res)
    } catch (error) {
      return next(new InternalError("Couldn't generate the refresh token"))
    }

    return new SuccessMsgResponse("Token Refreshed Successfully").send(res)
  }

  public static async logout(_: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("accessToken")
      res.clearCookie("refreshToken")
    } catch (error) {
      return next(new InternalError("Couldn't remove the tokens from cookies"))
    }

    return new SuccessMsgResponse("Logged out Successfully").send(res)
  }
}
