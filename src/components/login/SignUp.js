/* global FB */
import React, { useState, useEffect, Fragment } from "react";
import { Button, FormGroup } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { useHistory, Link } from "react-router-dom";
import { FaFacebookF, FaRegEnvelope, FaEye, FaEyeSlash, FaLessThanEqual } from "react-icons/fa";
import "./css/index.scoped.css";
import signUpValidation from "../Validation schemas/signUpValidations";
import { useSelector } from "react-redux";
import { post } from "../../Barriers/apiHelper";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { userSignUp } from "../../redux/actions/signupActions";
import { userSocialLogin } from "../../redux/actions/loginActions";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../config/firebase.config";
import language from "../../language/language";
import lang from "../../language";
import Ripple from "react-ripples";
import { CgSpinner } from "react-icons/cg";
import CacheState from "../../redux/states/cache";

function SignUpPage(props) {
  const [showPass, setShowPass] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [signupError, setSignupError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);

  const state = useSelector((state) => state.logInReducer);
  const UUID = state.uuId;
  const signuplang = new lang("signupScreen");

  function routeToAll(value) {
    if (value !== undefined) {
      let path = "/" + value;
      history.push(path);
    } else {
      let path = "/";
      history.push(path);
    }
  }

  const showPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    window.fbAsyncInit = function () {
      FB.init({
        appId: "1234953260198976",
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });
      FB.AppEvents.logPageView();
      FB.Event.subscribe("auth.statusChange", function (response) {
        if (response.authResponse) {
          checkLoginState();
        } else {
          console.log("---->User cancelled login or did not fully authorize.");
        }
      });
    };
  }, [firebase]);

  function statusChangeCallback(response) {
    if (response.status === "connected") {
      const data = {
        access_token: response.authResponse.accessToken,
        loginType: 2,
        grant_type: "password",
        provider: "facebook",
        uuid: UUID
      };
      let data1;
      try {
        data1 = dispatch(
          userSocialLogin(data, socialLoginSuccess, socialLoginFailure)
        );
      } catch (err) {
        setSignupError("Error while login with Facebook");
        console.log("Error: ", err);
      }
    } else if (response.status === "not_authorized") {
      // The person is logged into Facebook, but not your app.
      setSignupError("Error while login with Facebook");
    } else {
      setSignupError("Error while login with Facebook");
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }

  function signUPnWithFacebook() {
    FB.login(checkLoginState());
  }

  const signupUser = (values) => {
    setShowSpinner(true);
    const data = {
      user: {
        name: values.FullName,
        email: values.Email,
        password: values.password,
      },
    };
    console.log(data);

    post(`/users`, data)
      .then((res) => {
        console.log(res);

        var qparams = new URLSearchParams(window.location.search);
        console.log("kolap ,",res.data.data.user);
        if (qparams.get("redirect")) {

          props.history.push({
            pathname: "/signupconfirm",
            search: "?redirect=" + qparams.get("redirect"),
            state: {
              data: res.data.data.user,
            },
          });
        } else {
          props.history.push({
            pathname: "/signupconfirm",
            state: {
              data: res.data.data.user,
            },
          });

        }


      })
      .catch((err) => {
        console.log("login error", err.request?.response);
        if (err.request.response && err.request.status !== 0) {
          let response = JSON.parse(err.request.response);
          setEmailErr(response.error);
        } else {
          setEmailErr("Unable to sign up with the credentials.");
        }
      })
      .finally(() => {
        setShowSpinner(false);
      });
  };

  function signUPnWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    let accessToken;
    provider.addScope("profile");
    provider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token.
        accessToken = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("do ", accessToken);
        const data = {
          access_token: accessToken,
          loginType: 2,
          grant_type: "password",
          provider: "google",
          uuid: UUID
        };
        let data1;
        try {
          data1 = dispatch(
            userSocialLogin(data, socialLoginSuccess, socialLoginFailure)
          );
        } catch (err) {
          setSignupError("Error while login with Google");
          console.log("Error: ", err);
        }
      })
      .catch((error) => {
        setSignupError("Error while login with Google");
        console.log(error);
      });
  }

  const socialLoginSuccess = (res) => {

    if (props.isPopup) {
      setTimeout(() => window.location.reload());
    } else {
      var qparams = new URLSearchParams(window.location.search);
      window.location.replace(qparams.get("redirect") || "/");
    }
  };

  const socialLoginFailure = (err) => {
    setSignupError(err);
    console.log(err);
  };

  useEffect(() => { }, [showPass.emailErr]);

  return (
    <div className="yt-signup-wrap">
      <h2 className="yt-signup-tag-line">
        {signuplang.get("subtitle", "Get started and discover the best offers around you")}
      </h2>
      <div className="yt-signup-form mb-4">
        <Formik
          initialValues={{ FullName: "", Email: "", password: "" }}
          onSubmit={signupUser}
          validationSchema={signUpValidation}
        >
          {({ errors, touched, setValues, values }) => {
            const cacheState = useSelector((state) => state.cache);
            useEffect(() => {
              setValues(values);
            }, [cacheState?.language]);

            return (
              <Form>
                <FormGroup className={errors.FullName && touched.FullName && "yt-form-err"}>
                  <img
                    alt="User Profile Image"
                    src={require("./images/userprofile-icn.png")}
                    className={errors.FullName && touched.FullName
                      ? " yt-login-icn2"
                      : "yt-login-icn"} />
                  <Field
                    name="FullName"
                    type="text"
                    id="FullName"
                    placeholder={signuplang.get("fullName", "Full Name")}
                    className={"form-control" +
                      (errors.FullName && touched.FullName
                        ? " is-invalid invalid"
                        : "")} />
                  <span
                    id="yt-signup-name-error"
                    className="yt-sign-up-message-show" />
                  {touched.FullName && errors.FullName && (
                    <span className="invalid-feedback" style={{ position: "absolute" }}>{errors.FullName}</span>
                  )}
                </FormGroup>
                <FormGroup className={errors.Email && touched.Email && "yt-form-err"}>
                  <img
                    alt="Email Icon"
                    src={require("./images/emal-icn.png")}
                    className={errors.Email && touched.Email
                      ? " yt-login-icn2"
                      : "yt-login-icn"} />
                  <Field
                    name="Email"
                    type="text"
                    placeholder={signuplang.get("email", "Email")}
                    className={"form-control" +
                      (errors.Email && touched.Email
                        ? " is-invalid invalid"
                        : "")} />

                  {touched.Email && errors.Email && (
                    <span className="invalid-feedback" style={{ position: "absolute" }}>{errors.Email}</span>
                  )}
                </FormGroup>
                <FormGroup className={"mb-4 " + errors.password && touched.password && "yt-form-err"}>
                  <img
                    alt="Password Icon"
                    src={require("./images/key-icn.png")}
                    className={errors.password && touched.password
                      ? "yt-login-icn2"
                      : "yt-login-icn"} />
                  <Field
                    name="password"
                    type={showPass ? "text" : "password"}
                    id="password"
                    placeholder={signuplang.get("password", "Password")}
                    className={"form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")} />
                  {touched.password && errors.password ?
                    (showPass ?
                      <FaEyeSlash
                        onClick={showPassword}
                        className="yt-login-pass-vie-icn" style={{ marginRight: 20 }} />
                      :
                      <FaEye
                        onClick={showPassword}
                        className="yt-login-pass-vie-icn" style={{ marginRight: 20 }} />
                    )
                    : (
                      showPass ?
                        <FaEyeSlash
                          onClick={showPassword}
                          className="yt-login-pass-vie-icn" />
                        :
                        <FaEye
                          onClick={showPassword}
                          className="yt-login-pass-vie-icn" />
                    )
                  }
                  <span className="yt-signup-pass-info pb-1" style={{ opacity: touched.password && errors.password ? 0 : 1 }}>
                    {signuplang.get("passwordError", "Enter a passsword with alphabets A-z, numbers 0-9 and a symbol")}
                  </span>
                  {touched.password && errors.password && (
                    <span className="invalid-feedback pb-1" style={{ position: "absolute" }}>{errors.password}</span>
                  )}
                </FormGroup>
                {emailErr.length > 0 ? (
                  <span className="err_invalid">
                    {emailErr}
                    <br />
                  </span>
                ) : (
                    <></>
                  )}

                <Fragment>
                  {showSpinner ?
                    <CgSpinner style={{ color: "black", fontSize: 32, width: "100%", margin: 10 }} class="w3-spin" />
                    :
                    <Button type="submit" color="secondary yt-signup-btn mt-5" block class="w3-ripple">
                      {signuplang.get("signUp", "Sign Up")}
                    </Button>
                  }
                </Fragment>
              </Form>
            )
          }}
        </Formik>
      </div>
      <div className="yt-signup-bottom-info text-center">

        {props.isPopup &&
          <div className="my-4text-center">
            <span style={{ cursor: "pointer" }} onClick={() =>/* history.push("/")*/ CacheState.set({ continueAsGuest: true })} className="w3-ripple yt-signup-skip-btn" onClick={() =>/* history.push("/")*/ CacheState.set({ continueAsGuest: true })}>
              {signuplang.get("skipAndContinue", "Skip & Continue as Guest")}
            </span>
          </div>
        }
        <p className="yt-signup-via-tag">{signuplang.get("signUpVia", "or Sign up via")}</p>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            onClick={signUPnWithFacebook}
            color="secondary d-flex  align-items-center mr-3 yt-signup-via-fb"
          >
            <FaFacebookF className="mr-2" /> {signuplang.get("facebook", "Facebook")}
          </Button>
          <Button
            onClick={signUPnWithGoogle}
            color="secondary d-flex align-items-center yt-signup-via-email"
          >
            <FaRegEnvelope className="mr-2" /> {signuplang.get("google", "Google")}
          </Button>
        </div>
      </div>
      <div className="lp-bottom-links">
        <p className="yt-signup-aggre-tag mb-3 text-center">
          {signuplang.get("agree", "By Signing In you agree with our")}
        </p>
        <div className="d-flex yt-signup-term-privacy-link justify-content-center">
          <Link to="/help-center/Terms and Conditions">{signuplang.get("termsAndCondition", "Terms & Conditions")}</Link>
          <span className="mx-2">&</span>
          <Link to="/help-center/Privacy Policy">{signuplang.get("privacyPolicy", "Privacy Policy")}</Link>
        </div>
      </div>
    </div>
  );
}
export default withRouter(SignUpPage);
