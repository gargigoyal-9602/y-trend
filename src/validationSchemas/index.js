import * as yup from 'yup';
import getValidations from './validations';
import lang from "../language";

export function addressForm() {
    let addressLang = new lang("validationErrors");

    const validations = getValidations();
    return yup.object().shape({
        saveBillingAddress: yup.boolean(),
        saveShippingAddress: yup.boolean(),
        bname: validations.name.required(addressLang.get("nameRequired", "Name is required.")),
        bhouseNumber: validations.houseNumber.required(addressLang.get("canntBlank", "Can't be left blank.")),
        baddressLine1: validations.address.required(addressLang.get("addressRequired", "Address is required.")),
        baddressLine2: validations.address.notRequired(),
        bcity: validations.city.required(addressLang.get("cityRequired", "City is required.")).test('len', addressLang.get("minThree", "Minimum 3 characters are required."), val => val?.length > 2),
        bstate: validations.state.required(addressLang.get("stateRequired", "State is required.")).test('len', addressLang.get("minThree", "Minimum 3 characters are required."), val => val?.length > 2),
        bcountry: validations.country.required(addressLang.get("countryRequired", "Country is required.")).test('len', addressLang.get("minThree", "Minimum 3 characters are required."), val => val?.length > 2),
        bpincode: validations.pincode.required(addressLang.get("pinCode", "Pincode is required.")),
        bphone: validations.phone.required(addressLang.get("phoneRequired", "Phone is Required.")),
        isShippingAddressSame: yup.boolean(),

        sname: validations.name
            .when("isShippingAddressSame", {
                is: true,
                then: yup.string().notRequired(),
                otherwise: yup.string().required(addressLang.get("nameRequired", "Name is required."))
            }),
        shouseNumber: validations.houseNumber
            .when("isShippingAddressSame", {
                is: true,
                then: yup.string().notRequired(),
                otherwise: yup.string().required(addressLang.get("canntBlank", "Can't be left blank."))
            }),
        saddressLine1: validations.address
            .when("isShippingAddressSame", {
                is: true,
                then: yup.string().notRequired(),
                otherwise: yup.string().required(addressLang.get("addressRequired", "Address is required."))
            }),
        saddressLine2: validations.address.notRequired(),
        scity: validations.city
            .when("isShippingAddressSame", {
                is: true,
                then: yup.string().notRequired(),
                otherwise: yup.string().required(addressLang.get("cityRequired", "City is required."))
                    .test('len', addressLang.get("minThree", "Minimum 3 characters are required."), val => val?.length > 2)
            }),
        sstate: validations.state
            .when("isShippingAddressSame", {
                is: true,
                then: yup.string().notRequired(),
                otherwise: yup.string().required(addressLang.get("stateRequired", "State is required."))
                    .test('len', addressLang.get("minThree", "Minimum 3 characters are required."), val => val?.length > 2)
            }),
        scountry: validations.country
            .when("isShippingAddressSame", {
                is: true,
                then: yup.string().notRequired(),
                otherwise: yup.string()
                    .test('len', addressLang.get("minThree", "Minimum 3 characters are required."), val => val?.length > 2).required(addressLang.get("countryRequired", "Country is required."))
            }),
        spincode: validations.pincode
            .when("isShippingAddressSame", {
                is: true,
                then: yup.number().notRequired(),
                otherwise: yup.number().required(addressLang.get("pinCode", "Pincode is required."))
            }),
        sphone: validations.phone
            .when("isShippingAddressSame", {
                is: true,
                then: yup.number().notRequired(),
                otherwise: yup.number().required(addressLang.get("phoneRequired", "Phone is Required."))
            }),
    });
}

export function contactForm() {
    let addressLang = new lang("validationErrors");
    const validations = getValidations();
    return yup.object().shape({
        name: validations.name.required(addressLang.get("nameRequired", "Name is required.")),
        email: validations.email.required(addressLang.get("emailRequired", "Email is required.")),
        phone: validations.phone.required(addressLang.get("phoneRequired", "Phone is required.")),
        title: validations.subject.required(addressLang.get("purposeRequired", "Purpose is required.")),
        message: yup.string().typeError(addressLang.get("messageRequired", "Message is required..")).required(addressLang.get("messageRequired", "Message is required.."))
    });
}
export function productRateForm() {
    let addressLang = new lang("validationErrors");
    const validations = getValidations();
    return yup.object().shape({
        rating: validations.rating,
        comment: validations.comment.required(addressLang.get("commentRequired", "Comment is required."))
    });
}

export function editProfileForm() {
    let addressLang = new lang("validationErrors");
    const validations = getValidations();
    return yup.object().shape({
        name: validations.name.required(addressLang.get("nameRequired", "Name is required.")),
        email: validations.email.required(addressLang.get("emailRequired", "Email is required.")),
        phoneno: validations.phone.notRequired() //.required(addressLang.get("phoneRequired", "Phone is required."))
    });
}

export function changePasswordForm() {
    const validations = getValidations();
    return yup.object().shape({
        currentpassword: validations.currentpassword,
        password: validations.password,
        confirmpassword: validations.confirmpassword
    });
}

export function addAddressForm() {
    let addressLang = new lang("validationErrors");
    const validations = getValidations();
    return yup.object().shape({
        name: validations.name.required(addressLang.get("nameRequired", "Name is required.")),
        houseNumber: validations.houseNumber.required(addressLang.get("canntBlank", "Can't be left blank.")),
        addressLine1: validations.address.required(addressLang.get("addressRequired", "Address is required.")),
        addressLine2: validations.address.notRequired(),
        city: validations.city.required(addressLang.get("cityRequired", "City is required.")).test('len', "Minimum 3 characters are required.", val => val?.length > 2),
        state: validations.state.required(addressLang.get("stateRequired", "State is required.")).test('len', "Minimum 3 characters are required.", val => val?.length > 2),
        country: validations.country.required(addressLang.get("countryRequired", "Country is required.")).test('len', "Minimum 3 characters are required.", val => val?.length > 2),
        pincode: validations.pincode.required(addressLang.get("pinCode", "Pincode is required.")),
        phone: validations.phone.required(addressLang.get("phoneRequired", "Phone is required."))
    });
}
