import React, { useState } from "react";
import "./css/index.scoped.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function RemoveWhishList() {
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
        isOpen={modal}
        toggle={toggle}
        className="cm-small-modal-4"
        centered={true}
        modalClassName="popopop"
      >
        <ModalHeader
          toggle={toggle}
          className="remove-wh-lst-title-bar  border-0"
        >
          <span>Wishlist Item</span>
        </ModalHeader>
        <ModalBody className="py-4">
          <div class="text-center remove-wh-lst-body-text pt-4">
            The Item has been removed from the wishlist.
          </div>
        </ModalBody>
        <ModalFooter className="remove-wh-lst-bottom-bar p-1 d-flex">
          <Button
            color="secondary pp-remove-wh-lst-btn-modal p-3 pp-remove-wh-lst-btn-dark-grey"
            onClick={ConfirmLogout}
            block
          >
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default RemoveWhishList;
