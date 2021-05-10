import * as yup from 'yup';
import getValidations from './validations';

export default function signUpValidation(){ 
    const validations=getValidations();
 return yup.object().shape({
    FullName:validations.name,
    Email: validations.email,
    password: validations.password
})
}