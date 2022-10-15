import * as yup from "yup"

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || ""
export const REFRESH_TOKEN_SECRET: string =
  process.env.REFRESH_TOKEN_SECRET || ""

export const ACCESS_TOKEN_VALIDITY_DAY =
  Number(process.env.ACCESS_TOKEN_VALIDITY_DAY) || 0
export const REFRESH_TOKEN_VALIDITY_DAY =
  Number(process.env.REFRESH_TOKEN_VALIDITY_DAY) || 0

export const jwtSchema = yup
  .string()
  .test("has-bearer", "Jwt doesn't have Bearer preifx", (value) =>
    Boolean(value?.startsWith("Bearer "))
  )
  .test("has-jwt", "Jwt doesn't have token", (value) =>
    Boolean(value?.split(" ")[1])
  )
