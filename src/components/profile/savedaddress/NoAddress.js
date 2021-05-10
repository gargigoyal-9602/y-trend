import React, { useState } from "react";
import "./css/index.scoped.css";
import {  Button } from "reactstrap";
// import { FaHeart } from "react-icons/fa";
import { AllModal } from "../../../components";
import lang from "../../../language";

function NoAddress(props) {
  const saveaddresslang = new lang("savedAddressesScreen");
    const [ShowADModal, settt] = useState(false);
    const openAddAddressModal = () => settt(!ShowADModal);
    return (
      <div class="profile-pg-inner-wrap profile-pg-inner-no-add p-3 bg-white radius-10 profile-pg-mb-30">
        <div class="profile-pg-sa-no-address-main-wrap text-center">
          {ShowADModal ? <AllModal userData={props.userState} modalName="Addaddress" setAddress={props.setAddress} /> : ""}
          <img src={require("./images/address-icn.png")} class="img-fluid mb-5" />
          <div class="pp-sa-no-add-wrap mt-2 mb-5">
            <h2 class="pp-na-ttl mt-0 mb-3">
            {saveaddresslang.get("noAddressSaved", "No addresses saved !")}</h2>
            <p class="pp-na-text mb-0">
            {saveaddresslang.get("noAddressSavedMessage", "No addresses have been saved to the address list yet !")}             
            </p>
          </div>
          <Button
            color="secondary pp-no-addr-btn py-3"
            onClick={openAddAddressModal}
          >
              {saveaddresslang.get("addAnAddress", "ADD AN ADDRESS")}
          </Button>
        </div>
      </div>
    );
  }

export default NoAddress
