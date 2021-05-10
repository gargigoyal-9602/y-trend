import React, { useState } from "react";
import "./css/index.scoped.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import lang from "../../../language";
function DefaultAddress(props) {
  const defaultaddresslang = new lang("savedAddressesScreen");
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const ConfirmLogout = () => {
    setTimeout(function() {
      setModal(!modal);
      return "Deleted";
    }, 3000);
  };
  return (
    <div class="cm-main-modal-wrapper">
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        className="cm-small-modal-4"
        centered={true}
        modalClassName="popopop"
      >
        <ModalHeader
          toggle={props.toggle}
          className="remove-wh-lst-title-bar  border-0"
        >
          <span>
          {defaultaddresslang.get("defaultAddress", "Default Address")}</span>
        </ModalHeader>
        <ModalBody className="py-4">
          <div class="text-center wh-lst-body-text pt-4">
          {defaultaddresslang.get("defaultAddressChange", "Your default address has been changed.")}
          </div>
        </ModalBody>
        <ModalFooter className="remove-wh-lst-bottom-bar p-1 d-flex">
          <Button
            color="secondary pp-remove-wh-lst-btn-modal p-3 pp-remove-wh-lst-btn-dark-grey"
            onClick={props.toggle}
            block
          >
          {defaultaddresslang.get("ok", "Okay")}          
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default DefaultAddress;
