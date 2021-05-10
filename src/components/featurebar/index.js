import React from "react";
import "./css/index.scoped.css";
import { Container, Row, Col } from "reactstrap";
import { SVG } from "../../components";

import langg from "../../language";

function FeatureBar() {
  const lang = new langg("homeScreen");

  return (
    <section className="yt-featured-bar-main">
      <Container>
        <div className="customcontainer hp-featured-wrapper">
          <Row className="align-items-center yt-cm-fb-row">
            <Col xs={12} sm={3} lg={3} className="yt-cm-fb-col">
              <Row className="align-items-center yt-fb-inner-wrap">
                <Col xs={2} sm={12} lg={2} className="yt-cm-fb-inner-col">
                  <div className="yt-ft-img d-flex align-items-center justify-content-center">
                    <img
                      src={require("./images/truck.png")}
                      className="logoimage"
                      alt="ytrend"
                    />
                    <img
                      src={require("./images/truck-white.png")}
                      className="logoimage d-none logo-white"
                      alt="ytrend"
                    />
                  </div>
                </Col>
                <Col xs={10} sm={12} lg={10} className="yt-cm-fb-inner-col">
                  <div className="hp-fb-inner-wrap py-3">
                    <div className="feature_head first">{lang.get("freeDeliveryTitle", "Free Delivery")}</div>
                    <div className="feature_text first">
                      {lang.get("freedeliverytext", "Free Shipping on all order")}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={3} lg={3} className="yt-cm-fb-col">
              <Row className="align-items-center yt-fb-inner-wrap">
                <Col xs={2} sm={12} lg={2} className="yt-cm-fb-inner-col">
                  <div className="yt-ft-img d-flex align-items-center justify-content-center">
                    <img
                      src={require("./images/pay.png")}
                      className="logoimage"
                      alt="ytrend"
                    />
                    <img
                      src={require("./images/pay-white.png")}
                      className="logoimage d-none logo-white"
                      alt="ytrend"
                    />
                  </div>
                </Col>
                <Col xs={10} sm={12} lg={10} className="yt-cm-fb-inner-col">
                  <div className="hp-fb-inner-wrap py-3">
                    <div className="feature_head">{lang.get("securePaymentTitle", "Secure Payment")}</div>
                    <div className="feature_text">
                      {lang.get("securePaymentText", "On every order over SAR 100.00")}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={3} lg={3} className="yt-cm-fb-col">
              <Row className="align-items-center yt-fb-inner-wrap">
                <Col xs={2} sm={12} lg={2} className="yt-cm-fb-inner-col">
                  <div className="yt-ft-img d-flex align-items-center justify-content-center">
                    <img
                      src={require("./images/money.png")}
                      className="logoimage"
                      alt="ytrend"
                    />
                    <img
                      src={require("./images/money-white.png")}
                      className="logoimage d-none logo-white"
                      alt="ytrend"
                    />
                  </div>
                </Col>
                <Col xs={10} sm={12} lg={10} className="yt-cm-fb-inner-col">
                  <div className="hp-fb-inner-wrap py-3">
                    <div className="feature_head">{lang.get("daysReturnTitle", "60 Days Return")}</div>
                    <div className="feature_text">{lang.get("daysReturnText", "Guarantee under 7 days")}</div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={3} lg={3} className="yt-cm-fb-col">
              <Row className="align-items-center yt-fb-inner-wrap">
                <Col xs={2} sm={12} lg={2} className="yt-cm-fb-inner-col">
                  <div className="yt-ft-img d-flex align-items-center justify-content-center">
                    <img
                      src={require("./images/help.png")}
                      className="logoimage "
                      alt="ytrend"
                    />
                    <img
                      src={require("./images/help-white.png")}
                      className="logoimage d-none logo-white"
                      alt="ytrend"
                    />
                  </div>
                </Col>
                <Col xs={10} sm={12} lg={10} className="yt-cm-fb-inner-col">
                  <div className="hp-fb-inner-wrap border-md-0 py-3">
                    <div className="feature_head">{lang.get("supportTitle", "Support 24/7")}</div>
                    <div className="feature_text">
                      {lang.get("supportText", "Support online 24 hours a day")}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default FeatureBar;
