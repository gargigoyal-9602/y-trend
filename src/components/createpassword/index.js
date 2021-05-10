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
import { FaEye } from "react-icons/fa";
import { useHistory } from "react-router";
import language from "../../language/language";

function CreatePassFields() {
  return (
    <div class="yt-cp-wrap">
      <h3 class="yt-cp-top-back-tag-name mb-4">{language.auth.createPassword}</h3>
      <h2 class="yt-cp-tag-line">
        {language.auth.headerText}
      </h2>
      <div class="yt-cp-form mb-4">
        <Form>
          <FormGroup>
            <img src={require("./images/key-icn.png")} class="yt-cp-icn" />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <FaEye className="yt-pas-eye-icn" />
            <span id="yt-signup-pass-error" class="yt-enter-pass" />
          </FormGroup>
          <FormGroup className="success">
            <img src={require("./images/key-icn.png")} class="yt-cp-icn" />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <FaEye className="yt-pas-eye-icn" />
            <span className="yt-pass-info d-block mb-2">
              {language.auth.passwordRule}
            </span>
            <span id="yt-reenter-pass-message" class="yt-reenter-pass">
              {language.auth.passwordChanged}
            </span>
          </FormGroup>
          <Button color="secondary yt-cp-btn" block>
            {language.auth.resetPassword}
          </Button>
        </Form>
      </div>
    </div>
  );
}
function CreatePasswordComponent() {
  const history = useHistory();
  return (
    <Container>
      <div class="yt-create-pw-wrap yt-cpp-mb-5 yt-cpp-mt-5">
        <div className="d-flex flex-wrap yt-cret-row">
          <div class="yt-cp-inner-content yt-cp-bg-banner yt-banner-col d-none">
            <div class="yt-cp-other-info">
              <p class="yt-cp-oi-tag-small">Fashion and Trend come togather</p>
              <h3 class="yt-cp-oi-tag-big">Upto 30% off</h3>
              <span class="yt-cp-bdr" />
              <Button
                color="secondary yt-cp-sp-now"
                onClick={() => history.push("/shop")}
              >
                Shop Now
              </Button>
            </div>
          </div>
          <div class="yt-cp-inner-content yt-form-col">
            <CreatePassFields />
          </div>
        </div>
      </div>
    </Container>
  );
}
export default CreatePasswordComponent;
