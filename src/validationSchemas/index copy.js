import * as yup from 'yup';
import validations from './validations';

export const addressForm = yup.object().shape({
    saveBillingAddress: yup.boolean(),
    saveShippingAddress: yup.boolean(),

    bname: validations.name.required("Name is required."),
    bhouseNumber: validations.houseNumber.required("Can't be left blank."),
    baddressLine1: validations.address.required("Address is required."),
    baddressLine2: validations.address,
    bcity: validations.city.required("City is required."),
    bstate: validations.state.required("State is required."),
    bcountry: validations.country.required("Country is required."),
    bpincode: validations.pincode.required("Pincode is required."),
    bphone: validations.phone.required("Phone is Required."),

    isShippingAddressSame: yup.boolean(),

    sname: validations.name
        .when("isShippingAddressSame", {
            is: true,
            then: yup.string().notRequired(),
            otherwise: yup.string().required()
        }),
    shouseNumber: validations.houseNumber
        .when("isShippingAddressSame", {
            is: true,
            then: yup.string().notRequired(),
            otherwise: yup.string().required()
        }),
    saddressLine1: validations.address
        .when("isShippingAddressSame", {
            is: true,
            then: yup.string().notRequired(),
            otherwise: yup.string().required()
        }),
    saddressLine2: validations.address.notRequired()
        .when("isShippingAddressSame", {
            is: true,
            then: yup.string().notRequired(),
            otherwise: yup.string().required()
        }),
    scity: validations.city
        .when("isShippingAddressSame", {
            is: true,
            then: yup.string().notRequired(),
            otherwise: yup.string().required()
        }),
    sstate: validations.state
        .when("isShippingAddressSame", {
            is: true,
            then: yup.string().notRequired(),
            otherwise: yup.string().required()
        }),
    scountry: validations.country
        .when("isShippingAddressSame", {
            is: true,
            then: yup.string().notRequired(),
            otherwise: yup.string().required()
        }),
    spincode: validations.pincode
        .when("isShippingAddressSame", {
            is: true,
            then: yup.number().notRequired(),
            otherwise: yup.number().required()
        }),
    sphone: validations.phone
        .when("isShippingAddressSame", {
            is: true,
            then: yup.number().notRequired(),
            otherwise: yup.number().required()
        }),
});


export const contactForm = yup.object().shape({
    name: validations.name.required("Name is required."),
    email: validations.email.required("Email is required."),
    phone: validations.phone.required("Phone number is required."),
    purpose: validations.subject.notRequired(),
    message: validations.description.required("Message is required.")
});