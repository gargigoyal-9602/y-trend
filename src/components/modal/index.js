import React, { useState, useEffect } from "react";
import CancelOrder from "./cancelorder";
import ProductRating from "./productrating";
import AddaddressModal from "./addaddress";
import EditaddressModal from "./editaddress";
import UserLogout from "./logout";
import DisconnectAccount from "./disconnectaccount";
import EditProfileModal from "./editprofile";
import UserNotifyMe from "./notifyme";
import SelectAddressModal from "./selectaddress";
import ConnectAccountModal from "./connectacount";
import UserDeleteAddress from "./deleteaddress";
import RemoveWhishList from "./removewhishlist";
import DefaultAddress from "./DefaultAddress";
import SizeChartModal from "./sizechart";
function AllModal(props) {
  console.log(props, "props");
  const ModalType = props.modalName;
  if (ModalType != undefined) {
    switch (ModalType) {
      case "CancelOrder":
        return <CancelOrder {...props} />;
      case "SizeChart":
        return <SizeChartModal {...props} />;
      case "Productrate":
        return <ProductRating {...props} />;
      case "Addaddress":
        return <AddaddressModal {...props}/>;
      case "editaddress":
        return <EditaddressModal setAddress={props.setAddress} userData={props.userData} record={props.currentRecord} />;
      case "logout":
        return <UserLogout {...props} />;
      case "ConnectAccount":
        return <ConnectAccountModal {...props}/>;
      case "disconnect":
        return <DisconnectAccount {...props}/>;
      case "editprofile":
        return <EditProfileModal userData={props.userData} {...props} />;
      case "notifyme":
        return <UserNotifyMe {...props}/>;
      case "selectaddress":
        return <SelectAddressModal {...props} />;
      case "deleteaddress":
        return <UserDeleteAddress deletedRecords = { props.deletedRecords } setAddress = { props.setAddress } {...props} />;
      case "removewhishlist":
    return <RemoveWhishList />;
      case "DefaultAddress":
    return <DefaultAddress {...props} />
      default:
    return <h1>No project match</h1>;
  }
} else {
  return <div>Please Select Modal Type</div>;
}
}
export default AllModal;
