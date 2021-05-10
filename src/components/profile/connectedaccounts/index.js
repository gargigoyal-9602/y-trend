/* global FB */
import React, { useState, useEffect, Fragment } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col, Button } from "reactstrap";
import AllModal from "../../modal";
import classnames from "classnames";
import UserState from "../../../redux/states/user";
import CacheState from "../../../redux/states/cache";
import { useHistory } from "react-router-dom";
import NoSocialConnects from "./no-social-connects";
import commands from "../../../commands";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../../config/firebase.config";
import lang from "../../../language";

function ConnectAccounts(props) {
  const connectAccountslang = new lang("connectedAccountsScreen");
  const [activeTab, setActiveTab] = useState("1");
  const [ShowCAModal, setShowCAModal] = useState(false);
  const userState = UserState.get();
  const cacheState = CacheState.get();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [ShowDisconnectModal, Disconnectfunc] = useState(false);
  const openDisconnectModal = () => Disconnectfunc(!ShowDisconnectModal);
  const openConnectAccountModal = () => setShowCAModal(!ShowCAModal);
  const [disconnectFunction, setDisconnectFunction] = useState(() => null);
  const [currentProvider, setCurrentProvider] = useState("");

  const DissconnectAccount = (value, name) => {
    if (value == activeTab) {
      console.log(value + " == " + name);
      console.log(activeTab);
      openDisconnectModal();
    }
  };

  useEffect(() => {
    commands.user.getSocialList();
  }, []);





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
      };

      const body = {
        provider: "facebook",
        display_name: "Facebook User",
        uid: response.authResponse.userID
      }
      
      commands.user.connectSocialAccount(body, () => commands.user.getSocialList())
    } else if (response.status === "not_authorized") {
      // The person is logged into Facebook, but not your app.
      window.notify([{ message: "Error while connecting with Facebook", style: "danger" }])
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }

  function connectFacebook() {
    FB.login(checkLoginState());
  }




  function connectGoogle() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
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
        };


        const body = {
          provider: "google",
          display_name: user.displayName,
          uid: user.uid
        }
        console.log("readt ", body);
        commands.user.connectSocialAccount(body, () => commands.user.getSocialList())

      })
      .catch((error) => {
        console.log(error);
      });
  }


  console.log("gill ", cacheState.social_connects);


  var googleData = Array.isArray(cacheState.social_connects) ? cacheState.social_connects.filter((item, idx) => item.provider === "google") : [];
  const isGoogleConnected = googleData.length > 0;
  googleData = isGoogleConnected ? googleData[0] : {};

  var facebookData = Array.isArray(cacheState.social_connects) ? cacheState.social_connects.filter((item, idx) => item.provider === "facebook") : [];
  const isFacebookConnected = facebookData.length > 0;
  facebookData = isFacebookConnected ? facebookData[0] : {};

  return (<>
    <div className="profile-pg-inner-wrap bg-white radius-10 profile-pg-mb-30">
      <div className="profile-pg-inner-wrapper">
        <div class="pp-ca-main-wrap">
          {ShowDisconnectModal ? <AllModal modalName="disconnect" onDisconnect={disconnectFunction} provider={currentProvider} /> : ""}
          <AllModal modalName="ConnectAccount" isOpen={ShowCAModal} toggle={() => setShowCAModal(!ShowCAModal)} />
          <ul class="m-0 p-0 pp-ca-list-none pp-ca-listing">

            <li className={classnames({ active: isFacebookConnected === true })}>
              <div class="d-flex justify-content-between align-items-center">
                <div style={isFacebookConnected ? {} : { cursor: "pointer" }} class={"pp-ca-type d-flex align-items-center" + (isFacebookConnected ? "" : "w3-ripple")} onClick={isFacebookConnected ? undefined : connectFacebook}>
                  <img
                    src={require("./images/fb-icn-pp.png")}
                    width="35"
                    height="35"
                    class="img-fluid mr-3"
                  />
                  <div class="pp-ca-name d-flex align-items-center flex-wrap">
                    {isFacebookConnected === true ? (
                      <Fragment>
                        <span class="pp-ca-tag-name  mb-2">
                        {connectAccountslang.get("connectedAs", "Connected as")}
                          </span>
                        <h2 class="pp-ca-user-name mt-0 mb-0 w-100">{facebookData.display_name}</h2>
                      </Fragment>
                    ) : (
                        <h2 class="pp-ca-user-name mt-0 mb-0">
                           {connectAccountslang.get("connectFacebookAccount", "Connect Facebook Account")}
                          </h2>
                      )}
                  </div>
                </div>
                <div class="pp-ca-remove">
                  {isFacebookConnected === true ? (
                    <img
                      src={require("./images/remove-icn.png")}
                      width="20"
                      height="20"
                      class="img-fluid w3-ripple"
                      onClick={() => {
                        setDisconnectFunction(() => { return () => commands.user.removeSocialAccount(facebookData.id, () => commands.user.getSocialList()) });
                        openDisconnectModal();
                        setCurrentProvider(facebookData.provider);
                      }}
                    />
                  ) : (
                      ""
                    )}
                </div>
              </div>
            </li>



            <li className={classnames({ active: isGoogleConnected === true })}>
              <div class="d-flex justify-content-between align-items-center">
                <div style={isGoogleConnected ? {} : { cursor: "pointer" }} class={"pp-ca-type d-flex align-items-center" + (isGoogleConnected ? "" : "w3-ripple")} onClick={isGoogleConnected ? undefined : connectGoogle}>
                  <img
                    src={require("./images/gg-icn-pp.png")}
                    width="35"
                    height="35"
                    class="img-fluid mr-3"
                  />
                  <div class="pp-ca-name d-flex align-items-center flex-wrap">
                    {isGoogleConnected === true ? (
                      <Fragment>
                        <span class="pp-ca-tag-name  mb-2">
                        
                        {connectAccountslang.get("connectedAs", "Connected as")}
                          </span>
                        <h2 class="pp-ca-user-name mt-0 mb-0 w-100">{googleData.display_name}</h2>
                      </Fragment>
                    ) : (
                        <h2 class="pp-ca-user-name mt-0 mb-0">
                          {connectAccountslang.get("connectGoogleAccount", "Connect Google Account")}
                         </h2>
                      )}
                  </div>
                </div>
                <div class="pp-ca-remove">
                  {isGoogleConnected === true ? (
                    <img
                      src={require("./images/remove-icn.png")}
                      width="20"
                      height="20"
                      class="img-fluid w3-ripple"
                      onClick={() => {
                        setDisconnectFunction(() => { return () => commands.user.removeSocialAccount(googleData.id, () => commands.user.getSocialList()) });
                        openDisconnectModal();
                        setCurrentProvider(googleData.provider);
                      }}
                    />
                  ) : (
                      ""
                    )}
                </div>
              </div>
            </li>

            {/*
            <li className={classnames({ active: activeTab === "3" })}>
              <div class="d-flex justify-content-between align-items-center">
                <div class="pp-ca-type d-flex align-items-center">
                  <img
                    src={require("./images/ig-icn-pp.png")}
                    width="35"
                    height="35"
                    class="img-fluid mr-3"
                  />
                  <div class="pp-ca-name d-flex align-items-center">
                    {activeTab === "3" ? (
                      <span class="pp-ca-tag-name  mb-2">Connected as</span>
                    ) : (
                        ""
                      )}
                    <h2 class="pp-ca-user-name mt-0 mb-0">Connect Instagram Account</h2>
                  </div>
                </div>
                <div class="pp-ca-remove">
                  {activeTab === "3" ? (
                    <img
                      src={require("./images/remove-icn.png")}
                      width="20"
                      height="20"
                      class="img-fluid"
                      onClick={() => {
                        DissconnectAccount("1", "FB");
                      }}
                    />
                  ) : (
                      ""
                    )}
                </div>
              </div>
            </li>
          */}


          </ul>
        </div>

      </div>

    </div>
    {/*<div class="d-flex justify-content-end">
      <Button
        color="secondary pp-no-addr-btn py-3 px-2"
        onClick={openConnectAccountModal}
      >
        Add an Account
                </Button>
    </div>*/}
  </>);
}
export default ConnectAccounts;
