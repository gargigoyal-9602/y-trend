import React, { useState } from "react";
import { Button, Container } from "reactstrap";
import "./css/index.scoped.css";
import { useHistory } from "react-router-dom";
import HeaderBanner from "./images/heroimage.png";
import commands from "../../commands";
import parse from "html-react-parser";

function HeroBanner(props) {
  const history = useHistory();
  var mybanner1 = commands.cache.getWebPositionedBanners({ position: 1 })
  const BackgroundHead = mybanner1[0]?.images[0].image;
  const routeToAll = (value) => {
    if (value !== undefined) {
      let path = "/" + value;
      window.scrollTo(0, 0);
      history.push(path);
    } else {
      let path = "/";
      window.scrollTo(0, 0);
      history.push(path);
    }
  };
  
  var ImageHead = {
    backgroundImage:  `url(${BackgroundHead})`,
  };
  return (
    <div className="hc-hero-banner" style={ImageHead}>
      <img
      src={mybanner1[0]?.images[0].image}
        // src={require("./images/heroimage.png")}

        className="heroimage hc-hero-img img-fluid d-none"
        alt="ytrend"
      />
      <div className="yt-soc-inner-content text-center">
        <Container>
          <div >
            <h2 className="yt-soc-title text-capitalize">
              {mybanner1[0]?.images[0]?.title}
            </h2>
            <p className="yt-soc-subtitle text-capitalize">{mybanner1[0]?.images[0]?.subtitle}</p>
            
          </div>
        </Container>
      </div>
      <Button
        color="secondary hc-hero-btn p-3"
        // onClick={() => {
        //   routeToAll("shop");
        // }}
        onClick={()=>window.location.href=mybanner1[0]?.images[0]?.url}
      >
        Shop Now
      </Button>
    </div>
  );
}

// function HeroBanner() {
//   var banners = commands.cache.getPositionedBanners({ position: 1 });

//   return banners.map((item) => parse(item.content + "<br />"));
// }

export default HeroBanner;
