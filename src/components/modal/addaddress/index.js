import React, { useState, useEffect, Fragment } from "react";
import "./css/index.scoped.css";
// import { Formik, Form, Field } from "formik";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  FormGroup,
  Row, Col
} from "reactstrap";
import { useSelector } from "react-redux";
import { postUpdate } from "../../../Barriers/apiHelper";
import { useHistory } from "react-router";
import commands from "../../../commands";
import * as validationSchemas from '../../../validationSchemas';
import { Formik } from 'formik';
import lang from "../../../language";
import { CgSpinner } from "react-icons/cg";

function FieldError({ error, touched }) {
  return (error && touched) ? (
    <div className="fields-active error" style={{ color: "#e65e52" }}>
      {error}
    </div>)
    : null;
}

function AddaddressModal(props) {
  const savedaddresslang = new lang("savedAddressesScreen");
  console.log(props);
  const history = useHistory();
  const [modal, setModal] = useState(true);
  const [deleteorder, SetDelete] = useState(false);
  const [name, setName] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [required, setRequired] = useState("");
  const [checkValidation, setcheckValidation] = useState(true);
  const toggle = () => setModal(!modal);
  const userData = useSelector((state) => state.logInReducer);

  const [showSpinner, setShowSpinner] = useState(false);
  const addAddress = (values) => {
    setShowSpinner(true);

    let data = {
      uuid: userData.uuid,
      address: {
        name: values.name,
        flat_no: values.houseNumber,
        address: values.addressLine1,
        address_line_2: values.addressLine2,
        zip_code: values.pincode,
        phone_number: values.phone,
        city: values.city,
        state: values.state,
        country: values.country,
        is_default: false,
      }
    };
    commands.user.addAddress(data, onAddAddressSuccess, onAddAddressFailure);

  };

  const onAddAddressSuccess = () => {
    commands.user.getAddressList(() => { props.setAddress(); setShowSpinner(false); (props.toggle ? props.toggle() : toggle()); }, () => { setShowSpinner(false); })


  }

  const onAddAddressFailure = () => {
    setShowSpinner(false);
  }

  const callMe = (value) => {
    if (value.length > 0) return true;
    else return false;
  };
  const changeFormInput = (e) => {
    let name = e.target.name;
    switch (name) {
      case "name":
        setName(e.target.value);
        return callMe(e.target.value);
      case "flatNo":
        setFlatNo(e.target.value);
        return callMe(e.target.value);
      case "address1":
        setAddress1(e.target.value);
        return callMe(e.target.value);
      case "address2":
        setAddress2(e.target.value);
        return true;
      case "city":
        setCity(e.target.value);
        return callMe(e.target.value);
      case "state":
        setState(e.target.value);
        return callMe(e.target.value);
      case "country":
        setCountry(e.target.value);
        return callMe(e.target.value);
      case "pincode":
        setPincode(e.target.value);
        return callMe(e.target.value);
      case "phone":
        setPhone(e.target.value);
        if (e.target.value.length != 10) return false;
        else return true;
      default:
        return true;
    }
  };
  useEffect(() => {
    console.log(checkValidation, "&& checkValidation");
  }, [name, required, checkValidation]);

  return (
    <div>
      <Modal isOpen={props.isOpen || modal} toggle={props.toggle || toggle} className="cm-small-modal-6">
        <ModalHeader toggle={props.toggle || toggle} className="add-addr-title-bar p-4">
          <span>
       {savedaddresslang.get("addNewAddress", "Add New Address")}</span>
        </ModalHeader>
        <ModalBody className="py-4 px-5 yt-add-modal-body">
          <div class="ad-addr-body-wrap">
            <Formik
              initialValues={{ name: "", houseNumber: "", addressLine1: "", addressLine2: "", city: "", state: "", country: "", pincode: "", phone: "" }}
              onSubmit={addAddress}
              validationSchema={validationSchemas.addAddressForm}
            >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                  <Form className="yt-fp-form">
                    <Row form className="justify-content-between">
                      <Col md={12} className="cm-edit-add-col">
                        <FormGroup>
                          <div
                            class={
                              name.length > 0 || checkValidation
                                ? "profile-form-field fields-active"
                                : "profile-form-field fields-active error"
                            }
                          >
                            <span class="profile-form-tag">
                            {savedaddresslang.get("name", "Name")}</span>
                            <Input
                              className="py-2"
                              type="text"
                              name="name"
                              id="name"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('name')}
                              value={values.name}
                            />
                          </div>
                          <FieldError error={errors.name} touched={touched.name} />
                        </FormGroup>
                      </Col>
                      <Col md={12} className="cm-edit-add-col">
                        <FormGroup>
                          <div
                            class={
                              flatNo.length > 0 || checkValidation
                                ? "profile-form-field fields-active"
                                : "profile-form-field fields-active error"
                            }
                          >
                            <span class="profile-form-tag">
                            {savedaddresslang.get("flatNumber", "Flat / House / Apartment No")}.
                  </span>
                            <Input
                              className="py-2"
                              type="text"
                              name="houseNumber"
                              id="flat"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('houseNumber')}
                              value={values.houseNumber}
                            />
                          </div>
                          <FieldError error={errors.houseNumber} touched={touched.houseNumber} />
                        </FormGroup>
                      </Col>
                    </Row>


                    <FormGroup>
                      <div
                        class={
                          address1.length > 0 || checkValidation
                            ? "profile-form-field fields-active"
                            : "profile-form-field fields-active error"
                        }
                      >
                        <span class="profile-form-tag">
                        {savedaddresslang.get("addressLine1", "Address Line 1")}</span>
                        <Input
                          className="py-2"
                          type="text"
                          name="addressLine1"
                          id="address1"
                          onChange={handleChange}
                          onBlur={() => setFieldTouched('addressLine1')}
                          value={values.addressLine1}
                        />
                      </div>
                      <FieldError error={errors.addressLine1} touched={touched.addressLine1} />
                    </FormGroup>
                    <FormGroup>
                      <div class="profile-form-field fields-active">
                        <span class="profile-form-tag">
                        {savedaddresslang.get("addressLine2", "Address Line 2")}</span>
                        <Input
                          className="py-2"
                          type="text"
                          name="addressLine2"
                          id="address2"
                          onChange={handleChange}
                          onBlur={() => setFieldTouched('addressLine2')}
                          value={values.addressLine2}
                        />
                      </div>
                      <FieldError error={errors.addressLine2} touched={touched.addressLine2} />
                    </FormGroup>
                    <FormGroup>
                      <div
                        class={
                          city.length > 0 || checkValidation
                            ? "profile-form-field fields-active"
                            : "profile-form-field fields-active error"
                        }
                      >
                        <span class="profile-form-tag">
                        {savedaddresslang.get("city", "City")}
                        </span>
                        <Input
                          className="py-2"
                          type="text"
                          name="city"
                          id="city"
                          onChange={handleChange}
                          onBlur={() => setFieldTouched('city')}
                          value={values.city}
                        />
                      </div>
                      <FieldError error={errors.city} touched={touched.city} />
                    </FormGroup>
                    <Row form className="justify-content-between">
                      <Col md={12} className="cm-edit-add-col">
                        <FormGroup>
                          <div
                            class={
                              state.length > 0 || checkValidation
                                ? "profile-form-field fields-active"
                                : "profile-form-field fields-active error"
                            }
                          >
                            <span class="profile-form-tag">
                            {savedaddresslang.get("state", "State")}</span>
                            <Input
                              className="py-2"
                              type="text"
                              name="state"
                              id="state"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('state')}
                              value={values.state}
                            />
                          </div>
                          <FieldError error={errors.state} touched={touched.state} />
                        </FormGroup>
                      </Col>
                      <Col md={12} className="cm-edit-add-col">
                        <FormGroup>
                          <div
                            class={
                              country.length > 0 || checkValidation
                                ? "profile-form-field fields-active"
                                : "profile-form-field fields-active error"
                            }
                          >
                            <span class="profile-form-tag">
                            {savedaddresslang.get("country", "Country")}</span>
                            <Input
                              className="py-2"
                              type="text"
                              name="country"
                              id="country"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('country')}
                              value={values.country}
                            />
                          </div>
                          <FieldError error={errors.country} touched={touched.country} />
                        </FormGroup>
                      </Col>
                      <Col md={12} className="cm-edit-add-col">
                        <FormGroup className="yt-number-filed">
                          <div
                            class={
                              pincode.length > 0 || checkValidation
                                ? "profile-form-field fields-active"
                                : "profile-form-field fields-active error"
                            }
                          >
                            <span class="profile-form-tag">
                            {savedaddresslang.get("pinCode", "Pin Code")}</span>
                            <Input
                              className="py-2 "
                              type="number"
                              name="pincode"
                              id="pincode"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('pincode')}
                              value={values.pincode}
                            />
                          </div>
                          <FieldError error={errors.pincode} touched={touched.pincode} />
                        </FormGroup>
                      </Col>
                      <Col md={12} className="cm-edit-add-col">
                        <FormGroup className="yt-number-filed">
                          <div
                            class={
                              phone.length > 0 || checkValidation
                                ? "profile-form-field fields-active"
                                : "profile-form-field fields-active error"
                            }
                          >
                            <span class="profile-form-tag">
                            {savedaddresslang.get("phoneNumber", "Phone No")}</span>
                            <Input
                              className="py-2"
                              type="number"
                              name="phone"
                              id="phone"
                              onChange={handleChange}
                              onBlur={() => setFieldTouched('phone')}
                              value={values.phone}
                            />
                          </div>
                          <FieldError error={errors.phone} touched={touched.phone} />
                        </FormGroup>
                      </Col>
                    </Row>
                    {showSpinner ?
                      <CgSpinner style={{ color: "black", fontSize: 32, width: "100%", margin: 10 }} class="w3-spin" />
                      :
                      <Button
                        color="secondary add-addr-btn py-3"
                        onClick={handleSubmit}
                        block
                      >
                        {savedaddresslang.get("saveAddress", "Save Address")}
                      </Button>
                    }
                  </Form>
                </Fragment>
              )}
            </Formik>
          </div>
        </ModalBody>
      </Modal >
    </div >
  );
}

export default AddaddressModal;
{
  /* <FormGroup className="yt-number-filed">
<div class="profile-form-field fields-active error">
  <span class="profile-form-tag">Pin Code</span>
  <Input
    className="py-2 "
    type="number"
    name="phoneno"
    id="phoneno"
  />
</div>
</FormGroup> */
}
