import React, { useState } from "react";
import "./css/index.scoped.css";
import { Col, Container, Row, Button } from "reactstrap";
import { useHistory } from "react-router";
import commands from "../../commands";
import  _ from 'lodash';
import parse from "html-react-parser";

function ThreePromo() {
  const history = useHistory();
  var mybanner3 = commands.cache.getWebPositionedBanners({ position: 3 })
  let banners = _.sortBy(mybanner3[0]?.images,['position']);
  return (
    <section className="yt-theme-promo-component mt-5 mb-5">
      <Container>
        <Row className="yt-cm-thr-pro-row">
          <Col xs={12} sm={3} lg={3} className="yt-cm-col">
            <img
              // src={require("./images/raamin-ka-IvspK72hb2k-unsplash.png")}
              src={banners[0]?.image}
              className="promo-3-img img-fluid"
              alt="ytrend"
            />
            <div className="promo-3-botom-info  align-items-center justify-content-between px-4">
              <div>
              <div className="promot-3-title text-capitalize">{banners[0]?.title}</div>
              <span className="ellipseSubtitle mb-2 ">{banners[0]?.subtitle}</span>
              </div>
              
              <Button
                color="secondary promot-3-btn py-3 mt-3"
                onClick={()=>window.location.href=banners[0]?.url}
              >
                Shop Now
              </Button>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={6} className="promo-3-col yt-cm-col">
            <img
              // src={require("./images/m-t-elgassier-2OwC0tesaL8-unsplash.png")}
              src={banners[1]?.image}
              className="promo-3-img img-fluid"
              alt="ytrend"
            />
            <div className="promo-3-botom-info  align-items-center justify-content-between px-4">
              <div>
              <div className="promot-3-title text-capitalize">{banners[1]?.title}</div>
              <span className="ellipseSubtitle mb-2 ">{banners[1]?.subtitle}</span>
              </div>
              
              <Button
                color="secondary promot-3-btn py-3 mt-3"
                onClick={()=>window.location.href=banners[1]?.url}
              >
                Shop Now
              </Button>
            </div>
          </Col>
          <Col xs={12} sm={3} lg={3} className="yt-cm-col">
            <img
              // src={require("./images/dharma-saputra-nj-E1pQ5A24-unsplash.png")}
              src={banners[2]?.image}
              className="promo-3-img img-fluid"
              alt="ytrend"
            />
            <div className="promo-3-botom-info  align-items-center justify-content-between px-4">
              <div>
              <div className="promot-3-title text-capitalize">{banners[2]?.title}</div>
              <span className="ellipseSubtitle mb-2 ">{banners[2]?.subtitle}</span>
              </div>
              
              <Button
                color="secondary promot-3-btn py-3 mt-3"
                onClick={()=>window.location.href=banners[2]?.url}
              >
                Shop Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}


// function ThreePromo() {
//   var banners = commands.cache.getPositionedBanners({ position: 3 });

//   return banners.map((item) => parse(item.content + "<br />"));
// }
export default ThreePromo;
