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
import Ripple from "react-ripples";
import langg from "../../language";
function SuccessBlock(props) {
  const lang = new langg("contactUsScreen");
  const history = useHistory();

  return (
    <>
      <section>
        <Container>
          <div class="orderplc-pg-inner-wrap p-4 bg-white radius-10 orderplc-pg-mb-80 mt-5">
            <div class="orderplc-pg-success-main-wrap text-center py-5">
              <img
                src={require("./images/order-placed-icn.png")}
                className="img-fluid yt-order-placed-icn"
                width="170"
                height="212"
              />
              <div class="orderplc-wrap my-5">
                <h2 class="orderplc-ttl my-3">
                  {props.title}
                </h2>
                <p class="orderplc-text mb-0">
                  {props.message}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button color="secondary orderplc-btn py-3 px-2 mt-2 mx-3" onClick={() => history.push(`/shop`)}>
                {lang.get("shopGo", "Go To Shop")}
                  </Button>
                <Button color="secondary orderplc-btn py-3 px-2 mt-2 mx-3" onClick={() => history.push("/")}>
                {lang.get("homeGo", "Go To Home")} 
                  </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
export default SuccessBlock;
