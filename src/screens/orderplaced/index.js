import React, { useState } from "react";
import "./css/index.scoped.css";
import {
  OrderPlaced,
  Footer,
  HeroBanner,
  Header,
  AppStoreBanner,
  SingleOfferBanner,
  DoubleOfferBanner,
} from "../../components";
function OrderPlacedPage(props) {
  return (
    <>
      <Header onProps={props} />
      {/*<HeroBanner />*/}
      <OrderPlaced />
    
      <Footer />
    </>
  );
}
export default OrderPlacedPage;
