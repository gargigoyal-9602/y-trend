import * as yup from "yup";
import validations from "./validations";

const changePasswordValidation = yup.object().shape({
  currentPassword:validations.password1,
  password: validations.password,
  confirmpassword: validations.confirmpassword,
});

export default changePasswordValidation;
