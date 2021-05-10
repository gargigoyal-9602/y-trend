import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import SignupAccountConfirm from "./SignupAccountConfirm";
import { useHistory } from "react-router";

function SignUpConfirmComponent() {
  const history = useHistory();
  return (
    <Container>
      <div className="yt-forgot-pw-wrap yt-fpp-mb-5 yt-fpp-mt-5">
        <Row>
          <Col md={0} className="col-xxl-7 d-none">
            <div className="yt-fp-inner-content yt-fp-bg-banner">
              <div className="yt-fp-other-info">
                <p className="yt-fp-oi-tag-small">
                  Fashion and Trend come togather
                </p>
                <h3 className="yt-fp-oi-tag-big">Upto 30% off</h3>
                <span className="yt-fp-bdr" />
                <Button
                  color="secondary yt-fp-sp-now"
                  onClick={() => history.push("/shop")}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </Col>
          <Col md={12} className="">
            <div className="yt-fp-inner-content">
              <SignupAccountConfirm />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
export default SignUpConfirmComponent;
