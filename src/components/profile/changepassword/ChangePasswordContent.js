import React, { useEffect, useState, Fragment } from "react";
import "./css/index.scoped.css";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Form,
  Button,
} from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { putUpdate } from "../../../Barriers/apiHelper";

import { CgSpinner } from "react-icons/cg";
import { Formik } from 'formik';
import * as validationSchemas from '../../../validationSchemas';
import lang from "../../../language";

function ChangePasswordContent(props) {
  // console.log(props);

  const passwordchangelang = new lang("changePasswordScreen");
  const [currentPass, setCurrentPass] = useState("");
  const [currentInvalid, setcurrentInvalid] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [confirmErr, setconfirmErr] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [UUID, setUUID] = useState("");
  const [products, setHomeProduts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const state = useSelector((state) => state.logInReducer);
  //  console.log(state,"state");
  useEffect(() => {
    if (Object.keys(state.loginData).length > 0) {
      setAccessToken(state.loginData);
      setUUID(state.uuId);
    }
  }, [state]);
  useEffect(() => { }, [accessToken, UUID]);
  useEffect(() => { }, [products]);
  const history = useHistory();

  const routeToProfile = () => {
    let path = "/profile";
    history.push(path);
  };
  const handleConfirm = (e) => {
    setconfirmPass(e.target.value);
    if (e.target.value == newpassword) {
      setconfirmErr("xyz");
    } else {
      setconfirmErr("Password Mismatch");
    }
  };
  const handleNewPass = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value.length == 0) {
      setPassErr("Required");
    } else if (e.target.value.length < 8) {
      setPassErr("Minimum 8 Characters");
    } else {
      setPassErr("xyz");
    }
  };
  const handleOldPass = (e) => {
    setCurrentPass(e.target.value);
    if (e.target.value.length == 0) {
      setcurrentInvalid("Required");
    } else {
      setcurrentInvalid("xyz");
    }
  };
  const changePassword = (e) => {
    e.preventDefault();
    if (currentPass.length == 0) {
      setcurrentInvalid("Required");
    } else {
      setcurrentInvalid("xyz");
    }
    if (newpassword.length == 0) {
      setPassErr("Required");
    } else if (newpassword.length < 8) {
      setPassErr("Minimum 8 Characters");
    } else {
      setPassErr("xyz");
    }
    if (confirmPass.length == 0) {
      setconfirmErr("Required");
    } else if (confirmPass != newpassword) {
      setconfirmErr("Password Mismatch");
    } else {
      setconfirmErr("xyz");
    }
    if (currentInvalid == "xyz" && passErr == "xyz" && confirmErr == "xyz") {
      console.log(currentInvalid, passErr, confirmErr);
      callMe();
    }
  };
  const callMe = ({ currentpassword, password }) => {
    // console.log(accessToken,"accessToken",UUID);
    let userId = accessToken.user.id;
    let headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          accessToken.token.token_type + " " + accessToken.token.access_token,
      },
    };
    let data = {
      user: {
        current_password: currentpassword,
        password: password,
      },
    };
    putUpdate(`/users/${userId}/update_password`, data, headers)
      .then((res) => {
        console.log(res);
        props.changeStatus(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setErrorMessage(err.response?.data?.error);
        } else {
          setErrorMessage(err.message || "Unknown Error Occured");
        }
      });
  };
  useEffect(() => { }, [currentInvalid, passErr, confirmErr]);
  return (
    <section class="profile-change-password-main-wrapper mb-5 pb-5">
      <Container>
        <Row>
          <Col md={12}>
            <div class="pageroute profile-pg-breadcrumbs my-3">
              <Link to="/">
                <span class="profile-pg-home w3-hover-opacity w3-ripple" style={{ cursor: "default" }}>Home</span>
              </Link>
              {" > "}
              <Link to="/profile">
                <span class="profile-pg-home w3-hover-opacity w3-ripple" style={{ cursor: "default" }}>Profile</span>
              </Link>
              {" > "}
              <span class="profile-pg-current">Change Password</span>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center yt-cp-cm-row">
          <Col sm={12} md={12} className="yt-cm-cp-col">
            <div class="cp-backfrom-ct-page d-flex align-items-center hc-mb-30"
              onClick={() => {
                routeToProfile();
              }} style={{ cursor: "pointer" }}>
              <FaLongArrowAltLeft
                className="hcp-cp-back-arrow"

              />{" "}
              <span class="pl-2 hc-cp-back-tag">
                {passwordchangelang.get("changePassword", "Change Password")}</span>
            </div>
            <div class="bg-white radius-10 mb-5 cp-main-form-wrapper">
              <h2 class="cp-form-title mt-0 mb-4">
                {passwordchangelang.get("passwordValidationMessage", "Enter a passsword with alphabets A-z, number and a symbol")}
              </h2>
              <Formik
                initialValues={{ currentpassword: "", password: "", confirmpassword: "" }}
                onSubmit={(values) => callMe(values)}
                validationSchema={validationSchemas.changePasswordForm}
              >
                {({ values,setValues, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => {
                  
            const cacheState = useSelector((state) => state.cache);
           
         
            useEffect(() => {
              setValues(values);
            }, [cacheState?.language]);

                  
                  return (<Fragment>
                    <Form
                      onSubmit={(e) => changePassword(e)}
                      className="profile-change-pass-form-wrap"
                    >
                      <FormGroup>
                        <div class={"profile-change-pass-field fields-active" + (errors.currentpassword && touched.currentpassword ? " error" : "")}>
                          <span class="profile-form-tag">
                            {passwordchangelang.get("enterCurrentPassword", "Enter Current Password")}</span>
                          <Input
                            className="pb-2 border-0"
                            type="password"
                            name="currentpassword"
                            id="oldpass"
                            onChange={handleChange}
                            onBlur={() => setFieldTouched('currentpassword')}
                            value={values.currentpassword}
                          />
                        </div>
                        {errors.currentpassword && touched.currentpassword && <span class="validation-error">{errors.currentpassword}</span>}
                      </FormGroup>
                      <FormGroup>
                        <div class={"profile-change-pass-field fields-active" + (errors.password && touched.password ? " error" : "")}>
                          <span class="profile-form-tag">{passwordchangelang.get("enterNewPassword", "Enter New Password")}</span>
                          <Input
                            className="pb-2 border-0"
                            type="password"
                            name="password"
                            id="newpassword"
                            onChange={handleChange}
                            onBlur={() => setFieldTouched('password')}
                            value={values.password}
                          />
                        </div>

                        {errors.password && touched.password && <span class="validation-error">{errors.password}</span>}
                      </FormGroup>
                      <FormGroup>
                        <div class={"profile-change-pass-field fields-active" + (errors.confirmpassword && touched.confirmpassword ? " error" : "")}>
                          <span class="profile-form-tag">{passwordchangelang.get("reenterPassword", "Re-enter New Password")}</span>
                          <Input
                            className="pb-2 border-0"
                            type="password"
                            name="confirmpassword"
                            onChange={handleChange}
                            onBlur={() => setFieldTouched('confirmpassword')}
                            value={values.confirmpassword}
                          />
                          {errors.confirmpassword && touched.confirmpassword && <span class="validation-error">{errors.confirmpassword}</span>}
                        </div>
                      </FormGroup>
                      {errorMessage && <span class="validation-error">{errorMessage}</span>}
                      <Button
                        type="submit"
                        color="secondary profile-chamhe-pass-submit py-3 px-4"

                        onClick={handleSubmit}
                      >
                        {passwordchangelang.get("changePassword", "Change Password")}
                      </Button>
                    </Form>

                  </Fragment>
                );}}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ChangePasswordContent;
