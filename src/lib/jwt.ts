import { Response } from "express"
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_VALIDITY_DAY,
  REFRESH_TOKEN_VALIDITY_DAY,
} from "../constants/jwt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthFailureError } from "../config/ApiError"

export const getAccessToken = (authorization: string | undefined): string => {
  if (typeof authorization !== "string") {
    throw new AuthFailureError("Authorization header not found")
  }

  const accessToken = authorization.split(" ")[1]

  if (typeof accessToken !== "string") {
    throw new AuthFailureError("Access token not found")
  }

  return accessToken
}

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: `${ACCESS_TOKEN_VALIDITY_DAY}h`,
  })
}

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: `${REFRESH_TOKEN_VALIDITY_DAY}h`,
  })
}

export const setTokenCookies = (
  name: string,
  token: string,
  res: Response
): void => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: true,
  })
}
