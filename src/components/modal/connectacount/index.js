import React, { useState, useEffect } from "react";
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
  Col,
} from "reactstrap";
import classnames from "classnames";

import { AllModal } from "../../../components";
import UserState from "../../../redux/states/user";
import commands from "../../../commands";


import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../../config/firebase.config";


function ConnectAccountModal(props) {
  const [activeTab, setActiveTab] = useState(1);
  const toggles = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [ShowETModal, settt] = useState(false);
  const openEditAddressModal = () => settt(!ShowETModal);
  const [ShowADModal, setShowADModal] = useState(false);
  const openAddAddressModal = () => setShowADModal(!ShowADModal);

  const userState = UserState.get();

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
        console.log("readt ",body);
        commands.user.connectSocialAccount(body,()=>window.location.replace("/profile/connectaccount"))

      })
      .catch((error) => {
        console.log(error);
      });
  }


  function onContinue() {
    if (activeTab === 1) {
      connectGoogle();
    }
    props.toggle();
  }


  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle} className="cm-small-modal-6" centered={true}>
        <ModalHeader toggle={props.toggle} className="select-addr-title-bar p-4">
          <span>Select Accounts</span>
        </ModalHeader>
        <ModalBody className="p-3 yt-cm-sadd-body">
          <div class="select-addr-body-wrap">
            {ShowETModal && <AllModal modalName="editaddress" />}
            {ShowADModal && <AllModal modalName="Addaddress" />}
            <div class="profile-pg-inner-wrapper">
              <div class="profile-pg-sa-address-main-wrap">
                <ul class="pp-sa-list-none p-0 m-0 pp-sa-all-addres-list">
                  <li className={classnames({ active: activeTab === 0 })}
                    onClick={() => {
                      toggles(0);
                    }}
                  >
                    <div class="profile-pg-inner-wrap p-4 bg-white radius-10">
                      <Row className="yt-cm-sadd-row">
                        <Col md={2} className="yt-cm-sadd-col">
                          <div class="pp-sa-img-wrap">
                            <img
                              src={require("./images/fb-icn-pp.png")}
                              width="65"
                              height="65"
                            />
                          </div>
                        </Col>
                        <Col md={10} className="yt-cm-sadd-col">
                          <div class="pp-sa-info-wrap">
                            <div className="d-flex align-items-center justify-content-between mb-3 yt-sadd-ttl-chek-img">
                              <h2 class="pp-sa-type my-0">Facebook</h2>
                              <div class="pp-sa-action-wrap d-flex align-items-end justify-content-end">
                                <div class="pp-sa-delet text-right pl-3">
                                  {activeTab === 0 ? (
                                    <img
                                      src={require("./images/checked.png")}
                                      width="20"
                                      height="20"
                                      class="img-fluid d-block ml-auto mb-2"
                                    />
                                  ) : (
                                      <img
                                        src={require("./images/unchecked.png")}
                                        width="20"
                                        height="20"
                                        class="img-fluid d-block ml-auto mb-2"
                                      />
                                    )}
                                </div>
                              </div>
                            </div>

                            <p class="pp-sa-address mb-0">
                              Connect to Facebook
                                </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </li>
                  <li className={classnames({ active: activeTab === 1 })}
                    onClick={() => {
                      toggles(1);
                    }}
                  >
                    <div class="profile-pg-inner-wrap p-4 bg-white radius-10">
                      <Row className="yt-cm-sadd-row">
                        <Col md={2} className="yt-cm-sadd-col">
                          <div class="pp-sa-img-wrap">
                            <img
                              src={require("./images/gg-icn-pp.png")}
                              width="65"
                              height="65"
                            />
                          </div>
                        </Col>
                        <Col md={10} className="yt-cm-sadd-col">
                          <div class="pp-sa-info-wrap">
                            <div className="d-flex align-items-center justify-content-between mb-3 yt-sadd-ttl-chek-img">
                              <h2 class="pp-sa-type my-0">Google</h2>
                              <div class="pp-sa-action-wrap d-flex align-items-end justify-content-end">
                                <div class="pp-sa-delet text-right pl-3">
                                  {activeTab === 1 ? (
                                    <img
                                      src={require("./images/checked.png")}
                                      width="20"
                                      height="20"
                                      class="img-fluid d-block ml-auto mb-2"
                                    />
                                  ) : (
                                      <img
                                        src={require("./images/unchecked.png")}
                                        width="20"
                                        height="20"
                                        class="img-fluid d-block ml-auto mb-2"
                                      />
                                    )}
                                </div>
                              </div>
                            </div>

                            <p class="pp-sa-address mb-0">
                              Connect to Google
                                </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </li>
                  <li className={classnames({ active: activeTab === 2 })}
                    onClick={() => {
                      toggles(2);
                    }}
                    className="d-none"
                  >
                    <div class="profile-pg-inner-wrap p-4 bg-white radius-10">
                      <Row className="yt-cm-sadd-row">
                        <Col md={2} className="yt-cm-sadd-col">
                          <div class="pp-sa-img-wrap">
                            <img
                              src={require("./images/ig-icn-pp.png")}
                              width="65"
                              height="65"
                            />
                          </div>
                        </Col>
                        <Col md={10} className="yt-cm-sadd-col">
                          <div class="pp-sa-info-wrap">
                            <div className="d-flex align-items-center justify-content-between mb-3 yt-sadd-ttl-chek-img">
                              <h2 class="pp-sa-type my-0">Instagram</h2>
                              <div class="pp-sa-action-wrap d-flex align-items-end justify-content-end">
                                <div class="pp-sa-delet text-right pl-3">
                                  {activeTab === 2 ? (
                                    <img
                                      src={require("./images/checked.png")}
                                      width="20"
                                      height="20"
                                      class="img-fluid d-block ml-auto mb-2"
                                    />
                                  ) : (
                                      <img
                                        src={require("./images/unchecked.png")}
                                        width="20"
                                        height="20"
                                        class="img-fluid d-block ml-auto mb-2"
                                      />
                                    )}
                                </div>
                              </div>
                            </div>

                            <p class="pp-sa-address mb-0">
                              Connect to Instagram
                                </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </li>
                </ul>
                <Button color="link d-none yt-mb-add-new-address-nbtn" onClick={openAddAddressModal}>Add New Address</Button>
              </div>
            </div>
            <div class="d-flex">
              <Button
                onClick={onContinue}
                color="secondary select-addr-modal-btn py-3 mr-2 select-add-bg-blue"
                block
              >
                Continue
              </Button>
              <Button
                color="secondary select-addr-modal-btn py-3 mt-0 select-add-bg-black"
                block
                onClick={props.toggle}

              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ConnectAccountModal;
