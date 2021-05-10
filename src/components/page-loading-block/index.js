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
function PageLoadingBlock(props) {
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
                src={require("./images/animated_spinner.webp")}
                className="img-fluid yt-transaction-cl-icn"
                width="170"
                height="212"
              />
              <div class="trans-fl-wrap ">
                <h2 class="trans-fl-ttl my-3" style={{ color: "#43b7a7" }}>
                  {props.title ? props.title : "Oh Noes!, Error Occured"}
                </h2>
                <p class="trans-fl-text mb-0">{props.message ? props.message : "Your order was declined!"}</p>
              </div>
              {props.onButtonPress &&
                <Button color="secondary trans-fl-btn py-3 px-5 mt-3" onClick={props.onButtonPress}>
                  {props.buttonText ? props.buttonText : "Go to Home"}
                </Button>}
              <div class="mt-2" style={{ opacity: 0 }}>
                <Button color="link trans-fl-cancel-btn">
                  Cancel transaction?
                    </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
export default PageLoadingBlock;
