import React, { useState, useEffect, Fragment } from "react";
import "./css/index.scoped.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
import lang from "../../../language";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import commands from "../../../commands";
import * as validationSchemas from '../../../validationSchemas';
import { Formik } from 'formik';


function FieldError({ error, touched }) {
  return (error && touched) ? (
    <div className="fields-active error" style={{ color: "#e65e52" }}>
      {error}
    </div>)
    : null;
}

function EditaddressModal(props) {
  const editaddresslang = new lang("addNewAddressScreen");
  const history = useHistory();

  const [modal, setModal] = useState(true);
  const [deleteorder, SetDelete] = useState(false);
  const [name, setName] = useState(props.record.name);
  const [flatNo, setFlatNo] = useState(props.record.flat_no);
  const [address1, setAddress1] = useState(props.record.address);
  const [address2, setAddress2] = useState(props.record.address_line_2);
  const [city, setCity] = useState(props.record.city);
  const [state, setState] = useState(props.record.state);
  const [country, setCountry] = useState(props.record.country);
  const [pincode, setPincode] = useState(props.record.zip_code);
  const [phone, setPhone] = useState(props.record.phone_number);
  const [checkValidation, setCheckValidation] = useState(true);

  const [required, setRequired] = useState("");
  const toggle = () => setModal(!modal);
  const uuid = useSelector((state) => state.logInReducer.uuId);

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
        return callMe(e.target.value);
      default:
        return true;
    }
  };

  const editAddress = (values) => {

    let address = {
      name: values.name,
      flat_no: values.houseNumber,
      address: values.addressLine1,
      zip_code: values.pincode,
      phone_number: values.phone,
      city: values.city,
      address_line_2: values.addressLine2,
      state: values.state,
      country: values.country,
      is_default: props.record.is_default,
    };
    commands.user.updateAddress(address, props.record.id, onUpdateSuccess, onUpdateFailure);

  };

  const onUpdateSuccess = () => {
    commands.user.getAddressList(() => { toggle(); props.setAddress(); history.push(`/profile/saveaddresses`); }, () => { })
  }

  const onUpdateFailure = () => {

  }

  useEffect(() => { }, [checkValidation]);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="cm-small-modal-6">
        <ModalHeader toggle={toggle} className="edit-add-addr-title-bar p-4">
          <span>
          {editaddresslang.get("editAddress", "Edit Address")}</span>
        </ModalHeader>
        <ModalBody className="py-4 px-5 yt-edit-add-body">
          <div class="edit-add-addr-body-wrap">
            <Formik
              initialValues={{ name: name, houseNumber: flatNo, addressLine1: address1, addressLine2: address2, city: city, state:state, country:country, pincode: pincode, phone: phone }}
              onSubmit={editAddress}
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
                            {editaddresslang.get("name", "Name")}</span>
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
                            {editaddresslang.get("flatNumber", "Flat / House / Apartment No.")}
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
                        {editaddresslang.get("addressLine1", "Address Line 1")}</span>
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
                        {editaddresslang.get("addressLine2", "Address Line 2")}</span>
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
                        {editaddresslang.get("city", "City")}</span>
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
                            {editaddresslang.get("state", "State")}</span>
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
                            {editaddresslang.get("country", "Country")}</span>
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
                            {editaddresslang.get("pinCode", "Pin Code")}</span>
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
                            {editaddresslang.get("phoneNumber", "Phone No")}.</span>
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

                    <Button
                      color="secondary edit-addr-btn py-3"
                      onClick={handleSubmit}
                      block
                    >
                       {editaddresslang.get("updateAddress", "Update Address")}
              </Button>
                  </Form>
                </Fragment>
              )}
            </Formik>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default EditaddressModal;
