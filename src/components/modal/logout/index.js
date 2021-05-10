/* global FB */
import React, { useEffect, useState } from "react";
import "./css/index.scoped.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserData,
  userLogout,
} from "../../../redux/actions/loginActions";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../../config/firebase.config";
import lang from "../../../language";
function UserLogout(props) {
  const profilelang = new lang("profileScreen");
  
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.logInReducer);

  useEffect(() => {
    // if (firebase.apps.length === 0) {
    //   firebase.initializeApp(firebaseConfig);
    // }
    // // Load the SDK asynchronously
    // (function(d, s, id) {
    //   var js,
    //     fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = "//connect.facebook.net/en_US/sdk.js";
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, "script", "facebook-jssdk");
    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId: "1234953260198976",
    //     cookie: true,
    //     xfbml: true,
    //     version: "v8.0",
    //   });
    // };
  }, [firebase]);

  const ConfirmLogout = async () => {
    const accessToken = state.loginData?.token.access_token;
    const data = {
      token: accessToken,
    };
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
    };

    await dispatch(userLogout(data, header, onLogoutSuccess, onLogoutFailure));
    setModal(!modal);
  };

  function onLogoutSuccess() {
    if (firebase.apps.length > 0 && firebase.auth()) {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    }
    if (window.FB) {
      window.FB.logout();
    }
    console.log("Logout success");
    window.location.replace("/");
  }

  function onLogoutFailure() {
    console.log("Logout failure");
  }

  return (
    <div class="cm-main-modal-wrapper">
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        className="cm-small-modal-4"
        centered={true}
        modalClassName="popopop"
      >
        <ModalHeader toggle={props.toggle} className="log-out-title-bar  border-0">
          <span>
          {profilelang.get("logout", "Logout")}</span>
        </ModalHeader>
        <ModalBody className="yt-log-body-wrap">
          <div class="text-center log-out-body-text ">
          {profilelang.get("logoutMessage", "Are you sure you want to logout from Ytrend?")}
          </div>
        </ModalBody>
        <ModalFooter className="log-out-bottom-bar p-1 d-flex justify-content-between">
          <Button
            color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-light-grey"
            onClick={props.toggle}
            block
          >
          {profilelang.get("cancel", "Cancel")}
          </Button>
          <span className="yt-form-spacer" />
          <Button
            color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-dark-grey"
            onClick={ConfirmLogout}
            block
          >
           {profilelang.get("logout", "Logout")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default UserLogout;
