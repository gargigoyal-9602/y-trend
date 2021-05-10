import React, { useState, useEffect } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { FaHeart } from "react-icons/fa";
import { AllModal } from "../../../components";
import { useSelector } from "react-redux";
import { getProducts } from "../../../Barriers/apiHelper";
import classnames from "classnames";
import NoAddress from "./NoAddress";
import { useHistory } from "react-router";
import commands from "../../../commands";
import UserState from "../../../redux/states/user";
import _ from "lodash";
import lang from "../../../language";
function ExistAddress(props) {

  const savedaddresslang = new lang("savedAddressesScreen");
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("1");
  const [userAddress, setUserAddress] = useState([]);
  const [ShowETModal, setShowETModal] = useState(false);
  const [delRecords, setDelRecords] = useState([]);
  const [check, setCheck] = useState("");
  const [ShowADModal, setShowADModal] = useState(false);
  const [ShowDeleteAddressModa, setDeleteAddressModa] = useState(false);
  const [showDefaultAddressModal, setDefaultAddressmModal] = useState(false);
  const [ShowAddress, setfunc] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});

  const state = useSelector((state) => state.logInReducer.loginData);
  const userState = useSelector((state) => state.logInReducer);

  useEffect(() => {
    commands.user.getAddressList(onAddressSuccess, onAddessFailure)
  }, []);

  const onAddressSuccess = () => {
    setUserAddress(UserState.get().address);
    console.log("Default address", UserState.get().address);
  }

  const onAddessFailure = () => {

  }

  const openDeleteAddressModal = (x) => {
    setDelRecords(x)
    setDeleteAddressModa(!ShowDeleteAddressModa);
  };

  const openAddAddressModal = () => {
    // history.push('/profile/saveaddresses')
    setShowADModal(!ShowADModal);
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const openEditAddressModal = (x) => {
    setCurrentRecord(x);
    setShowETModal(!ShowETModal);
  };

  function setDefaultAddress(x) {
    console.log("Default address set to", x);
    x.is_default = true;
    commands.user.updateAddress(x, x.id, onSetDefaultSuccess, onSetDefaultFailure)
  }

  function onSetDefaultSuccess() {
    commands.user.getAddressList(onAddressSuccess, onAddessFailure);
    setDefaultAddressmModal(!showDefaultAddressModal);
  }

  function onSetDefaultFailure() {
    // setDefaultAddressmModal(!showDefaultAddressModal)
  }

  return (
    <>
      { Array.isArray(userAddress) && userAddress.length > 0 ? (
        <div class="">
          {ShowETModal && (
            <AllModal
              currentRecord={currentRecord}
              userData={state}
              setAddress={() => onAddressSuccess()}
              modalName="editaddress"
            />
          )}

          {ShowADModal && (
            <AllModal userData={state} modalName="Addaddress" setAddress={() => onAddressSuccess()} />
          )}

          <AllModal
            deletedRecords={delRecords}
            setAddress={() => onAddressSuccess()}
            modalName="deleteaddress"
            isOpen={ShowDeleteAddressModa}
            toggle={() => setDeleteAddressModa(!ShowDeleteAddressModa)}
          />
          <AllModal userData={state} modalName="DefaultAddress" isOpen={showDefaultAddressModal} toggle={() => setDefaultAddressmModal(!showDefaultAddressModal)} />

          <div class="profile-pg-inner-wrapper">
            <div class="profile-pg-sa-address-main-wrap">
              <ul class="pp-sa-list-none p-0 m-0 pp-sa-all-addres-list">
                {userAddress.map((x) => {
                  return (
                    <li
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                      key={x.id}
                    >
                      {x.checked}
                      <div class="profile-pg-address-list bg-white radius-10 profile-pg-mb-30" style={{ cursor: "default" }}>
                        <div className="d-flex flex-wrap align-items-center">
                          <div class="pp-sa-img-wrap d-flex">
                            <img
                              src={require("./images/address-icn-list.png")}
                              width="65"
                              height="65"
                            />
                            <div class="pp-sa-info-wrap pr-5">
                              <h2 class="pp-sa-type mt-0">{/*x.address_type*/_.capitalize(x.name)}</h2>
                              <p class="pp-sa-address mb-0" style={{overflow:"hidden"}}>
                                {x.flat_no}, {x.address}, {x.city}, {x.country},{" "}
                                {x.zip_code}. {x.checked}
                              </p>
                            </div>
                          </div>

                          <div class="pp-sa-action-wrap d-flex align-items-end justify-content-end">
                            <div class="pp-sa-edit pr-3 border-right">
                              <Button
                                color="link pp-add-edit-btn"
                                onClick={() => openEditAddressModal(x)}
                              >
                                 {savedaddresslang.get("edit", "Edit")} 
                                
                              </Button>
                            </div>
                            <div class="pp-sa-delet text-right pl-3">
                              {x.is_default ? (
                                <img
                                  src={require("./images/checked.png")}
                                  width="29"
                                  height="29"
                                  class="img-fluid d-block ml-auto mb-2"
                                />
                              ) : (
                                  <img
                                    src={require("./images/unchecked.png")}
                                    width="29"
                                    height="29"
                                    class="img-fluid d-block ml-auto mb-2 w3-ripple"
                                    onClick={() => { setDefaultAddress(x) }}
                                  />
                                )}
                              <Button
                                color="link pr-0 pp-add-delete-btn"
                                onClick={() => openDeleteAddressModal(x)}
                              >
                                 {savedaddresslang.get("delete", "Delete")} 
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div class="d-flex justify-content-end">
                <Button
                  color="secondary pp-no-addr-btn py-3 px-2"
                  onClick={openAddAddressModal}
                >
              {savedaddresslang.get("addAnAddress", "Add an Address")} 
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <NoAddress userData={state} setAddress={() => onAddressSuccess()} />
        )}
    </>
  );
}

export default ExistAddress;
