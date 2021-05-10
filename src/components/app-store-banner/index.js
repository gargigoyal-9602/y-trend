import React, { useState } from "react";
import "./css/index.scoped.css";
import { Row } from "reactstrap";
import language from "../../language/language";
import langg from "../../language"

function AppStoreBanner(props) {
  const lang = new langg("common");

  return (
    <div className="yt-appstore-component appstore">
      <div>
        <Row>
          <div className="textbox7 yt-asc-inner text-center px-3">
            <div className="yt-asc-title">{lang.get("downloadapp", "Download the App for Free")}</div>
            <div className="yt-asc-images d-flex flex-wrap align-items-center justify-content-center">
              <a href="https://play.google.com/store" target="_blank" className="stores w3-ripple img-fluid yt-asc-img">
                <img
                  src={require("./images/g10.png")}
                  alt="ytrend"
                  className="img-fluid w3-hover-shadow"
                />
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" className="stores w3-ripple img-fluid yt-asc-img">
                <img
                  src={require("./images/Group3640.png")}
                  alt="ytrend"
                  className="img-fluid w3-hover-shadow"
                /></a>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default AppStoreBanner;
