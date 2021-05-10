import React from "react";
import "./css/index.scoped.css";
import { Button, Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router";
import commands from "../../commands";
import parse from "html-react-parser";


function DoubleOfferBanner() {
  var mybanner5 = commands.cache.getWebPositionedBanners({ position: 5 })
  console.log(mybanner5,"GETMYBANNER 5")
  const history = useHistory();
  return (
    <section className="yt-double-offer-component">
      <Container>
        <Row className="yt-cm-db-row">
          <Col sm={12} sm={6} lg={6} className="yt-cm-col">
            <div className="yt-doc-inner mb-4 mb-lg-0 ">
              <img
                // src={require("./images/offer-1.png")}
                src={mybanner5[0]?.images[0].image}
                className="img-fluid three"
                alt="ytrend"
              />
              <div className="yt-doc-box">
                <div className="yt-doc-daily-2 text-capitalize">{mybanner5[0]?.images[0]?.title}</div>
                <div className="yt-doc-tag yt-small-tag text-capitalize">{mybanner5[0]?.images[0]?.subtitle}</div>
                <Button
                  color="secondary yt-doc-btn py-3"
                  onClick={()=>window.location.href=mybanner5[0]?.images[0]?.url}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </Col>
          <Col sm={12} sm={6} lg={6} className="yt-cm-col">
            <div className="yt-doc-inner">
              <img
                // src={require("./images/offer-2.png")}
//                src={mybanner5[0]?.images[1].image}
                className="img-fluid three"
                alt="ytrend"
              />
              <div className="yt-doc-box">
                <div className="yt-doc-tag yt-small-tag text-capitalize">{mybanner5[0]?.images[1]?.title}</div>
                <div className="yt-doc-daily-2 text-capitalize">{mybanner5[0]?.images[1]?.subtitle}</div>
                <Button
                  color="secondary yt-doc-btn py-3 "
                  onClick={()=>window.location.href=mybanner5[0]?.images[1]?.url}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}


// function DoubleOfferBanner() {
//   var banners = commands.cache.getPositionedBanners({ position: 5 });

//   return banners.map((item) => parse(item.content + "<br />"));
// }


export default DoubleOfferBanner;
