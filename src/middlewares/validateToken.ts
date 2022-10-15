import jwt from "jsonwebtoken"
import { getAccessToken } from "../lib/jwt"
import { AuthFailureError } from "../config/ApiError"
import { NextFunction, Response, Request } from "express"
import { ACCESS_TOKEN_SECRET, jwtSchema } from "../constants/jwt"

export const validateToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorization: string | undefined = req.headers.authorization

  try {
    jwtSchema.validateSync(authorization)
  } catch (error) {
    return next(
      new AuthFailureError("The request doesn't contain an auth token")
    )
  }

  const accessToken: string = getAccessToken(authorization)

  try {
    req.body.user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
    return next()
  } catch (error) {
    return next(new AuthFailureError("Couldn't verify the access token"))
  }
}
