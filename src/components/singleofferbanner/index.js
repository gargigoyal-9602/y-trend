import React from "react";
import "./css/index.scoped.css";
import { Button, Container } from "reactstrap";
import SingleBgImg from "./images/285489-P695ML-200.png";
import { useHistory } from "react-router";
import commands from "../../commands";
import parse from "html-react-parser";

function SingleOfferBanner() {
  var mybanner4 = commands.cache.getWebPositionedBanners({ position: 4 })
  const BackgroundImage = SingleBgImg;
  var ImageOne = {
    backgroundImage: mybanner4[0]?.images[0]?.image,
  };
  const history = useHistory();
  return (
    <div className="yt-single-offer-component" style={ImageOne}>
      <img
        src={mybanner4[0]?.images[0]?.image}
        // src={require("./images/285489-P695ML-200.png")}
        className="img-fluid d-none d-sm-block"
      />
      <div className="yt-soc-inner-content">
        <Container>
          <div className="yt-sb-inner-wrap">
            <h2 className="yt-soc-title mb-4 mt-0">
              {mybanner4[0]?.images[0]?.title}
            </h2>
            <p className="yt-soc-offer mb-0">{mybanner4[0]?.images[0]?.subtitle}</p>
            <Button
              color="secondary yt-soc-btn py-3"
              onClick={()=>window.location.href=mybanner4[0]?.images[0]?.url}
            >
              Shop Now
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

// function SingleOfferBanner() {
//   var banners = commands.cache.getPositionedBanners({ position: 4 });

//   return banners.map((item) => parse(item.content + "<br />"));
// }

export default SingleOfferBanner;
