/* global FB */
import React, { useState, useEffect, Fragment } from "react";
import "./css/index.scoped.css";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button, FormGroup } from "reactstrap";
import { FaFacebookF, FaRegEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import getLoginValidation from "../Validation schemas/loginValidation";
import { userSocialLogin } from "../../redux/actions/loginActions";
import { get, post } from "../../Barriers/apiHelper";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSuccess } from "../../redux/actions/loginActions";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../config/firebase.config";
import language from "../../language/language";
import lang from "../../language";
import { CgSpinner } from "react-icons/cg";
import commands from "../../commands";
import CacheState from "../../redux/states/cache";

function LoginPage(props) {
  const [loginError, setLoginError] = useState("");
  const [resData, setuserResData] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const showPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const loginlang = new lang("loginScreen");

  const state = useSelector((state) => state.logInReducer);

  const UUID = state.uuId;

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
        window.notify([{ message: err.message, style: "danger" }])
        console.log("Error: ", err);
      }
    } else if (response.status === "not_authorized") {
      // The person is logged into Facebook, but not your app.
      window.notify([{ message: "Error while login with Facebook", style: "danger" }])
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }

  function logInWithFaceBook() {
    FB.login(checkLoginState());
  }

  useEffect(() => { }, [resData, loginError, showPass]);

  const routeToAll = (value) => {
    if (value !== undefined) {
      let path = "/" + value;
      history.push(path);
    } else {
      let path = "/";
      history.push(path);
    }
  };

  async function signinUser(values) {
    setShowSpinner(true);
    const data = {
      email: values.userEmail,
      password: values.password,
      grant_type: "password",
      loginType: 1,
      device_token: "",
    };
    post(`/oauth/token?uuid=${UUID}`, data)
      .then((res) => {
        console.log(res);
        dispatch(fetchUserSuccess(res?.data?.data));
        // props.

        if (props.isPopup) {
          setTimeout(() => window.location.reload());
        } else {
          var qparams = new URLSearchParams(window.location.search);
          setTimeout(() => window.location.replace(qparams.get("redirect") || "/"), 500);
        }
      })
      .catch((err) => {
        console.log("login error", err.request?.response);
        if (err.request.response && err.request.status !== 0) {
          let response = JSON.parse(err.request.response);
          setLoginError(response.error);

          if (response.error.includes("confirm")) {

            var qparams = new URLSearchParams(window.location.search);

            if (qparams.get("redirect")) {

              history.push({
                pathname: "/loginconfirm",
                search: "?redirect=" + qparams.get("redirect"),
                state: {
                  data: { email: values.userEmail },
                },
              });
            } else {
              history.push({
                pathname: "/loginconfirm",
                state: {
                  data: { email: values.userEmail },
                },
              });
            }
          }

        } else {
          setLoginError("Unable to login with the credentials.");
        }
      }).finally(() => {
        setShowSpinner(false);
        commands.cart.refreshCart();
      });
  }

  function logInWithGoogle() {
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
        console.log("goog", user);
        console.log(accessToken);
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
          window.notify([{ message: "Error while login with Google", style: "danger" }])
          console.log("Error: ", err);
        }
      })
      .catch((error) => {
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
    window.notify([{ message: err, style: "danger" }])
    console.log(err);
  };

  return (
    <div className="yt-login-inner-wrap">
      <h2 className="yt-login-tag-line">
        {loginlang.get("subtitle", "Get started and discover the best offers around you")}
      </h2>
      <div className="yt-login-form mb-4">
        <Formik
          initialValues={{ userEmail: "", password: "" }}
          onSubmit={signinUser}
          validationSchema={getLoginValidation}
        >
          {({ errors, touched, setValues, values }) => {

            const cacheState = useSelector((state) => state.cache);

            if (
              (errors.password && touched.password) ||
              (errors.userEmail && touched.userEmail)
            ) {
              setLoginError("");
            }
            useEffect(() => {
              setValues(values);
            }, [cacheState?.language]);


            return (
              <Form>
                <FormGroup className={errors.userEmail && touched.userEmail && "yt-form-err"}>
                  <img
                    alt="Email Icon"
                    src={require("./images/emal-icn.png")}
                    className={
                      errors.userEmail && touched.userEmail
                        ? " yt-login-icn"
                        : "yt-login-icn"
                    }
                  />
                  <Field
                    name="userEmail"
                    type="text"
                    placeholder={loginlang.get("email", "Email")}
                    className={
                      "form-control" +
                      (errors.userEmail && touched.userEmail
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <span
                    id="yt-signup-email-error"
                    className="yt-login-message-show"
                  />
                  {touched.userEmail && errors.userEmail && (
                    <span className="invalid-feedback" style={{ position: "absolute" }}>{errors.userEmail}</span>
                  )}
                </FormGroup>

                <FormGroup className={"mt-3 " + errors.password && touched.password && "yt-form-err"}>
                  <img
                    alt="Password Icon"
                    src={require("./images/key-icn.png")}
                    className={
                      (errors.password && touched.password) ||
                        loginError.length > 0
                        ? " yt-login-icn2"
                        : "yt-login-icn"
                    }
                  />
                  <Field
                    name="password"
                    type={showPass ? "text" : "password"}
                    id="password"
                    placeholder={loginlang.get("password", "Password")}
                    className={
                      "form-control" +
                      (errors.password && touched.password
                        ? " is-invalid invalid"
                        : "")
                    }
                  />
                  {touched.password && errors.password ? (
                    showPass ?
                      <FaEyeSlash
                        onClick={showPassword}
                        className={
                          loginError.length > 0
                            ? "yt-login-pass-vie-icn2"
                            : "yt-login-pass-vie-icn"
                        }
                        style={{ marginRight: 20 }}
                      />
                      :
                      <FaEye
                        onClick={showPassword}
                        className={
                          loginError.length > 0
                            ? "yt-login-pass-vie-icn2"
                            : "yt-login-pass-vie-icn"
                        }
                        style={{ marginRight: 20 }}
                      />
                  ) : (
                    showPass ?
                      <FaEyeSlash
                        onClick={showPassword}
                        className={
                          loginError.length > 0
                            ? "yt-login-pass-vie-icn2"
                            : "yt-login-pass-vie-icn"
                        }
                      />
                      :
                      <FaEye
                        onClick={showPassword}
                        className={
                          loginError.length > 0
                            ? "yt-login-pass-vie-icn2"
                            : "yt-login-pass-vie-icn"
                        }
                      />
                  )}
                  {touched.password && errors.password && (
                    <span className="invalid-feedback" style={{ position: "absolute" }}>{errors.password}</span>
                  )}
                  {loginError.length > 0 ? (
                    <span className="err_invalid mt-2" style={{ position: "absolute" }}>{loginError}</span>
                  ) : (
                    <></>
                  )}
                </FormGroup>
                <Fragment>
                  {showSpinner ?
                    <CgSpinner style={{ color: "black", fontSize: 32, width: "100%", margin: 10 }} class="w3-spin" />
                    :
                    <Button type="submit" color="secondary yt-login-btn w3-ripple mt-5" block>
                      {loginlang.get("signIn", "Sign In")}
                    </Button>
                  }
                </Fragment>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="yt-login-bottom-info text-center mt-4">
        <Button
          color="link yt-login-forget-pass"
          onClick={() => {
            routeToAll("forgotpassword");
          }}
        >
          {loginlang.get("forgotPassword", "Forgot Password ?")}
        </Button>
        <a href="/forgotpassword" className="yt-login-forget-pass" />
        <p className="yt-login-via-tag mb-4">{loginlang.get("continueVia", "or Continue via")}</p>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            onClick={logInWithFaceBook}
            color="secondary d-flex  align-items-center mr-3 yt-login-via-fb"
          >
            <FaFacebookF className="mr-2" /> {loginlang.get("facebook", "Facebook")}
          </Button>
          <Button
            onClick={logInWithGoogle}
            color="secondary d-flex align-items-center yt-login-via-email"
          >
            <FaRegEnvelope className="mr-2" /> {loginlang.get("google", "Google")}
          </Button>
        </div>
      </div>
      <div className="lp-bottom-links">
        <div className="mt-4">
          <p className="yt-login-aggre-tag mb-3 text-center">
            {loginlang.get("agree", "By Signing In you agree with our")}
          </p>
          <div className="d-flex yt-login-term-privacy-link justify-content-center">
            <Link to="/help-center/Terms and Conditions">{loginlang.get("termsAndCondition", "Terms & Conditions")}</Link>
            <span className="mx-2">&</span>
            <Link to="/help-center/Privacy Policy">{loginlang.get("privacyPolicy", "Privacy Policy")}</Link>
          </div>
        </div>
        {props.isPopup &&
          <div className="mt-4 mt-4 text-center yt-skip-wrap">
            <span style={{ cursor: "pointer" }} href="#" className="yt-login-skip-btn" onClick={() =>/* history.push("/")*/ CacheState.set({ continueAsGuest: true })}>
              {loginlang.get("skipAndContinue", "Skip & Continue as Guest")}
            </span>
          </div>}
      </div>
    </div>
  );
}
export default LoginPage;
