import React, { useState } from "react";
import "./css/index.scoped.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import lang from "../../../language";

function DisconnectAccount(props) {
  const connectedaccountlang = new lang("connectedAccountsScreen");
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const ConfirmLogout = () => {
    setTimeout(function () {
      setModal(!modal);
      return "Deleted";
    }, 3000);
  };
  return (
    <div class="cm-main-modal-wrapper">
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="cm-small-modal-4"
        centered={true}
        modalClassName="popopop"
      >
        <ModalHeader toggle={toggle} className="dis-acc-title-bar  border-0">
          <span>{connectedaccountlang.get("disconnect", "Disconnect")} {_.capitalize(props.provider)}</span>
        </ModalHeader>
        <ModalBody className="py-4">
          <div class="text-center dis-acc-body-text px-4 pt-4">
          {connectedaccountlang.get("disconnectMessage", "Are you sure you want to disconnect your ")} {props.provider} 
           {" "+connectedaccountlang.get("fromDisconnect", "account from Y-Trend?")}
          </div>
        </ModalBody>
        <ModalFooter className="dis-acc-bottom-bar p-1 border-0 d-flex justify-content-between">
          <Button
            color="secondary pp-dis-acc-btn-modal p-3 pp-dis-acc-btn-light-grey"
            onClick={toggle}
            block
          >
             {connectedaccountlang.get("cancel", "Cancel")}
          </Button>
          <span className="yt-form-spacer"></span>
          <Button
            color="secondary pp-dis-acc-btn-modal p-3 pp-dis-acc-btn-dark-grey"
            onClick={()=>(props.onDisconnect(),toggle())}
            block
          >
              {connectedaccountlang.get("disconnect", "Disconnect")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default DisconnectAccount;
