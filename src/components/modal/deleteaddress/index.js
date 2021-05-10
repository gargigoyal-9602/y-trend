import React, { useState, useEffect } from "react";
import "./css/index.scoped.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteData } from "../../../Barriers/apiHelper";
import { useHistory } from "react-router-dom";
import commands from "../../../commands";
import lang from "../../../language";
function UserDeleteAddress(props) {
  const deleteaddresslang = new lang("savedAddressesScreen");
  const history = useHistory();

  const [modal, setModal] = useState(true);
  const [checkSize, setCheckSize] = useState(0);
  const toggle = () => setModal(!modal);
  const records = props.deletedRecords;

  const deleteAddress = async () => {
    commands.user.delAddress(records.id, onDelSuccess, onDelFailure)
  };

  const onDelSuccess = () => {
    commands.user.getAddressList(() => { props.toggle(); props.setAddress(); history.push(`/profile/saveaddresses`); }, () => { })
  }

  const onDelFailure = () => {

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
        <ModalHeader
          toggle={props.toggle}
          className="delete-addr-title-bar  border-0"
        >
          <span>
          {deleteaddresslang.get("deleteAddress", "Delete Address")}</span>
        </ModalHeader>
        <ModalBody className="py-4">
          <div class="text-center delete-addr-body-text px-0 pt-4">
          {deleteaddresslang.get("deleteAddressMessage", "Are you sure you want to delete the address ?")}
          </div>
        </ModalBody>
        <ModalFooter className="delete-addr-bottom-bar p-1 border-0 d-flex justify-content-between">
          <Button
            color="secondary pp-delete-addr-btn-modal p-3 pp-delete-addr-btn-light-grey mr-1"
            onClick={props.toggle}
            block
          >
              {deleteaddresslang.get("cancel", "Cancel")}
          </Button>
          <span className="yt-form-spacer" />
          <Button
            color="secondary pp-delete-addr-btn-modal p-3 pp-delete-addr-btn-dark-grey ml-1"
            onClick={deleteAddress}
            block
          >
             {deleteaddresslang.get("yesDelete", "Yes, Delete")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default UserDeleteAddress;
