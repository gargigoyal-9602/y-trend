import React, { useState, Fragment } from "react";
import "./css/index.scoped.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import commands from "../../../commands";
import lang from "../../../language";
function CancelOrder({ order, ...props }) {
  const cancelorderlang = new lang("myOrderScreen");
  const [modal, setModal] = useState(true);
  const [deleteorder, SetDelete] = useState(false);
  const toggle = () => setModal(!modal);
  const ConfirmDelete = () => {
    commands.orders.cancelOrder({ ...order, onSuccess: () => { SetDelete(true); props.getOrders(); } });

    /*
    SetDelete(!deleteorder);
    setTimeout(function() {
      setModal(!modal);
      return "Deleted";
    }, 3000);
    */


  };
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="cm-small-modal-4"
        centered={true}
      >
        <ModalHeader toggle={toggle} className="co-title-bar  border-0">
          <span>
            {deleteorder ?  cancelorderlang.get("cancelled", "Cancelled"): cancelorderlang.get("cancelOrder", "Cancel Order")}
            </span>
        </ModalHeader>
        <ModalBody className="py-5">
          <div class="text-center co-body-text">
            {deleteorder
              ? cancelorderlang.get("orderDeleted", "Your Order Deleted")
              : cancelorderlang.get("cancelOrderMessage", "Are you sure you want to cancel order ?")}
          </div>
        </ModalBody>

        <ModalFooter className="co-bottom-bar  p-1 d-flex">
          {deleteorder ?

            <Button
              color="secondary pp-co-btn-modal p-3 pp-co-btn-light-grey w-100"
              onClick={() => setModal(false)}
              block
            >
              {cancelorderlang.get("ok", "OK")}
          </Button>
            :
            <Fragment>
              <Button
                color="secondary pp-co-btn-modal p-3 pp-co-btn-light-grey"
                onClick={toggle}
                block
              >
              {cancelorderlang.get("cancel", " Cancel")}
               
          </Button>
              <span className="yt-form-spacer"></span>
              <Button
                color="secondary pp-co-btn-modal p-3 pp-co-btn-dark-grey"
                onClick={ConfirmDelete}
                block
              >
                  {cancelorderlang.get("yesConfirm", "Yes, Confirm")} 
              </Button>
            </Fragment>
          }
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default CancelOrder;
