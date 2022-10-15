import * as yup from "yup"
import {
  NUMBERS_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  LOWER_CASE_CHARACTERS_REGEX,
  UPPER_CASE_CHARACTERS_REGEX,
} from "../regex"

const NAME_MIN_LENGTH = 3
const PASSWORD_MIN_LENGTH = 8

export const basicNameValidation = yup
  .string()
  .min(NAME_MIN_LENGTH)
  .matches(UPPER_CASE_CHARACTERS_REGEX)
  .matches(LOWER_CASE_CHARACTERS_REGEX)

export const registerSchema = yup.object().shape({
  firstName: basicNameValidation.required(),
  middleName: basicNameValidation.required(),
  lastName: basicNameValidation.required(),
  organizationName: basicNameValidation.required(),
  tenantId: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .matches(SPECIAL_CHARACTERS_REGEX)
    .matches(NUMBERS_REGEX)
    .matches(UPPER_CASE_CHARACTERS_REGEX)
    .matches(LOWER_CASE_CHARACTERS_REGEX)
    .required(),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .matches(SPECIAL_CHARACTERS_REGEX)
    .matches(NUMBERS_REGEX)
    .matches(UPPER_CASE_CHARACTERS_REGEX)
    .matches(LOWER_CASE_CHARACTERS_REGEX)
    .required(),
})
