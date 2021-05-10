import * as yup from "yup";
import getValidations from './validations';

const newPasswordValidation = () => {

  const validations = getValidations();
  return yup.object().shape({
    password: validations.password,
    confirmpassword: validations.confirmpassword,
  });
}

export default newPasswordValidation;
