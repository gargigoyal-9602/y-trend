import React, { useState, useEffect } from "react";
import { Button, FormGroup } from "reactstrap";
import { Formik, Form, Field } from "formik";
import newPassValidation from "../Validation schemas/newPassValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./css/index.scoped.css";
import { put } from "../../Barriers/apiHelper";
import { withRouter } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import langg from "../../language";

function NewPassword(props) {
  // console.log(props);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const [message, setMessage] = useState("");
  const [invalidPass, setInvalidPass] = useState("");

  const [showSpinner, setShowSpinner] = useState(false);

  const lang = new langg("newPasswordScreen");

  const setNewPass = (values) => {
    setShowSpinner(true);
    // console.log("hey", values);
    let data = {
      user: {
        reset_password_token: props.token,
        password: values.password,
      },
    };
    put(`/users/password`, data)
      .then((res) => {
        // console.log(res);
        setMessage(res.data.message);
        setInvalidPass("");
        /*
                setTimeout(() => {
                  props.history.push("/login");
                }, 3000);*/
        props.onChangeSuccess();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.error);
          setInvalidPass(err.response.data.error);
        } else {
          setInvalidPass(err.message);
        }
      }).finally(() => setShowSpinner(false));
  };
  const showPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  const showConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPass(!showConfirmPass);
  };
  useEffect(() => { }, [showPass, invalidPass]);
  return (
    <div className="yt-fp-form">
      {message != "" ? <span className="pass_success">{message}</span> : <></>}
      <Formik
        initialValues={{ password: "", confirmpassword: "" }}
        onSubmit={setNewPass}
        validationSchema={newPassValidation}
      >
        {({ errors, touched }) => {
          if (
            (touched.password && errors.password) ||
            (touched.confirmpassword && errors.confirmpassword)
          ) {
            setInvalidPass("");
          }
          return (
            <Form className={"yt-new-pass-form-wrap " + ((touched.password && errors.password) ? 'yt-form-wrap-err' : '')}>
              <FormGroup className={"mb-0 " + ((touched.password && errors.password) ? 'yt-form-err' : '')}>
                <img
                  alt="Password Icon"
                  src={require("./images/key-icn.png")}
                  className={"yt-fp-icn"}
                />
                <Field
                  name="password"
                  type={showPass ? "text" : "password"}
                  id="password"
                  placeholder={lang.get("newPassword", "New Password")}
                  className={
                    "form-control" +
                    (errors.password && touched.password
                      ? " is-invalid invalid-input"
                      : "")
                  }
                />
                {touched.password && errors.password ? (
                  showPass ?
                    <FaEyeSlash
                      onClick={showPassword}
                      className={"yt-forgot-pass-vie-icn"}
                      style={{ marginRight: 20 }}
                    />
                    :
                    <FaEye
                      onClick={showPassword}
                      className={"yt-forgot-pass-vie-icn"}

                      style={{ marginRight: 20 }}
                    />
                ) : (
                  showPass ?
                    <FaEyeSlash
                      onClick={showPassword}
                      className={"yt-forgot-pass-vie-icn"}
                    />
                    :
                    <FaEye
                      onClick={showPassword}
                      className={"yt-forgot-pass-vie-icn"}

                    />
                )}
                {touched.password && errors.password && (
                  <span className="invalid-feedback d-block yt-invalid-minimum-pass" style={{ position: "absolute" }}>{errors.password}</span>
                )}
              </FormGroup>

              <FormGroup className={"mb-0 " + ((touched.confirmpassword && errors.confirmpassword) ? 'yt-form-confirm-err' : '')} style={{ marginTop: "0px" }}>
                <img
                  alt="Password Icon"
                  src={require("./images/key-icn.png")}
                  className={"yt-fp-icn"}
                />
                <Field
                  name="confirmpassword"
                  type={showConfirmPass ? "text" : "password"}
                  id="password"
                  placeholder={lang.get("confirmPassword", "Confirm Password")}
                  className={
                    "form-control" +
                    (errors.confirmpassword && touched.confirmpassword
                      ? " is-invalid invalid-input"
                      : "")
                  }
                />
                {touched.confirmpassword && errors.confirmpassword ? (
                  showConfirmPass ?
                    <FaEyeSlash
                      onClick={showConfirmPassword}
                      className={"yt-forgot-pass-vie-icn"}
                      style={{ marginRight: 20 }}
                    />
                    :
                    <FaEye
                      onClick={showConfirmPassword}
                      className={"yt-forgot-pass-vie-icn"}

                      style={{ marginRight: 20 }}
                    />
                ) : (
                  showConfirmPass ?
                    <FaEyeSlash
                      onClick={showConfirmPassword}
                      className={"yt-forgot-pass-vie-icn"}
                    />
                    :
                    <FaEye
                      onClick={showConfirmPassword}
                      className={"yt-forgot-pass-vie-icn"}
                    />
                )}
                {touched.confirmpassword && errors.confirmpassword && (
                  <span className="invalid-feedback d-block yt-confirm-pass-error" style={{ position: "absolute" }}>
                    {errors.confirmpassword}
                  </span>
                )}
                {invalidPass ? (
                  <span className="invalid yt-invalid-pass-error" style={{ position: "absolute" }}>{invalidPass}</span>
                ) : (
                  <></>
                )}
              </FormGroup>
              {!invalidPass &&
                <span className="yt-etpass-msg">{lang.get("invalidPassword", "Enter a passsword with alphabets A-z, numbers 0-9 and a symbol")}</span>
              }
              {showSpinner ?
                <CgSpinner style={{ color: "black", fontSize: 32, width: "100%", margin: 10, marginTop: "30px" }} class="w3-spin" />
                :
                <Button type="submit" color="secondary yt-login-btn yt-fp-btn" block style={{ marginTop: "30px" }}>
                  {lang.get("updatePassword", "Update Password")}
                </Button>
              }
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default withRouter(NewPassword);
