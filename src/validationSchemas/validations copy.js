import * as yup from 'yup';

export default {
    email: yup
        .string()
        .email("Please enter a valid email address.")
        .required("Email is required."),
    password: yup
        .string()
        .min(8, "Minimum Password length is 8.")
        .max(16, "Maximum Password length is 16")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must contain atleast a letter, a number and a special character.")
        .required("Password is required."),
    mobile: yup
        .number()
        .typeError("Only numbers are allowed.")
        .required("Mobile number is required.")
        .positive("Negative numbers are not allowed.")
        .integer("Number can't contain a decimal.")
        .min(10000000, addressLang.get("min10Digits","Minimum 5 digits are required."))
        .max(9999999999999, addressLang.get("max10Digits","Maximum 11 digits are allowed.")),
    otp: yup
        .number()
        .typeError("Only numbers are allowed.")
        .required("OTP is required.")
        .positive("Negative numbers are not allowed.")
        .integer("Number can't contain a decimal.")
        .min(100000, "Minimum 6 digits are required.")
        .max(999999, "Maximum 6 digits are allowed."),
    accountNumber: yup
        .number()
        .typeError("Only numbers are allowed.")
        .required("Account number is required.")
        .positive("Negative numbers are not allowed.")
        .integer("Number can't contain a decimal.")
        .min(100000, "Minimum 6 digits are required.")
        .max(999999999999, "Maximum 12 digits are allowed."),
    name: yup
        .string()
        .min(3, "Minimum 3 characters are required")
        .max(20, "Maximum 20 characters are allowed.")
        .matches(/^[a-zA-Z ]+$/, "Only letters are allowed."),
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
        .typeError("Only numbers are allowed.")
        .positive("Negative numbers are not allowed.")
        .integer("Pincode can't contain a decimal.")
        .min(10000, "Minimum 5 digits are required.")
        .max(99999, "Maximum 5 digits are allowed."),
    phone: yup
        .number()
        .typeError("Only numbers are allowed.")
        .positive("Negative numbers are not allowed.")
        .integer("Phone can't contain a decimal.")
        .min(10000000, addressLang.get("min10Digits","Minimum 5 digits are required."))
        .max(9999999999999, addressLang.get("max10Digits","Maximum 11 digits are allowed.")),


    description: yup
        .string()
        .typeError("Message is required."),
    subject: yup
        .string()
}