import React, { useState, useEffect, Fragment } from "react";
import "./css/index.scoped.css";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { post, get } from "../../Barriers/apiHelper";
import NewPassword from "./NewPassword";
import language from "../../language/language";
import langg from "../../language";
import { useHistory, Link } from "react-router-dom";
import CacheState from "../../redux/states/cache";
import { CgSpinner } from "react-icons/cg";

function ForgotPassFields(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [notRegister, setNotRegister] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [password, setNewPassword] = useState("");
  const [passwordError, setNewPassError] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [timer, setTimer] = useState(0);
  const history = useHistory();
  const lang = new langg("forgotPasswordScreen");
  const newpasslang = new langg("newPasswordScreen");

  //   const [SendOtp, setSendOtp] = useState(false);
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function isValidOTP(otp) {
    const re = /^\d{5}$/gm.test(otp);
    return re;
  }

  const SendOtpBtn = (e) => {
    e.preventDefault();
    let res;
    // console.log(email, "email");


    if (emailError === "success") {
      if (otp == "") {
        setOtpError("empty");
      } else {
        let v = isValidOTP(otp);
        if (!v) {
          setOtpError("invalid");
        } else {
          setOtpError("");
          verifyOTP();
        }
      }
    } else {

      if (email == "") {
        setEmailError("empty");
        return;
      } else {
        let d = isValidEmail(email);
        if (!d) {
          setNotRegister("");
          setEmailError("wrong");
        } else {
          if (emailError != "success") {
            emailConfirm();
          }
        }
      }

    }

  };
  const emailConfirm = () => {
    setShowSpinner(true);
    let data = {
      user: {
        email: email,
      },
    };
    post(`/users/password`, data)
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          setEmailError("success");
        }
        // setEmailError("");
        setNotRegister("");
        setTimer(60);

      })
      .catch((err) => {
        // console.log(err.response.data);
        setEmailError("");
        setNotRegister(err.response.data.error);
      }).finally(() => setShowSpinner(false));
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      setOtp("");
    }
    if (emailError != "") {
      let check = isValidEmail(e.target.value);
      if (check) {
        setEmailError("");
      } else {
        setEmailError("wrong");
      }
    }
  };
  const handleOTP = (e) => {
    setOtp(e.target.value);
    if (otpError != "" || e.target.value.length > 5) {
      let check = isValidOTP(e.target.value);
      // console.log(check, "check");
      if (check) {
        setOtpError("");
      } else {
        setOtpError("invalid");
      }
    }
  };
  const verifyOTP = () => {
    setShowSpinner(true);
    get(`/users/verify_otp?otp=${otp}`)
      .then((res) => {
        setOtpToken(res.data.token);
      })
      .catch((err) => {
        setOtpError("invalidResponse");
        // console.log(err.response.data);
      }).finally(() => setShowSpinner(false));
  };
  useEffect(() => {
    // console.log(emailError, "emailError", otpToken);
  }, [emailError, otpError, notRegister, passwordError, otpToken, otp]);

  return (
    <div className="yt-fp-wrap">
      {otpToken == '' ?
        <Link to="/login" className="d-flex">
          <RiArrowLeftSLine className="mr-2 yt-fp-back-icn" />
          <h3 className="yt-fp-top-back-tag-name">{lang.get("forgotPassword", "Forgot Password ?")}</h3>
        </Link> :
        <div className="d-flex">
          <h3 className="yt-fp-top-back-tag-name">{newpasslang.get("createNewPassword", "Create New Password")}</h3>
        </div>
      }

      <h2 className="yt-fp-tag-line">
        {lang.get("subtitle", "Get started and discover the best offers around you")}
      </h2>
      <h2 className="yt-fp-tag-line-2">
        {otpToken == "" ? (
          <span>
            {emailError == "success" ? lang.get("OTPSent", "OTP has been sent to your email id.") : lang.get("registeredEmail", "Enter your registered Email, we’ll sent you OTP to reset your password")}

          </span>
        ) : ''}
      </h2>
      <div className="yt-fp-form">
        {otpToken == "" ? (
          <Form onSubmit={SendOtpBtn}>
            <FormGroup className={"mb-1 " + ((emailError == 'empty' || emailError == 'wrong' || notRegister != '') ? 'yt-form-err' : "")}>
              <img
                alt="Email Icon"
                src={require("./images/emal-icn.png")}
                className={"yt-fp-icn"}
              />
              <Input
                type="email"
                name="email"
                id="email"
                value={email} ForgotPassFields
                placeholder={lang.get("email", "Email")}
                onChange={handleEmail}
                className={
                  emailError == "" || emailError == "success"
                    ? "normal-input"
                    : "invalid-input"
                }
                invalid={!(emailError == "" || emailError == "success")}
                disabled={emailError == "success"}
              />
              <span id="yt-fp-email-error" className="yt-fp-up-message-show" />
              {emailError == "empty" ? (
                <span className="invalid yt-form-err" style={{ position: "absolute" }}>{language.auth.emailError}</span>
              ) : (
                  <></>
                )}
              {emailError == "wrong" ? (
                <span className="invalid yt-form-err" style={{ position: "absolute" }}>{language.auth.emailInvalid}</span>
              ) : (
                  <></>
                )}
              {notRegister ? (
                <span className="invalid yt-form-err" style={{ position: "absolute" }}>{notRegister}</span>
              ) : (
                  <></>
                )}
            </FormGroup>





            {emailError == "success" ? (
              <FormGroup className={"mt-1 " + ((otpError == 'empty' || otpError == 'invalid' || otpError == 'invalidResponse') ? 'yt-form-err' : "")}>
                <div>
                  <img
                    alt="Password Icon"
                    src={require("./images/key-icn.png")}
                    className={"yt-fp-icn"}
                  />
                  <Input
                    type="text"
                    name="otp"
                    id="otp"
                    value={otp}
                    placeholder="OTP"
                    onChange={handleOTP}
                  />
                  {/*<FaEye
                  className={
                    otpError != "" ? "yt-pas-eye-icn2" : "yt-pas-eye-icn"
                  }
                />*/}
                </div>
                {otpError == "empty" ? (
                  <span className="invalid yt-form-err" style={{ position: "absolute" }}>{language.auth.enterOTP}</span>
                ) : (
                    <></>
                  )}
                {otpError == "invalid" ? (
                  <span className="invalid yt-form-err" style={{ position: "absolute" }}>Please enter 5 digit OTP</span>
                ) : (
                    <></>
                  )}
                {otpError == "invalidResponse" ? (
                  <span className="invalid yt-form-err" style={{ position: "absolute" }}>{language.auth.invalidOtp}</span>
                ) : (
                    <></>
                  )}
              </FormGroup>
            ) : (
                <></>
              )}
            <div class="mt-4 pt-1 yt-otp-sd-wrap">
              {showSpinner ?
                <CgSpinner style={{ color: "black", fontSize: 32, width: "100%", margin: 10 }} class="w3-spin" />
                :
                <Button type="submit" color="secondary yt-fp-btn mt-1" block>
                  {emailError === "success" ? lang.get("verifyOTP", "Verify OTP") : lang.get("sendOTP", "Send OTP")}
                </Button>
              }
            </div>
          </Form>
        ) : (
            <NewPassword token={otpToken} onChangeSuccess={props.onChangeSuccess} />
          )}
      </div>
      <Fragment>
        {emailError != "success" ? <div className="yt-forpass-bottom-info text-center">
          <span style={{ cursor: "pointer" }} onClick={() => { CacheState.set({ continueAsGuest: true }); history.push("/"); }} className="yt-fp-skip-btn">
            {lang.get("skipAndContinue", "Skip & Continue as Guest")}
          </span>
        </div>
          :
          <Fragment>
            {otpToken == "" &&
              <div className="yt-forpass-bottom-info text-center">
                <div>
                  {timer > 0 ?
                    <div className="otp-timer">00:{timer}</div>
                    :
                    <Button color="link yt-resent-otp-btn" onClick={emailConfirm}>{lang.get("resendOTP", "Resend OTP")}</Button>
                  }
                </div>
              </div>
            }
          </Fragment>
        }
      </Fragment>
    </div>
  );
}
export default ForgotPassFields;

// function OtpFields() {
//   return (
//     <Form>
//       <FormGroup>
//         <img
//           alt="Email Icon"
//           src={require("./images/emal-icn.png")}
//           className="yt-fp-icn"
//         />
//         <Input
//           type="email"
//           name="email"
//           id="email"
//           placeholder="Email Address"
//         />
//         <span
//           id="yt-otp-email-message"
//           className="yt-email-message-show d-block"
//         />
//       </FormGroup>
//       <FormGroup className="yt-number-filed">
//         <img
//           alt="Phone Icon"
//           src={require("./images/telephone.png")}
//           className="yt-fp-icn"
//         />
//         <Input type="number" name="phone" id="phone" />
//         <span id="yt-fp-phone-error" className="yt-fp-up-message-show" />
//       </FormGroup>
//       <FormGroup className="error">
//         <img
//           alt="Password Icon"
//           src={require("./images/key-icn.png")}
//           className="yt-fp-icn"
//         />
//         <Input
//           type="password"
//           name="password"
//           id="password"
//           placeholder="OTP"
//         />
//         <FaEye className="yt-pas-eye-icn" />
//         <span id="yt-otp-message" className="yt-optp-message-show">
//           Your OTP is not verified. Please try again
//         </span>
//       </FormGroup>
//       <Button color="secondary yt-fp-btn" block>
//         OTP Verify
//       </Button>
//     </Form>
//   );
// }
