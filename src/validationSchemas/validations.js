import * as yup from 'yup';
import lang from "../language";

export default function validation(){
    let addressLang = new lang("validationErrors");
 
    return ({
    email: yup
        .string()
        .email(addressLang.get("emailEmpty", "Please enter a valid email address."))
        .required(addressLang.get("emailRequired","Email is required.")),
    password: yup
        .string()
        .min(8, addressLang.get("minPassword","Minimum Password length is 8."))
        .max(16, addressLang.get("maxPassword","Maximum Password length is 16"))
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, addressLang.get("passLetterSpecial","Password must contain atleast a capital letter, a lowercase letter, a number and a special character."))
        .required(addressLang.get("passwordRequired","Password is required.")),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], addressLang.get("passwordMatch","Passwords must match"))
        .required(addressLang.get("passwordRequired","Password is required.")),
    currentpassword: yup
        .string()
        .required(addressLang.get("passwordRequired","Password is required.")),
    mobile: yup
        .number()
        .typeError(addressLang.get("onlyNumber","Only numbers are allowed."))
        .required(addressLang.get("mobileRequired","Mobile number is required."))
        .positive(addressLang.get("negativeNumNotAllow","Negative numbers are not allowed."))
        .integer(addressLang.get("notDecimal","Number can't contain a decimal."))
        .min(10000000, addressLang.get("min10Digits","Minimum 5 digits are required."))
        .max(9999999999999, addressLang.get("max10Digits","Maximum 11 digits are allowed.")),
    otp: yup
        .number()
        .typeError(addressLang.get("onlyNumber", "Only numbers are allowed."))
        .required(addressLang.get("otpRequired", "OTP is required."))
        .positive(addressLang.get("negativeNumNotAllow", "Negative numbers are not allowed."))
        .integer(addressLang.get("notDecimal", "Number can't contain a decimal."))
        .min(100000, addressLang.get("min6Digits", "Minimum 6 digits are required."))
        .max(999999,  addressLang.get("max6Digits", "Maximum 6 digits are allowed.")),
    accountNumber: yup
        .number()
        .typeError(addressLang.get("onlyNumber","Only numbers are allowed."))
        .required(addressLang.get("AccountRequired","Account number is required."))
        .positive(addressLang.get("negativeNumNotAllow","Negative numbers are not allowed."))
        .integer(addressLang.get("notDecimal","Number can't contain a decimal."))
        .min(100000,addressLang.get("min6Digits", "Minimum 6 digits are required."))
        .max(999999999999,addressLang.get("max12Digits", "Maximum 12 digits are allowed.")),
    name: yup
        .string()
        .min(3, addressLang.get("minThree", "Minimum 3 characters are required"))
        .max(20, addressLang.get("max20", "Maximum 20 characters are allowed."))
        .matches(/^[a-zA-Z ]+$/, addressLang.get("onlyLetter","Only letters are allowed.")),
    houseNumber: yup
        .string(),
    address: yup
        .string(),
    city: yup
        .string(),
    state: yup
        .string(),
    country: yup
        .string(),
    pincode: yup
        .number()
        .typeError(addressLang.get("onlyNumber", "Only numbers are allowed."))
        .positive(addressLang.get("negativeNumNotAllow", "Negative numbers are not allowed."))
        .integer(addressLang.get("pinNotDecimal", "Pincode can't contain a decimal."))
        .min(10000,addressLang.get("minFiveDigit", "Minimum 5 digits are required."))
        .max(99999, addressLang.get("maxFiveDigit","Maximum 5 digits are allowed.")),
    phone: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .typeError(addressLang.get("onlyNumber","Only numbers are allowed."))
        .positive(addressLang.get("negativeNumNotAllow","Negative numbers are not allowed."))
        .integer(addressLang.get("phoneNotDecimal","Phone can't contain a decimal."))
        .min(10000000, addressLang.get("min10Digits","Minimum 5 digits are required."))
        .max(9999999999999, addressLang.get("max10Digits","Maximum 11 digits are allowed.")),

    description: yup
        .string()
        .typeError(addressLang.get("messageRequired","Message is required.."))
        .test('len', addressLang.get("min30Characters","Minimum 30 characters are required."), val => val?.length > 29),
    subject: yup
        .string(),
    comment:yup
          .string()
          .typeError(addressLang.get("commentRequired", "Comment is required.")),
    rating: yup
            .number()
            .required(addressLang.get("ratingRequired", "Rating is required."))      
         
})}