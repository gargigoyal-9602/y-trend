import * as yup from "yup";
import validations from "./validations";

export const otpValidation = yup.object().shape({
  otp: validations.otp,
});
