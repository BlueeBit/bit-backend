import { SLASH_REGEX } from "../constants/regex"

export const getToday = (): string => {
  return new Date().toLocaleDateString().replace(SLASH_REGEX, "-")
}
