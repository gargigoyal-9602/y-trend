import React, { useState } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col, Button } from "reactstrap";
import OneImg from "./images/one.png";
import TwoImg from "./images/two.png";
import ThreeImg from "./images/three.png";
import { useHistory } from "react-router";
import commands from "../../commands";
import parse from "html-react-parser";
import _ from 'lodash';

function ThreeInOneBanner() {
  var mybanner2 = commands.cache.getWebPositionedBanners({ position: 2 })
  // const BackgroundOne = OneImg;
  // const BackgroundTwo = TwoImg;
  // const BackgroundThree = ThreeImg;
  let myban = _.sortBy(mybanner2[0]?.images,['position']);
  console.log(myban,"myban");
  const BackgroundOne = myban[0]?.image;
  const BackgroundTwo = myban[1]?.image;
  const BackgroundThree = myban[2]?.image;
  var ImageOne = {
    backgroundImage: `url(${BackgroundOne})`,
  };
  var ImageTwo = {
    backgroundImage: `url(${BackgroundTwo})`,
  };
  var ImageThree = {
    backgroundImage: `url(${BackgroundThree})`,
  };
  const history = useHistory();
  return (
    <section className="my-3">
      <div className="shopnow yt-three-promo-main">
        <div className="yt-cm-three-main-row d-flex flex-wrap">
          <div className="yt-cm-three-col">
            <div className="yty-bg-3banner" style={ImageOne}>
              <div className="yt-3banner-wrapper yt-full-width">
                <h2 className="yt-3banner-title">
                  {myban[0]?.title}
                </h2>
                <h4 className="yt-3banner-sub-title">{myban[0]?.subtitle}</h4>
                <span className="yt-3banner-divider yt-first-divider" />
                <Button
                  color="secondary yt-3banner-sp-btn py-3"
                  onClick={()=>window.location.href=myban[0]?.url}
                  // onClick={() => history.push("/shop")}
                >
                  Shop Now
                </Button>
              </div>
            </div>
            <div className="yt-first-bottom-banner" style={ImageTwo}>
              <div className="yt-3banner-wrapper yt-top-2">
                {/* <h2 className="yt-3banner-title my-0">Welcome,</h2> */}
                <h2 className="yt-3banner-title my-0">
                {myban[1]?.title}
                </h2>
                <h4 className="yt-3banner-sub-title">{myban[1]?.subtitle}</h4>
                <span className="yt-3banner-divider yt-second-divider" />
                <Button
                  color="secondary yt-3banner-sp-btn py-3"
                  // onClick={() => history.push("/shop")}
                  onClick={()=>window.location.href=myban[1]?.url}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
          <div className="yt-cm-three-col yt-cm-bg-col" style={ImageThree}>
            <div className="yt-3banner-last-wrap">
              <div className="yt-3banner-big-title">
              {myban[2]?.title}
              </div>
              <div className="yt-3banner-big-sub-title">{myban[2]?.subtitle}</div>
              <span className="yt-3banner-big-divider yt-third-divider" />
              <Button
                color="secondary yt-3banner-sp-btn py-3"
                onClick={()=>window.location.href=myban[2].url}
                // onClick={() => history.push("/shop")}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// function ThreeInOneBanner() {
//   var banners = commands.cache.getPositionedBanners({ position: 2 });

//   return banners.map((item) => parse(item.content + "<br />"));
// }

export default ThreeInOneBanner;
