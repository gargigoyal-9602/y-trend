import * as yup from 'yup';
import lang from "../../language";
import getValidations from './validations';

export default function getLoginValidation() {
    const loginlang = new lang("loginScreen");
    const validations = getValidations();
    let emaillang = new lang("validationErrors");
    return yup.object().shape({
        userEmail: validations.email /*yup
            .string()
            .required(emaillang.get("emailRequired", "Email is required."))*/,
        password: validations.password /* yup
            .string()
            .required(loginlang.get("passwordRequiredError", "Password is required."))*/
    });
}
