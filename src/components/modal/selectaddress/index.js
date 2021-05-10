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
import { useSelector } from "react-redux";
import lang from "../../../language";

function SelectAddressModal(props) {
  const selectlang = new lang("confirmOrderScreen");
  
  const [activeTab, setActiveTab] = useState("0");
  const toggles = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [ShowETModal, settt] = useState(false);
  const openEditAddressModal = () => settt(!ShowETModal);
  const [ShowADModal, setShowADModal] = useState(false);
  const openAddAddressModal = () => setShowADModal(!ShowADModal);

  const userState = UserState.get();
  const state = useSelector((state) => state.logInReducer.loginData);


  return (
    ShowADModal ?
      <AllModal userData={state} modalName="Addaddress" setAddress={() => null} isOpen={ShowADModal} toggle={() => setShowADModal(!ShowADModal)} />
      :
      <div>
        <Modal isOpen={props.isOpen} toggle={props.toggle} className="cm-small-modal-6" centered={true}>
          <ModalHeader toggle={props.toggle} className="select-addr-title-bar p-4">
            <span>
            {selectlang.get("selectAddress", "Select Address")}</span>
          </ModalHeader>
          <ModalBody className="p-3 yt-cm-sadd-body">
            <div class="select-addr-body-wrap">
              {ShowETModal && <AllModal modalName="editaddress" />}
              {ShowADModal && <AllModal modalName="Addaddress" />}
              <div class="profile-pg-inner-wrapper">
                <div class="profile-pg-sa-address-main-wrap">
                  <ul class="pp-sa-list-none p-0 m-0 pp-sa-all-addres-list">
                    {(Array.isArray(userState?.address) && userState?.address.length > 0) ?
                      userState?.address.map((item, idx) => (
                        <li
                          className={classnames({ active: activeTab === idx.toString() })}
                          onClick={() => {
                            toggles(idx.toString());
                          }}
                        >
                          <div class="profile-pg-inner-wrap p-4 bg-white radius-10">
                            <Row className="yt-cm-sadd-row">
                              <Col md={2} className="yt-cm-sadd-col">
                                <div class="pp-sa-img-wrap">
                                  <img
                                    src={require("./images/address-icn-list.png")}
                                    width="65"
                                    height="65"
                                  />
                                </div>
                              </Col>
                              <Col md={10} className="yt-cm-sadd-col">
                                <div class="pp-sa-info-wrap">
                                  <div className="d-flex align-items-center justify-content-between mb-3 yt-sadd-ttl-chek-img">
                                    <h2 class="pp-sa-type my-0">{item.name}</h2>
                                    <div class="pp-sa-action-wrap d-flex align-items-end justify-content-end">
                                      <div class="pp-sa-delet text-right pl-3">
                                        {activeTab === idx.toString() ? (
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
                                    {`${item.flat_no}, ${item.address}, ${item.city}, ${item.state}, ${item.country} ${item.zip_code}`}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </li>
                      ))
                      :
                      <div class="w3-panel w3-text-gray w3-large">
            {selectlang.get("noExistAddress", "No existing address is available right now.")}
                  
                    </div>
                    }

                  </ul>
                  <Button color="link d-none yt-mb-add-new-address-nbtn" onClick={openAddAddressModal}>Add New Address</Button>
                </div>
              </div>
              <div class="d-flex">
                <Button
                  onClick={() => setShowADModal(true)}
                  color="secondary select-addr-modal-btn py-3 mr-2 select-add-bg-blue"
                  block
                >
            {selectlang.get("addNewAddress", "Add New Address")}
       
              </Button>
                <Button
                  color="secondary select-addr-modal-btn py-3 mt-0 select-add-bg-black"
                  block
                  onClick={/*openAddAddressModal*/() => userState?.address?.length > 0 ? props.onContinue({ type: props.type, address: userState?.address[activeTab], setFieldValue: props.setFieldValue, values: props.values }) : props.toggle()}
                >
                  {selectlang.get("continue", "Continue")}
                  
              </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
  );
}
export default SelectAddressModal;
