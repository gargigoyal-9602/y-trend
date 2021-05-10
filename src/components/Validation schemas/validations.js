import * as yup from "yup";
import lang from "../../language";

export default function validation() {
  
  let loginlang = new lang("validationErrors");
  return ({
  name: yup
    .string()
    .min(3, loginlang.get("charAtLeast","Name should be atleast 3 characters."))
    .max(15,  loginlang.get("maxLetterLimit","Max 16 characters are allowed."))
    .matches(/^[a-zA-Z ]+$/, loginlang.get("onlyLetter","Only letters are allowed."))
    .required(loginlang.get("nameRequired","Name is required.")),
  email: yup
    .string()
    .email(loginlang.get("emailEmpty", "Please enter a valid email address."))
    .required(loginlang.get("emailRequired", "Email is required.")),
  password: yup
    .string()
    .min(8, loginlang.get("minPassword","Minimum Password length is 8."))
    .max(16, loginlang.get("maxPassword", "Maximum Password length is 16"))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, loginlang.get("passLetterSpecial", "Password must contain atleast a capital letter, a lowercase letter, a number and a special character."))
    .required(loginlang.get("passwordRequired", "Password is required.")),
  confirmpassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null], loginlang.get("passwordMatch","Passwords must match"))
    .required(loginlang.get("confirmPassword","Confirm Password is required")),
  password1: yup
    .string()
    .min(8)
    .required(),
  otp: yup
    .number()
    .typeError(loginlang.get("onlyNumber","Only numbers are allowed."))
    .required(loginlang.get("otpRequired","OTP is required."))
    .positive(loginlang.get("negativeNumNotAllow","Negative numbers are not allowed."))
    .integer(loginlang.get("notDecimal","Number can't contain a decimal."))
    .min(10000, loginlang.get("minFiveDigit","Minimum 5 digits are required."))
    .max(99999, loginlang.get("maxFiveDigit","Maximum 5 digits are allowed.")),
  
})};
