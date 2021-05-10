import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import langg from "../../language";
function TransactionFailedComponent() {
  const lang = new langg("transactionError");
  const history = useHistory();
  const routeToshop = () => {
    let path = "/products";
    history.push(path);
  };
  return (
    <>
      <section>
        <Container>
        <div class="trans-fl-pg-inner-wrap p-4 bg-white radius-10 trans-fl-pg-mb-80 mt-5">
                <div class="cart-pg-empty-main-wrap text-center py-5">
                  <img
                    src={require("./images/transactionfailed-icn.png")}
                    className="img-fluid yt-transaction-cl-icn"
                    width="170"
                    height="212"
                  />
                  <div class="trans-fl-wrap ">
                    <h2 class="trans-fl-ttl my-3">
                    {lang.get("transErrortitle", "Oh Noes!, Transaction Failed")}  
                    </h2>
                    <p class="trans-fl-text mb-0">
                    {lang.get("transErrorMessage", "Your order was declined!")}</p>
                  </div>
                  <Button color="secondary trans-fl-btn py-3 px-5"  onClick={()=>history.replace("/cart")}>
                  {lang.get("chnagePaymentMethod", "Try Changing the Payment Method")}  
                  </Button>
                  <div class="mt-2">
                    <Button color="link trans-fl-cancel-btn" onClick={()=>history.replace("/")}>
                    {lang.get("cancelTransaction", "Cancel transaction?")}   
                    </Button>
                  </div>
                </div>
              </div>
        </Container>
      </section>
    </>
  );
}
export default TransactionFailedComponent;
